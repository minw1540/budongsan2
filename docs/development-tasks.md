# 🏡 스마트 부동산 실거래가 조회 서비스 개발 작업 태스크

## 📋 프로젝트 개요

### 서비스명
스마트 부동산 실거래가 조회 서비스

### 핵심 목표
- **단순함과 신속함**: 로그인 없이 즉시 아파트 실거래가 정보 조회
- **핵심 기능 집중**: 검색과 확인에만 집중한 간소화된 사용자 경험
- **최신 기술 활용**: Next.js 기반의 빠른 페이지 로딩과 SEO 최적화

---

## ⚠️ 개발 유의사항

### 🔴 코딩 컨벤션 및 ESLint 엄수 사항
- **모든 코드는 반드시 프로젝트에 설정된 ESLint 규칙을 준수해야 합니다**
- **Prettier를 통한 코드 포맷팅을 모든 커밋 전에 실행해야 합니다**
- **TypeScript 타입 안정성을 위해 `any` 타입 사용을 금지합니다**
- **함수형 컴포넌트와 Hooks만 사용합니다 (클래스 컴포넌트 금지)**
- **네이밍 컨벤션을 엄격히 준수합니다** (camelCase, PascalCase, UPPER_SNAKE_CASE)

### 🎯 개발 원칙
- **YAGNI (You Ain't Gonna Need It)**: 불필요한 기능 구현 금지
- **단일 책임 원칙**: 모든 함수와 컴포넌트는 하나의 명확한 역할만 수행
- **가독성 우선**: 코드는 소설처럼 읽혀야 함

---

## 📝 작업 태스크

### Phase 1: 프로젝트 초기 설정 (우선순위: 최고)

#### 1.1 프로젝트 기초 설정
- [x] **Next.js 14 (App Router) 프로젝트 초기화**
- [x] **TypeScript 설정 및 tsconfig.json 구성**
- [x] **ESLint 설정 (우선순위 최고)**
  - Next.js 기본 ESLint 규칙 적용
  - TypeScript ESLint 규칙 추가
  - 커스텀 규칙 설정 (any 타입 금지 등)
- [x] **Prettier 설정 (우선순위 최고)**
  - 코딩 컨벤션에 맞는 포맷팅 규칙 설정
  - VSCode settings.json에 formatOnSave 활성화
- [x] **Git hooks 설정**
  - husky 초기화 및 설정
  - pre-commit hook: lint-staged로 ESLint 및 Prettier 체크
  - pre-push hook: TypeScript 컴파일 체크
  - package.json에 lint-staged 설정 추가

#### 1.2 핵심 의존성 패키지 설치
- [ ] **Tailwind CSS 설치 및 설정**
- [ ] **Shadcn/ui 컴포넌트 라이브러리 설정**
- [ ] **SWR 설치 (서버 상태 관리)**
- [ ] **Recharts 설치 (차트 라이브러리)**
- [ ] **xml-js 설치 (국토부 API XML 파싱)**
- [ ] **clsx 설치 (조건부 클래스 관리)**
- [ ] **husky 설치 (Git hooks 관리)**
- [ ] **lint-staged 설치 (staged 파일 린팅)**
- [ ] **@types/xml-js 설치 (TypeScript 타입 정의)**
- [ ] **@types/node 설치 (Node.js 타입 정의)**
- [ ] **lucide-react 설치 (아이콘 라이브러리)**

#### 1.3 환경 설정
- [x] **환경 변수 설정 (.env.local)**
  - 국토교통부 API 서비스 키 설정 (URL 인코딩 필수)
  - API Base URL: `http://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev`
  - NODE_ENV 환경별 분리 (development, production)
  - .env.example 파일 생성 (실제 키 값 제외)
- [x] **절대 경로 import 설정 (@ 별칭)**
- [x] **디렉터리 구조 생성 (코딩 컨벤션 준수)**
  ```
  /src
  ├── /app
  │   ├── /api
  │   │   ├── /search/route.ts
  │   │   ├── /autocomplete/route.ts
  │   │   ├── /regions/route.ts          // 지역 코드 조회
  │   │   ├── /complex/[aptSeq]/route.ts
  │   │   └── /transactions/route.ts
  │   ├── /complex/[aptSeq]
  │   │   ├── page.tsx
  │   │   └── /area/[areaId]/page.tsx
  │   ├── layout.tsx
  │   └── page.tsx
  ├── /components
  │   ├── /common       // 전역 공용 컴포넌트
  │   ├── /search       // 검색 페이지 관련
  │   ├── /complex      // 단지 상세 페이지 관련
  │   └── /charts       // 차트 관련 컴포넌트
  ├── /types
  │   └── apartment.ts  // 타입 정의
  └── /lib
      ├── utils.ts           // 유틸리티 함수
      ├── api-client.ts      // API 호출 함수
      ├── data-parser.ts     // XML/JSON 변환 함수
      └── validation.ts      // 입력값 검증 함수
  ```
- [x] **Package Manager를 yarn으로 설정**

### Phase 2: 타입 정의 및 데이터 모델 설계

#### 2.1 TypeScript 타입 정의
- [ ] **아파트 단지 정보 인터페이스 정의**
  ```typescript
  interface ApartmentComplex {
    aptSeq: string;
    aptName: string;
    address: string;
    representativeArea: number;
    latestPrice: number;
    buildYear: number;
  }
  ```
- [ ] **면적별 정보 인터페이스 정의**
  ```typescript
  interface AreaInfo {
    exclusiveArea: number;
    supplyArea: number;
    latestPrice: number;
    latestDealDate: string;
  }
  ```
- [ ] **거래 내역 인터페이스 정의**
  ```typescript
  interface Transaction {
    dealDate: string;
    price: number;
    floor: number;
  }
  ```
- [ ] **API 응답 타입 정의**
  ```typescript
  interface ApiResponse<T> {
    resultCode: string;
    resultMsg: string;
    data: T;
    pageInfo?: {
      pageNo: number;
      numOfRows: number;
      totalCount: number;
    };
  }
  ```
- [ ] **검색 필터 타입 정의**
  ```typescript
  interface SearchFilters {
    regionCode?: string;
    keyword?: string;
    priceRange?: [number, number];
    areaRange?: [number, number];
    buildYearRange?: [number, number];
  }
  ```
- [ ] **지역 코드 타입 정의**
  ```typescript
  interface RegionCode {
    code: string;
    name: string;
    parentCode?: string;
  }
  ```

#### 2.2 API 명세서 작성
- [ ] **/api/search 엔드포인트 명세**
  - Query Parameters: LAWD_CD(지역코드), DEAL_YMD(계약월), pageNo, numOfRows
  - Response: ApartmentComplex[] 배열 + 페이징 정보
- [ ] **/api/complex/[aptSeq] 엔드포인트 명세**
  - Path Parameter: aptSeq (예: 11110-2339)
  - Response: 단지 기본 정보 + AreaInfo[] 배열
- [ ] **/api/transactions 엔드포인트 명세**
  - Query Parameters: aptSeq, areaId, 기간 정보
  - Response: Transaction[] 배열 + 차트 데이터
- [ ] **에러 응답 형식 정의**
  - resultCode 기반 에러 처리 (01-32번 코드)
- [ ] **자동 완성 API 명세 (/api/autocomplete)**
- [ ] **페이징 처리 명세 (pageNo, numOfRows, totalCount)**

### Phase 3: API Routes 개발 (백엔드)

#### 3.1 국토교통부 API 연동
- [ ] **API 프록시 서버 구현**
  - 서비스 키 보안 처리 (환경 변수 사용)
  - 서비스 키 URL 인코딩 (매우 중요!)
  - Base URL: `http://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev`
  - 엔드포인트: `/getRTMSDataSvcAptTradeDev`
  - XML to JSON 변환 로직 (xml-js 라이브러리)
  - resultCode 체크 (00: 성공, 03: 데이터없음, 30: 잘못된 서비스키)
- [ ] **Rate Limiting 대응 로직**
  - TPS 30회 제한 고려
  - 평균 응답 시간: 500ms
  - SWR 캐싱 활용
  - 순차적 요청 로직 (지연 처리)
- [ ] **데이터 정제 및 가공 함수**
  - dealAmount: 콤마 제거 및 숫자 변환 ("12,000" -> 12000)
  - aptNm: 공백 제거 (trim) 처리  
  - buildYear: null/0 값 예외 처리
  - aptSeq: 지역코드-고유번호 형태 (11110-2339)
  - excluUseAr: 전용면적 숫자 변환
  - 모든 문자열 필드 trim() 처리

#### 3.2 API Routes 구현
- [ ] **/api/search route 구현**
  - 필수 파라미터: serviceKey, LAWD_CD, DEAL_YMD
  - 선택 파라미터: pageNo(기본값:1), numOfRows(기본값:10)
  - 지역 코드 기반 검색 (LAWD_CD 5자리)
  - 월 단위 조회 (DEAL_YMD YYYYMM 형식)
  - 최근 1년 데이터는 12번 API 호출 후 취합
  - 페이징 처리 (totalCount, pageNo, numOfRows)
- [ ] **/api/complex/[aptSeq] route 구현**
  - aptSeq 파라미터 검증 (11110-2339 형식)
  - 단지 기본 정보 + 면적별 정보 조회
- [ ] **/api/transactions route 구현**
  - 특정 면적 거래 내역 조회
  - 차트용 데이터 가공 (월별 평균가, 거래량)
- [ ] **/api/autocomplete route 구현**
  - 단지명 자동 완성 (aptNm 기반)
  - Debounce 고려한 응답
- [ ] **/api/regions route 구현**
  - 시/도 목록 조회
  - 시/군/구 목록 조회 (시/도 선택 시)
  - 지역 코드 매핑 테이블 관리

### Phase 4: 공통 컴포넌트 개발

#### 4.1 Layout 컴포넌트
- [ ] **Header 컴포넌트**
  - 서비스 로고
  - 메인 페이지 링크
- [ ] **Footer 컴포넌트**
  - 데이터 출처 표시
  - 기준 시점 표시
- [ ] **RootLayout 구성**

#### 4.2 UI 컴포넌트
- [ ] **LoadingSpinner 컴포넌트**
- [ ] **SkeletonUI 컴포넌트**
- [ ] **ErrorMessage 컴포넌트**
- [ ] **Tooltip 컴포넌트**
- [ ] **Button 컴포넌트 (Shadcn/ui 기반)**
- [ ] **Input 컴포넌트 (Shadcn/ui 기반)**

### Phase 5: 메인 검색 페이지 개발

#### 5.1 검색 컴포넌트
- [ ] **RegionSelector 컴포넌트**
  - 광역시/도 Dropdown
  - 시/군/구 Dropdown (동적 로딩)
  - 코딩 컨벤션 준수 (camelCase, 타입 안정성)
  - 지역 선택 시 해당 지역 코드 생성 (5자리)
- [ ] **SearchInput 컴포넌트**
  - placeholder: "검색하고 싶은 아파트 단지명을 입력하세요."
  - 자동 완성 기능 (API 연동)
  - Debounce 처리 (300ms)
  - 최근 검색 기록 (LocalStorage, 최대 5개)
- [ ] **FilterControls 컴포넌트**
  - 가격대 Range Slider (만원 단위)
  - 전용 면적 Range Slider (㎡ 단위)
  - 준공년도 Range Slider
  - 슬라이더 최소/최대 값 조절 가능

#### 5.2 결과 표시 컴포넌트
- [ ] **ResultsTable 컴포넌트**
  - 컬럼: 단지명, 주소, 대표 면적(㎡), 최근 거래가(만원), 준공년도
  - 행 클릭 시 /complex/[aptSeq]로 이동
  - '대표 면적' Tooltip: "최근 1년간 가장 많이 거래된 면적입니다."
  - 모바일: 768px 이하 시 카드 형태 또는 Sticky Column
- [ ] **EmptyState 컴포넌트**
  - 초기: "원하는 지역을 선택하거나 단지명을 검색해보세요."
  - 결과 없음: "검색 결과가 없습니다. 조건을 변경하여 다시 시도해보세요."
- [ ] **ErrorState 컴포넌트**
  - "데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
  - 재시도 버튼 포함

#### 5.3 페이지 통합
- [ ] **메인 검색 페이지 (/page.tsx) 구성**
- [ ] **SWR 데이터 fetching 로직**
- [ ] **상태 관리 (검색 조건, 결과)**

### Phase 6: 단지 상세 페이지 개발

#### 6.1 상세 정보 컴포넌트
- [ ] **ComplexInfo 컴포넌트**
  - 단지 기본 정보 표시
  - 주소, 세대수, 준공년도 등
- [ ] **AreaTable 컴포넌트**
  - 면적별 정보 테이블
  - 행 클릭 이벤트
- [ ] **BackButton 컴포넌트**

#### 6.2 페이지 구성
- [ ] **단지 상세 페이지 (/complex/[aptSeq]/page.tsx)**
- [ ] **동적 라우팅 처리**
- [ ] **SSR/SSG 최적화 고려**

### Phase 7: 실거래가 분석 페이지 개발

#### 7.1 차트 컴포넌트
- [ ] **PriceTrendChart 컴포넌트 (Recharts 기반)**
  - 꺾은선 그래프
  - Tooltip 인터랙션
  - 반응형 차트
- [ ] **VolumeChart 컴포넌트**
  - 막대그래프
  - 거래량 표시

#### 7.2 거래 내역 컴포넌트
- [ ] **TransactionHistoryTable 컴포넌트**
  - 정렬 기능
  - 페이지네이션 (필요 시)

#### 7.3 페이지 구성
- [ ] **분석 페이지 (/complex/[aptSeq]/area/[areaId]/page.tsx)**
- [ ] **차트 데이터 가공 로직**

### Phase 8: 반응형 웹 및 UX 최적화

#### 8.1 반응형 디자인 (Mobile First 접근)
- [ ] **모바일 최적화**
  - Sticky Column 구현 (단지명, 가격 고정)
  - 터치 인터랙션 최적화
  - 768px 이하에서 테이블 → 카드 형태 전환
- [ ] **태블릿 레이아웃 최적화**
- [ ] **PC 레이아웃 최적화**
- [ ] **디자인 토큰 적용 (색상, 폰트, 간격)**

#### 8.2 성능 최적화
- [ ] **SSR/SSG 최적화 고려**
- [ ] **Code Splitting 적용**
- [ ] **SEO 메타데이터 설정**
- [ ] **Loading States 최적화 (스켈레톤 UI)**
- [ ] **데이터 캐싱 전략 구현**
  - SWR 캐시 TTL 설정 (1시간)
  - 지역 코드 정적 캐싱
  - 자주 조회되는 단지 정보 캐싱
- [ ] **Vercel Analytics 설정**

### Phase 9: 에러 처리 및 예외 상황 대응

#### 9.1 에러 핸들링
- [ ] **API 오류 처리 (상세 에러 코드 대응)**
  - **01-05번**: 서버 측 오류 → "서비스 제공기관 문의" 메시지
  - **10-12번**: 파라미터 오류 → 요청 파라미터 재검증
  - **20번**: 서비스 접근 거부 → 활용승인 상태 확인 안내
  - **22번**: 일일 트래픽 초과 → "일일 사용량 초과" 안내
  - **30번**: 잘못된 서비스키 → URL 인코딩 재확인
  - **31번**: 기간 만료 서비스키 → 연장신청 안내
  - **32번**: 도메인/IP 불일치 → 등록 정보 확인 안내
- [ ] **사용자 친화적 에러 메시지**
  - "현재 외부 데이터 시스템 점검으로 서비스 이용이 원활하지 않을 수 있습니다."
- [ ] **Fallback UI 구현**
  - SWR error 상태 감지
  - 에러 페이지 및 재시도 기능

#### 9.2 예외 상황 처리
- [ ] **데이터 없음 상태 처리**
  - buildYear null/0 값 → "정보 없음" 표시
- [ ] **로딩 시간 초과 처리**
- [ ] **브라우저 호환성 고려**

### Phase 10: 테스트 및 품질 보증

#### 10.1 테스트 환경 설정
- [ ] **Jest 및 Testing Library 설치**
  - @testing-library/react
  - @testing-library/jest-dom
  - jest-environment-jsdom
- [ ] **테스트 설정 파일 구성**
  - jest.config.js
  - test setup 파일

#### 10.2 테스트 코드 작성
- [ ] **컴포넌트 단위 테스트**
  - 각 컴포넌트의 렌더링 테스트
  - 사용자 인터랙션 테스트
  - Props 전달 테스트
- [ ] **API Routes 테스트**
  - 국토교통부 API 프록시 테스트
  - 에러 핸들링 테스트
  - 데이터 변환 로직 테스트
- [ ] **유틸리티 함수 테스트**
  - 데이터 파싱 함수 테스트
  - 검증 함수 테스트

#### 10.3 코드 품질 검증
- [ ] **ESLint 규칙 100% 준수 확인**
- [ ] **TypeScript 타입 에러 제거**
- [ ] **Prettier 포맷팅 적용 확인**
- [ ] **테스트 커버리지 80% 이상 달성**
- [ ] **코드 리뷰 체크리스트 작성**

### Phase 11: 배포 및 모니터링

#### 11.1 배포 준비
- [ ] **환경 변수 설정 (Vercel)**
  - 국토교통부 API 서비스 키 (URL 인코딩된 상태)
- [ ] **빌드 최적화**
- [ ] **성능 측정 및 최적화**

#### 11.2 배포 및 모니터링
- [ ] **Vercel 배포**
  - Git 저장소 연결
  - 자동 CI/CD 파이프라인 구축
  - API Routes → 서버리스 함수 자동 배포
- [ ] **Vercel Analytics 설정**
  - 방문자 수 및 성능 지표 수집
- [ ] **에러 모니터링 설정**

---

## 🔍 개발 체크리스트

### 매 커밋 전 필수 확인사항
- [ ] ESLint 규칙 위반 없음
- [ ] Prettier 포맷팅 적용됨
- [ ] TypeScript 컴파일 에러 없음
- [ ] 테스트 코드 통과
- [ ] 코딩 컨벤션 준수 확인
- [ ] Git hook 정상 작동 확인
- [ ] 빌드 에러 없음 (npm run build)

### 컴포넌트 개발 시 필수 확인사항
- [ ] Props 인터페이스 정의됨
- [ ] 타입 안정성 확보됨 (any 타입 사용 금지)
- [ ] 단일 책임 원칙 준수
- [ ] 네이밍 컨벤션 준수 (PascalCase)
- [ ] 재사용 가능한 구조로 설계됨

### API 개발 시 필수 확인사항
- [ ] 에러 핸들링 구현됨 (resultCode 01-32번 체크)
- [ ] 타입 안정성 확보됨
- [ ] 보안 고려사항 적용됨 (API 키 보호, URL 인코딩)
- [ ] 성능 최적화 적용됨 (캐싱, Rate Limiting TPS 30회)
- [ ] 데이터 정제 처리됨 (콤마 제거, trim, null 처리)
- [ ] 페이징 처리 구현됨 (pageNo, numOfRows, totalCount)
- [ ] XML 응답 JSON 변환 확인됨

---

## 📚 참고 문서
- [프로젝트 기능 명세서](./docs/functional-specification.md)
- [기술 스택 문서](./docs/tech-stack.md)
- [코딩 컨벤션](./docs/coding-convention.md)
- [API 연동 가이드](./docs/api-integration-guide.md)
- [화면 설계서](./docs/wireframe.md)
- [PDF 기술 문서](./docs/pdf-technical-documents.md)

---

## 🔗 국토교통부 API 상세 필드 정보

### 주요 API 응답 필드 (PDF 기술문서 기준)
```typescript
interface RTMSApiResponse {
  // 헤더 정보
  resultCode: string;        // 결과코드 (00: 성공)
  resultMsg: string;         // 결과메시지
  numOfRows: number;         // 한 페이지 결과 수
  pageNo: number;           // 페이지 번호
  totalCount: number;       // 전체 결과 수
  
  // 위치 정보
  sggCd: string;            // 법정동시군구코드
  umdCd: string;            // 법정동읍면동코드
  umdNm: string;            // 법정동명
  jibun: string;            // 지번
  
  // 도로명 주소 정보
  roadNm: string;           // 도로명
  roadNmSggCd: string;      // 도로명시군구코드
  roadNmBonbun: string;     // 도로명건물본번호코드
  roadNmBubun: string;      // 도로명건물부번호코드
  
  // 아파트 정보
  aptNm: string;            // 단지명
  aptSeq: string;           // 단지 일련번호 (11110-2339)
  aptDong: string;          // 아파트 동명
  excluUseAr: string;       // 전용면적
  floor: string;            // 층
  buildYear: string;        // 건축년도
  
  // 거래 정보
  dealYear: string;         // 계약년도
  dealMonth: string;        // 계약월
  dealDay: string;          // 계약일
  dealAmount: string;       // 거래금액 (만원, 콤마 포함)
  
  // 거래 상세 정보
  dealingGbn: string;       // 거래유형 (중개거래/직거래)
  cdealType: string;        // 해제여부
  cdealDay: string;         // 해제사유발생일
  slerGbn: string;          // 매도자 (개인/법인/공공기관/기타)
  buyerGbn: string;         // 매수자 (개인/법인/공공기관/기타)
  
  // 기타 정보
  estateAgentSggNm: string; // 중개사소재지 (시군구단위)
  rgstDate: string;         // 등기일자
  landLeaseholdGbn: string; // 토지임대부 아파트 여부 (Y/N)
}
```

### API 에러 코드 상세 대응표
| 코드 | 설명 | 조치방안 |
|------|------|----------|
| 01 | Application Error | 제공기관 서비스 상태 불안정 |
| 02 | DB Error | 제공기관 데이터베이스 오류 |
| 03 | No Data | 조회 조건에 해당하는 데이터 없음 |
| 04 | HTTP Error | HTTP 통신 오류 |
| 05 | Service Timeout | 서비스 응답 시간 초과 |
| 10 | 잘못된 요청 파라미터 | ServiceKey 파라미터 누락 |
| 11 | 필수 파라미터 누락 | LAWD_CD, DEAL_YMD 확인 |
| 12 | 폐기된 서비스 | API URL 재확인 |
| 20 | 서비스 접근 거부 | 활용승인 상태 확인 |
| 22 | 일일 사용량 초과 | 트래픽 제한 초과 |
| 30 | 잘못된 서비스키 | URL 인코딩 재확인 |
| 31 | 기간 만료 서비스키 | 연장신청 필요 |
| 32 | 도메인/IP 불일치 | 등록 정보 재확인 |

---

## ⏰ 예상 개발 일정
- **Phase 1-2**: 2-3일 (프로젝트 설정 및 설계)
- **Phase 3-4**: 3-4일 (API 및 공통 컴포넌트)
- **Phase 5**: 2-3일 (메인 검색 페이지)
- **Phase 6**: 1-2일 (단지 상세 페이지)
- **Phase 7**: 2-3일 (분석 페이지)
- **Phase 8-9**: 2-3일 (최적화 및 에러 처리)
- **Phase 10-11**: 2-3일 (테스트 및 배포)

**총 예상 기간: 2-3주**

### 🎯 마일스톤
- **Week 1**: Phase 1-4 완료 (기반 설정 + API 연동)
- **Week 2**: Phase 5-7 완료 (주요 페이지 개발)
- **Week 3**: Phase 8-11 완료 (최적화 + 테스트 + 배포)

---

## 🚨 중요 알림

**이 프로젝트는 코딩 컨벤션과 ESLint 규칙을 절대적으로 준수해야 합니다. 모든 코드는 팀에서 정의한 품질 기준을 만족해야 하며, 이를 위반하는 코드는 절대 허용되지 않습니다.**

**🚫 Mock API 절대 금지: 개발 과정에서 절대 Mock API나 가짜 데이터를 생성하지 마세요. 반드시 실제 국토교통부 API를 사용해야 합니다.**

**📞 외부 연동 즉시 보고: API 키, 도메인 등록, 승인 절차 등 외부 도움이 필요한 모든 상황에서는 작업을 중단하고 즉시 보고하세요.**

**개발 진행 시 문서를 자주 참조하고, 불분명한 부분은 즉시 팀과 논의하여 일관성 있는 개발을 진행해야 합니다.**

---

## ⚠️ 개발 시 주의사항

### 🚫 Mock API 생성 금지
- **절대 Mock API나 가짜 데이터를 생성하지 마세요**
- **실제 국토교통부 API와의 연동만 허용됩니다**
- 개발 및 테스트 시에도 반드시 실제 API를 사용해야 합니다

### 📞 외부 연동 필수 보고 사항
- **국토교통부 API 서비스 키가 필요한 경우 즉시 보고**
- **외부 API 연동에 문제가 발생한 경우 즉시 보고**
- **API 키 발급, 도메인 등록, 승인 절차 등 외부 도움이 필요한 모든 상황에서 보고**
- **API 응답 형식이나 문서와 다른 경우 즉시 보고**

### 💻 개발 환경 필수 사항
- **Node.js 18+ 버전 사용 (권장: LTS 최신 버전)**
- **yarn 패키지 매니저 사용 (npm 사용 금지)**
- **VSCode + 권장 확장 프로그램 설치**
  - ESLint
  - Prettier - Code formatter
  - TypeScript Importer
  - Tailwind CSS IntelliSense

### 🔒 보안 고려사항
- API 키는 절대 클라이언트에 노출되지 않도록 주의
- 환경 변수는 반드시 서버 사이드에서만 접근
- CORS 설정 및 Rate Limiting 적용

### 📊 성능 고려사항
- API 호출 최소화 (SWR 캐싱 적극 활용)
- 대용량 데이터 페이지네이션 필수
- 이미지 최적화 및 지연 로딩 적용

### 🔄 데이터 동기화
- 국토부 API 데이터 갱신 주기 (일 1회) 고려
- 캐시 무효화 전략 수립
- 실시간성보다 정확성 우선

### 🌐 브라우저 호환성
- 최신 2개 버전의 주요 브라우저 지원
- Polyfill 필요 시 검토 및 적용
