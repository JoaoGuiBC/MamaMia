import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller, FieldValues } from 'react-hook-form';

import {
  Content,
  PizzaSize,
  Label,
  Input,
  Container,
  ErrorMessage,
} from './styles';

interface PriceInputProps extends TextInputProps {
  size: string;
  name: string;
  control: Control<FieldValues, any>; // eslint-disable-line
  errors: {
    [x: string]: any; // eslint-disable-line
  };
}

export function PriceInput({
  size,
  name,
  control,
  errors,
  ...rest
}: PriceInputProps) {
  return (
    <Container>
      {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
      <Content isErrored={errors[name]}>
        <PizzaSize isErrored={errors[name]}>
          <Label>{size}</Label>
        </PizzaSize>

        <Label>R$</Label>

        <Controller
          control={control}
          name={name}
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
              {...rest}
            />
          )}
        />
      </Content>
    </Container>
  );
}
