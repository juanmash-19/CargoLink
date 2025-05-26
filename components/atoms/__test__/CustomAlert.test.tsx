import { render, screen, fireEvent, act } from '@testing-library/react';
import CustomAlert from '../CustomAlert';

describe('CustomAlert', () => {
  it('muestra el mensaje y el color correcto para success', () => {
    render(<CustomAlert message="¡Éxito!" type="success" />);
    expect(screen.getByText('¡Éxito!')).toBeInTheDocument();
    expect(screen.getByText('Cerrar')).toBeInTheDocument();
    // El color de fondo se verifica por clase en el padre directo
    expect(screen.getByText('¡Éxito!').parentElement).toHaveClass('bg-green-500');
  });

  it('muestra el mensaje y el color correcto para error', () => {
    render(<CustomAlert message="Error!" type="error" />);
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByText('Cerrar')).toBeInTheDocument();
    expect(screen.getByText('Error!').parentElement).toHaveClass('bg-red-500');
  });

  it('muestra children y no muestra botón cerrar en type options', () => {
    render(
      <CustomAlert message="Opciones" type="options">
        <button>Opción 1</button>
      </CustomAlert>
    );
    expect(screen.getByText('Opciones')).toBeInTheDocument();
    expect(screen.getByText('Opción 1')).toBeInTheDocument();
    expect(screen.queryByText('Cerrar')).not.toBeInTheDocument();
  });

  it('llama onClose y desaparece después del tiempo para success', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    render(<CustomAlert message="Bye" type="success" duration={1000} onClose={onClose} />);
    expect(screen.getByText('Bye')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(onClose).toHaveBeenCalled();
    expect(screen.queryByText('Bye')).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it('cierra al hacer click en el botón cerrar', () => {
    const onClose = jest.fn();
    render(<CustomAlert message="Cerrar test" type="error" onClose={onClose} />);
    fireEvent.click(screen.getByText('Cerrar'));
    expect(onClose).toHaveBeenCalled();
    expect(screen.queryByText('Cerrar test')).not.toBeInTheDocument();
  });
});