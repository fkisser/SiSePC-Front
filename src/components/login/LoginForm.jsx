import { useDispatch, useSelector } from "react-redux";
import useRedirect from "../../hooks/useRedirect";
import { useEffect } from "react";
import { errorUser, successUser } from "../../redux/user/userSlice";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	TextField,
	Typography,
} from "@mui/material";
import { AccountCircle, Password } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { loginInitialValues } from "./initialValues";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "./validationSchema";

const LoginForm = () => {
	const dispatch = useDispatch();
	const { isLoading, error } = useSelector((state) => state.user);
	const { control, handleSubmit } = useForm({
		defaultValues: loginInitialValues,
		resolver: yupResolver(loginValidationSchema),
	});
	const onSubmit = (data) => {
		console.log(data);
		dispatch(successUser(data.mail));
	};
	useRedirect("/");
	useEffect(() => {
		dispatch(errorUser(false));
	}, [dispatch]);
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl sx={{ display: "grid", gap: 3, justifyContent: "center" }}>
				<FormLabel sx={{ textAlign: "center" }}>Iniciar Sesión</FormLabel>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
								error={String(error).includes("usuario")}
								required
								helperText={
									String(error).includes("usuario") ? String(error) : ""
								}
							/>
						)}
					/>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Password sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
								error={String(error).toLowerCase().includes("contraseña")}
								required
								helperText={
									String(error).toLowerCase().includes("contraseña")
										? String(error)
										: ""
								}
							/>
						)}
					/>
				</Box>
				<Button
					type="submit"
					variant="contained"
					loading={isLoading}
					color="primary">
					Ingresar
				</Button>
				{error && <Typography>{error.toString()}</Typography>}
			</FormControl>
		</form>
	);
};

export default LoginForm;
