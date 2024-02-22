import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../../../axios/students";
import { FileOpen, Save } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { newDetallePlanStudent } from "../../../redux/students/studentSlice";

const AcademicInfo = () => {
	const { _id, plan, ultimaAprobada, ultimaReinscripcion, detallePlan } =
		useSelector((state) => state.student.currentStudent);
	const { token } = useSelector((state) => state.user.currentUser);
	const { isLoading } = useSelector((state) => state.student);

	const VISIBLE_FIELDS = [
		{
			field: "asignaturaOriginal",
			headerName: "Asignatura",
			flex: 1,
		},
		{
			field: "asignaturaActual",
			headerName: "Equivalencia",
			flex: 1,
			editable: true,
		},
		{
			field: "condicion",
			headerName: "Condición",
			editable: true,
			type: "singleSelect",
			valueOptions: [
				"Aprobada",
				"Pendiente",
				"Cursando",
				"Cursada",
				"Abandonada",
				"Averiguar",
			],
		},
		{
			field: "fecha",
			headerName: "Fecha",
			type: "date",
			editable: true,
			valueGetter: (params) => (params.value ? new Date(params.value) : ""),
		},
		{
			field: "acta",
			headerName: "Resolución",
			editable: true,
			align: "center",
			renderCell: (params) =>
				params.value ? (
					<IconButton
						href={params.value}
						target="_blank">
						<FileOpen />
					</IconButton>
				) : null,
		},
		{
			field: "detalle",
			headerName: "Observaciones",
			flex: 1,
			editable: true,
		},
	];
	const [isEdited, setIsEdited] = useState(false);
	const dispatch = useDispatch();
	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			gap={2}>
			<Box
				display={"flex"}
				flexDirection={"column"}
				gap={2}>
				<Box
					display={"flex"}
					flex={1}
					gap={1}>
					<Typography
						display={"flex"}
						fontWeight={600}
						gap={1}
						flex={1}>
						Carrera:
						<Typography fontWeight={400}>
							{plan.carrera.nombre || ""}
						</Typography>
					</Typography>
					<Typography
						display={"flex"}
						fontWeight={600}
						gap={1}
						flex={1}>
						Plan:
						<Typography sx={{ fontWeight: 400 }}>{plan.año || ""}</Typography>
					</Typography>
				</Box>
				<Box
					display={"flex"}
					flex={1}
					gap={1}>
					<TextField
						fullWidth
						size="small"
						label={`Última reinscripción al año académico: ${
							ultimaReinscripcion
								?.toString()
								.slice(0, 10)
								.split("-")
								.reverse()
								.join("-") || "No especificado"
						}`}
						InputLabelProps={{ shrink: true }}
						type="date"
						onBlur={async (e) => {
							if (e.target.value)
								await updateStudent(
									dispatch,
									token,
									{ ultimaReinscripcion: e.target.value },
									_id
								);
						}}
					/>
					{
						<TextField
							fullWidth
							size="small"
							label={`Fecha de última materia aprobada: ${
								ultimaAprobada
									?.toString()
									.slice(0, 10)
									.split("-")
									.reverse()
									.join("-") || "No especificado"
							}`}
							InputLabelProps={{ shrink: true }}
							type="date"
							onBlur={async (e) => {
								if (e.target.value)
									await updateStudent(
										dispatch,
										token,
										{ ultimaAprobada: e.target.value },
										_id
									);
							}}
						/>
					}
				</Box>
			</Box>
			<Box
				gap={2}
				sx={{
					display: "flex",
					flexDirection: "column",
					minHeight: "65vh",
					height: "100%",
					alignItems: "flex-end",
				}}>
				<Button
					startIcon={<Save />}
					variant="contained"
					disabled={!isEdited}
					onClick={async () => {
						await updateStudent(
							dispatch,
							token,
							{ detallePlan: detallePlan },
							_id
						);
						setIsEdited(false);
					}}>
					Guardar cambios
				</Button>
				<DataGrid
					rows={detallePlan}
					editMode="row"
					density="compact"
					getRowHeight={() => "auto"}
					initialState={{
						columns: {
							columnVisibilityModel: {
								asignaturaActual: !plan.actual,
							},
						},
					}}
					columns={VISIBLE_FIELDS}
					slots={{ toolbar: GridToolbar }}
					loading={isLoading}
					getRowId={(row) => row._id}
					slotProps={{
						toolbar: {
							showQuickFilter: true,
						},
					}}
					processRowUpdate={async (newRow, oldRow) => {
						if (
							newRow.asignaturaActual !== oldRow.asignaturaActual ||
							newRow.condicion !== oldRow.condicion ||
							newRow.fecha !== oldRow.fecha ||
							newRow.acta !== oldRow.acta ||
							newRow.detalle !== oldRow.detalle
						) {
							const newDetallePlan = detallePlan.map((subject) => {
								if (newRow._id === subject._id) return newRow;
								else return subject;
							});
							dispatch(newDetallePlanStudent(newDetallePlan));
							setIsEdited(true);
							return newRow;
						}
						return oldRow;
					}}
					autoHeight={true}
					sx={{
						display: "flex",
						width: "100%",
						"&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
							py: "8px",
						},
						"&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
							py: "15px",
						},
						"&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
							py: "22px",
						},
					}}
				/>
			</Box>
		</Box>
	);
};

export default AcademicInfo;
