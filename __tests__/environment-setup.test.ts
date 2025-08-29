/**
 * 환경 설정 검증 테스트
 * 목적: 1.3 환경 설정 태스크 완료 검증
 */

import { describe, test, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

describe('1.3 환경 설정 검증', () => {
  describe('환경 변수 파일 설정', () => {
    test('.env.example 파일이 존재하는지 확인', () => {
      const envExamplePath = path.join(process.cwd(), '.env.example');
      expect(fs.existsSync(envExamplePath)).toBe(true);
    });

    test('.env.example 파일에 필수 환경 변수들이 정의되어 있는지 확인', () => {
      const envExamplePath = path.join(process.cwd(), '.env.example');
      const envContent = fs.readFileSync(envExamplePath, 'utf8');

      // 필수 환경 변수들이 포함되어 있는지 확인
      expect(envContent).toContain('NEXT_PUBLIC_API_BASE_URL');
      expect(envContent).toContain('API_SERVICE_KEY');
      expect(envContent).toContain('NODE_ENV');
      expect(envContent).toContain('NEXT_PUBLIC_APP_ENV');
    });

    test('.env.example 파일에 올바른 API URL이 설정되어 있는지 확인', () => {
      const envExamplePath = path.join(process.cwd(), '.env.example');
      const envContent = fs.readFileSync(envExamplePath, 'utf8');

      expect(envContent).toContain(
        'http://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev'
      );
    });

    test('.env.local 파일이 존재하는지 확인', () => {
      const envLocalPath = path.join(process.cwd(), '.env.local');
      expect(fs.existsSync(envLocalPath)).toBe(true);
    });

    test('gitignore에서 .env.example이 추적되도록 설정되어 있는지 확인', () => {
      const gitignorePath = path.join(process.cwd(), '.gitignore');
      const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');

      expect(gitignoreContent).toContain('.env*');
      expect(gitignoreContent).toContain('!.env.example');
    });
  });

  describe('절대 경로 import 설정', () => {
    test('tsconfig.json에 @ 별칭이 설정되어 있는지 확인', () => {
      const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
      const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf8');
      const tsconfig = JSON.parse(tsconfigContent);

      expect(tsconfig.compilerOptions.paths).toBeDefined();
      expect(tsconfig.compilerOptions.paths['@/*']).toEqual(['./src/*']);
    });
  });

  describe('디렉터리 구조 생성', () => {
    test('src 디렉터리 구조가 올바르게 생성되었는지 확인', () => {
      const srcPath = path.join(process.cwd(), 'src');

      // 필수 디렉터리들이 존재하는지 확인
      expect(fs.existsSync(path.join(srcPath, 'app'))).toBe(true);
      expect(fs.existsSync(path.join(srcPath, 'components'))).toBe(true);
      expect(fs.existsSync(path.join(srcPath, 'lib'))).toBe(true);
      expect(fs.existsSync(path.join(srcPath, 'types'))).toBe(true);
    });

    test('API 라우트 디렉터리들이 올바르게 생성되었는지 확인', () => {
      const apiPath = path.join(process.cwd(), 'src/app/api');

      expect(fs.existsSync(path.join(apiPath, 'search'))).toBe(true);
      expect(fs.existsSync(path.join(apiPath, 'autocomplete'))).toBe(true);
      expect(fs.existsSync(path.join(apiPath, 'regions'))).toBe(true);
      expect(fs.existsSync(path.join(apiPath, 'complex'))).toBe(true);
      expect(fs.existsSync(path.join(apiPath, 'transactions'))).toBe(true);
    });

    test('컴포넌트 디렉터리들이 올바르게 생성되었는지 확인', () => {
      const componentsPath = path.join(process.cwd(), 'src/components');

      expect(fs.existsSync(path.join(componentsPath, 'common'))).toBe(true);
      expect(fs.existsSync(path.join(componentsPath, 'search'))).toBe(true);
      expect(fs.existsSync(path.join(componentsPath, 'complex'))).toBe(true);
      expect(fs.existsSync(path.join(componentsPath, 'charts'))).toBe(true);
      expect(fs.existsSync(path.join(componentsPath, 'ui'))).toBe(true);
    });
  });

  describe('lib 파일들 생성', () => {
    test('utils.ts 파일이 존재하는지 확인', () => {
      const utilsPath = path.join(process.cwd(), 'src/lib/utils.ts');
      expect(fs.existsSync(utilsPath)).toBe(true);
    });

    test('api-client.ts 파일이 생성되었는지 확인', () => {
      const apiClientPath = path.join(process.cwd(), 'src/lib/api-client.ts');
      expect(fs.existsSync(apiClientPath)).toBe(true);
    });

    test('data-parser.ts 파일이 생성되었는지 확인', () => {
      const dataParserPath = path.join(process.cwd(), 'src/lib/data-parser.ts');
      expect(fs.existsSync(dataParserPath)).toBe(true);
    });

    test('validation.ts 파일이 생성되었는지 확인', () => {
      const validationPath = path.join(process.cwd(), 'src/lib/validation.ts');
      expect(fs.existsSync(validationPath)).toBe(true);
    });
  });

  describe('타입 정의 파일 생성', () => {
    test('apartment.ts 파일이 생성되었는지 확인', () => {
      const apartmentTypesPath = path.join(
        process.cwd(),
        'src/types/apartment.ts'
      );
      expect(fs.existsSync(apartmentTypesPath)).toBe(true);
    });

    test('apartment.ts 파일에 필수 인터페이스들이 정의되어 있는지 확인', () => {
      const apartmentTypesPath = path.join(
        process.cwd(),
        'src/types/apartment.ts'
      );
      const typesContent = fs.readFileSync(apartmentTypesPath, 'utf8');

      // 핵심 인터페이스들이 정의되어 있는지 확인
      expect(typesContent).toContain('interface ApartmentComplex');
      expect(typesContent).toContain('interface AreaInfo');
      expect(typesContent).toContain('interface Transaction');
      expect(typesContent).toContain('interface ComplexInfo');
      expect(typesContent).toContain('interface SearchFilters');
    });
  });

  describe('Package Manager 설정', () => {
    test('yarn.lock 파일이 존재하는지 확인', () => {
      const yarnLockPath = path.join(process.cwd(), 'yarn.lock');
      expect(fs.existsSync(yarnLockPath)).toBe(true);
    });

    test('package.json이 존재하는지 확인', () => {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      expect(fs.existsSync(packageJsonPath)).toBe(true);
    });

    test('package.json에 필요한 scripts가 정의되어 있는지 확인', () => {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts.dev).toBeDefined();
      expect(packageJson.scripts.build).toBeDefined();
      expect(packageJson.scripts.start).toBeDefined();
      expect(packageJson.scripts.test).toBeDefined();
    });
  });
});
