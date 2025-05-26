import { render, screen, fireEvent } from '@testing-library/react';
import CustomModal from '../CustomModal';

describe('CustomModal', () => {
  it('no renderiza nada si isOpen es false', () => {
    render(
      <CustomModal isOpen={false} onClose={jest.fn()} title="Título">
        <div>Contenido</div>
      </CustomModal>
    );
    expect(screen.queryByText('Título')).not.toBeInTheDocument();
    expect(screen.queryByText('Contenido')).not.toBeInTheDocument();
  });

  it('renderiza el modal con título y contenido si isOpen es true', () => {
    render(
      <CustomModal isOpen={true} onClose={jest.fn()} title="Título Modal">
        <div>Contenido Modal</div>
      </CustomModal>
    );
    expect(screen.getByText('Título Modal')).toBeInTheDocument();
    expect(screen.getByText('Contenido Modal')).toBeInTheDocument();
  });

  it('llama a onClose al hacer click en el botón de cerrar', () => {
    const onClose = jest.fn();
    render(
      <CustomModal isOpen={true} onClose={onClose} title="Cerrar Modal">
        <div>Contenido</div>
      </CustomModal>
    );
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});