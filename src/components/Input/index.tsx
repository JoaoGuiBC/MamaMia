import React, { useState } from 'react';
import type { TextInputProps } from 'react-native';

import {
  Container,
  InputArea,
  HideTextButton,
  TypeProps,
  Icon,
} from './styles';

type InputProps = TextInputProps & {
  type?: TypeProps;
  isSecret?: boolean;
};

export function Input({
  type = 'primary',
  isSecret = false,
  ...rest
}: InputProps) {
  const [isTextHidden, setIsTextHidden] = useState(true);

  function handleUpdateTextVisibility() {
    setIsTextHidden(oldState => !oldState);
  }

  return (
    <Container>
      <InputArea type={type} secureTextEntry={isTextHidden} {...rest} />

      {isSecret && (
        <HideTextButton onPress={handleUpdateTextVisibility}>
          <Icon isHidden={isTextHidden} />
        </HideTextButton>
      )}
    </Container>
  );
}
