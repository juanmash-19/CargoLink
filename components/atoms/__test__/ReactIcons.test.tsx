import { render } from '@testing-library/react';
import { ArrowDown, Search } from '../ReactIcons';

describe('ReactIcons', () => {
  it('renderiza el icono ArrowDown', () => {
    const { container } = render(<ArrowDown />);
    // Busca el svg del icono
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renderiza el icono Search', () => {
    const { container } = render(<Search />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});