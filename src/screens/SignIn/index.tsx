import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Content } from './styles';

export function SignIn() {
  const cucu = () => {
    console.log('a');
  };
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Content>
          <Input
            placeholder="E-Mail"
            type="secondary"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <Input placeholder="Senha" type="secondary" secureTextEntry />

          <Button title="Entrar" type="secondary" onPress={cucu} />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
