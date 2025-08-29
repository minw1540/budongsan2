🏡 스마트 부동산 실거래가 조회 서비스 코딩 컨벤션
문서 버전: 1.0
원칙: 가독성(Readability), 일관성(Consistency), 단순성(Simplicity)

1. 일반 원칙
코드는 소설처럼 읽혀야 한다: 동료가 내 코드를 처음 보더라도, 주석 없이 로직의 흐름을 이해할 수 있도록 작성한다.

하나의 기능, 하나의 역할: 모든 함수와 컴포넌트는 단 하나의 명확한 책임(Single Responsibility)을 가진다.

최적화보다 명료함: 섣부른 최적화는 코드를 복잡하게 만든다. 명확하고 직관적인 코드를 우선으로 한다.

2. 파일 및 폴더 구조
프로젝트의 모든 파일과 폴더는 kebab-case (예: results-table)를 사용한다. 단, 컴포넌트 파일은 PascalCase (예: ResultsTable.tsx)를 따른다.

컴포넌트는 기능 단위로 폴더를 구성한다.

/src
└── /components
    ├── /common         // 버튼, 인풋 등 전역 공용 컴포넌트
    ├── /search         // 검색 페이지 관련 컴포넌트
    │   ├── RegionSelector.tsx
    │   └── ResultsTable.tsx
    └── /complex        // 단지 상세 페이지 관련 컴포넌트

3. 네이밍 컨벤션 (Naming Convention)
변수/함수: camelCase

const apartmentList = ...

function getApartmentData() { ... }

React 컴포넌트: PascalCase

function SearchInput() { ... }

TypeScript 타입/인터페이스: PascalCase

interface ApartmentComplex { ... }

type SearchResult = { ... }

상수: UPPER_SNAKE_CASE

const API_BASE_URL = '...'

Boolean 변수: is, has, should 등의 접두사를 사용하여 명확히 표현한다.

const isLoading = true;

const hasResults = false;

4. React & Next.js
컴포넌트: 모든 컴포넌트는 **함수형 컴포넌트(Functional Component)**와 Hooks를 사용하여 작성한다.

Props:

Props는 TypeScript 인터페이스로 타입을 명확히 정의한다.

Props가 많아질 경우, 구조 분해 할당(Destructuring)을 사용한다.

interface Props {
  aptName: string;
  buildYear: number;
}

function ApartmentCard({ aptName, buildYear }: Props) {
  // ...
}

상태 관리(State):

컴포넌트 지역 상태는 useState를 사용한다.

서버 데이터 상태는 SWR을 사용하여 관리한다. 전역 상태 관리 라이브러리(Zustand, Redux 등)는 도입하지 않는다.

이벤트 핸들러: handle 접두사를 사용한다. (예: onClick -> handleClick)

const handleClick = () => { ... };
return <button onClick={handleClick}>검색</button>;

API Routes:

API 로직 파일은 /src/app/api/[...]/route.ts 경로에 위치시킨다.

외부 API 키와 같은 민감 정보는 반드시 .env.local 파일에 환경 변수로 저장하고, 서버 측(API Routes)에서만 접근한다.

5. TypeScript
any 타입 사용 금지: any는 TypeScript의 장점을 무력화시킨다. 타입을 알 수 없는 경우 unknown을 사용하고, 타입 가드를 통해 타입을 좁혀나간다.

인터페이스(Interface) 우선 사용: 객체의 형태를 정의할 때는 type보다 interface를 우선적으로 사용한다. (확장성 측면에서 유리)

유틸리티 타입 적극 활용: Partial, Omit, Pick 등 TypeScript가 제공하는 유틸리티 타입을 활용하여 코드 중복을 줄인다.

6. 스타일링 (Tailwind CSS)
일관된 간격: margin, padding 등 간격은 Tailwind CSS가 제공하는 유틸리티(m-4, p-2 등)를 사용한다. 임의의 값(예: m-[3px]) 사용은 지양한다.

조건부 클래스: 조건에 따라 클래스를 동적으로 적용할 때는 clsx 또는 classnames 라이브러리 사용을 권장한다.

import clsx from 'clsx';

const Button = ({ isPrimary }) => (
  <button className={clsx('btn', isPrimary && 'btn-primary')}>
    Click me
  </button>
);

7. 주석 (Comments)
"왜?"를 설명한다: 코드가 "무엇을" 하는지는 코드 자체가 말해준다. 주석은 이 코드를 "왜" 이렇게 작성했는지, 비즈니스 로직이나 기술적 제약사항을 설명하는 데 사용한다.

복잡한 로직: 복잡한 알고리즘이나 정규 표현식에는 반드시 주석을 추가한다.

TODO 주석: 당장 해결할 수 없지만 추후 개선이 필요한 부분에는 // TODO: [설명] 형식으로 주석을 남긴다.

8. 자동화 도구 (Tooling)
ESLint & Prettier: 프로젝트에 설정된 규칙을 따른다. 모든 코드는 커밋 전에 포맷팅되어야 한다. (.vscode/settings.json에 formatOnSave 설정을 권장)