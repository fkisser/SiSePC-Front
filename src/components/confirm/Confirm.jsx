import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { successUser } from "../../redux/user/userSlice";
import { closeConfirm } from "../../redux/confirm/confirmSlice";

const Confirm = () => {
	const { open, action, title, text } = useSelector((state) => state.confirm);
	const dispatch = useDispatch();
	const handleClose = (action) => {
		switch (action) {
			case "logout":
				dispatch(successUser(null));

				break;

			default:
				break;
		}
		dispatch(closeConfirm(false));
	};

	return (
		<Dialog
			open={open}
			onClose={() => handleClose(action)}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{text}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {
						handleClose();
					}}>
					Cancelar
				</Button>
				<Button
					onClick={() => {
						handleClose(action);
					}}>
					Aceptar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Confirm;
