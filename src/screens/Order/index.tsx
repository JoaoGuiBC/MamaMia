import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { PIZZA_TYPES } from '@utils/pizzaTypes';
import { OrderPizzaFormData, schema } from '@utils/schemas/orderPizza';

import { BackButton } from '@components/BackButton';
import { RadioButton } from '@components/RadioButton';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Container,
  ContentScroll,
  Form,
  FormRow,
  Header,
  Image,
  InputGroup,
  Label,
  Price,
  Sizes,
  Title,
} from './styles';

export function Order() {
  const [selectedSize, setSelectedSize] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleOrderPizza(data: OrderPizzaFormData) {
    if (!selectedSize) {
      return Alert.alert('Pedido', 'Por favor informe o tamanho da pizza');
    }
    console.log({ ...data, selectedSize });
  }

  const onSubmit = (data: any) => handleOrderPizza(data);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ContentScroll>
        <Header>
          <BackButton
            onPress={() => console.log('a')}
            style={{ marginBottom: 108 }}
          />
        </Header>

        <Image
          source={{
            uri: 'https://www.seekpng.com/png/full/148-1483373_cheese-pizza-cheese-pizza-top-view-png.png',
          }}
        />

        <Form>
          <Title>Nome da pizza</Title>
          <Label>Selecione um tamanho</Label>

          <Sizes>
            {PIZZA_TYPES.map(type => (
              <RadioButton
                key={type.id}
                title={type.name}
                onPress={() => setSelectedSize(type.id)}
                isSelected={selectedSize === type.id}
              />
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input
                control={control}
                name="table"
                errors={errors}
                keyboardType="numeric"
              />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                control={control}
                name="quantity"
                errors={errors}
                keyboardType="numeric"
              />
            </InputGroup>
          </FormRow>

          <Price>Valor da pizza: R$ 50,00</Price>

          <GestureHandlerRootView>
            <Button title="Confirmar pedido" onPress={handleSubmit(onSubmit)} />
          </GestureHandlerRootView>
        </Form>
      </ContentScroll>
    </Container>
  );
}
