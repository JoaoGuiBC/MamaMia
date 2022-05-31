import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Content,
  Description,
  Details,
  Identification,
  Image,
  Name,
  Separator,
} from './styles';

export type ProductData = {
  id: string;
  photo_url: string;
  name: string;
  description: string;
};

interface ProductCardProps extends RectButtonProps {
  data: ProductData;
}

export function ProductCard({ data, ...rest }: ProductCardProps) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
          </Identification>

          <Description>{data.description}</Description>
        </Details>
      </Content>

      <Separator />
    </Container>
  );
}
