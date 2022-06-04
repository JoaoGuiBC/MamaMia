import React from 'react';
import { Platform } from 'react-native';

import { BackButton } from '@components/BackButton';
import { RadioButton } from '@components/RadioButton';

import { Container, Header, Image, Sizes } from './styles';

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

      <Sizes>
        <RadioButton title="Pequeno" isSelected={false} />
        <RadioButton title="Grande" isSelected />
      </Sizes>
    </Container>
  );
}
