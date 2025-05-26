import { render, screen } from '@testing-library/react';
import BasicTextCard from '../BasicTextCard';

describe('BasicTextCard', () => {
  it('muestra el título y el texto', () => {
    render(
      <BasicTextCard
        title="Título de prueba"
        subtitles={[{ label: 'Texto', content: 'Texto de prueba' }]}
      />
    );
    expect(screen.getByText('Título de prueba')).toBeInTheDocument();
    expect(screen.getByText('Texto de prueba')).toBeInTheDocument();
  });

  it('aplica clases personalizadas si se pasan', () => {
    render(
      <BasicTextCard
        title="Título"
        subtitles={[]}
        bgColor="bg-red-500"
      />
    );
    const card = screen.getByText('Título').closest('div');
    expect(card).toHaveClass('bg-red-500');
  });
});