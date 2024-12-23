import { Check, Edit } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddStudent from "../AddStudent";

const PersonalInfo = () => {
	const {
		_id,
		apellido,
		nombre,
		dni,
		mail,
		celular,
		ciudad,
		trabaja,
		relCarrera,
		cursando,
		plan,
		horarioTrabajo,
		detallesTrabajo,
		relPrograma,
		añoIngreso,
		cuatIngreso,
		tutores,
		detallePlan,
	} = useSelector((state) => state.student.currentStudent);
	const { isLoading } = useSelector((state) => state.student);
	const { isAdmin } = useSelector((state) => state.user.currentUser);
	const { tutores: _tutores } = useSelector((state) => state.tutores);
	const tutor = _tutores.find((tutor) => {
		return tutor._id === tutores;
	});
	const [open, setOpen] = useState(false);
	return (
		<>
			<Box
				sx={{
					display: "flex",
					gap: 2,
				}}>
				<Box
					display={"flex"}
					flexDirection={"column"}
					gap={2}
					width={"100%"}>
					<Typography
						variant="h6"
						color={"primary"}>
						Datos personales
					</Typography>
					<Paper
						elevation={5}
						sx={{
							backgroundColor: "whitesmoke",
							display: "flex",
							flexDirection: "column",
							padding: 2,
							gap: 1,
						}}>
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
							<Typography sx={{ fontWeight: 400 }}>{nombre || ""}</Typography>
						</Typography>
						<Typography
							display={"flex"}
							fontWeight={600}
							gap={1}>
							DNI:
							<Typography sx={{ fontWeight: 400 }}>{dni || ""}</Typography>
						</Typography>

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
							<Typography sx={{ fontWeight: 400 }}>{celular || ""}</Typography>
						</Typography>

						<Typography
							display={"flex"}
							fontWeight={600}
							gap={1}
							flex={1}>
							Localidad:
							<Typography sx={{ fontWeight: 400 }}>{ciudad || ""}</Typography>
						</Typography>
					</Paper>
				</Box>

				<Box
					display={"flex"}
					flexDirection={"column"}
					gap={2}
					width={"100%"}>
					<Typography
						variant="h6"
						color={"primary"}>
						Información laboral
					</Typography>
					<Paper
						elevation={5}
						sx={{
							backgroundColor: "whitesmoke",
							display: "flex",
							flexDirection: "column",
							padding: 2,
							gap: 1,
						}}>
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
				</Box>

				<Box
					display={"flex"}
					flexDirection={"column"}
					gap={2}
					width={"100%"}>
					<Typography
						variant="h6"
						color={"primary"}>
						Relación con el Programa
					</Typography>
					<Paper
						elevation={5}
						sx={{
							backgroundColor: "whitesmoke",
							display: "flex",
							flexDirection: "column",
							padding: 2,
							gap: 1,
						}}>
						<Typography
							display={"flex"}
							alignItems={"center"}
							fontWeight={600}
							gap={1}
							flex={1}>
							Inscripción:
							<Typography sx={{ fontWeight: 400 }}>
								{añoIngreso ? `${añoIngreso}` : "Sin información del año"}
							</Typography>
							-
							<Typography sx={{ fontWeight: 400 }}>
								{cuatIngreso
									? `${cuatIngreso}`
									: "Sin información del cuatrimestre"}
							</Typography>
						</Typography>
						<Typography
							display={"flex"}
							alignItems={"center"}
							fontWeight={600}
							gap={1}>
							Estado:
							{relPrograma && relPrograma === "Graduado" ? (
								<Typography sx={{ fontWeight: 400 }}>
									{`${relPrograma} - ${
										detallePlan[detallePlan.length - 1].fecha
											? detallePlan[detallePlan.length - 1].fecha
													.slice(0, 10)
													.split("-")
													.reverse()
													.join("/")
											: "Sin fecha"
									}` || "Sin información"}
								</Typography>
							) : (
								<Typography sx={{ fontWeight: 400 }}>
									{relPrograma || "Sin información"}
								</Typography>
							)}
						</Typography>

						<Typography
							display={"flex"}
							alignItems={"center"}
							fontWeight={600}
							gap={1}>
							Tutor/a asignado/a:
							<Typography sx={{ fontWeight: 400 }}>
								{tutores
									? `${tutor?.apellido} ${tutor?.nombre}` ||
									  "El/la tutor/a no se encuentra en la base de datos, designe otro/a"
									: "Sin asignar"}
							</Typography>
						</Typography>
					</Paper>
					<Button
						variant="outlined"
						size="large"
						startIcon={<Edit />}
						disabled={isLoading || !isAdmin}
						onClick={() => {
							setOpen(true);
						}}>
						Modificar
					</Button>
				</Box>

				<Box
					display={"flex"}
					gap={1}
					justifyContent={"flex-end"}></Box>
			</Box>
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
					relPrograma,
					añoIngreso,
					cuatIngreso,
					tutores,
				}}
				id={_id}
			/>
		</>
	);
};

export default PersonalInfo;
