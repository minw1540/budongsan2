/**
 * lib 폴더 함수들의 단위 테스트
 * 목적: api-client, data-parser, validation 함수들의 동작 검증
 */

import { describe, test, expect, beforeEach } from '@jest/globals';

// data-parser 함수들 테스트
describe('data-parser.ts 함수 테스트', () => {
  // 동적 import를 사용하여 모듈 로드
  let dataParser: typeof import('../src/lib/data-parser');

  beforeEach(async () => {
    dataParser = await import('../src/lib/data-parser');
  });

  describe('parseAmount 함수', () => {
    test('콤마가 포함된 금액 문자열을 숫자로 변환', () => {
      expect(dataParser.parseAmount('12,000')).toBe(12000);
      expect(dataParser.parseAmount('1,500')).toBe(1500);
      expect(dataParser.parseAmount('50,000')).toBe(50000);
    });

    test('빈 문자열이나 null 처리', () => {
      expect(dataParser.parseAmount('')).toBe(0);
      expect(dataParser.parseAmount(null)).toBe(0);
      expect(dataParser.parseAmount(undefined)).toBe(0);
    });

    test('잘못된 형식의 문자열 처리', () => {
      expect(dataParser.parseAmount('abc')).toBe(0);
      expect(dataParser.parseAmount('12.5abc')).toBe(12);
    });
  });

  describe('parseBuildYear 함수', () => {
    test('유효한 건축년도 파싱', () => {
      expect(dataParser.parseBuildYear('2020')).toBe(2020);
      expect(dataParser.parseBuildYear('1990')).toBe(1990);
    });

    test('유효하지 않은 건축년도는 null 반환', () => {
      expect(dataParser.parseBuildYear('0')).toBe(null);
      expect(dataParser.parseBuildYear('1800')).toBe(null);
      expect(dataParser.parseBuildYear('3000')).toBe(null);
      expect(dataParser.parseBuildYear('')).toBe(null);
    });
  });

  describe('parseArea 함수', () => {
    test('전용면적 파싱', () => {
      expect(dataParser.parseArea('84.99')).toBe(84.99);
      expect(dataParser.parseArea('102.5')).toBe(102.5);
      expect(dataParser.parseArea('120')).toBe(120);
    });

    test('잘못된 면적 데이터 처리', () => {
      expect(dataParser.parseArea('')).toBe(0);
      expect(dataParser.parseArea('abc')).toBe(0);
    });
  });

  describe('formatDealDate 함수', () => {
    test('거래일 포맷팅 (YYYY-MM-DD)', () => {
      expect(dataParser.formatDealDate('2024', '1', '15')).toBe('2024-01-15');
      expect(dataParser.formatDealDate('2023', '12', '5')).toBe('2023-12-05');
    });

    test('빈 값이나 누락된 값 처리', () => {
      expect(dataParser.formatDealDate('2024', '', '')).toBe('2024-01-01');
      expect(dataParser.formatDealDate('', '5', '10')).toBe('-05-10');
    });
  });

  describe('cleanString 함수', () => {
    test('문자열 트림 및 정제', () => {
      expect(dataParser.cleanString('  test  ')).toBe('test');
      expect(dataParser.cleanString('아파트명')).toBe('아파트명');
    });

    test('빈 문자열이나 null 처리', () => {
      expect(dataParser.cleanString('')).toBe('');
      expect(dataParser.cleanString(null)).toBe('');
      expect(dataParser.cleanString(undefined)).toBe('');
    });
  });

  describe('generateAptSeq 함수', () => {
    test('아파트 일련번호 생성', () => {
      const result = dataParser.generateAptSeq('11110', '래미안테스트', 84.99);
      expect(result).toBe('11110-래미안테스트-84.99');
    });

    test('공백이 포함된 아파트명 처리', () => {
      const result = dataParser.generateAptSeq(
        '11110',
        '래미안 테스트 아파트',
        84.99
      );
      expect(result).toBe('11110-래미안테스트아파트-84.99');
    });
  });
});

