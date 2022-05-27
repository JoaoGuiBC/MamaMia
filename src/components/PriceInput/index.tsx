import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, PizzaSize, Label, Input } from './styles';

interface PriceInputProps extends TextInputProps {
  size: string;
}

export function PriceInput({ size, ...rest }: PriceInputProps) {
  return (
    <Container>
      <PizzaSize>
        <Label>{size}</Label>
      </PizzaSize>

      <Label>R$</Label>

      <Input keyboardType="numeric" {...rest} />
    </Container>
  );
}
