import { useDispatch, useSelector } from "react-redux";
import useRedirect from "../../hooks/useRedirect";
import { useEffect } from "react";
import { errorUser } from "../../redux/user/userSlice";
import {
	Box,
	Button,
	CircularProgress,
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
import { login } from "../../axios/auth";

const LoginForm = () => {
	const dispatch = useDispatch();
	const { isLoading, error } = useSelector((state) => state.user);
	const { control, handleSubmit } = useForm({
		defaultValues: loginInitialValues,
		resolver: yupResolver(loginValidationSchema),
	});
	const onSubmit = async (data) => {
		await login(dispatch, data.dni, data.password);
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
						name="dni"
						control={control}
						render={({ field }) => (
							<TextField
								sx={{ flexGrow: 1 }}
								{...field}
								name="dni"
								type="number"
								placeholder="DNI"
								variant="outlined"
								error={String(error).includes("dni")}
								required
								helperText={String(error).includes("dni") ? String(error) : ""}
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
								sx={{ flexGrow: 1 }}
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
					disabled={isLoading}
					color="primary"
					onClick={handleSubmit(onSubmit)}>
					{isLoading ? <CircularProgress size={24} /> : "Ingresar"}
				</Button>
				<Typography
					fontSize={14}
					align="center">
					Olvidaste tu contraseña? Recuperar contraseña
				</Typography>
				{/* {error && (
					<Typography
						fontSize={14}
						align="center"
						color={"error"}>
						{error}
					</Typography>
				)} */}
			</FormControl>
		</form>
	);
};

export default LoginForm;
