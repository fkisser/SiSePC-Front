import Navbar from "./components/navbar/Navbar";
import { Container, Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Students from "./components/pages/Students";
import Courses from "./components/pages/Courses";
import Curriculums from "./components/pages/Curriculums";
import Regulations from "./components/pages/Regulations";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Student from "./components/pages/Student";
import Actions from "./components/pages/Actions";

const navLinks = [
	{
		title: "Principal",
		path: "/",
		icon: "home",
	},
	{
		title: "Estudiantes",
		path: "/estudiantes",
		icon: "group",
	},
	{
		title: "Cátedras",
		path: "/catedras",
		icon: "school",
	},
	{
		title: "Planes de Estudio y Equivalencias",
		path: "/planes",
		icon: "format_list_numbered",
	},
	{
		title: "Resoluciones y Reglamentos",
		path: "/resoluciones",
		icon: "description",
	},
	{
		title: "Acciones generales",
		path: "/acciones",
		icon: "checklist",
	},
];

export default function App() {
	return (
		<Grid alignContent={"center"}>
			<Navbar navLinks={navLinks} />
			<Container sx={{ display: "grid", gap: 1, my: 2, mx: "auto", p: 0 }}>
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute redirectTo={"/login"}>
								<Home navLinks={navLinks} />
							</ProtectedRoute>
						}
					/>
					<Route path="/estudiantes">
						<Route
							index
							element={
								<ProtectedRoute redirectTo={"/login"}>
									<Students />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/estudiantes/dni/:DNI"
							element={
								<ProtectedRoute redirectTo={"/login"}>
									<Student />
								</ProtectedRoute>
							}
						/>
					</Route>
					<Route
						path="/catedras"
						element={
							<ProtectedRoute redirectTo={"/login"}>
								<Courses />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/planes"
						element={
							<ProtectedRoute redirectTo={"/login"}>
								<Curriculums />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/resoluciones"
						element={
							<ProtectedRoute redirectTo={"/login"}>
								<Regulations />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/acciones"
						element={
							<ProtectedRoute redirectTo={"/login"}>
								<Actions />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
				</Routes>
			</Container>
		</Grid>
	);
}
