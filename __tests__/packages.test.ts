/**
 * 핵심 의존성 패키지 설치 및 동작 테스트
 * 목적: 1.2 핵심 의존성 패키지 설치 태스크 완료 검증
 */

import { describe, test, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

describe('핵심 의존성 패키지 설치 검증', () => {
  test('패키지 설치 여부 확인 (package.json)', () => {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // dependencies 확인
    expect(packageJson.dependencies.swr).toBeDefined();
    expect(packageJson.dependencies.recharts).toBeDefined();
    expect(packageJson.dependencies['xml-js']).toBeDefined();
    expect(packageJson.dependencies.clsx).toBeDefined();
    expect(packageJson.dependencies['lucide-react']).toBeDefined();

    // devDependencies 확인
    expect(packageJson.devDependencies['@types/xml-js']).toBeDefined();
    expect(packageJson.devDependencies['@types/node']).toBeDefined();
    expect(packageJson.devDependencies.husky).toBeDefined();
    expect(packageJson.devDependencies['lint-staged']).toBeDefined();
    expect(packageJson.devDependencies.tailwindcss).toBeDefined();
    expect(packageJson.devDependencies['react-is']).toBeDefined();
  });

  test('node_modules 패키지 폴더 존재 확인', () => {
    const nodeModulesPath = path.join(process.cwd(), 'node_modules');

    // 주요 패키지 폴더들이 존재하는지 확인
    expect(fs.existsSync(path.join(nodeModulesPath, 'swr'))).toBe(true);
    expect(fs.existsSync(path.join(nodeModulesPath, 'recharts'))).toBe(true);
    expect(fs.existsSync(path.join(nodeModulesPath, 'xml-js'))).toBe(true);
    expect(fs.existsSync(path.join(nodeModulesPath, 'clsx'))).toBe(true);
    expect(fs.existsSync(path.join(nodeModulesPath, 'lucide-react'))).toBe(
      true
    );
    expect(fs.existsSync(path.join(nodeModulesPath, 'tailwindcss'))).toBe(true);
    expect(fs.existsSync(path.join(nodeModulesPath, 'husky'))).toBe(true);
    expect(fs.existsSync(path.join(nodeModulesPath, 'lint-staged'))).toBe(true);
  });
});

describe('Shadcn/ui 컴포넌트 설치 검증', () => {
  test('utils.ts 파일이 생성되었는지 확인', () => {
    const utilsPath = path.join(process.cwd(), 'src/lib/utils.ts');
    expect(fs.existsSync(utilsPath)).toBe(true);
  });

  test('기본 UI 컴포넌트들이 생성되었는지 확인', () => {
    const componentDir = path.join(process.cwd(), 'src/components/ui');
    const expectedComponents = [
      'button.tsx',
      'input.tsx',
      'select.tsx',
      'dropdown-menu.tsx',
      'table.tsx',
      'slider.tsx',
      'card.tsx',
    ];

    expectedComponents.forEach(component => {
      const filePath = path.join(componentDir, component);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  test('components.json 설정 파일이 생성되었는지 확인', () => {
    const componentsConfigPath = path.join(process.cwd(), 'components.json');
    expect(fs.existsSync(componentsConfigPath)).toBe(true);

    const config = JSON.parse(fs.readFileSync(componentsConfigPath, 'utf8'));
    expect(config.style).toBeDefined();
    expect(config.tailwind).toBeDefined();
    expect(config.aliases).toBeDefined();
  });
});
