import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import brandImg from '@assets/brand.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { UseAuth } from '@hooks/auth';
import { schema, SignInFormData } from '@utils/schemas/signIn';

import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel,
} from './styles';

export function SignIn() {
  const { signIn, forgotPassword, isLoggingIn } = UseAuth();
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleSignIn({ email, password }: SignInFormData) {
    signIn(email, password);
  }

  async function handleForgotPassword() {
    const email = getValues('email');
    forgotPassword(email);
  }

  const onSubmit = (data: any) => handleSignIn(data);

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Content>
          <Brand source={brandImg} />

          <Title>Login</Title>

          <Input
            control={control}
            name="email"
            errors={errors}
            placeholder="E-Mail"
            type="secondary"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <Input
            control={control}
            name="password"
            errors={errors}
            placeholder="Senha"
            type="secondary"
            isSecret
            autoCapitalize="none"
          />

          <ForgotPasswordButton onPress={handleForgotPassword}>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <GestureHandlerRootView>
            <Button
              title="Entrar"
              type="secondary"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoggingIn}
            />
          </GestureHandlerRootView>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
