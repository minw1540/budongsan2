/**
 * 데이터 파싱 및 변환 유틸리티
 * XML to JSON 변환 및 데이터 정제 기능 제공
 */

import * as xmljs from 'xml-js';

/**
 * 국토교통부 API 원시 데이터 항목
 */
export interface RawAptTradeItem {
  거래금액: { _text: string };
  건축년도: { _text: string };
  년: { _text: string };
  월: { _text: string };
  일: { _text: string };
  아파트: { _text: string };
  전용면적: { _text: string };
  지번: { _text: string };
  지역코드: { _text: string };
  층: { _text: string };
  법정동: { _text: string };
  시군구: { _text: string };
  도로명: { _text: string };
}

/**
 * 정제된 아파트 거래 데이터
 */
export interface ParsedAptTradeItem {
  dealAmount: number; // 거래금액 (만원, 숫자)
  buildYear: number | null; // 건축년도
  dealDate: string; // 거래일 (YYYY-MM-DD)
  aptName: string; // 아파트명
  exclusiveArea: number; // 전용면적 (㎡)
  jibun: string; // 지번
  regionCode: string; // 지역코드
  floor: number | null; // 층수
  dong: string; // 법정동
  sigungu: string; // 시군구
  roadName: string; // 도로명
  aptSeq?: string; // 아파트 일련번호 (생성)
}

/**
 * XML을 JSON으로 변환
 */
export function xmlToJson(xmlData: string): unknown {
  try {
    const result = xmljs.xml2js(xmlData, {
      compact: true,
      textKey: '_text',
      ignoreDeclaration: true,
      ignoreInstruction: true,
      ignoreComment: true,
      ignoreDoctype: true,
    });

    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('XML 파싱 오류:', error);
    throw new Error(
      `XML 파싱 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
    );
  }
}

/**
 * 거래금액 문자열을 숫자로 변환
 * "12,000" -> 12000
 */
export function parseAmount(amountStr: string): number {
  if (!amountStr || typeof amountStr !== 'string') return 0;

  // 콤마 제거 후 숫자 변환
  const cleanAmount = amountStr.replace(/,/g, '').trim();
  const amount = parseInt(cleanAmount, 10);

  return isNaN(amount) ? 0 : amount;
}

/**
 * 건축년도 파싱 (0이나 빈 값 처리)
 */
export function parseBuildYear(yearStr: string): number | null {
  if (!yearStr || typeof yearStr !== 'string') return null;

  const year = parseInt(yearStr.trim(), 10);

  // 유효하지 않은 년도는 null 반환
  if (
    isNaN(year) ||
    year === 0 ||
    year < 1900 ||
    year > new Date().getFullYear()
  ) {
    return null;
  }

  return year;
}

/**
 * 층수 파싱
 */
export function parseFloor(floorStr: string): number | null {
  if (!floorStr || typeof floorStr !== 'string') return null;

  const floor = parseInt(floorStr.trim(), 10);

  return isNaN(floor) ? null : floor;
}

/**
 * 전용면적 파싱
 */
export function parseArea(areaStr: string): number {
  if (!areaStr || typeof areaStr !== 'string') return 0;

  const area = parseFloat(areaStr.trim());

  return isNaN(area) ? 0 : area;
}

/**
 * 거래일 생성 (YYYY-MM-DD 형식)
 */
export function formatDealDate(
  year: string,
  month: string,
  day: string
): string {
  const y = year?.trim() || '';
  const m = (month?.trim() || '1').padStart(2, '0');
  const d = (day?.trim() || '1').padStart(2, '0');

  return `${y}-${m}-${d}`;
}

/**
 * 문자열 트림 및 정제
 */
export function cleanString(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str.trim();
}

/**
 * 아파트 일련번호 생성
 * 지역코드-아파트명-전용면적 기반으로 고유 ID 생성
 */
export function generateAptSeq(
  regionCode: string,
  aptName: string,
  area: number
): string {
  const cleanAptName = cleanString(aptName).replace(/\s+/g, '');
  const areaStr = area.toFixed(2);
  return `${regionCode}-${cleanAptName}-${areaStr}`;
}

/**
 * 원시 데이터를 정제된 데이터로 변환
 */
export function parseAptTradeItem(
  rawItem: RawAptTradeItem
): ParsedAptTradeItem {
  const dealAmount = parseAmount(rawItem.거래금액?._text || '');
  const buildYear = parseBuildYear(rawItem.건축년도?._text || '');
  const aptName = cleanString(rawItem.아파트?._text || '');
  const exclusiveArea = parseArea(rawItem.전용면적?._text || '');
  const regionCode = cleanString(rawItem.지역코드?._text || '');

  const dealDate = formatDealDate(
    rawItem.년?._text || '',
    rawItem.월?._text || '',
    rawItem.일?._text || ''
  );

  const aptSeq = generateAptSeq(regionCode, aptName, exclusiveArea);

  return {
    dealAmount,
    buildYear,
    dealDate,
    aptName,
    exclusiveArea,
    jibun: cleanString(rawItem.지번?._text || ''),
    regionCode,
    floor: parseFloor(rawItem.층?._text || ''),
    dong: cleanString(rawItem.법정동?._text || ''),
    sigungu: cleanString(rawItem.시군구?._text || ''),
    roadName: cleanString(rawItem.도로명?._text || ''),
    aptSeq,
  };
}

/**
 * XML 응답을 파싱하여 정제된 데이터 배열 반환
 */
export function parseApiResponse(xmlData: string): ParsedAptTradeItem[] {
  try {
    const jsonData = xmlToJson(xmlData);

    // API 응답 구조 검증
    const typedData = jsonData as {
      response?: {
        body?: {
          items?: {
            item?: RawAptTradeItem | RawAptTradeItem[];
          };
        };
      };
    };

    if (!typedData?.response?.body?.items?.item) {
      // eslint-disable-next-line no-console
      console.warn('API 응답에 데이터가 없습니다.');
      return [];
    }

    const items = typedData.response!.body!.items!.item;

    // 단일 항목인 경우 배열로 변환
    const itemArray = Array.isArray(items) ? items : [items];

    // 각 항목을 정제된 형태로 변환
    return itemArray
      .map((rawItem: RawAptTradeItem) => {
        try {
          return parseAptTradeItem(rawItem);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('개별 항목 파싱 오류:', error, rawItem);
          return null;
        }
      })
      .filter((item): item is ParsedAptTradeItem => item !== null);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('API 응답 파싱 오류:', error);
    throw new Error(
      `데이터 파싱 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
    );
  }
}

