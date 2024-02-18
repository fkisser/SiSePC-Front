import * as Yup from 'yup';

export const actionValidationSchema = Yup.object().shape({
  fecha: Yup.string().required('Campo Requerido'),
  descripcion: Yup.string().required('Campo Requerido'),
}).required();