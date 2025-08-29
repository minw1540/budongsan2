/**
 * 스마트 부동산 실거래가 조회 서비스 타입 정의
 * 프로젝트 전반에서 사용될 핵심 데이터 타입들
 */

// ================== API 응답 관련 타입 ==================

/**
 * /api/search 응답 결과의 단지 정보
 */
export interface ApartmentComplex {
  aptSeq: string; // 아파트 일련번호 (지역코드-고유번호)
  aptName: string; // 아파트명
  address: string; // 주소
  representativeArea: number; // 대표 면적 (㎡) - 최근 1년간 가장 많이 거래된 면적
  latestPrice: number; // 최근 거래가 (만원)
  buildYear: number; // 준공년도
  totalCount: number; // 총 거래 건수
  dong: string; // 법정동
  sigungu: string; // 시군구
}

/**
 * /api/complex/[aptSeq] 응답 결과의 면적별 정보
 */
export interface AreaInfo {
  exclusiveArea: number; // 전용면적 (㎡)
  supplyArea: number; // 공급면적 (㎡)
  latestPrice: number; // 최신 실거래가 (만원)
  latestDealDate: string; // 최신 거래일 (YYYY-MM-DD)
  transactionCount: number; // 거래 건수
  avgPrice: number; // 평균 거래가 (만원)
  minPrice: number; // 최저 거래가 (만원)
  maxPrice: number; // 최고 거래가 (만원)
}

/**
 * 거래 내역 정보
 */
export interface Transaction {
  dealDate: string; // 거래일 (YYYY-MM-DD)
  price: number; // 거래 가격 (만원)
  floor: number | null; // 층수
  exclusiveArea: number; // 전용면적 (㎡)
  aptName: string; // 아파트명
  jibun: string; // 지번
  dong: string; // 법정동
}

/**
 * 단지 상세 정보
 */
export interface ComplexInfo {
  aptSeq: string; // 아파트 일련번호
  aptName: string; // 아파트명
  address: string; // 주소
  buildYear: number | null; // 준공년도
  totalHouseholds: number; // 총 세대수 (추정)
  regionCode: string; // 지역코드
  dong: string; // 법정동
  sigungu: string; // 시군구
  roadName: string; // 도로명
  areas: AreaInfo[]; // 면적별 정보 목록
}

// ================== 검색 및 필터 관련 타입 ==================

/**
 * 검색 필터 조건
 */
export interface SearchFilters {
  regionCode?: string; // 지역코드 (5자리)
  keyword?: string; // 검색 키워드 (아파트명)
  minPrice?: number; // 최소 가격 (만원)
  maxPrice?: number; // 최대 가격 (만원)
  minArea?: number; // 최소 전용면적 (㎡)
  maxArea?: number; // 최대 전용면적 (㎡)
  minBuildYear?: number; // 최소 준공년도
  maxBuildYear?: number; // 최대 준공년도
  dealYmd?: string; // 거래년월 (YYYYMM)
}

/**
 * 페이지네이션 정보
 */
export interface PaginationInfo {
  page: number; // 현재 페이지
  limit: number; // 페이지당 결과 수
  total: number; // 전체 결과 수
  totalPages: number; // 전체 페이지 수
  hasNext: boolean; // 다음 페이지 존재 여부
  hasPrev: boolean; // 이전 페이지 존재 여부
}

/**
 * 검색 결과
 */
export interface SearchResult {
  items: ApartmentComplex[]; // 검색된 아파트 목록
  pagination: PaginationInfo; // 페이지네이션 정보
  filters: SearchFilters; // 적용된 필터
}

// ================== 차트 및 분석 관련 타입 ==================

/**
 * 차트 데이터 포인트
 */
export interface ChartDataPoint {
  date: string; // 날짜 (YYYY-MM 또는 YYYY-MM-DD)
  value: number; // 값
  count?: number; // 거래 건수
  label?: string; // 라벨
}

/**
 * 시세 변동 차트 데이터
 */
export interface PriceTrendData {
  data: ChartDataPoint[]; // 차트 데이터
  period: 'monthly' | 'quarterly' | 'yearly'; // 기간 단위
  aptSeq: string; // 아파트 일련번호
  area: number; // 전용면적
}

/**
 * 거래량 차트 데이터
 */
export interface VolumeChartData {
  data: ChartDataPoint[]; // 차트 데이터
  period: 'monthly' | 'quarterly' | 'yearly'; // 기간 단위
  aptSeq: string; // 아파트 일련번호
  area?: number; // 전용면적 (선택적)
}

// ================== 지역 정보 관련 타입 ==================

/**
 * 시도 정보
 */
export interface SidoInfo {
  code: string; // 시도코드 (2자리)
  name: string; // 시도명
}

/**
 * 시군구 정보
 */
export interface SigunguInfo {
  code: string; // 시군구코드 (5자리)
  name: string; // 시군구명
  sidoCode: string; // 소속 시도코드
}

/**
 * 법정동 정보
 */
export interface DongInfo {
  code: string; // 법정동코드 (10자리)
  name: string; // 법정동명
  sigunguCode: string; // 소속 시군구코드
}

// ================== API 요청/응답 관련 타입 ==================

/**
 * API 기본 응답 구조
 */
export interface ApiResponse<T> {
  success: boolean; // 성공 여부
  data?: T; // 응답 데이터
  error?: string; // 오류 메시지
  message?: string; // 추가 메시지
}

/**
 * 자동완성 응답
 */
export interface AutocompleteResponse {
  suggestions: string[]; // 추천 검색어 목록
  keyword: string; // 입력된 키워드
}

/**
 * 지역 목록 응답
 */
export interface RegionResponse {
  sido: SidoInfo[]; // 시도 목록
  sigungu?: SigunguInfo[]; // 시군구 목록 (특정 시도 선택 시)
}

// ================== 유틸리티 타입 ==================

/**
 * 로딩 상태
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * 정렬 옵션
 */
export type SortOption =
  | 'name-asc' // 이름 오름차순
  | 'name-desc' // 이름 내림차순
  | 'price-asc' // 가격 오름차순
  | 'price-desc' // 가격 내림차순
  | 'date-asc' // 날짜 오름차순
  | 'date-desc' // 날짜 내림차순
  | 'area-asc' // 면적 오름차순
  | 'area-desc'; // 면적 내림차순

/**
 * 차트 타입
 */
export type ChartType = 'line' | 'bar' | 'area';

/**
 * 데이터 기간
 */
export type DataPeriod =
  | '3months'
  | '6months'
  | '1year'
  | '2years'
  | '3years'
  | 'all';

// ================== 컴포넌트 Props 관련 타입 ==================

/**
 * 검색 입력 컴포넌트 Props
 */
export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (keyword: string) => void;
  placeholder?: string;
  suggestions?: string[];
  isLoading?: boolean;
}

/**
 * 필터 컨트롤 컴포넌트 Props
 */
export interface FilterControlsProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onReset: () => void;
}

/**
 * 결과 테이블 컴포넌트 Props
 */
export interface ResultsTableProps {
  data: ApartmentComplex[];
  loading?: boolean;
  sortBy?: SortOption;
  onSortChange?: (sort: SortOption) => void;
  onRowClick?: (aptSeq: string) => void;
}

/**
 * 차트 컴포넌트 Props
 */
export interface ChartProps {
  data: ChartDataPoint[];
  type: ChartType;
  title?: string;
  height?: number;
  showTooltip?: boolean;
  onDataPointClick?: (point: ChartDataPoint) => void;
}
