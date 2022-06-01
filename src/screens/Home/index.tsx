import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from 'firebase/firestore';

import happyEmojiImg from '@assets/happy.png';

import { Search } from '@components/Search';
import { ProductCard, ProductData } from '@components/ProductCard';

import { firestore } from '@utils/firebase';

import {
  Container,
  Greetings,
  GreetingsEmoji,
  GreetingsText,
  Header,
  MenuHeader,
  MenuItemCounter,
  NewProductButton,
  Title,
} from './styles';

export function Home() {
  const [pizzas, setPizzas] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const { COLORS } = useTheme();
  const { navigate } = useNavigation();

  async function fetchPizzas(value: string) {
    setIsLoading(true);
    const formattedValue = value.toLowerCase().trim();

    try {
      const pizzasQuery = query(
        collection(firestore, 'pizzas'),
        orderBy('name_insensitive'),
        startAt(formattedValue),
        endAt(`${formattedValue}~`),
      );

      const pizzaQuerySnapshot = await getDocs(pizzasQuery);

      let pizzasData: ProductData[] = [];

      pizzaQuerySnapshot.forEach(doc => {
        const data = doc.data();
        pizzasData = [
          ...pizzasData,
          {
            id: doc.id,
            description: data.description,
            photo_url: data.photo_url,
            name: data.name,
          },
        ];
      });

      setPizzas(pizzasData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      return Alert.alert(
        'Busca de pizzas',
        'Não foi possível buscar pelas pizzas, por favor tente novamente mais tarde',
      );
    }
  }

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleCleanSearch() {
    setSearch('');
    fetchPizzas('');
  }

  function handleSelect(id: string) {
    navigate('product', { id });
  }

  function handleAdd() {
    navigate('product', {});
  }

  useEffect(() => {
    fetchPizzas('');
  }, []);

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

      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleCleanSearch}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemCounter>{pizzas.length} pizzas</MenuItemCounter>
      </MenuHeader>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.PRIMARY_900}
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={pizzas}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ProductCard data={item} onPress={() => handleSelect(item.id)} />
          )}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 125,
            marginHorizontal: 24,
          }}
        />
      )}

      <NewProductButton
        title="Cadastrar Nova Pizza"
        type="secondary"
        onPress={handleAdd}
      />
    </Container>
  );
}
