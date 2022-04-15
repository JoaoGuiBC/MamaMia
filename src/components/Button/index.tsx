import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Load, Title, TypeProps } from './styles';

type ButtonProps = RectButtonProps & {
  type?: TypeProps;
  title: string;
  isLoading?: boolean;
};

export function Button({ type = 'primary', title, isLoading = false, ...rest }: ButtonProps) {
  return (
    <Container type={type} enabled={!isLoading} {...rest}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  );
}