import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';

import { Photo } from '@components/Photo';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { BackButton } from '@components/BackButton';
import { PriceInput } from '@components/PriceInput';

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
            <Input />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>

            <Input multiline maxLength={60} />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <PriceInput size="P" />
            <PriceInput size="M" />
            <PriceInput size="G" />
          </InputGroup>

          <Button title="Cadastrar pizza" />
        </Form>
      </ScrollView>
    </Container>
  );
}
