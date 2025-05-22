import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from '../CustomButton';

const defaultProps = {
  text: 'Click me',
  variant: 'primary' as const,
  onClick: jest.fn(),
};

describe('CustomButton', () => {
  it('renders with the correct text', () => {
    render(<CustomButton {...defaultProps} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<CustomButton {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct variant style', () => {
    render(<CustomButton {...defaultProps} variant="danger" />);
    const button = screen.getByRole('button');

    // Verificamos que tenga clases específicas del botón danger
    expect(button.className).toMatch(/bg-red-500/);
    expect(button.className).toMatch(/text-white/);
  });

  it('is disabled when the disabled prop is true', () => {
    render(<CustomButton {...defaultProps} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders tooltip text when provided', () => {
    render(<CustomButton {...defaultProps} tooltipText="Tooltip here" />);
    const tooltip = screen.getByText('Tooltip here');
    expect(tooltip).toBeInTheDocument();
  });

  it('does not render tooltip if not provided', () => {
    render(<CustomButton {...defaultProps} />);
    const tooltip = screen.queryByText(/.+/);
    // no hay tooltip visible si no se pasa texto
    expect(tooltip?.className).not.toMatch(/group-hover/);
  });
});
