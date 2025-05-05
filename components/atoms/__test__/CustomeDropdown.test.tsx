'use client';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    expect(screen.getByText('Abrir menú'));
  });

  it('abre y muestra las opciones al hacer clic en el botón', () => {
    render(<CustomDropdown buttonText="Abrir menú" options={options} variant="primary" />);

    // El dropdown no debería estar abierto inicialmente
    expect(screen.queryByText('Opción 1')).not.toBeInTheDocument();

    // Hacer clic en el botón
    fireEvent.click(screen.getByText('Abrir menú'));

    // Ahora debería mostrarse la opción
    expect(screen.getByText('Opción 1'));
    expect(screen.getByText('Opción 2'));
  });

  it('ejecuta la función onClick y cierra el dropdown al seleccionar una opción', () => {
    render(<CustomDropdown buttonText="Abrir menú" options={options} variant="primary" />);

    // Abrimos el dropdown
    fireEvent.click(screen.getByText('Abrir menú'));

    // Hacemos clic en la opción 1
    fireEvent.click(screen.getByText('Opción 1'));

    // Verificamos que se haya llamado la función
    expect(mockOptionClick).toHaveBeenCalledTimes(1);

    // Y que se haya cerrado el dropdown
    expect(screen.queryByText('Opción 1')).not;
  });

  it('muestra correctamente las opciones de texto', () => {
    render(<CustomDropdown buttonText="Abrir menú" options={options} variant="primary" />);

    fireEvent.click(screen.getByText('Abrir menú'));

    options.forEach((option) => {
      expect(screen.getByText(option.text));
    });
  });
});
