// Footer.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../footer';

// Mock de next/image para pruebas
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe('Footer Component', () => {
    test('renderiza el logo correctamente', () => {
        render(<Footer />);
        
        // Verificar logo
        const logoImage = screen.getByAltText('FlowBite Logo');
        expect(logoImage).toHaveAttribute('src', 'https://flowbite.com/docs/images/logo.svg');
        
        // Verificar texto del logo usando jerarquía del DOM
        const logoLink = screen.getByRole('link', { name: /flowbite logo/i });
        const logoText = logoLink.querySelector('span');
        expect(logoText).toHaveTextContent('Cargo Link');
      })

  test('muestra todas las secciones principales', () => {
    render(<Footer />);
    
    // Verifica los títulos de las secciones
    expect(screen.getByText('Resources'));
    expect(screen.getByText('Follow us'));
    expect(screen.getByText('Legal'));
  });

  test('contiene los enlaces correctos', () => {
    render(<Footer />);
    
    // Verifica enlaces de Resources
    expect(screen.getByRole('link', { name: 'Flowbite' }));
    expect(screen.getByRole('link', { name: 'Tailwind CSS' }));
    
    // Verifica enlaces de Follow us
    expect(screen.getByRole('link', { name: 'Github' }));
    expect(screen.getByRole('link', { name: 'Discord' }));
    
    // Verifica enlaces de Legal
    expect(screen.getByRole('link', { name: 'Privacy Policy' }));
    expect(screen.getByRole('link', { name: 'Terms & Conditions' }));
  });

//   test('muestra el copyright correctamente', () => {
//     render(<Footer />);
    
//     // Verificación en la normalización de espacios y estructura del footer
//     const copyrightElement = screen.getByText((content, element) => {
//       const textContent = element?.textContent
//         ?.replace(/\s+/g, ' ') // Normaliza espacios múltiples
//         .trim() || '';
        
//       return (
//         textContent.includes('2023') &&
//         textContent.includes('Cargo Link') && // Con espacio entre palabras
//         textContent.includes('All Rights Reserved') &&
//         element?.tagName.toLowerCase() === 'span' // Asegura que es el contenedor padre
//       );
//     });
  
//     expect(copyrightElement).toBeInTheDocument();
//   });

  test('aplica las clases de estilo correctas', () => {
    const { container } = render(<Footer />);
    
    // Verifica clases principales
    const footerElement = container.querySelector('footer');
    expect(footerElement).toHaveClass('bg-white');
    expect(footerElement).toHaveClass('mt-5');
    
    // Verifica grid responsive
    const gridElement = container.querySelector('.sm\\:grid-cols-3');
    expect(gridElement).toBeInTheDocument();
  });
});