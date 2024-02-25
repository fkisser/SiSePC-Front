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
		ingresoPrograma,
		tutores,
	} = useSelector((state) => state.student.currentStudent);
	const { isLoading } = useSelector((state) => state.student);
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
							<Typography sx={{ fontWeight: 400 }}>{nombre || ""}</Typography>
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
							<Typography sx={{ fontWeight: 400 }}>{celular || ""}</Typography>
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
				<Typography
					variant="h6"
					color={"primary"}>
					Relación con el Programa
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
							Fecha de inscripción:
							<Typography sx={{ fontWeight: 400 }}>
								{ingresoPrograma
									? ingresoPrograma.substr(0, 10).split("-").reverse().join("/")
									: "Sin información"}
							</Typography>
						</Typography>
						<Typography
							display={"flex"}
							alignItems={"center"}
							fontWeight={600}
							gap={1}>
							Estado:
							<Typography sx={{ fontWeight: 400 }}>
								{relPrograma ? relPrograma : "Sin información"}
							</Typography>
						</Typography>
					</Box>
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
					ingresoPrograma,
					tutores,
				}}
				id={_id}
			/>
		</>
	);
};

export default PersonalInfo;