/**
 * 여러 월의 데이터를 병합하여 반환
 */
export function mergeMonthlyData(xmlDataArray: string[]): ParsedAptTradeItem[] {
  const allData: ParsedAptTradeItem[] = [];

  for (const xmlData of xmlDataArray) {
    try {
      const monthlyData = parseApiResponse(xmlData);
      allData.push(...monthlyData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('월별 데이터 파싱 오류:', error);
    }
  }

  // 거래일 기준으로 최신순 정렬
  return allData.sort(
    (a, b) => new Date(b.dealDate).getTime() - new Date(a.dealDate).getTime()
  );
}

/**
 * 단지별 데이터 그룹화
 */
export function groupByApartment(
  data: ParsedAptTradeItem[]
): Record<string, ParsedAptTradeItem[]> {
  return data.reduce(
    (groups, item) => {
      const key = `${item.regionCode}-${item.aptName}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    },
    {} as Record<string, ParsedAptTradeItem[]>
  );
}

/**
 * 면적별 데이터 그룹화
 */
export function groupByArea(
  data: ParsedAptTradeItem[]
): Record<number, ParsedAptTradeItem[]> {
  return data.reduce(
    (groups, item) => {
      const area = item.exclusiveArea;
      if (!groups[area]) {
        groups[area] = [];
      }
      groups[area].push(item);
      return groups;
    },
    {} as Record<number, ParsedAptTradeItem[]>
  );
}
