import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import AddStudent from "../student/AddStudent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import { fetchStudents } from "../../axios/students";
import { successStudent } from "../../redux/students/studentSlice";

const VISIBLE_FIELDS = [
	{ field: "apellido", headerName: "Apellido", flex: 1 },
	{ field: "nombre", headerName: "Nombre", flex: 1 },
	{ field: "dni", headerName: "DNI", width: 100 },
	{ field: "carrera", headerName: "Carrera", flex: 1 },
	{ field: "plan", headerName: "Plan" },
	{
		field: "cursando",
		headerName: "Cursando",
		type: "boolean",
	},
];

const Students = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.user.currentUser);
	const handleClick = async (params) => {
		const student = students.find((_student) => {
			return _student.dni === params.row.dni;
		});
		dispatch(successStudent(student));
		navigate(`/estudiantes/dni/${params.row.dni}`);
	};
	const [open, setOpen] = useState(false);
	useEffect(() => {
		fetchStudents(dispatch, token);
		dispatch(successStudent(null));
	}, [dispatch, token]);
	const { students, isLoading } = useSelector((state) => state.students);
	const visibleStudents = students.map((student) => {
		const { _id: id, apellido, nombre, dni, plan, cursando } = student;
		return {
			id,
			apellido,
			nombre,
			dni,
			carrera: plan.carrera.nombre,
			plan: plan.año,
			cursando,
		};
	});

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
			}}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}>
				<Typography
					color="primary"
					variant="h4"
					sx={{ fontSize: { xs: 20, sm: 36 } }}>
					Estudiantes inscriptos
				</Typography>
				<Button
					variant="contained"
					startIcon={<Add />}
					disabled={isLoading}
					onClick={() => {
						setOpen(true);
					}}>
					Agregar
				</Button>
			</Box>

			<Box sx={{ height: "80vh" }}>
				<DataGrid
					rows={visibleStudents}
					columns={VISIBLE_FIELDS}
					slots={{ toolbar: GridToolbar }}
					loading={isLoading}
					slotProps={{
						toolbar: {
							showQuickFilter: true,
						},
					}}
					autoPageSize={true}
					onRowClick={handleClick}
				/>
			</Box>

			<AddStudent
				open={open}
				setOpen={setOpen}
			/>
		</Box>
	);
};

export default Students;
