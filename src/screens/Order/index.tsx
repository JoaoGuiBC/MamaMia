import React from 'react';
import { Platform } from 'react-native';

import { BackButton } from '@components/BackButton';

import { Container, Header, Image } from './styles';

export function Order() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <BackButton
          onPress={() => console.log('a')}
          style={{ marginBottom: 108 }}
        />
      </Header>

      <Image
        source={{
          uri: 'https://www.seekpng.com/png/full/148-1483373_cheese-pizza-cheese-pizza-top-view-png.png',
        }}
      />
    </Container>
  );
}
