import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShipmentCard from '../ShipmentCard';

// Mock de CustomButton para evitar dependencias
jest.mock('@/components/atoms/CustomButton', () => ({
  __esModule: true,
  default: ({ text, onClick }: { text: string; onClick: () => void }) => (
    <button onClick={onClick}>{text}</button>
  ),
}));

const defaultProps = {
  title: 'Flete de prueba',
  distance: 150,
  totalCharge: 2500,
  totalDistance: 300,
  profit: 1800,
  dimensions: { height: 50, width: 60, length: 70 },
  weight: 500,
  onOpenMap: jest.fn(),
  onViewDetails: jest.fn(),
  onAccept: jest.fn(),
};

describe('ShipmentCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente con props básicas', () => {
    render(<ShipmentCard {...defaultProps } />);
    
    // Verificar elementos principales
    expect(screen.getByText(defaultProps.title));
    expect(screen.getByText(`${defaultProps.distance} km`));
    expect(screen.getByText(`$${defaultProps.totalCharge}`));
  });

  test('muestra la imagen por defecto cuando no se provee imageUrl', () => {
    render(<ShipmentCard {...defaultProps} imageUrl={undefined} />);
    
    const image = screen.getByAltText('Flete');
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('res.cloudinary.com')
    );
  });

  test('maneja correctamente los clics en botones', () => {
    render(<ShipmentCard {...defaultProps } />);
    
    fireEvent.click(screen.getByText('Abrir en el mapa'));
    expect(defaultProps.onOpenMap).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Ver detalles'));
    expect(defaultProps.onViewDetails).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Aceptar flete'));
    expect(defaultProps.onAccept).toHaveBeenCalledTimes(1);
  });

  test('muestra correctamente las dimensiones y peso', () => {
    render(<ShipmentCard {...defaultProps } />);
    
    const dimensionsText = `${defaultProps.dimensions.height} x ${defaultProps.dimensions.width} x ${defaultProps.dimensions.length} cm`;
    expect(screen.getByText(dimensionsText));
    expect(screen.getByText(`${defaultProps.weight} kg`));
  });

  test('muestra correctamente la ganancia y recorrido total', () => {
    render(<ShipmentCard {...defaultProps } />);
    
    expect(screen.getByText(`$${defaultProps.profit}`));
    expect(screen.getByText(`${defaultProps.totalDistance} km`));
  });
});