'use client';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomDropdown from '@/components/atoms/CustomDropdown';

describe('CustomDropdown', () => {
  const mockOptionClick = jest.fn();

  const options = [
    { text: 'Opción 1', onClick: mockOptionClick },
    { text: 'Opción 2', onClick: mockOptionClick },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el botón con el texto proporcionado', () => {
    render(<CustomDropdown buttonText="Abrir menú" options={options} variant="primary" />);
    expect(screen.getByText('Abrir menú')).toBeInTheDocument();
  });

  it('abre y muestra las opciones al hacer clic en el botón', () => {
    render(<CustomDropdown buttonText="Abrir menú" options={options} variant="primary" />);

    expect(screen.queryByText('Opción 1')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Abrir menú'));

    expect(screen.getByText('Opción 1')).toBeInTheDocument();
    expect(screen.getByText('Opción 2')).toBeInTheDocument();
  });

  it('ejecuta la función onClick y cierra el dropdown al seleccionar una opción', () => {
    render(<CustomDropdown buttonText="Abrir menú" options={options} variant="primary" />);

    fireEvent.click(screen.getByText('Abrir menú'));
    fireEvent.click(screen.getByText('Opción 1'));

    expect(mockOptionClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Opción 1')).not.toBeInTheDocument(); // Dropdown se cerró
  });

  it('muestra correctamente todas las opciones de texto al abrir', () => {
    render(<CustomDropdown buttonText="Abrir menú" options={options} variant="primary" />);

    fireEvent.click(screen.getByText('Abrir menú'));

    options.forEach((option) => {
      expect(screen.getByText(option.text)).toBeInTheDocument();
    });
  });
});
