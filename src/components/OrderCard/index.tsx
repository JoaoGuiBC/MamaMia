import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Description,
  Image,
  Name,
  StatusContainer,
  StatusLabel,
  StatusTypeProps,
} from './styles';

interface OrderCardProps extends TouchableOpacityProps {
  index: number;
  status: StatusTypeProps;
}

export function OrderCard({ index, status, ...rest }: OrderCardProps) {
  return (
    <Container index={index} {...rest}>
      <Image
        source={{
          uri: 'https://www.seekpng.com/png/full/148-1483373_cheese-pizza-cheese-pizza-top-view-png.png',
        }}
      />

      <Name>4 Queijos</Name>

      <Description>Mesa 5 🞄 Quantidade: 1</Description>

      <StatusContainer status={status}>
        <StatusLabel status={status}>{status}</StatusLabel>
      </StatusContainer>
    </Container>
  );
}
