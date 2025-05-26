import { render, screen, fireEvent } from '@testing-library/react';
import SimpleCard from '../SimpleCard';

describe('SimpleCard', () => {
  it('muestra el título, valor e ícono', () => {
    render(
      <SimpleCard
        title="Test Card"
        value="123"
        variant="primary"
        icon="🚚"
      />
    );
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('🚚')).toBeInTheDocument();
  });

  // REEMPLAZA ESTE TEST:
  it('aplica la clase correcta para el variant primary', () => {
    const { container } = render(
      <SimpleCard
        title="Primary"
        value="1"
        variant="primary"
        icon="⭐"
      />
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-primary-100');
    expect(card).toHaveClass('border-primary-400');
  });

  // REEMPLAZA ESTE TEST:
  it('aplica la clase correcta para el variant danger', () => {
    const { container } = render(
      <SimpleCard
        title="Danger"
        value="2"
        variant="danger"
        icon="⚠️"
      />
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-red-500');
    expect(card).toHaveClass('border-red-500');
  });

  it('llama a onClick cuando se hace click', () => {
    const handleClick = jest.fn();
    render(
      <SimpleCard
        title="Clickable"
        value="3"
        variant="secondary"
        icon="🖱️"
        onClick={handleClick}
      />
    );
    const card = screen.getByText('Clickable').closest('div');
    fireEvent.click(card!);
    expect(handleClick).toHaveBeenCalled();
  });
});