import { ArrowBack } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
	AppBar,
	Divider,
	IconButton,
	Paper,
	Tab,
	Toolbar,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PersonalInfo from "../student/personalInfo/PersonalInfo";
import AcademicInfo from "../student/academicInfo/AcademicInfo";

const Student = () => {
	const { apellido, nombre, dni, plan } = useSelector(
		(state) => state.student.currentStudent
	);
	const [value, setValue] = useState("1");
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const navigate = useNavigate();
	return (
		<>
			<AppBar
				position="relative"
				color="secondary"
				component={Paper}
				elevation={0}>
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<IconButton
						color="inherit"
						onClick={() => navigate("/estudiantes")}>
						<ArrowBack />
					</IconButton>
					<Typography variant="h6">{`${apellido} ${nombre} - DNI: ${dni} - ${plan.carrera.nombre} Plan ${plan.año}`}</Typography>
				</Toolbar>
			</AppBar>
			<TabContext value={value}>
				<TabList
					onChange={handleChange}
					sx={{ display: "flex", m: "0 auto" }}>
					<Tab
						value={"1"}
						label="Información personal"
						sx={{ display: "flex" }}
					/>
					<Divider
						flexItem={true}
						orientation="vertical"
						variant="middle"
					/>
					<Tab
						value={"2"}
						label="Información académica"
						sx={{ display: "flex" }}
					/>
					<Divider
						flexItem={true}
						orientation="vertical"
						variant="middle"
					/>
					<Tab
						value={"3"}
						label="Acciones / Comunicación"
						sx={{ display: "flex" }}
					/>
				</TabList>
				<PersonalInfo tabPanelValue="1" />
				<AcademicInfo tabPanelValue="2" />
				<TabPanel value="3">Item Three</TabPanel>
			</TabContext>
		</>
	);
};

export default Student;