// validation 함수들 테스트
describe('validation.ts 함수 테스트', () => {
  let validation: typeof import('../src/lib/validation');

  beforeEach(async () => {
    validation = await import('../src/lib/validation');
  });

  describe('validateRegionCode 함수', () => {
    test('유효한 지역코드 검증', () => {
      const result = validation.validateRegionCode('11110');
      expect(result.isValid).toBe(true);
    });

    test('잘못된 지역코드 검증', () => {
      const result1 = validation.validateRegionCode('1111'); // 4자리
      expect(result1.isValid).toBe(false);
      expect(result1.error).toContain('5자리 숫자');

      const result2 = validation.validateRegionCode('abc12');
      expect(result2.isValid).toBe(false);
    });

    test('빈 지역코드 검증', () => {
      const result = validation.validateRegionCode('');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('지역코드가 필요');
    });
  });

  describe('validateDealYearMonth 함수', () => {
    test('유효한 계약년월 검증', () => {
      const result = validation.validateDealYearMonth('202412');
      expect(result.isValid).toBe(true);
    });

    test('잘못된 월 검증', () => {
      const result = validation.validateDealYearMonth('202413');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('01부터 12까지');
    });

    test('잘못된 년도 검증', () => {
      const result = validation.validateDealYearMonth('199912');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('2000년부터');
    });

    test('잘못된 형식 검증', () => {
      const result = validation.validateDealYearMonth('2024/12');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('YYYYMM 형식');
    });
  });

  describe('validateServiceKey 함수', () => {
    test('유효한 서비스 키 검증', () => {
      const result = validation.validateServiceKey('validServiceKey123456');
      expect(result.isValid).toBe(true);
    });

    test('기본값 서비스 키 검증', () => {
      const result = validation.validateServiceKey(
        'YOUR_ENCODED_SERVICE_KEY_HERE'
      );
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('실제 서비스 키');
    });

    test('너무 짧은 서비스 키 검증', () => {
      const result = validation.validateServiceKey('short');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('유효하지 않은');
    });
  });

  describe('validatePageNumber 함수', () => {
    test('유효한 페이지 번호 검증', () => {
      const result1 = validation.validatePageNumber(1);
      expect(result1.isValid).toBe(true);

      const result2 = validation.validatePageNumber('10');
      expect(result2.isValid).toBe(true);
    });

    test('유효하지 않은 페이지 번호 검증', () => {
      const result1 = validation.validatePageNumber(0);
      expect(result1.isValid).toBe(false);

      const result2 = validation.validatePageNumber(1001);
      expect(result2.isValid).toBe(false);

      const result3 = validation.validatePageNumber('abc');
      expect(result3.isValid).toBe(false);
    });
  });

  describe('validatePriceRange 함수', () => {
    test('유효한 가격 범위 검증', () => {
      const result = validation.validatePriceRange(10000, 50000);
      expect(result.isValid).toBe(true);
    });

    test('최소값이 최대값보다 큰 경우', () => {
      const result = validation.validatePriceRange(50000, 10000);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('작거나 같아야');
    });

    test('음수 가격 검증', () => {
      const result = validation.validatePriceRange(-1000, 50000);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('0 이상');
    });
  });

  describe('validateApartmentName 함수', () => {
    test('유효한 아파트명 검증', () => {
      const result = validation.validateApartmentName('래미안테스트');
      expect(result.isValid).toBe(true);
    });

    test('너무 짧은 아파트명', () => {
      const result = validation.validateApartmentName('A');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('2글자 이상');
    });

    test('너무 긴 아파트명', () => {
      const longName = 'A'.repeat(51);
      const result = validation.validateApartmentName(longName);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('50글자 이하');
    });
  });
});

// api-client 함수들 테스트
describe('api-client.ts 함수 테스트', () => {
  let apiClient: typeof import('../src/lib/api-client');

  beforeEach(async () => {
    apiClient = await import('../src/lib/api-client');
  });

  describe('buildApiUrl 함수', () => {
    test('API URL 생성', () => {
      // 환경변수 모킹
      process.env.NEXT_PUBLIC_API_BASE_URL = 'http://test-api.com';

      const params = {
        serviceKey: 'testKey',
        lawdCd: '11110',
        dealYmd: '202412',
      };

      const url = apiClient.buildApiUrl(params);
      expect(url).toContain('http://test-api.com');
      expect(url).toContain('serviceKey=testKey');
      expect(url).toContain('LAWD_CD=11110');
      expect(url).toContain('DEAL_YMD=202412');
    });
  });

  describe('encodeServiceKey 함수', () => {
    test('서비스 키 URL 인코딩', () => {
      const encoded = apiClient.encodeServiceKey('test+key=value');
      expect(encoded).toBe('test%2Bkey%3Dvalue');
    });
  });

  describe('delay 함수', () => {
    test('지연 함수 동작', async () => {
      const start = Date.now();
      await apiClient.delay(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(90); // 약간의 오차 허용
    });
  });

  describe('validateApiResponse 함수', () => {
    test('유효한 API 응답 검증', () => {
      const validResponse = {
        response: {
          header: {
            resultCode: '00',
          },
        },
      };

      expect(apiClient.validateApiResponse(validResponse)).toBe(true);
    });

    test('유효하지 않은 API 응답 검증', () => {
      const invalidResponse = {
        response: {
          header: {
            resultCode: '99',
          },
        },
      };

      expect(apiClient.validateApiResponse(invalidResponse)).toBe(false);
    });

    test('구조가 잘못된 응답 검증', () => {
      expect(apiClient.validateApiResponse(null)).toBe(false);
      expect(apiClient.validateApiResponse({})).toBe(false);
    });
  });

  describe('interpretErrorCode 함수', () => {
    test('알려진 오류 코드 해석', () => {
      expect(apiClient.interpretErrorCode('00')).toBe('정상');
      expect(apiClient.interpretErrorCode('03')).toBe('데이터 없음');
      expect(apiClient.interpretErrorCode('30')).toBe('등록되지 않은 서비스키');
    });

    test('알려지지 않은 오류 코드 해석', () => {
      const result = apiClient.interpretErrorCode('99');
      expect(result).toBe('기타 오류');

      const unknownResult = apiClient.interpretErrorCode('55');
      expect(unknownResult).toContain('알 수 없는 오류');
      expect(unknownResult).toContain('55');
    });
  });
});
