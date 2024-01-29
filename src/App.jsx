import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import DescriptionIcon from "@mui/icons-material/Description";
import Navbar from "./components/navbar/Navbar";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Students from "./components/pages/Students";
import Courses from "./components/pages/Courses";
import Curriculums from "./components/pages/Curriculums";
import Regulations from "./components/pages/Regulations";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Student from "./components/pages/Student";

const navLinks = [
	{ title: "Home", path: "/", icon: <HomeIcon sx={{ fontSize: "30px" }} /> },
	{
		title: "Estudiantes",
		path: "/estudiantes",
		icon: <GroupsIcon sx={{ fontSize: "30px" }} />,
	},
	{
		title: "Cátedras",
		path: "/catedras",
		icon: <SchoolIcon sx={{ fontSize: "30px" }} />,
	},
	{
		title: "Planes de Estudio y Equivalencias",
		path: "/planes",
		icon: <FormatListNumberedIcon sx={{ fontSize: "30px" }} />,
	},
	{
		title: "Resoluciones y Reglamentos",
		path: "/resoluciones",
		icon: <DescriptionIcon sx={{ fontSize: "30px" }} />,
	},
];

export default function App() {
	return (
		<>
			<Navbar navLinks={navLinks} />
			<Container sx={{ display: "grid", gap: 1, mt: 2 }}>
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
							path=":id"
							element={<Student />}
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
						path="/login"
						element={<Login />}
					/>
				</Routes>
			</Container>
		</>
	);
}
