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
import { Controller, useForm } from "react-hook-form";
import { studentInitialValues } from "./initialValues";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentValidationSchema } from "./validationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
	createStudent,
	fetchStudents,
	updateStudent,
} from "../../axios/students";
import { useState } from "react";

const AddStudent = ({ open, setOpen, values = null, id = null }) => {
	const handleClose = () => {
		reset(values ? values : studentInitialValues);
		setOpen(false);
	};
	const { control, handleSubmit, reset } = useForm({
		defaultValues: values ? values : studentInitialValues,
		resolver: yupResolver(studentValidationSchema),
		reValidateMode: "onChange",
	});
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.user.currentUser);
	const onSubmit = async (data) => {
		let result = false;
		if (values) {
			result = await updateStudent(dispatch, token, data, id);
			//fetch solo al student modificado
		} else {
			result = await createStudent(dispatch, token, data);
			fetchStudents(dispatch, token);
		}
		setOpenBDr(true);
		if (result) handleClose();
	};
	const { curriculums } = useSelector((state) => state.curriculums);
	const { isLoading, error } = useSelector((state) => state.student);
	const [openBDr, setOpenBDr] = useState();
	const handleCloseBDr = () => {
		setOpenBDr(false);
	};
	return (
		<Dialog
			open={open}
			onClose={handleClose}>
			<DialogTitle>
				{values ? "Modificar información personal" : "Agregar estudiante"}
			</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl>
						<Box
							sx={{ display: "grid", gap: 3, justifyContent: "center", mt: 2 }}>
							<Box
								display={"flex"}
								gap={1}
								sx={{ flexDirection: { xs: "column", sm: "row" } }}>
								<Controller
									name="apellido"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											name="apellido"
											type="text"
											label="Apellido"
											variant="outlined"
											required
											error={String(error).includes("apellido")}
											helperText={
												String(error).includes("apellido") ? String(error) : ""
											}
										/>
									)}
								/>
								<Controller
									name="nombre"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											name="nombre"
											type="text"
											required
											label="Nombre"
											variant="outlined"
											error={String(error).includes("nombre")}
											helperText={
												String(error).includes("nombre") ? String(error) : ""
											}
										/>
									)}
								/>
								<Controller
									name="dni"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											name="dni"
											type="number"
											min={1000000}
											required
											label="DNI"
											variant="outlined"
											error={String(error).includes("DNI")}
											helperText={
												String(error).includes("DNI") ? String(error) : ""
											}
										/>
									)}
								/>
							</Box>
							<Box
								display={"flex"}
								gap={1}
								sx={{ flexDirection: { xs: "column", sm: "row" } }}>
								<Controller
									name="mail"
									control={control}
									render={({ field }) => (
										<TextField
											fullWidth
											{...field}
											name="mail"
											type="email"
											required
											label="Mail"
											variant="outlined"
											error={String(error).includes("mail")}
											helperText={
												String(error).includes("mail") ? String(error) : ""
											}
										/>
									)}
								/>
								<Controller
									name="celular"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											name="celular"
											type="text"
											label="Celular"
											variant="outlined"
											error={String(error).includes("celular")}
											helperText={
												String(error).includes("celular") ? String(error) : ""
											}
										/>
									)}
								/>
							</Box>
							<Controller
								name="ciudad"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										name="ciudad"
										type="text"
										label="Localidad"
										variant="outlined"
										error={String(error).includes("localidad")}
										helperText={
											String(error).includes("localidad") ? String(error) : ""
										}
									/>
								)}
							/>
							<Controller
								name="plan"
								control={control}
								render={({ field }) => (
									<Box position={"relative"}>
										<InputLabel id="plan">Plan *</InputLabel>
										<Select
											fullWidth
											{...field}
											disabled={values ? true : false}
											labelId="plan"
											name="plan"
											type="text"
											required
											label="Plan"
											variant="outlined">
											{curriculums?.map((curriculum) => (
												<MenuItem
													key={curriculum._id}
													value={
														curriculum._id
													}>{`${curriculum.año} - ${curriculum.carrera.nombre}`}</MenuItem>
											))}
										</Select>
									</Box>
								)}
							/>
							<Controller
								name="cursando"
								control={control}
								render={({ field }) => (
									<Box
										position={"relative"}
										display={"flex"}
										alignItems={"center"}
										gap={1}>
										<Switch
											{...field}
											checked={field.value}
											name="cursando"
											id="cursando"
										/>
										<FormLabel htmlFor="cursando">
											Cursa este cuatrimestre
										</FormLabel>
									</Box>
								)}
							/>
							<Controller
								name="trabaja"
								control={control}
								render={({ field }) => (
									<Box
										display={"flex"}
										alignItems={"center"}
										gap={1}>
										<Switch
											{...field}
											checked={field.value}
											name="trabaja"
											id="trabaja"
										/>
										<FormLabel htmlFor="trabaja">Trabaja</FormLabel>
									</Box>
								)}
							/>
							<Controller
								name="relCarrera"
								control={control}
								render={({ field }) => (
									<Box
										display={"flex"}
										alignItems={"center"}
										gap={1}>
										<Switch
											{...field}
											checked={field.value}
											name="relCarrera"
											id="relCarrera"
										/>
										<FormLabel htmlFor="relCarrera">
											El trabajo está relacionado con la carrera
										</FormLabel>
									</Box>
								)}
							/>
							<Controller
								name="horarioTrabajo"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										name="horarioTrabajo"
										type="text"
										placeholder="Horarios de trabajo"
										variant="outlined"
									/>
								)}
							/>
							<Controller
								name="detallesTrabajo"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										name="detallesTrabajo"
										type="text"
										placeholder="Descripcion del trabajo"
										variant="outlined"
										multiline
										minRows={3}
									/>
								)}
							/>

							<DialogActions>
								<Button onClick={handleClose}>Cancelar</Button>
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
					</FormControl>
				</form>
			</DialogContent>
			<Backdrop
				open={openBDr}
				onClick={handleCloseBDr}>
				<Paper sx={{ p: 4 }}>
					<Typography color={error ? "error" : "success"}>
						{error
							? error
							: values
							? "Estudiante modificado correctamente"
							: "Estudiante agregado correctamente"}
					</Typography>
				</Paper>
			</Backdrop>
		</Dialog>
	);
};

export default AddStudent;
