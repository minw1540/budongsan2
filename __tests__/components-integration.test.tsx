/**
 * React 컴포넌트 및 패키지 통합 테스트
 * 목적: 설치된 패키지들이 React 환경에서 올바르게 작동하는지 검증
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';

// Shadcn/ui 컴포넌트 import 테스트
import { Button } from '../src/components/ui/button';
import { Input } from '../src/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../src/components/ui/card';

// lucide-react 아이콘 import 테스트
import { Search, Home, ChevronDown } from 'lucide-react';

// clsx와 utils 함수 import 테스트
import { cn } from '../src/lib/utils';
import clsx from 'clsx';

describe('Shadcn/ui 컴포넌트 렌더링 테스트', () => {
  test('Button 컴포넌트가 올바르게 렌더링되는지 확인', () => {
    render(<Button>테스트 버튼</Button>);
    expect(
      screen.getByRole('button', { name: '테스트 버튼' })
    ).toBeInTheDocument();
  });

  test('Input 컴포넌트가 올바르게 렌더링되는지 확인', () => {
    render(<Input placeholder='테스트 입력' data-testid='test-input' />);
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('테스트 입력')).toBeInTheDocument();
  });

  test('Card 컴포넌트가 올바르게 렌더링되는지 확인', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>테스트 카드 제목</CardTitle>
        </CardHeader>
        <CardContent>
          <p>테스트 카드 내용</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText('테스트 카드 제목')).toBeInTheDocument();
    expect(screen.getByText('테스트 카드 내용')).toBeInTheDocument();
  });
});

describe('lucide-react 아이콘 렌더링 테스트', () => {
  test('Search 아이콘이 올바르게 렌더링되는지 확인', () => {
    render(<Search data-testid='search-icon' />);
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  test('Home 아이콘이 올바르게 렌더링되는지 확인', () => {
    render(<Home data-testid='home-icon' />);
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  });

  test('ChevronDown 아이콘이 올바르게 렌더링되는지 확인', () => {
    render(<ChevronDown data-testid='chevron-icon' />);
    expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
  });
});

describe('clsx 및 utils 함수 통합 테스트', () => {
  test('cn 함수가 올바르게 동작하는지 확인', () => {
    const result = cn('base-class', { 'conditional-class': true });
    expect(result).toContain('base-class');
    expect(result).toContain('conditional-class');
  });

  test('clsx가 React 컴포넌트에서 올바르게 동작하는지 확인', () => {
    const TestComponent = ({ isActive }: { isActive: boolean }) => (
      <div
        className={clsx('btn', { 'btn-active': isActive })}
        data-testid='test-element'
      >
        테스트
      </div>
    );

    const { rerender } = render(<TestComponent isActive />);
    const element = screen.getByTestId('test-element');
    expect(element).toHaveClass('btn', 'btn-active');

    rerender(<TestComponent isActive={false} />);
    expect(element).toHaveClass('btn');
    expect(element).not.toHaveClass('btn-active');
  });
});

describe('React 통합 환경 테스트', () => {
  test('모든 패키지가 React 환경에서 함께 동작하는지 확인', () => {
    const ComplexComponent = () => (
      <Card className={cn('w-full', { 'border-2': true })}>
        <CardHeader>
          <CardTitle className={clsx('flex', 'items-center', 'gap-2')}>
            <Search size={16} />
            아파트 검색
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <Input placeholder='단지명을 입력하세요' />
            <Button className='w-full'>
              <ChevronDown size={16} className='mr-2' />
              검색
            </Button>
          </div>
        </CardContent>
      </Card>
    );

    render(<ComplexComponent />);

    expect(screen.getByText('아파트 검색')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('단지명을 입력하세요')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /검색/ })).toBeInTheDocument();
  });
});

// 에러 경계 테스트 - 패키지 로딩 실패 시나리오
describe('패키지 로딩 에러 처리 테스트', () => {
  test('컴포넌트가 정상적으로 마운트되고 언마운트되는지 확인', () => {
    const { unmount } = render(
      <div>
        <Button>버튼 1</Button>
        <Input placeholder='입력 1' />
        <Search />
      </div>
    );

    expect(screen.getByRole('button', { name: '버튼 1' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('입력 1')).toBeInTheDocument();

    // 언마운트 시 에러가 발생하지 않는지 확인
    expect(() => unmount()).not.toThrow();
  });
});
