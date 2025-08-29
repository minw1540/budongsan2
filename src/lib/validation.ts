/**
 * 입력값 검증 유틸리티
 * 사용자 입력 및 API 파라미터 검증 기능 제공
 */

/**
 * 검증 결과 타입
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * 지역코드 검증 (5자리 숫자)
 */
export function validateRegionCode(regionCode: string): ValidationResult {
  if (!regionCode) {
    return { isValid: false, error: '지역코드가 필요합니다.' };
  }

  if (typeof regionCode !== 'string') {
    return { isValid: false, error: '지역코드는 문자열이어야 합니다.' };
  }

  const trimmed = regionCode.trim();

  if (!/^\d{5}$/.test(trimmed)) {
    return { isValid: false, error: '지역코드는 5자리 숫자여야 합니다.' };
  }

  return { isValid: true };
}

/**
 * 계약년월 검증 (YYYYMM 형식)
 */
export function validateDealYearMonth(dealYmd: string): ValidationResult {
  if (!dealYmd) {
    return { isValid: false, error: '계약년월이 필요합니다.' };
  }

  if (typeof dealYmd !== 'string') {
    return { isValid: false, error: '계약년월은 문자열이어야 합니다.' };
  }

  const trimmed = dealYmd.trim();

  if (!/^\d{6}$/.test(trimmed)) {
    return {
      isValid: false,
      error: '계약년월은 YYYYMM 형식의 6자리 숫자여야 합니다.',
    };
  }

  const year = parseInt(trimmed.substring(0, 4), 10);
  const month = parseInt(trimmed.substring(4, 6), 10);

  const currentYear = new Date().getFullYear();

  if (year < 2000 || year > currentYear) {
    return {
      isValid: false,
      error: `년도는 2000년부터 ${currentYear}년까지 입력 가능합니다.`,
    };
  }

  if (month < 1 || month > 12) {
    return { isValid: false, error: '월은 01부터 12까지 입력 가능합니다.' };
  }

  return { isValid: true };
}

/**
 * 서비스 키 검증
 */
export function validateServiceKey(serviceKey: string): ValidationResult {
  if (!serviceKey) {
    return { isValid: false, error: '서비스 키가 필요합니다.' };
  }

  if (typeof serviceKey !== 'string') {
    return { isValid: false, error: '서비스 키는 문자열이어야 합니다.' };
  }

  const trimmed = serviceKey.trim();

  if (trimmed.length < 10) {
    return { isValid: false, error: '유효하지 않은 서비스 키입니다.' };
  }

  // 기본값인지 확인
  if (trimmed === 'YOUR_ENCODED_SERVICE_KEY_HERE') {
    return { isValid: false, error: '실제 서비스 키를 설정해주세요.' };
  }

  return { isValid: true };
}

/**
 * 페이지 번호 검증
 */
export function validatePageNumber(pageNo: number | string): ValidationResult {
  const page = typeof pageNo === 'string' ? parseInt(pageNo, 10) : pageNo;

  if (isNaN(page)) {
    return { isValid: false, error: '페이지 번호는 숫자여야 합니다.' };
  }

  if (page < 1) {
    return { isValid: false, error: '페이지 번호는 1 이상이어야 합니다.' };
  }

  if (page > 1000) {
    return { isValid: false, error: '페이지 번호는 1000 이하여야 합니다.' };
  }

  return { isValid: true };
}

/**
 * 결과 수 검증
 */
export function validateNumOfRows(
  numOfRows: number | string
): ValidationResult {
  const rows =
    typeof numOfRows === 'string' ? parseInt(numOfRows, 10) : numOfRows;

  if (isNaN(rows)) {
    return { isValid: false, error: '결과 수는 숫자여야 합니다.' };
  }

  if (rows < 1) {
    return { isValid: false, error: '결과 수는 1 이상이어야 합니다.' };
  }

  if (rows > 1000) {
    return { isValid: false, error: '결과 수는 1000 이하여야 합니다.' };
  }

  return { isValid: true };
}

/**
 * 아파트명 검증
 */
export function validateApartmentName(aptName: string): ValidationResult {
  if (!aptName) {
    return { isValid: false, error: '아파트명이 필요합니다.' };
  }

  if (typeof aptName !== 'string') {
    return { isValid: false, error: '아파트명은 문자열이어야 합니다.' };
  }

  const trimmed = aptName.trim();

  if (trimmed.length < 2) {
    return { isValid: false, error: '아파트명은 2글자 이상이어야 합니다.' };
  }

  if (trimmed.length > 50) {
    return { isValid: false, error: '아파트명은 50글자 이하여야 합니다.' };
  }

  return { isValid: true };
}

/**
 * 전용면적 검증
 */
export function validateExclusiveArea(area: number | string): ValidationResult {
  const areaNum = typeof area === 'string' ? parseFloat(area) : area;

  if (isNaN(areaNum)) {
    return { isValid: false, error: '전용면적은 숫자여야 합니다.' };
  }

  if (areaNum <= 0) {
    return { isValid: false, error: '전용면적은 0보다 커야 합니다.' };
  }

  if (areaNum > 1000) {
    return { isValid: false, error: '전용면적은 1000㎡ 이하여야 합니다.' };
  }

  return { isValid: true };
}

/**
 * 가격 범위 검증
 */
