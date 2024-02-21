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
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../../axios/students";
import { useState } from "react";
import { actionInitialValues } from "./initialValues";
import { actionValidationSchema } from "./validationSchema";
import { newActionsStudent } from "../../redux/students/studentSlice";
import { successActions } from "../../redux/actions/actionsSlice";
import { createGAction } from "../../axios/actions";

const AddAction = ({ open, setOpen, student = false, course = false }) => {
	const handleClose = () => {
		reset(actionInitialValues);
		setOpen(false);
	};
	const { control, handleSubmit, reset } = useForm({
		defaultValues: actionInitialValues,
		resolver: yupResolver(actionValidationSchema),
		reValidateMode: "onChange",
	});
	const dispatch = useDispatch();
	const { token, isAdmin, _id, nombre, apellido } = useSelector(
		(state) => state.user.currentUser
	);
	const { acciones: accionesE, _id: studentId } = useSelector(
		(state) => state.student.currentStudent
	);
	const { actions: accionesG, isLoading: isLoadingG } = useSelector(
		(state) => state.actions
	);
	const { isLoading: isLoadingE, error } = useSelector(
		(state) => state.student
	);
	const { tutores } = useSelector((state) => state.tutores);
	let _tutores;
	if (isAdmin) {
		_tutores = tutores?.map((tutor) => {
			return { label: `${tutor.apellido} ${tutor.nombre}`, value: tutor._id };
		});
	}
	const onSubmit = async (data) => {
		data.id = Date.now();
		if (student) {
			const newActions = [data, ...accionesE];
			dispatch(newActionsStudent(newActions));
			await updateStudent(dispatch, token, { acciones: newActions }, studentId);
		} else if (course) {
			// data.asignadaCatedra = id;
			// const newActions = [data, ...acciones];
			// dispatch(newActionsCourse?(newActions))
			// result = await updateCourse(dispatch, token, data, id);
		} else {
			console.log(data);
			const newActions = [data, ...accionesG];
			dispatch(successActions(newActions));
			await createGAction(dispatch, token, data);
		}
		setOpenBDr(true);
	};
	const [openBDr, setOpenBDr] = useState();
	const handleCloseBDr = () => {
		setOpenBDr(false);
		if (!error) handleClose();
	};
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth>
			<DialogTitle>{"Agregar acción"}</DialogTitle>
			<DialogContent>
				<form
					onSubmit={handleSubmit(onSubmit)}
					style={{ display: "flex", width: "100%" }}>
					<FormControl fullWidth>
						<Box
							display={"flex"}
							flexDirection={"column"}
							width={"100%"}
							mt={2}
							gap={3}
							justifyContent={"center"}>
							<Box
								display={"flex"}
								gap={1}>
								<Controller
									name="fecha"
									control={control}
									render={({ field }) => (
										<TextField
											fullWidth
											{...field}
											name="fecha"
											type="date"
											label={`Fecha`}
											InputLabelProps={{ shrink: true }}
											variant="outlined"
											required
											error={String(error).includes("fecha")}
											helperText={
												String(error).includes("fecha") ? String(error) : ""
											}
										/>
									)}
								/>
								<Controller
									name="tutor"
									control={control}
									render={({ field }) => (
										<Box
											position={"relative"}
											display={"flex"}
											width={"100%"}>
											<InputLabel id="tutor">Tutor/a</InputLabel>
											<Select
												{...field}
												id="tutor"
												fullWidth
												labelId="tutor"
												name="tutor"
												type="text"
												label="Tutor/a"
												variant="outlined">
												{isAdmin ? (
													_tutores?.map((tutor) => (
														<MenuItem
															key={tutor._id}
															value={tutor.value}>
															{tutor.label}
														</MenuItem>
													))
												) : (
													<MenuItem
														key={_id}
														value={_id}>{`${apellido} ${nombre}`}</MenuItem>
												)}
											</Select>
										</Box>
									)}
								/>
							</Box>

							<Controller
								name="descripcion"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										name="descripcion"
										type="text"
										required
										label="Descripción"
										variant="outlined"
										error={String(error).includes("descripcion")}
										helperText={
											String(error).includes("descripcion") ? String(error) : ""
										}
									/>
								)}
							/>
							<Controller
								name="archivo"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										name="archivo"
										type="text"
										label="Link a un archivo"
										variant="outlined"
										error={String(error).includes("archivo")}
										helperText={
											String(error).includes("archivo") ? String(error) : ""
										}
									/>
								)}
							/>

							<Controller
								name="estado"
								control={control}
								render={({ field }) => (
									<Box position={"relative"}>
										<InputLabel id="estado">Estado</InputLabel>
										<Select
											fullWidth
											{...field}
											id="estado"
											labelId="estado"
											name="estado"
											type="text"
											label="Estado"
											variant="outlined">
											<MenuItem value={"No iniciado"}>No iniciado</MenuItem>
											<MenuItem value={"En proceso"}>En proceso</MenuItem>
											<MenuItem value={"Esperando respuesta"}>
												Esperando respuesta
											</MenuItem>
											<MenuItem value={"Finalizado"}>Finalizado</MenuItem>
										</Select>
									</Box>
								)}
							/>
							<Controller
								name="observaciones"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										name="observaciones"
										type="text"
										label="Observaciones"
										variant="outlined"
										error={String(error).includes("observaciones")}
										multiline
										minRows={3}
										helperText={
											String(error).includes("observaciones")
												? String(error)
												: ""
										}
									/>
								)}
							/>

							<DialogActions>
								<Button onClick={handleClose}>Cancelar</Button>
								<Button
									type="submit"
									variant="contained"
									color="primary">
									{isLoadingE || isLoadingG ? (
										<CircularProgress size={24} />
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
						{isLoadingE || isLoadingG ? (
							<CircularProgress />
						) : error ? (
							error
						) : (
							"Acción agregada correctamente"
						)}
					</Typography>
				</Paper>
			</Backdrop>
		</Dialog>
	);
};

export default AddAction;
