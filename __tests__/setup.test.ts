/**
 * 프로젝트 기초 설정 테스트
 * 1.1 프로젝트 기초 설정 태스크 검증
 */

import { describe, expect, it } from '@jest/globals';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const projectRoot = process.cwd();

describe('1.1 프로젝트 기초 설정 테스트', () => {
  describe('Next.js 14 (App Router) 프로젝트 초기화', () => {
    it('package.json이 올바른 Next.js 버전을 포함해야 함', () => {
      const packageJsonPath = join(projectRoot, 'package.json');
      expect(existsSync(packageJsonPath)).toBe(true);

      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      expect(packageJson.dependencies.next).toBeDefined();
      expect(packageJson.dependencies.react).toBeDefined();
      expect(packageJson.dependencies['react-dom']).toBeDefined();
    });

    it('src 디렉터리와 app 라우터 구조가 존재해야 함', () => {
      expect(existsSync(join(projectRoot, 'src', 'app'))).toBe(true);
      expect(existsSync(join(projectRoot, 'src', 'app', 'layout.tsx'))).toBe(
        true
      );
      expect(existsSync(join(projectRoot, 'src', 'app', 'page.tsx'))).toBe(
        true
      );
    });
  });

  describe('TypeScript 설정', () => {
    it('tsconfig.json이 존재하고 올바른 설정을 포함해야 함', () => {
      const tsconfigPath = join(projectRoot, 'tsconfig.json');
      expect(existsSync(tsconfigPath)).toBe(true);

      const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
      expect(tsconfig.compilerOptions.strict).toBe(true);
      expect(tsconfig.compilerOptions.noUncheckedIndexedAccess).toBe(true);
      expect(tsconfig.compilerOptions.paths['@/*']).toEqual(['./src/*']);
    });

    it('@types 패키지들이 설치되어 있어야 함', () => {
      const packageJsonPath = join(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

      expect(packageJson.devDependencies['@types/node']).toBeDefined();
      expect(packageJson.devDependencies['@types/react']).toBeDefined();
      expect(packageJson.devDependencies['@types/react-dom']).toBeDefined();
      expect(packageJson.devDependencies.typescript).toBeDefined();
    });
  });

  describe('ESLint 설정', () => {
    it('ESLint 설정 파일이 존재해야 함', () => {
      const eslintConfigPath = join(projectRoot, 'eslint.config.mjs');
      expect(existsSync(eslintConfigPath)).toBe(true);
    });

    it('package.json에 ESLint 스크립트가 정의되어 있어야 함', () => {
      const packageJsonPath = join(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

      expect(packageJson.scripts.lint).toBeDefined();
      expect(packageJson.scripts['lint:fix']).toBeDefined();
      expect(packageJson.devDependencies.eslint).toBeDefined();
    });
  });

  describe('Prettier 설정', () => {
    it('Prettier 설정 파일들이 존재해야 함', () => {
      expect(existsSync(join(projectRoot, '.prettierrc'))).toBe(true);
      expect(existsSync(join(projectRoot, '.prettierignore'))).toBe(true);
    });

    it('package.json에 Prettier 스크립트가 정의되어 있어야 함', () => {
      const packageJsonPath = join(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

      expect(packageJson.scripts.format).toBeDefined();
      expect(packageJson.scripts['format:check']).toBeDefined();
      expect(packageJson.devDependencies.prettier).toBeDefined();
    });

    it('.prettierrc 설정이 코딩 컨벤션에 맞아야 함', () => {
      const prettierrcPath = join(projectRoot, '.prettierrc');
      const prettierConfig = JSON.parse(readFileSync(prettierrcPath, 'utf-8'));

      expect(prettierConfig.singleQuote).toBe(true);
      expect(prettierConfig.semi).toBe(true);
      expect(prettierConfig.tabWidth).toBe(2);
      expect(prettierConfig.trailingComma).toBe('es5');
    });
  });

  describe('Git hooks 설정', () => {
    it('husky가 설치되고 설정되어 있어야 함', () => {
      const packageJsonPath = join(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

      expect(packageJson.devDependencies.husky).toBeDefined();
      expect(packageJson.devDependencies['lint-staged']).toBeDefined();
      expect(packageJson.scripts.prepare).toBe('husky install');
    });

    it('Git hooks 파일들이 존재해야 함', () => {
      expect(existsSync(join(projectRoot, '.husky'))).toBe(true);
      expect(existsSync(join(projectRoot, '.husky', 'pre-commit'))).toBe(true);
      expect(existsSync(join(projectRoot, '.husky', 'pre-push'))).toBe(true);
    });

    it('lint-staged 설정이 package.json에 있어야 함', () => {
      const packageJsonPath = join(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

      expect(packageJson['lint-staged']).toBeDefined();
      expect(packageJson['lint-staged']['*.{js,jsx,ts,tsx}']).toContain(
        'eslint --fix'
      );
      expect(packageJson['lint-staged']['*.{js,jsx,ts,tsx}']).toContain(
        'prettier --write'
      );
    });
  });

  describe('환경 설정', () => {
    it('.env.example 파일이 존재해야 함', () => {
      expect(existsSync(join(projectRoot, '.env.example'))).toBe(true);
    });

    it('절대 경로 import 설정이 되어 있어야 함', () => {
      const tsconfigPath = join(projectRoot, 'tsconfig.json');
      const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));

      expect(tsconfig.compilerOptions.paths).toBeDefined();
      expect(tsconfig.compilerOptions.paths['@/*']).toEqual(['./src/*']);
    });
  });

  describe('디렉터리 구조', () => {
    it('코딩 컨벤션에 따른 디렉터리 구조가 생성되어 있어야 함', () => {
      // 컴포넌트 디렉터리
      expect(existsSync(join(projectRoot, 'src', 'components', 'common'))).toBe(
        true
      );
      expect(existsSync(join(projectRoot, 'src', 'components', 'search'))).toBe(
        true
      );
      expect(
        existsSync(join(projectRoot, 'src', 'components', 'complex'))
      ).toBe(true);
      expect(existsSync(join(projectRoot, 'src', 'components', 'charts'))).toBe(
        true
      );

      // 라이브러리 및 타입 디렉터리
      expect(existsSync(join(projectRoot, 'src', 'lib'))).toBe(true);
      expect(existsSync(join(projectRoot, 'src', 'types'))).toBe(true);

      // API 라우트 디렉터리
      expect(existsSync(join(projectRoot, 'src', 'app', 'api', 'search'))).toBe(
        true
      );
      expect(
        existsSync(join(projectRoot, 'src', 'app', 'api', 'autocomplete'))
      ).toBe(true);
      expect(
        existsSync(join(projectRoot, 'src', 'app', 'api', 'regions'))
      ).toBe(true);
      expect(
        existsSync(join(projectRoot, 'src', 'app', 'api', 'transactions'))
      ).toBe(true);

      // 동적 라우팅 디렉터리
      expect(
        existsSync(
          join(projectRoot, 'src', 'app', 'api', 'complex', '[aptSeq]')
        )
      ).toBe(true);
      expect(
        existsSync(
          join(
            projectRoot,
            'src',
            'app',
            'complex',
            '[aptSeq]',
            'area',
            '[areaId]'
          )
        )
      ).toBe(true);
    });
  });

  describe('Package Manager', () => {
    it('yarn 사용을 위한 설정이 되어 있어야 함', () => {
      expect(existsSync(join(projectRoot, 'yarn.lock'))).toBe(true);
      expect(existsSync(join(projectRoot, 'package-lock.json'))).toBe(false);
    });
  });
});
