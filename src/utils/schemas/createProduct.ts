import * as yup from 'yup';

export type CreateProductFormData = {
  name: string;
  description: string;
  smallSizePrice: number;
  mediumSizePrice: number;
  largeSizePrice: number;
};

export const schema = yup.object({
  name: yup.string().required('Informe um nome'),
  description: yup
    .string()
    .max(60, 'Máximo de caracteres é 60')
    .required('Informe os ingredientes'),
  smallSizePrice: yup
    .number()
    .transform((_, value) => {
      if (value.includes('.')) {
        return null;
      }
      return +value.replace(/,/, '.');
    })
    .positive()
    .required('Informe um preço')
    .typeError('Informe um número válido'),
  mediumSizePrice: yup
    .number()
    .transform((v, o) => (o === '' ? null : v))
    .required('Informe um preço')
    .typeError('Informe um número válido'),
  largeSizePrice: yup
    .number()
    .transform((v, o) => (o === '' ? null : v))
    .required('Informe um preço')
    .typeError('Informe um número válido'),
});
