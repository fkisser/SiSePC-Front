import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormLabel,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { studentInitialValues } from "./initialValues";
import { studentValidationSchema } from "./validationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
	createStudent,
	fetchStudents,
	updateStudent,
} from "../../axios/students";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";

const AddStudent = ({ open, setOpen, values = null, id = null }) => {
	const handleClose = () => {
		setOpen(false);
	};

	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.user.currentUser);
	const { curriculums } = useSelector((state) => state.curriculums);
	const { tutores } = useSelector((state) => state.tutores);
	const { isLoading, error } = useSelector((state) => state.student);
	const [openBDr, setOpenBDr] = useState(false);

	const handleCloseBDr = () => {
		setOpenBDr(false);
		handleClose();
	};
	const handleSubmit = async (data) => {
		setOpenBDr(true); // Mostrar Backdrop
		if (values) {
			await updateStudent(dispatch, token, data, id);
			//fetch solo al student modificado
		} else {
			await createStudent(dispatch, token, data);
			fetchStudents(dispatch, token);
		}
	};
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth
			maxWidth={"lg"}>
			<DialogTitle color={"primary"}>
				{values ? "Modificar información personal" : "Agregar estudiante"}
			</DialogTitle>
			<DialogContent>
				<Formik
					initialValues={values ? { ...values } : studentInitialValues}
					validationSchema={studentValidationSchema}
					onSubmit={handleSubmit}>
					{({ errors, touched }) => (
						<Form>
							<Box
								display="flex"
								flexDirection="column"
								gap={1}
								marginTop={1}>
								<Box
									display={"flex"}
									gap={1}>
									<Field
										as={TextField}
										name="apellido"
										label="Apellido"
										variant="outlined"
										error={touched.apellido && Boolean(errors.apellido)}
										helperText={<ErrorMessage name="apellido" />}
										fullWidth
									/>
									<Field
										as={TextField}
										name="nombre"
										label="Nombre"
										variant="outlined"
										error={touched.nombre && Boolean(errors.nombre)}
										helperText={<ErrorMessage name="nombre" />}
										fullWidth
									/>
									<Field
										as={TextField}
										name="dni"
										type="number"
										label="DNI"
										variant="outlined"
										error={touched.dni && Boolean(errors.dni)}
										helperText={<ErrorMessage name="dni" />}
										fullWidth
									/>
								</Box>
								<Box
									display={"flex"}
									gap={1}>
									<Field
										as={TextField}
										name="mail"
										label="Mail"
										type="email"
										variant="outlined"
										error={touched.mail && Boolean(errors.mail)}
										helperText={<ErrorMessage name="mail" />}
										fullWidth
									/>
									<Field
										as={TextField}
										name="celular"
										label="Celular"
										variant="outlined"
										error={touched.celular && Boolean(errors.celular)}
										helperText={<ErrorMessage name="celular" />}
										fullWidth
									/>
									<Field
										as={TextField}
										name="ciudad"
										label="Ciudad"
										variant="outlined"
										error={touched.ciudad && Boolean(errors.ciudad)}
										helperText={<ErrorMessage name="ciudad" />}
										fullWidth
									/>
								</Box>
								<Box
									display={"flex"}
									gap={1}>
									<FormControl fullWidth>
										<InputLabel id="plan">Plan</InputLabel>
										<Field
											as={Select}
											name="plan"
											labelId="plan"
											label="Plan"
											variant="outlined"
											error={touched.plan && Boolean(errors.plan)}
											helperText={<ErrorMessage name="plan" />}>
											{curriculums?.map((curriculum) => (
												<MenuItem
													key={curriculum._id}
													value={
														curriculum._id
													}>{`${curriculum.año} - ${curriculum.carrera.nombre}`}</MenuItem>
											))}
										</Field>
										<ErrorMessage
											name="plan"
											component="p"
											style={{
												color: "#d32f2f",
												fontSize: 12.5,
												paddingLeft: 15,
												marginTop: 1,
											}}
										/>
									</FormControl>
									<FormControl fullWidth>
										<InputLabel id="añoIngreso">Año de inscripción</InputLabel>
										<Field
											as={Select}
											name="añoIngreso"
											labelId="añoIngreso"
											label="Año de inscripción"
											variant="outlined"
											error={touched.añoIngreso && Boolean(errors.añoIngreso)}>
											<MenuItem value="">Desconocido</MenuItem>
											<MenuItem value="2023">2023</MenuItem>
											<MenuItem value="2024">2024</MenuItem>
											<MenuItem value="2025">2025</MenuItem>
											<MenuItem value="2026">2026</MenuItem>
											<MenuItem value="2027">2027</MenuItem>
											<MenuItem value="2028">2028</MenuItem>
											<MenuItem value="2029">2029</MenuItem>
											<MenuItem value="2030">2030</MenuItem>
										</Field>
										<ErrorMessage
											name="añoIngreso"
											component="div"
										/>
									</FormControl>
									<FormControl fullWidth>
										<InputLabel id="cuatIngreso">
											Cuat. de inscripción
										</InputLabel>
										<Field
											as={Select}
											name="cuatIngreso"
											labelId="cuatIngreso"
											label="Cuat. de inscripción"
											variant="outlined"
											error={
												touched.cuatIngreso && Boolean(errors.cuatIngreso)
											}>
											<MenuItem value="">Desconocido</MenuItem>
											<MenuItem value="1C">1C</MenuItem>
											<MenuItem value="2C">2C</MenuItem>
										</Field>
										<ErrorMessage
											name="cuatIngreso"
											component="div"
										/>
									</FormControl>
									<FormControl fullWidth>
										<InputLabel id="relPrograma">Estado </InputLabel>
										<Field
											as={Select}
											name="relPrograma"
											labelId="relPrograma"
											label="Estado"
											variant="outlined"
											error={
												touched.relPrograma && Boolean(errors.relPrograma)
											}>
											<MenuItem value="Activo">Activo</MenuItem>
											<MenuItem value="Pasivo">Pasivo</MenuItem>
											<MenuItem value="Abandonó">Abandonó</MenuItem>
											<MenuItem value="Graduado">Graduado</MenuItem>
										</Field>
										<ErrorMessage
											name="relPrograma"
											component="div"
										/>
									</FormControl>
								</Box>
								<Box
									display={"flex"}
									gap={1}
									alignItems={"center"}>
									<FormControl fullWidth>
										<Box>
											<FormLabel htmlFor="trabaja">Trabaja</FormLabel>
											<Field
												as={Switch}
												name="trabaja"
												id="trabaja"
												label="Trabaja"
												variant="outlined"
												error={touched.trabaja && Boolean(errors.trabaja)}
											/>
										</Box>
									</FormControl>
									<FormControl fullWidth>
										<Box>
											<FormLabel htmlFor="relCarrera">
												El trabajo está relacionado con la carrera
											</FormLabel>
											<Field
												as={Switch}
												name="relCarrera"
												id="relCarrera"
												label="El trabajo está relacionado con la carrera"
												variant="outlined"
												error={touched.relCarrera && Boolean(errors.relCarrera)}
											/>
										</Box>
									</FormControl>
									<Field
										as={TextField}
										name="horarioTrabajo"
										label="Horario de trabajo"
										variant="outlined"
										error={
											touched.horarioTrabajo && Boolean(errors.horarioTrabajo)
										}
										helperText={<ErrorMessage name="horarioTrabajo" />}
										fullWidth
									/>
								</Box>
								<Field
									as={TextField}
									name="detallesTrabajo"
									label="Detalles del trabajo"
									variant="outlined"
									multiline
									rows={2}
									error={
										touched.detallesTrabajo && Boolean(errors.detallesTrabajo)
									}
									helperText={<ErrorMessage name="detallesTrabajo" />}
								/>
								<Box
									display={"flex"}
									gap={1}
									justifyContent={"space-between"}>
									<FormControl sx={{ width: "30%" }}>
										<InputLabel id="tutores">Tutor/a designado/a</InputLabel>
										<Field
											as={Select}
											name="tutores"
											labelId="tutores"
											label="Tutor/a designado/a"
											variant="outlined"
											error={touched.tutores && Boolean(errors.tutores)}>
											<MenuItem
												value={""}
												defaultValue={"Ninguno"}>
												Ninguno
											</MenuItem>
											{tutores.map((tutor) => (
												<MenuItem
													key={tutor._id}
													value={
														tutor._id
													}>{`${tutor.nombre} ${tutor.apellido}`}</MenuItem>
											))}
										</Field>
										<ErrorMessage
											name="relPrograma"
											component="div"
										/>{" "}
									</FormControl>
									<DialogActions>
										<Button
											color={"error"}
											onClick={handleClose}>
											Cancelar
										</Button>
										<Button
											type="submit"
											variant="contained"
											color="primary">
											{isLoading ? (
												<CircularProgress size={24} />
											) : values ? (
												"Modificar"
											) : (
												"Agregar"
											)}
										</Button>
									</DialogActions>
								</Box>
							</Box>
						</Form>
					)}
				</Formik>
				<Backdrop
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={openBDr}
					onClick={handleCloseBDr}>
					{isLoading ? (
						<CircularProgress color="inherit" />
					) : (
						<Paper
							elevation={3}
							sx={{ padding: 4 }}>
							<Typography
								variant={"h6"}
								color={error ? "error" : "primary"}>
								{error ? error : <ThumbUpIcon fontSize="large" />}
							</Typography>
						</Paper>
					)}
				</Backdrop>
			</DialogContent>
		</Dialog>
	);
};

export default AddStudent;
