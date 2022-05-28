import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller, FieldValues } from 'react-hook-form';

import {
  Container,
  Content,
  ErrorMessage,
  InputArea,
  HideTextButton,
  TypeProps,
  Icon,
} from './styles';

type InputProps = TextInputProps & {
  type?: TypeProps;
  isSecret?: boolean;
  name: string;
  control: Control<FieldValues, any>; // eslint-disable-line
  errors: {
    [x: string]: any; // eslint-disable-line
  };
};

export function Input({
  type = 'primary',
  isSecret = false,
  name,
  control,
  errors,
  ...rest
}: InputProps) {
  const [isTextHidden, setIsTextHidden] = useState(isSecret);

  function handleUpdateTextVisibility() {
    setIsTextHidden(oldState => !oldState);
  }

  return (
    <Container>
      <Content isErrored={errors[name]}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onBlur, onChange, value } }) => (
            <InputArea
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              type={type}
              secureTextEntry={isTextHidden}
              {...rest}
            />
          )}
        />

        {isSecret && (
          <HideTextButton onPress={handleUpdateTextVisibility}>
            <Icon isHidden={isTextHidden} />
          </HideTextButton>
        )}
      </Content>
      {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
    </Container>
  );
}
