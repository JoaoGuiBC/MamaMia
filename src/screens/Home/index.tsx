import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import happyEmojiImg from '@assets/happy.png';

import {
  Container,
  Greetings,
  GreetingsEmoji,
  GreetingsText,
  Header,
} from './styles';

export function Home() {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Header>
        <Greetings>
          <GreetingsEmoji source={happyEmojiImg} />
          <GreetingsText>Olá, John Doe</GreetingsText>
        </Greetings>

        <TouchableOpacity>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
    </Container>
  );
}
