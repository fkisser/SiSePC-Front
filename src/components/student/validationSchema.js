import * as Yup from 'yup';

export const studentValidationSchema = Yup.object().shape({
  mail: Yup.string().email('Email inválido').required('Campo Requerido'),
  password: Yup.string().min(6, 'Mínimo de caracteres: 6').required('Campo Requerido'),
}).required();