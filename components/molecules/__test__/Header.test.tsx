import { render, screen } from '@testing-library/react';
import Header from '@/components/molecules/Header';
import { AuthContext } from '@/utils/AuthContext';

// MOCK NEXT/NAVIGATION
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock del contexto de autenticación
const renderWithRole = (role: string | null) => {
  render(
    <AuthContext.Provider value={{
      userRole: role,
      userEmail: 'test@mail.com',
      userName: 'Test',
      userLastname: 'User',
      login: jest.fn(),
      logout: jest.fn(),
    }}>
      <Header />
    </AuthContext.Provider>
  );
};

describe('Header', () => {
  it('muestra opciones de admin si el rol es admin', () => {
    renderWithRole('admin');
    expect(screen.getByText(/Administrador/i)).toBeInTheDocument();
    expect(screen.getByText(/Gestionar usuarios/i)).toBeInTheDocument();
    expect(screen.getByText(/Gestionar envios/i)).toBeInTheDocument();
  });

  it('muestra opciones de transportador si el rol es transporter', () => {
    renderWithRole('transporter');
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Fletes/i)).toBeInTheDocument();
    expect(screen.getByText(/Billetera/i)).toBeInTheDocument();
  });

  it('muestra opciones de usuario si el rol es user', () => {
    renderWithRole('user');
    // Cambia getByText por getAllByText para evitar el error de múltiples elementos
    expect(screen.getAllByText(/Fletes/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Ayuda/i)).toBeInTheDocument();
  });

  it('muestra opciones de invitado si no hay rol', () => {
    renderWithRole(null);
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Servicios/i)).toBeInTheDocument();
    expect(screen.getByText(/Nosotros/i)).toBeInTheDocument();
  });
});