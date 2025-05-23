import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BottomSheet from './BottomSheet';

describe('BottomSheet', () => {
  beforeEach(() => {
    // Mock window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1000
    });
  });

  it('renders with initial closed position', () => {
    render(<BottomSheet>Test Content</BottomSheet>);
    const sheet = screen.getByRole('dialog');
    expect(sheet).toHaveStyle({ transform: 'translateY(90vh)' });
  });

  it('opens fully when Open button is clicked', () => {
    render(<BottomSheet>Test Content</BottomSheet>);
    const openButton = screen.getByRole('button', { name: /open sheet fully/i });
    fireEvent.click(openButton);
    const sheet = screen.getByRole('dialog');
    expect(sheet).toHaveStyle({ transform: 'translateY(10vh)' });
  });

  it('opens halfway when Half button is clicked', () => {
    render(<BottomSheet>Test Content</BottomSheet>);
    const halfButton = screen.getByRole('button', { name: /open sheet halfway/i });
    fireEvent.click(halfButton);
    const sheet = screen.getByRole('dialog');
    expect(sheet).toHaveStyle({ transform: 'translateY(50vh)' });
  });

  it('closes when Close button is clicked', () => {
    render(<BottomSheet>Test Content</BottomSheet>);
    const closeButton = screen.getByRole('button', { name: /close sheet/i });
    fireEvent.click(closeButton);
    const sheet = screen.getByRole('dialog');
    expect(sheet).toHaveStyle({ transform: 'translateY(90vh)' });
  });

  it('responds to keyboard navigation', () => {
    render(<BottomSheet>Test Content</BottomSheet>);
    const sheet = screen.getByRole('dialog');
    
    // Test ArrowUp
    fireEvent.keyDown(sheet, { key: 'ArrowUp' });
    expect(sheet).toHaveStyle({ transform: 'translateY(50vh)' });
    
    // Test ArrowDown
    fireEvent.keyDown(sheet, { key: 'ArrowDown' });
    expect(sheet).toHaveStyle({ transform: 'translateY(90vh)' });
    
    // Test Home key
    fireEvent.keyDown(sheet, { key: 'Home' });
    expect(sheet).toHaveStyle({ transform: 'translateY(10vh)' });
    
    // Test End key
    fireEvent.keyDown(sheet, { key: 'End' });
    expect(sheet).toHaveStyle({ transform: 'translateY(90vh)' });
    
    // Test Escape key
    fireEvent.keyDown(sheet, { key: 'Escape' });
    expect(sheet).toHaveStyle({ transform: 'translateY(90vh)' });
  });

  it('renders children content', () => {
    render(<BottomSheet>Test Content</BottomSheet>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    render(<BottomSheet>Test Content</BottomSheet>);
    const sheet = screen.getByRole('dialog');
    expect(sheet).toHaveAttribute('aria-modal', 'true');
    expect(sheet).toHaveAttribute('aria-label', 'Bottom Sheet');
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-pressed');
    });
  });
}); 