import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import brandImg from '@assets/brand.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UseAuth } from '@hooks/auth';

import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel,
} from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, isLoggingIn } = UseAuth();

  function handleSignIn() {
    signIn(email, password);
  }

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
            onChangeText={setEmail}
          />
          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <GestureHandlerRootView>
            <Button
              title="Entrar"
              type="secondary"
              onPress={handleSignIn}
              isLoading={isLoggingIn}
            />
          </GestureHandlerRootView>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
