import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import brandImg from '../../assets/brand.png';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel,
} from './styles';

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Content>
          <Brand source={brandImg} />

          <Title>Login</Title>

          <Input
            placeholder="E-Mail"
            type="secondary"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <Input placeholder="Senha" type="secondary" secureTextEntry />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button
            title="Entrar"
            type="secondary"
            onPress={() => console.log('test')}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
