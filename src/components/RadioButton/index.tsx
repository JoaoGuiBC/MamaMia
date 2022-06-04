import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Radio,
  RadioButtonContainerProps,
  Selected,
  Title,
} from './styles';

interface RadioButtonProps
  extends TouchableOpacityProps,
    RadioButtonContainerProps {
  title: string;
}

export function RadioButton({
  title,
  isSelected = false,
  ...rest
}: RadioButtonProps) {
  return (
    <Container isSelected={isSelected} {...rest}>
      <Radio>{isSelected && <Selected />}</Radio>

      <Title>{title}</Title>
    </Container>
  );
}
