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
	{
		field: "dni",
		headerName: "DNI",
		width: 100,
		headerAlign: "center",
		align: "center",
	},
	{
		field: "carrera",
		headerName: "Carrera",
		flex: 1,
		headerAlign: "center",
		align: "center",
	},
	{ field: "plan", headerName: "Plan", headerAlign: "center", align: "center" },
	{
		field: "relPrograma",
		headerName: "Estado",
		headerAlign: "center",
		align: "center",
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
		const { _id: id, apellido, nombre, dni, plan, relPrograma } = student;
		return {
			id,
			apellido,
			nombre,
			dni,
			carrera: plan.carrera.nombre,
			plan: plan.año,
			relPrograma,
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

			<Box
				sx={{
					height: "80vh",
					"& .graduado": {
						backgroundColor: "rgba(0, 107, 128, 0.3)",
					},
					"& .activo": {
						backgroundColor: "rgba(0, 128, 34, 0.3)",
					},
					"& .pasivo": {
						backgroundColor: "rgba(255, 251, 38, 0.30)",
					},
					"& .abandono": {
						backgroundColor: "rgba(125, 125, 125, 0.30)",
					},
					".none": { borderRight: "1px solid rgba(125, 125, 125, 0.20)" },
				}}>
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
					getCellClassName={(params) => {
						if (params.field === "relPrograma") {
							if (params.value === "Graduado") {
								return "graduado";
							}
							if (params.value === "Activo") {
								return "activo";
							}
							if (params.value === "Pasivo") {
								return "pasivo";
							}
							if (params.value === "Abandono") {
								return "abandono";
							}
						}
						return "none";
					}}
					pagination={{ paginationModel: { pageSize: 500, page: 0 } }}
					density="compact"
					hideFooter
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
