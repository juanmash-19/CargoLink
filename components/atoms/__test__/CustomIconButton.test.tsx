'use client';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomIconButton from '@/components/atoms/CustomIconButton';
import { FaBeer } from 'react-icons/fa'; // Usamos un ícono de prueba

describe('CustomIconButton', () => {
  const mockClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente con ícono y aria-label', () => {
    render(
      <CustomIconButton
        icon={<FaBeer data-testid="icon" />}
        ariaLabel="Botón con ícono"
        variant="primary"
      />
    );

    const button = screen.getByRole('button', { name: /botón con ícono/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('llama a la función onClick al hacer clic', () => {
    render(
      <CustomIconButton
        icon={<FaBeer />}
        ariaLabel="Click me"
        variant="secondary"
        onClick={mockClick}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('no llama a onClick si el botón está deshabilitado', () => {
    render(
      <CustomIconButton
        icon={<FaBeer />}
        ariaLabel="Deshabilitado"
        variant="danger"
        onClick={mockClick}
        disabled
      />
    );

    const button = screen.getByRole('button', { name: /deshabilitado/i });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(mockClick).not.toHaveBeenCalled();
  });

  it('aplica clases adicionales correctamente', () => {
    render(
      <CustomIconButton
        icon={<FaBeer />}
        ariaLabel="Con clase"
        variant="ghost"
        className="extra-class"
      />
    );

    const button = screen.getByRole('button', { name: /con clase/i });
    expect(button).toHaveClass('extra-class');
  });

  it('renderiza el tooltip si se proporciona', () => {
    render(
      <CustomIconButton
        icon={<FaBeer />}
        ariaLabel="Con tooltip"
        variant="green"
        tooltipText="Tooltip de prueba"
      />
    );

    // El tooltip debe estar en el DOM, pero oculto por defecto
    expect(screen.getByText('Tooltip de prueba')).toBeInTheDocument();
  });
});
