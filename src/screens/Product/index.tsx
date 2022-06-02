import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from 'styled-components/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { Photo } from '@components/Photo';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { BackButton } from '@components/BackButton';
import { PriceInput } from '@components/PriceInput';

import type { ProductData } from '@components/ProductCard';

import { storage, firestore } from '@utils/firebase';
import { transformUriIntoBlob } from '@utils/transformUriIntoBlob';
import { CreateProductFormData, schema } from '@utils/schemas/createProduct';

import { ProductNavigationProps } from '../../@types/navigation';

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

type PizzaResponse = ProductData & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    l: string;
  };
};

export function Product() {
  const [image, setImage] = useState('');
  const [photoPath, setPhotoPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isImageUpdated, setIsImageUpdated] = useState(false);

  const route = useRoute();
  const { COLORS } = useTheme();
  const { goBack } = useNavigation();
  const { id } = route.params as ProductNavigationProps;

  const {
    watch,
    control,
    setValue,
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
        setIsImageUpdated(true);
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

  async function handleUpdateProduct(product: CreateProductFormData) {
    setIsLoading(true);

    let photo_url = image;
    let photo_path = photoPath;

    if (isImageUpdated) {
      await deleteObject(ref(storage, photoPath));
      const blob = await transformUriIntoBlob(image);

      const reference = ref(storage, `/pizzas/${id}.png`);

      photo_path = reference.fullPath;

      await uploadBytes(reference, blob);
      photo_url = await getDownloadURL(reference);
    }

    const docData = {
      name: product.name,
      name_insensitive: product.name.toLowerCase().trim(),
      description: product.description,
      prices_sizes: {
        p: product.smallSizePrice,
        m: product.mediumSizePrice,
        l: product.largeSizePrice,
      },
      photo_url,
      photo_path,
    };

    await updateDoc(doc(firestore, 'pizzas', id!), docData)
      .then(() => goBack())
      .catch(() =>
        Alert.alert(
          'Cadastro',
          'houve um erro ao atualizar a pizza, por favor tente novamente mais tarde',
        ),
      );

    setIsLoading(false);
  }

  const onSubmitCreate = (data: any) => handleCreateProduct(data);
  const onSubmitUpdate = (data: any) => handleUpdateProduct(data);

  function handleGoBack() {
    goBack();
  }

  useEffect(() => {
    if (id) {
      setIsFetching(true);
      const docRef = doc(firestore, 'pizzas', id);

      getDoc(docRef).then(response => {
        const product = response.data() as PizzaResponse;

        setImage(product.photo_url);
        setPhotoPath(product.photo_path);

        setValue('name', product.name, { shouldValidate: true });
        setValue('description', product.description, { shouldValidate: true });
        setValue('smallSizePrice', `${product.prices_sizes.p}`, {
          shouldValidate: true,
        });
        setValue('mediumSizePrice', `${product.prices_sizes.m}`, {
          shouldValidate: true,
        });
        setValue('largeSizePrice', `${product.prices_sizes.l}`, {
          shouldValidate: true,
        });
        setIsFetching(false);
      });
    }
  }, [id]);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <BackButton onPress={handleGoBack} />

        <Title>Cadastrar</Title>

        {id ? (
          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
      </Header>
      <ScrollView>
        {isFetching ? (
          <ActivityIndicator
            size="large"
            color={COLORS.PRIMARY_900}
            style={{ marginTop: 40 }}
          />
        ) : (
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
        )}

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
            {id ? (
              <Button
                title="Editar pizza"
                isLoading={isLoading}
                onPress={handleSubmit(onSubmitUpdate)}
              />
            ) : (
              <Button
                title="Cadastrar pizza"
                isLoading={isLoading}
                onPress={handleSubmit(onSubmitCreate)}
              />
            )}
          </GestureHandlerRootView>
        </Form>
      </ScrollView>
    </Container>
  );
}
