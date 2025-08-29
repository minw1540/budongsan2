🏡 개발팀을 위한 추가 산출물 정의서
문서 목적: 본 문서는 개발팀의 효율적인 협업과 코드 품질 유지를 위해 필요한 API 명세 및 개발 워크플로우를 정의합니다. 모든 개발자는 본 문서를 숙지하고 개발에 임합니다.

1. API 명세서 (API Specification)
역할: 프론트엔드와 백엔드(Next.js API Routes) 간의 데이터 통신 규약을 정의하는 **'움직이는 설계도'**입니다. 이 명세서를 통해 각자 독립적으로 개발을 진행하고, 정해진 규격에 맞춰 원활하게 통합할 수 있습니다.

1.1. API 엔드포인트: /api/search
Method: GET

Description: 지역, 단지명, 필터 조건에 맞는 아파트 목록을 검색합니다.

Query Parameters:

sido: string (광역시/도 코드)

sgg: string (시/군/구 코드)

keyword: string (검색 키워드)

minPrice: number (최소 가격)

maxPrice: number (최대 가격)

... (기타 필터 값)

Success Response (200):

{
  "results": [
    {
      "aptSeq": "11110-2339",
      "aptName": "종로중흥S클래스",
      "address": "서울 종로구 숭인동",
      "representativeArea": 84.99,
      "latestPrice": 120000,
      "buildYear": 2013
    }
  ]
}

Error Response (500):

{
  "error": "Failed to fetch data from external API"
}

1.2. API 엔드포인트: /api/complex/[aptSeq]
Method: GET

Description: 특정 단지의 상세 정보와 면적별 목록을 조회합니다.

... (위와 같은 형식으로 나머지 API 명세 정의)

2. 데이터 모델 정의서 (TypeScript Types)
역할: 프로젝트 전반에서 사용될 핵심 데이터의 형태(Shape)를 정의합니다. 이를 통해 데이터 불일치로 인한 버그를 원천 차단하고 코드의 가독성을 높입니다.

위치: /src/types/apartment.ts (예시)

예시 코드:

// /api/search 응답 결과의 단지 정보
export interface ApartmentComplex {
  aptSeq: string;
  aptName: string;
  address: string;
  representativeArea: number;
  latestPrice: number;
  buildYear: number;
}

// /api/complex/[aptSeq] 응답 결과의 면적별 정보
export interface AreaInfo {
  exclusiveArea: number;
  supplyArea: number;
  latestPrice: number;
  latestDealDate: string;
}

// 거래 내역 정보
export interface Transaction {
  dealDate: string;
  price: number;
  floor: number;
}

3. 개발 워크플로우 가이드
역할: 우리 팀이 같은 방향을 보고, 일관된 스타일로 코드를 작성하기 위한 **'팀의 규칙'**입니다.

3.1. Git 브랜치 전략
main: 배포 가능한 안정 버전 브랜치. 오직 develop 브랜치로부터의 병합(Merge)만 허용.

develop: 다음 릴리즈를 준비하는 개발 브랜치.

feature/[기능명]: 각 기능 개발을 위한 브랜치. develop에서 분기하며, 개발 완료 후 develop으로 Pull Request(PR)를 생성. (예: feature/search-filter)

3.2. 컴포넌트 네이밍 컨벤션
**파일럿 케이스 (PascalCase)**를 사용합니다. (예: RegionSelector.tsx, ResultsTable.tsx)

컴포넌트와 관련된 스타일, 타입 파일은 같은 폴더 내에 위치시킵니다.

3.3. 코드 리뷰
모든 코드는 develop 브랜치에 병합되기 전, 최소 1명 이상의 동료에게 코드 리뷰를 받아야 합니다.

Pull Request 생성 시, 어떤 기능을 개발했는지, 어떻게 테스트했는지 명확하게 작성해야 합니다.

이 문서들이 있다면, 개발팀은 더 이상 "이 데이터는 어떤 형식으로 오나요?" 혹은 "이 기능은 어디까지 만들어야 하나요?" 같은 질문에 시간을 쏟지 않고, 오직 최고의 제품을 만드는 데에만 집중할 수 있을 것입니다.