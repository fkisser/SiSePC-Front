import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { students } from "../../fakeData/students";
import Checkbox from "@mui/material/Checkbox";
import { Star, StarBorder, Folder, Add } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const VISIBLE_FIELDS = [
	{ field: "apellido", headerName: "Apellido", flex: 1 },
	{ field: "nombre", headerName: "Nombre", flex: 1 },
	{ field: "dni", headerName: "DNI", width: 100 },
	{ field: "carrera", headerName: "Carrera", flex: 1 },
	{ field: "plan", headerName: "Plan" },
	{
		field: "destacado",
		headerName: "Destacado",
		type: "boolean",
		renderCell: (params) => (
			<Checkbox
				icon={<StarBorder />}
				checkedIcon={<Star />}
				checked={params.value}
			/>
		),
		editable: true,
	},
	{
		field: "id",
		headerName: "",
		renderCell: (params) => (
			<Tooltip
				arrow
				title="Ver información"
				placement="top"
				slotProps={{
					popper: {
						modifiers: [
							{
								name: "offset",
								options: {
									offset: [0, -14],
								},
							},
						],
					},
				}}>
				<IconButton
					component={NavLink}
					to={`/estudiantes/${params.value}`}
					onClick={() => {
						console.log(params.value);
					}}>
					<Folder />
				</IconButton>
			</Tooltip>
		),
	},
];

const Students = () => {
	const visibleStudents = [...students];
	return (
		<Box sx={{ display: "grid", gap: 2 }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}>
				<Typography
					color="primary"
					variant="h4">
					Estudiantes inscriptos
				</Typography>
				<Button
					variant="contained"
					startIcon={<Add />}>
					Agregar
				</Button>
			</Box>
			<DataGrid
				rows={visibleStudents}
				columns={VISIBLE_FIELDS}
				slots={{ toolbar: GridToolbar }}
				slotProps={{
					toolbar: {
						showQuickFilter: true,
					},
				}}
			/>
		</Box>
	);
};

export default Students;
