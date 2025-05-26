import { render, screen, fireEvent } from '@testing-library/react';
import QuantityInput from '../QuantityInput';

describe('QuantityInput', () => {
  let value = 1;
  const setValue = jest.fn((name, val) => { value = val; });
  const watch = jest.fn(() => value);

  beforeEach(() => {
    value = 1;
    setValue.mockClear();
    watch.mockClear();
  });

  it('renderiza el valor inicial y los botones', () => {
    render(
      <QuantityInput
        id="qty"
        name="qty"
        min={1}
        max={5}
        step={1}
        setValue={setValue}
        watch={watch}
      />
    );
    expect(screen.getByRole('spinbutton')).toHaveValue(1);
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
  });

  it('incrementa el valor al hacer click en "+"', () => {
    render(
      <QuantityInput
        id="qty"
        name="qty"
        min={1}
        max={5}
        step={1}
        setValue={setValue}
        watch={watch}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    expect(setValue).toHaveBeenCalledWith('qty', 2);
  });

  it('decrementa el valor al hacer click en "-"', () => {
    value = 3;
    render(
      <QuantityInput
        id="qty"
        name="qty"
        min={1}
        max={5}
        step={1}
        setValue={setValue}
        watch={watch}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: '-' }));
    expect(setValue).toHaveBeenCalledWith('qty', 2);
  });

  it('no decrementa por debajo del mínimo', () => {
    value = 1;
    render(
      <QuantityInput
        id="qty"
        name="qty"
        min={1}
        max={5}
        step={1}
        setValue={setValue}
        watch={watch}
      />
    );
    expect(screen.getByRole('button', { name: '-' })).toBeDisabled();
  });

  it('no incrementa por encima del máximo', () => {
    value = 5;
    render(
      <QuantityInput
        id="qty"
        name="qty"
        min={1}
        max={5}
        step={1}
        setValue={setValue}
        watch={watch}
      />
    );
    expect(screen.getByRole('button', { name: '+' })).toBeDisabled();
  });

  it('cambia el valor al escribir en el input', () => {
    render(
      <QuantityInput
        id="qty"
        name="qty"
        min={1}
        max={5}
        step={1}
        setValue={setValue}
        watch={watch}
      />
    );
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '4' } });
    expect(setValue).toHaveBeenCalledWith('qty', 4);
  });
});