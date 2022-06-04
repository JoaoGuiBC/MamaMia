import * as yup from 'yup';

export type OrderPizzaFormData = {
  table: number;
  quantity: number;
};

export const schema = yup.object({
  table: yup
    .number()
    .transform((v, o) => (o === '' ? null : v))
    .required('Informe o número da mesa')
    .typeError('Informe um número válido'),
  quantity: yup
    .number()
    .transform((v, o) => (o === '' ? null : v))
    .required('Informe a quantidade')
    .typeError('Informe um número válido'),
});
