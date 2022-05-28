import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';

import { Photo } from '@components/Photo';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { BackButton } from '@components/BackButton';
import { PriceInput } from '@components/PriceInput';

import { CreateProductFormData, schema } from '@utils/schemas/createProduct';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButtonContainer,
  Form,
  InputGroup,
  Label,
  InputGroupHeader,
  MaxCharacters,
} from './styles';

export function Product() {
  const [image, setImage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleCreateProduct(product: CreateProductFormData) {
    console.log(product);
  }

  const onSubmit = (data: any) => handleCreateProduct(data);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <BackButton />

        <Title>Cadastrar</Title>

        <TouchableOpacity>
          <DeleteLabel>Deletar</DeleteLabel>
        </TouchableOpacity>
      </Header>
      <ScrollView>
        <Upload>
          <Photo uri={image} />

          <PickImageButtonContainer>
            <Button
              title="Carregar"
              type="secondary"
              onPress={handlePickImage}
            />
          </PickImageButtonContainer>
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input control={control} name="name" errors={errors} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>

            <Input
              control={control}
              name="description"
              errors={errors}
              multiline
              maxLength={60}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <PriceInput
              size="P"
              control={control}
              name="smallSizePrice"
              errors={errors}
            />
            <PriceInput
              size="M"
              control={control}
              name="mediumSizePrice"
              errors={errors}
            />
            <PriceInput
              size="G"
              control={control}
              name="largeSizePrice"
              errors={errors}
            />
          </InputGroup>

          <GestureHandlerRootView>
            <Button title="Cadastrar pizza" onPress={handleSubmit(onSubmit)} />
          </GestureHandlerRootView>
        </Form>
      </ScrollView>
    </Container>
  );
}
