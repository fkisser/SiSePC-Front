import { ArrowBack, Check, Edit } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
	AppBar,
	Box,
	Button,
	Divider,
	IconButton,
	Paper,
	Tab,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AddStudent from "../student/AddStudent";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { newDetallePlanStudent } from "../../redux/students/studentSlice";
import { updateStudent } from "../../axios/students";

const Student = () => {
	const dispatch = useDispatch();
	const {
		_id,
		apellido,
		nombre,
		dni,
		mail,
		celular,
		ciudad,
		cursando,
		trabaja,
		relCarrera,
		horarioTrabajo,
		detallesTrabajo,
		plan,
		ultimaAprobada,
		ultimaReinscripcion,
		detallePlan,
	} = useSelector((state) => state.student.currentStudent);
	const { isLoading } = useSelector((state) => state.student);
	const { token } = useSelector((state) => state.user.currentUser);
	const [value, setValue] = useState("1");
	const [open, setOpen] = useState(false);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const navigate = useNavigate();
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
		{ field: "resolucion", headerName: "Resolución", editable: true },
		{
			field: "observaciones",
			headerName: "Observaciones",
			flex: 1,
			editable: true,
		},
	];

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
					/>
					<Tab
						value={"2"}
						label="Información académica"
						sx={{ display: "flex" }}
					/>
					<Divider
						flexItem={true}
						orientation="vertical"
					/>
					<Tab
						value={"3"}
						label="Acciones / Comunicación"
						sx={{ display: "flex" }}
					/>
				</TabList>
				<TabPanel value="1">
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
						}}>
						<Typography
							variant="h6"
							color={"primary"}>
							Datos personales
						</Typography>
						<Paper
							sx={{
								backgroundColor: "whitesmoke",
								display: "flex",
								flexDirection: "column",
								padding: 2,
								gap: 1,
							}}>
							<Box display={"flex"}>
								<Typography
									display={"flex"}
									fontWeight={600}
									gap={1}
									flex={1}>
									Apellido:
									<Typography fontWeight={400}>{apellido || ""}</Typography>
								</Typography>
								<Typography
									display={"flex"}
									fontWeight={600}
									gap={1}
									flex={1}>
									Nombre:
									<Typography sx={{ fontWeight: 400 }}>
										{nombre || ""}
									</Typography>
								</Typography>
								<Typography
									display={"flex"}
									fontWeight={600}
									gap={1}>
									DNI:
									<Typography sx={{ fontWeight: 400 }}>{dni || ""}</Typography>
								</Typography>
							</Box>
							<Box display={"flex"}>
								<Typography
									display={"flex"}
									fontWeight={600}
									gap={1}
									flex={1}>
									Mail:
									<Typography sx={{ fontWeight: 400 }}>{mail || ""}</Typography>
								</Typography>
								<Typography
									display={"flex"}
									fontWeight={600}
									gap={1}>
									Celular:
									<Typography sx={{ fontWeight: 400 }}>
										{celular || ""}
									</Typography>
								</Typography>
							</Box>
							<Typography
								display={"flex"}
								fontWeight={600}
								gap={1}
								flex={1}>
								Localidad:
								<Typography sx={{ fontWeight: 400 }}>{ciudad || ""}</Typography>
							</Typography>
						</Paper>
						<Typography
							variant="h6"
							color={"primary"}>
							Información laboral
						</Typography>
						<Paper
							sx={{
								backgroundColor: "whitesmoke",
								display: "flex",
								flexDirection: "column",
								padding: 2,
								gap: 1,
							}}>
							<Box display={"flex"}>
								<Typography
									display={"flex"}
									alignItems={"center"}
									fontWeight={600}
									gap={1}
									flex={1}>
									Trabaja:
									<Typography sx={{ fontWeight: 400 }}>
										{trabaja ? <Check /> : "No"}
									</Typography>
								</Typography>
								<Typography
									display={"flex"}
									alignItems={"center"}
									fontWeight={600}
									gap={1}>
									Trabajo relacionado con la carrera:
									<Typography sx={{ fontWeight: 400 }}>
										{relCarrera ? <Check /> : "No"}
									</Typography>
								</Typography>
							</Box>

							<Typography
								display={"flex"}
								fontWeight={600}
								gap={1}
								flex={1}>
								Dedicación:
								<Typography sx={{ fontWeight: 400 }}>
									{horarioTrabajo || "-"}
								</Typography>
							</Typography>
							<Typography
								display={"flex"}
								fontWeight={600}
								gap={1}>
								Descripción:
								<Typography sx={{ fontWeight: 400 }}>
									{detallesTrabajo || "-"}
								</Typography>
							</Typography>
						</Paper>
						<Box
							display={"flex"}
							gap={1}
							justifyContent={"flex-end"}>
							<Button
								variant="outlined"
								size="large"
								startIcon={<Edit />}
								disabled={isLoading}
								onClick={() => {
									setOpen(true);
								}}>
								Modificar
							</Button>
						</Box>
					</Box>
				</TabPanel>
				<TabPanel
					value="2"
					sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
								<Typography sx={{ fontWeight: 400 }}>
									{plan.año || ""}
								</Typography>
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
						<DataGrid
							rows={detallePlan}
							editMode="row"
							density="compact"
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
							processRowUpdate={async (newRow) => {
								const newDetallePlan = detallePlan.map((subject) => {
									if (newRow._id === subject._id) return newRow;
									else return subject;
								});
								dispatch(newDetallePlanStudent(newDetallePlan));
								await updateStudent(
									dispatch,
									token,
									{ detallePlan: newDetallePlan },
									_id
								);
							}}
							hideFooter={true}
							sx={{ display: "flex", width: "100%" }}
						/>
					</Box>
				</TabPanel>
				<TabPanel value="3">Item Three</TabPanel>
			</TabContext>

			<AddStudent
				open={open}
				setOpen={setOpen}
				values={{
					apellido,
					nombre,
					dni,
					mail,
					celular,
					ciudad,
					cursando,
					trabaja,
					relCarrera,
					horarioTrabajo,
					detallesTrabajo,
					plan: plan._id,
				}}
				id={_id}
			/>
		</>
	);
};

export default Student;
