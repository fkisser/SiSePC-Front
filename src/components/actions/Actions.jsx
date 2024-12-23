import { Add, FileOpen, Save } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../../axios/students";
import AddAction from "./AddAction";
import { newActionsStudent } from "../../redux/students/studentSlice";
import { successActions } from "../../redux/actions/actionsSlice";
import { updateAction } from "../../axios/actions";

const Actions = ({ student = false, course = false }) => {
	const { acciones: accionesE, _id: id } = useSelector(
		(state) => state.student.currentStudent
	);
	const { isLoading: isLoadingE } = useSelector((state) => state.student);
	const { isAdmin, _id, apellido, nombre, token } = useSelector(
		(state) => state.user.currentUser
	);
	const { tutores } = useSelector((state) => state.tutores);
	let _tutores;
	if (isAdmin) {
		_tutores = tutores?.map((tutor) => {
			return { label: `${tutor.apellido} ${tutor.nombre}`, value: tutor._id };
		});
	}
	// const { acciones: accionesC } = useSelector((state) => state.course.currentCourse);
	const { actions, isLoading: isLoadingG } = useSelector(
		(state) => state.actions
	);
	const [visibleActions, setVisibleActions] = useState([]);
	useEffect(() => {
		if (student) {
			setVisibleActions(accionesE);
		} else if (course) {
			// setVisibleActions(accionesC);
		} else {
			setVisibleActions(actions);
		}
	}, [accionesE, course, student, actions]);

	const VISIBLE_FIELDS = [
		{
			field: "fecha",
			headerName: "Fecha",
			type: "date",
			editable: true,
			headerAlign: "center",
			align: "center",
			valueGetter: (params) => (params.value ? new Date(params.value) : ""),
			renderCell: (params) =>
				`${params.value.getUTCDate()}/${
					params.value.getUTCMonth() + 1
				}/${params.value.getUTCFullYear()}`,
		},
		{
			field: "descripcion",
			headerName: "Descripción",
			editable: true,
			width: 200,
		},
		{
			field: "archivo",
			headerName: "Archivo",
			headerAlign: "center",
			align: "center",
			editable: true,
			width: 60,
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
			field: "observaciones",
			headerName: "Observaciones",
			flex: 1,
			editable: true,
		},
		{
			field: "tutor",
			headerName: "Tutor/a",
			editable: true,
			headerAlign: "center",
			align: "center",
			type: "singleSelect",
			width: 150,
			valueOptions: isAdmin
				? [..._tutores]
				: [{ label: `${apellido} ${nombre}`, value: `${_id}` }],
		},
		{
			field: "estado",
			headerName: "Estado",
			editable: true,
			headerAlign: "center",
			align: "center",
			width: 175,
			type: "singleSelect",
			valueOptions: [
				"No iniciado",
				"En proceso",
				"Esperando respuesta",
				"Finalizado",
			],
		},
	];
	const [isEdited, setIsEdited] = useState(false);
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	return (
		<Box
			gap={2}
			sx={{
				display: "flex",
				flexDirection: "column",
				// minHeight: student || course ? "65vh" : "89vh",
				// height: "100%",
				// alignItems: "flex-end",
				"& .success": {
					backgroundColor: "rgba(0, 128, 34, 0.3)",
				},
				"& .grey": {
					backgroundColor: "rgba(125, 125, 125, 0.30)",
				},
				"& .yellow": {
					backgroundColor: "rgba(255, 251, 38, 0.30)",
				},
				"& .orange": {
					backgroundColor: "rgba(255, 148, 57, 0.30)",
				},
				".none": { borderRight: "1px solid rgba(125, 125, 125, 0.20)" },
			}}>
			<Box
				display={"flex"}
				width={"100%"}
				justifyContent={"space-between"}>
				<Button
					startIcon={<Add />}
					variant="contained"
					disabled={isLoadingE || isLoadingG}
					onClick={async () => {
						setOpen(true);
					}}>
					Agregar registro
				</Button>
				<Button
					startIcon={<Save />}
					variant="contained"
					disabled={!isEdited}
					sx={{ display: student || course ? "flex" : "none" }}
					onClick={async () => {
						if (student) {
							await updateStudent(dispatch, token, { acciones: accionesE }, id);
						}
						setIsEdited(false);
					}}>
					{isLoadingE || isLoadingG ? (
						<CircularProgress size={24} />
					) : (
						"Guardar cambios"
					)}
				</Button>
			</Box>
			<DataGrid
				scrollbarSize={0}
				rows={visibleActions}
				editMode="row"
				density="compact"
				columns={VISIBLE_FIELDS}
				slots={{ toolbar: GridToolbar }}
				loading={isLoadingE || isLoadingG}
				getRowHeight={() => "auto"}
				getCellClassName={(params) => {
					if (params.field === "estado") {
						if (params.value === "No iniciado") {
							return "grey";
						}
						if (params.value === "En proceso") {
							return "yellow";
						}
						if (params.value === "Esperando respuesta") {
							return "orange";
						}
						if (params.value === "Finalizado") {
							return "success";
						}
					}
					return "none";
				}}
				slotProps={{
					toolbar: {
						showQuickFilter: true,
					},
				}}
				processRowUpdate={async (newRow, oldRow) => {
					if (
						newRow.fecha !== oldRow.fecha ||
						newRow.descripcion !== oldRow.descripcion ||
						newRow.archivo !== oldRow.archivo ||
						newRow.tutor !== oldRow.tutor ||
						newRow.estado !== oldRow.estado ||
						newRow.observaciones !== oldRow.observaciones
					) {
						const newVisibleActions = visibleActions.map((action) => {
							if (newRow.id === action.id) return newRow;
							else return action;
						});
						if (student) dispatch(newActionsStudent(newVisibleActions));
						// else if (course) dispatch(newActionsCourse(newVisibleActions));
						else {
							dispatch(successActions(newVisibleActions));
							await updateAction(dispatch, token, newRow, newRow._id);
						}
						setVisibleActions(newVisibleActions);
						setIsEdited(true);
						return newRow;
					}
					return oldRow;
				}}
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
			<AddAction
				open={open}
				setOpen={setOpen}
				student={student}
				course={course}
			/>
		</Box>
	);
};

export default Actions;
