import * as Yup from 'yup';

export const studentValidationSchema = Yup.object().shape({
  apellido: Yup.string().required('Campo Requerido'),
  nombre: Yup.string().required('Campo Requerido'),
  dni: Yup.number().min(5000000, "Debe ser un número más alto").required('Campo Requerido'),
  mail: Yup.string().email('Email inválido').required('Campo Requerido'),
  cursando: Yup.boolean().required('Campo Requerido'),
  trabaja: Yup.boolean().required('Campo Requerido'),
  plan: Yup.string().required('Campo Requerido'),
}).required();