export function validatePriceRange(
  minPrice?: number,
  maxPrice?: number
): ValidationResult {
  if (minPrice !== undefined) {
    if (typeof minPrice !== 'number' || isNaN(minPrice)) {
      return { isValid: false, error: '최소 가격은 숫자여야 합니다.' };
    }

    if (minPrice < 0) {
      return { isValid: false, error: '최소 가격은 0 이상이어야 합니다.' };
    }
  }

  if (maxPrice !== undefined) {
    if (typeof maxPrice !== 'number' || isNaN(maxPrice)) {
      return { isValid: false, error: '최대 가격은 숫자여야 합니다.' };
    }

    if (maxPrice < 0) {
      return { isValid: false, error: '최대 가격은 0 이상이어야 합니다.' };
    }
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    if (minPrice > maxPrice) {
      return {
        isValid: false,
        error: '최소 가격은 최대 가격보다 작거나 같아야 합니다.',
      };
    }
  }

  return { isValid: true };
}

/**
 * 면적 범위 검증
 */
export function validateAreaRange(
  minArea?: number,
  maxArea?: number
): ValidationResult {
  if (minArea !== undefined) {
    const minResult = validateExclusiveArea(minArea);
    if (!minResult.isValid) {
      return { isValid: false, error: `최소 면적: ${minResult.error}` };
    }
  }

  if (maxArea !== undefined) {
    const maxResult = validateExclusiveArea(maxArea);
    if (!maxResult.isValid) {
      return { isValid: false, error: `최대 면적: ${maxResult.error}` };
    }
  }

  if (minArea !== undefined && maxArea !== undefined) {
    if (minArea > maxArea) {
      return {
        isValid: false,
        error: '최소 면적은 최대 면적보다 작거나 같아야 합니다.',
      };
    }
  }

  return { isValid: true };
}

/**
 * 건축년도 범위 검증
 */
export function validateBuildYearRange(
  minYear?: number,
  maxYear?: number
): ValidationResult {
  const currentYear = new Date().getFullYear();

  if (minYear !== undefined) {
    if (typeof minYear !== 'number' || isNaN(minYear)) {
      return { isValid: false, error: '최소 건축년도는 숫자여야 합니다.' };
    }

    if (minYear < 1900 || minYear > currentYear) {
      return {
        isValid: false,
        error: `최소 건축년도는 1900년부터 ${currentYear}년까지 입력 가능합니다.`,
      };
    }
  }

  if (maxYear !== undefined) {
    if (typeof maxYear !== 'number' || isNaN(maxYear)) {
      return { isValid: false, error: '최대 건축년도는 숫자여야 합니다.' };
    }

    if (maxYear < 1900 || maxYear > currentYear) {
      return {
        isValid: false,
        error: `최대 건축년도는 1900년부터 ${currentYear}년까지 입력 가능합니다.`,
      };
    }
  }

  if (minYear !== undefined && maxYear !== undefined) {
    if (minYear > maxYear) {
      return {
        isValid: false,
        error: '최소 건축년도는 최대 건축년도보다 작거나 같아야 합니다.',
      };
    }
  }

  return { isValid: true };
}

/**
 * 검색 키워드 검증
 */
export function validateSearchKeyword(keyword: string): ValidationResult {
  if (!keyword) {
    return { isValid: false, error: '검색 키워드가 필요합니다.' };
  }

  if (typeof keyword !== 'string') {
    return { isValid: false, error: '검색 키워드는 문자열이어야 합니다.' };
  }

  const trimmed = keyword.trim();

  if (trimmed.length < 1) {
    return { isValid: false, error: '검색 키워드는 1글자 이상이어야 합니다.' };
  }

  if (trimmed.length > 50) {
    return { isValid: false, error: '검색 키워드는 50글자 이하여야 합니다.' };
  }

  return { isValid: true };
}

/**
 * API 요청 파라미터 종합 검증
 */
export interface ApiParams {
  serviceKey: string;
  lawdCd: string;
  dealYmd: string;
  numOfRows?: number;
  pageNo?: number;
}

export function validateApiParams(params: ApiParams): ValidationResult {
  // 서비스 키 검증
  const serviceKeyResult = validateServiceKey(params.serviceKey);
  if (!serviceKeyResult.isValid) {
    return serviceKeyResult;
  }

  // 지역코드 검증
  const regionCodeResult = validateRegionCode(params.lawdCd);
  if (!regionCodeResult.isValid) {
    return regionCodeResult;
  }

  // 계약년월 검증
  const dealYmdResult = validateDealYearMonth(params.dealYmd);
  if (!dealYmdResult.isValid) {
    return dealYmdResult;
  }

  // 선택적 파라미터 검증
  if (params.numOfRows !== undefined) {
    const numOfRowsResult = validateNumOfRows(params.numOfRows);
    if (!numOfRowsResult.isValid) {
      return numOfRowsResult;
    }
  }

  if (params.pageNo !== undefined) {
    const pageNoResult = validatePageNumber(params.pageNo);
    if (!pageNoResult.isValid) {
      return pageNoResult;
    }
  }

  return { isValid: true };
}

/**
 * 검증 오류를 HTTP 응답으로 변환
 */
export function createValidationErrorResponse(error: string): Response {
  return new Response(
    JSON.stringify({
      error: 'Validation Error',
      message: error,
    }),
    {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
