// form dialog, ver validaciones y uso en login

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
	Input,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { studentInitialValues } from "./initialValues";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentValidationSchema } from "./validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { createStudent, fetchStudents } from "../../axios/students";
import { useState } from "react";

const AddStudent = ({ open, setOpen }) => {
	const handleClose = () => {
		setOpen(false);
	};
	const { control, handleSubmit } = useForm({
		defaultValues: studentInitialValues,
		resolver: yupResolver(studentValidationSchema),
		reValidateMode: "onChange",
	});
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.user.currentUser);
	const onSubmit = async (data) => {
		console.log(data);
		const result = await createStudent(dispatch, token, data);
		setOpenBDr(true);
		if (result) {
			handleClose();
			fetchStudents(dispatch, token);
		}
	};
	const { curriculums } = useSelector((state) => state.curriculums);
	const { isLoading, error } = useSelector((state) => state.students);
	const [openBDr, setOpenBDr] = useState();
	const handleCloseBDr = () => {
		setOpenBDr(false);
	};
	return (
		<Dialog
			open={open}
			onClose={handleClose}>
			<DialogTitle>Agregar estudiante</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl
						sx={{ display: "grid", gap: 3, justifyContent: "center" }}>
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
										placeholder="Apellido*"
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
										placeholder="Nombre*"
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
										placeholder="DNI*"
										variant="outlined"
										error={String(error).includes("dni")}
										helperText={
											String(error).includes("dni") ? String(error) : ""
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
										{...field}
										name="mail"
										type="email"
										required
										placeholder="Mail*"
										variant="outlined"
										// error={String(error).includes("usuario")}

										helperText={
											"" // String(error).includes("usuario") ? String(error) : ""
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
										name="celular"
										type="text"
										placeholder="Celular"
										variant="outlined"
										// error={String(error).includes("usuario")}
										helperText={
											"" // String(error).includes("usuario") ? String(error) : ""
										}
									/>
								)}
							/>
							<Controller
								name="ciudad"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										name="ciudad"
										type="text"
										placeholder="Localidad"
										variant="outlined"
										// error={String(error).includes("usuario")}

										helperText={
											"" // String(error).includes("usuario") ? String(error) : ""
										}
									/>
								)}
							/>
						</Box>
						<Controller
							name="plan"
							control={control}
							render={({ field }) => (
								<FormControl fullWidth>
									<InputLabel id="plan">Plan</InputLabel>
									<Select
										{...field}
										labelId="plan"
										name="plan"
										type="text"
										label="Plan*"
										variant="outlined">
										{curriculums?.map((curriculum) => (
											<MenuItem
												key={curriculum._id}
												value={
													curriculum._id
												}>{`${curriculum.año} - ${curriculum.carrera.nombre}`}</MenuItem>
										))}
									</Select>
								</FormControl>
							)}
						/>
						<Controller
							name="cursando"
							control={control}
							render={({ field }) => (
								<Box
									display={"flex"}
									alignItems={"center"}
									gap={1}>
									<Input
										{...field}
										name="cursando"
										id="cursando"
										type="checkbox"
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
									<Input
										{...field}
										name="trabaja"
										id="trabaja"
										type="checkbox"
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
									<Input
										{...field}
										name="relCarrera"
										id="relCarrera"
										type="checkbox"
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
								{isLoading ? <CircularProgress size={24} /> : "Ingresar"}
							</Button>
						</DialogActions>
						{/* {error && <Typography>{error.toString()}</Typography>} */}
					</FormControl>
				</form>
			</DialogContent>
			<Backdrop
				open={openBDr}
				onClick={handleCloseBDr}>
				<Paper>
					<Typography color={error ? "error" : "white"}>
						{isLoading ? (
							<CircularProgress />
						) : error ? (
							error
						) : (
							"Estudiante agregado correctamente"
						)}
					</Typography>
				</Paper>
			</Backdrop>
		</Dialog>
	);
};

export default AddStudent;
