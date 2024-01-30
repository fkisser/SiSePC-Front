import { Container, Typography } from "@mui/material";
import LoginForm from "../login/LoginForm";

const Login = () => {
	return (
		<Container
			sx={{
				mt: { xs: "10vh", sm: "15vh" },
				display: "grid",
				gap: 10,
			}}>
			<Typography
				variant="h1"
				align="center"
				color="primary"
				fontSize={36}
				fontWeight={800}>
				Sistema de Seguimiento del Programa Continuar
			</Typography>
			<LoginForm />
		</Container>
	);
};

export default Login;
