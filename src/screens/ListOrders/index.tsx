import React from 'react';
import { FlatList } from 'react-native';

import { OrderCard } from '@components/OrderCard';
import { ItemSeparator } from '@components/ItemSeparator';
import { StatusTypeProps } from '@components/OrderCard/styles';

import { Container, Header, Title } from './styles';

interface PlaceholderProps {
  status: StatusTypeProps;
}

export function ListOrders() {
  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={
          [
            { status: 'Preparando' },
            { status: 'Entregue' },
            { status: 'Pronto' },
          ] as PlaceholderProps[]
        }
        keyExtractor={item => item.status}
        renderItem={({ item, index }) => (
          <OrderCard index={index} status={item.status} />
        )}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 64, paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
}
