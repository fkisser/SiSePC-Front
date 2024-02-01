// form dialog, ver validaciones y uso en login

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormLabel,
	Input,
	TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { studentInitialValues } from "./initialValues";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentValidationSchema } from "./validationSchema";

const AddStudent = ({ open, setOpen }) => {
	const handleClose = () => {
		setOpen(false);
	};
	const { control, handleSubmit } = useForm({
		defaultValues: studentInitialValues,
		resolver: yupResolver(studentValidationSchema),
	});
	const onSubmit = (data) => {
		console.log(data);
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
										placeholder="Apellido"
										variant="outlined"
										// error={String(error).includes("usuario")}
										required
										helperText={
											"" // String(error).includes("usuario") ? String(error) : ""
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
										placeholder="Nombre"
										variant="outlined"
										// error={String(error).includes("usuario")}
										required
										helperText={
											"" // String(error).includes("usuario") ? String(error) : ""
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
										placeholder="DNI"
										variant="outlined"
										// error={String(error).includes("usuario")}
										required
										helperText={
											"" // String(error).includes("usuario") ? String(error) : ""
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
										placeholder="Mail"
										variant="outlined"
										// error={String(error).includes("usuario")}
										required
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
										required
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
										required
										helperText={
											"" // String(error).includes("usuario") ? String(error) : ""
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
								name="carrera"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										name="carrera"
										type="text"
										placeholder="Carrera (tiene que ser un select)"
										variant="outlined"
										// error={String(error).includes("usuario")}
										required
										helperText={
											"" // String(error).includes("usuario") ? String(error) : ""
										}
										sx={{ flexGrow: 1 }}
									/>
								)}
							/>
							<Controller
								name="plan"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										name="plan"
										type="text"
										placeholder="Plan"
										variant="outlined"
										// error={String(error).includes("usuario")}
										required
										helperText={
											"" // String(error).includes("usuario") ? String(error) : ""
										}
									/>
								)}
							/>
						</Box>
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
										// error={String(error).includes("usuario")}
										required
									/>
									<FormLabel htmlFor="cursando">
										Cursa este cuatrimestre?
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
										// error={String(error).includes("usuario")}
										required
									/>
									<FormLabel htmlFor="trabaja">Trabaja?</FormLabel>
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
										// error={String(error).includes("usuario")}
										required
									/>
									<FormLabel htmlFor="relCarrera">
										El trabajo está relacionado con la carrera?
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
									// error={String(error).includes("usuario")}
									required
									helperText={
										"" // String(error).includes("usuario") ? String(error) : ""
									}
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
									// error={String(error).includes("usuario")}
									required
									helperText={
										"" // String(error).includes("usuario") ? String(error) : ""
									}
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
								Agregar
							</Button>
						</DialogActions>
						{/* {error && <Typography>{error.toString()}</Typography>} */}
					</FormControl>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddStudent;
