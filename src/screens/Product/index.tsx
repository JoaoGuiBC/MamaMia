import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Alert, Platform, ScrollView, TouchableOpacity } from 'react-native';

import { Photo } from '@components/Photo';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { BackButton } from '@components/BackButton';
import { PriceInput } from '@components/PriceInput';

import { storage, firestore } from '@utils/firebase';
import { transformUriIntoBlob } from '@utils/transformUriIntoBlob';
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
  const [isLoading, setIsLoading] = useState(false);

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchDescription: string = watch('description');

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
    setIsLoading(true);

    const blob = await transformUriIntoBlob(image);

    const filename = new Date().getTime();
    const reference = ref(storage, `/pizzas/${filename}.png`);

    await uploadBytes(reference, blob);
    const photoUrl = await getDownloadURL(reference);

    const docData = {
      name: product.name,
      name_insensitive: product.name.toLowerCase().trim(),
      description: product.description,
      prices_sizes: {
        p: product.smallSizePrice,
        m: product.mediumSizePrice,
        l: product.largeSizePrice,
      },
      photo_url: photoUrl,
      photo_path: reference.fullPath,
    };
    await setDoc(doc(firestore, 'pizzas', String(filename)), docData)
      .then(() => Alert.alert('Cadastro', 'pizza cadastrada!'))
      .catch(() =>
        Alert.alert(
          'Cadastro',
          'houve um erro ao cadastrar a pizza, por favor tente novamente mais tarde',
        ),
      );

    setIsLoading(false);
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
            <Input
              control={control}
              name="name"
              errors={errors}
              autoCapitalize="words"
            />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>
                {watchDescription?.length || 0} de 60 caracteres
              </MaxCharacters>
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
            <Button
              title="Cadastrar pizza"
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />
          </GestureHandlerRootView>
        </Form>
      </ScrollView>
    </Container>
  );
}
