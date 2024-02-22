import {
	Box,
	Button,
	FormLabel,
	IconButton,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../../../axios/students";
import { FileOpen, Save } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { newDetallePlanStudent } from "../../../redux/students/studentSlice";

const AcademicInfo = () => {
	const {
		_id,
		plan,
		ultimaAprobada,
		ultimaReinscripcion,
		esRegular,
		detallePlan,
	} = useSelector((state) => state.student.currentStudent);
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
			headerAlign: "center",
			align: "center",
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
			headerAlign: "center",
			align: "center",
			valueGetter: (params) => (params.value ? new Date(params.value) : ""),
		},
		{
			field: "acta",
			headerName: "Resolución",
			editable: true,
			headerAlign: "center",
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
					<Box
						display={"flex"}
						justifyContent={"center"}
						width={"20vw"}
						border={"1px solid rgba(125, 125, 125, 0.50)"}
						borderRadius={1}
						position={"relative"}>
						<FormLabel
							sx={{
								position: "absolute",
								top: -10,
								left: 10,
								fontSize: 13,
								backgroundColor: "white",
							}}>
							Alumno Regular:
						</FormLabel>
						<Box
							display={"flex"}
							alignItems={"center"}>
							<FormLabel htmlFor="regular">No</FormLabel>
							<Switch
								size="medium"
								checked={esRegular}
								onChange={async (e) => {
									await updateStudent(
										dispatch,
										token,
										{ esRegular: e.target.checked },
										_id
									);
								}}
							/>
							<FormLabel htmlFor="regular">Si</FormLabel>
						</Box>
					</Box>
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
					"& .aprobada": {
						backgroundColor: "rgba(0, 107, 128, 0.3)",
					},
					"& .cursada": {
						backgroundColor: "rgba(0, 128, 34, 0.3)",
					},
					"& .cursando": {
						backgroundColor: "rgba(255, 251, 38, 0.30)",
					},
					"& .pendiente": {
						backgroundColor: "rgba(255, 148, 57, 0.30)",
					},
					"& .abandonada": {
						backgroundColor: "rgba(125, 125, 125, 0.30)",
					},
					".none": { borderRight: "1px solid rgba(125, 125, 125, 0.20)" },
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
					getCellClassName={(params) => {
						if (params.field === "condicion") {
							if (params.value === "Aprobada") {
								return "aprobada";
							}
							if (params.value === "Pendiente") {
								return "pendiente";
							}
							if (params.value === "Cursando") {
								return "cursando";
							}
							if (params.value === "Cursada") {
								return "cursada";
							}
							if (params.value === "Abandonada") {
								return "abandonada";
							}
						}
						return "none";
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
