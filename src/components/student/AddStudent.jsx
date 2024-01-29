// form dialog, ver validaciones y uso en login

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
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
			<DialogTitle>Inscribir nuevo/a estudiante</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl
						sx={{ display: "grid", gap: 3, justifyContent: "center" }}>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							{/* <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} /> */}
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
						</Box>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							{/* <Password sx={{ color: "action.active", mr: 1, my: 0.5 }} /> */}
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										name="password"
										type="password"
										placeholder="Contraseña"
										variant="outlined"
										// error={String(error).toLowerCase().includes("contraseña")}
										required
										helperText={
											""
											// String(error).toLowerCase().includes("contraseña")
											// 	? String(error)
											// 	: ""
										}
									/>
								)}
							/>
						</Box>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button
								type="submit"
								variant="contained"
								color="primary">
								Crear
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
