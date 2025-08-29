/**
 * 국토교통부 API 클라이언트
 * 국토교통부 실거래가 API와의 통신을 담당하는 클라이언트 함수들
 */

/**
 * API 요청 파라미터 타입 정의
 */
export interface ApiRequestParams {
  serviceKey: string;
  lawdCd: string; // 지역코드 (5자리)
  dealYmd: string; // 계약월 (YYYYMM)
  numOfRows?: number; // 한 페이지 결과 수
  pageNo?: number; // 페이지 번호
}

/**
 * API 응답 기본 구조
 */
export interface ApiResponse<T> {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items?: {
        item: T[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

/**
 * 국토교통부 API 기본 설정
 */
const API_CONFIG = {
  BASE_URL: process.env['NEXT_PUBLIC_API_BASE_URL'] || '',
  DEFAULT_NUM_OF_ROWS: 100,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1초
} as const;

/**
 * API 요청 URL 생성
 */
export function buildApiUrl(params: ApiRequestParams): string {
  const baseUrl =
    API_CONFIG.BASE_URL || process.env['NEXT_PUBLIC_API_BASE_URL'] || '';
  const searchParams = new URLSearchParams({
    serviceKey: params.serviceKey,
    LAWD_CD: params.lawdCd,
    DEAL_YMD: params.dealYmd,
    numOfRows: String(params.numOfRows || API_CONFIG.DEFAULT_NUM_OF_ROWS),
    pageNo: String(params.pageNo || 1),
  });

  return `${baseUrl}/getRTMSDataSvcAptTradeDev?${searchParams.toString()}`;
}

/**
 * 서비스 키 URL 인코딩
 * 국토교통부 API는 반드시 URL 인코딩된 서비스 키를 사용해야 함
 */
export function encodeServiceKey(serviceKey: string): string {
  return encodeURIComponent(serviceKey);
}

/**
 * API 요청 지연 함수
 * Rate Limiting 방지를 위한 지연 처리
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * API 요청 함수 (재시도 로직 포함)
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = API_CONFIG.MAX_RETRIES
): Promise<Response> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/xml',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (retries > 0) {
      await delay(API_CONFIG.RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

/**
 * 국토교통부 API 호출
 */
export async function callRealEstateApi(
  params: ApiRequestParams
): Promise<string> {
  const url = buildApiUrl(params);

  try {
    const response = await fetchWithRetry(url);
    const xmlData = await response.text();

    if (!xmlData) {
      throw new Error('Empty response from API');
    }

    return xmlData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('API 호출 오류:', error);
    throw new Error(
      `국토교통부 API 호출 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
    );
  }
}

/**
 * 월별 범위 API 호출 (최근 1년 등)
 */
export async function callApiForDateRange(
  lawdCd: string,
  startYearMonth: string,
  endYearMonth: string,
  serviceKey: string
): Promise<string[]> {
  const results: string[] = [];
  const start = new Date(
    parseInt(startYearMonth.substring(0, 4)),
    parseInt(startYearMonth.substring(4, 6)) - 1
  );
  const end = new Date(
    parseInt(endYearMonth.substring(0, 4)),
    parseInt(endYearMonth.substring(4, 6)) - 1
  );

  const current = new Date(start);

  while (current <= end) {
    const yearMonth = `${current.getFullYear()}${String(current.getMonth() + 1).padStart(2, '0')}`;

    try {
      const xmlData = await callRealEstateApi({
        serviceKey,
        lawdCd,
        dealYmd: yearMonth,
      });

      results.push(xmlData);

      // Rate Limiting 방지를 위한 지연
      await delay(100);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`${yearMonth} 데이터 조회 실패:`, error);
    }

    current.setMonth(current.getMonth() + 1);
  }

  return results;
}

/**
 * API 응답 검증
 */
export function validateApiResponse(response: unknown): boolean {
  if (!response) return false;

  try {
    const apiResponse = response as {
      response?: {
        header?: {
          resultCode?: string;
        };
      };
    };

    return !!(
      apiResponse &&
      apiResponse.response &&
      apiResponse.response.header &&
      apiResponse.response.header.resultCode === '00'
    );
  } catch {
    return false;
  }
}

/**
 * API 오류 코드 해석
 */
export function interpretErrorCode(resultCode: string): string {
  const errorCodes: Record<string, string> = {
    '00': '정상',
    '03': '데이터 없음',
    '22': '서비스 요청 제한 횟수 초과',
    '30': '등록되지 않은 서비스키',
    '31': '기간만료된 서비스키',
    '32': '등록되지 않은 IP',
    '99': '기타 오류',
  };

  return errorCodes[resultCode] || `알 수 없는 오류 (코드: ${resultCode})`;
}
