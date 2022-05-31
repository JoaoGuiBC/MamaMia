import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import happyEmojiImg from '@assets/happy.png';

import { Search } from '@components/Search';
import { ProductCard } from '@components/ProductCard';

import {
  Container,
  Greetings,
  GreetingsEmoji,
  GreetingsText,
  Header,
  MenuHeader,
  MenuItemCounter,
  Title,
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

      <Search onSearch={() => {}} onClear={() => {}} />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemCounter>5 pizzas</MenuItemCounter>
      </MenuHeader>

      <ProductCard
        data={{
          id: '1',
          name: 'Pizza',
          description: 'Ingrediente 1, ingrediente 2',
          photo_url:
            'https://www.seekpng.com/png/full/148-1483373_cheese-pizza-cheese-pizza-top-view-png.png',
        }}
      />

      <ProductCard
        data={{
          id: '2',
          name: 'Pizza',
          description: 'Ingrediente 1, ingrediente 2',
          photo_url:
            'https://www.seekpng.com/png/full/148-1483373_cheese-pizza-cheese-pizza-top-view-png.png',
        }}
      />
    </Container>
  );
}
