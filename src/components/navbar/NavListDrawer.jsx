import { Logout, AccountBox } from "@mui/icons-material";
import {
	Box,
	Button,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { openConfirm } from "../../redux/confirm/confirmSlice";

const NavListDrawer = ({ navLinks, setOpen }) => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);
	return (
		<Box
			color={"white"}
			bgcolor={"#046CBB"}
			sx={{
				display: "flex",
				flexDirection: "column",
				width: 350,
				height: "100vh",
				justifyContent: "center",
				gap: 1,
			}}>
			<Typography textAlign={"center"}>Hola {currentUser.nombre}!</Typography>
			<nav>
				<List>
					{navLinks?.map((item) => (
						<ListItem
							disablePadding
							key={item.title}>
							<ListItemButton
								component={NavLink}
								to={item.path}
								sx={{ gap: 2 }}
								onClick={() => setOpen(false)}>
								<ListItemIcon
									sx={{
										display: { xs: "none", sm: "flex" },
										justifyContent: "center",
									}}>
									{item.icon}
								</ListItemIcon>
								<Divider
									orientation="vertical"
									flexItem={true}
								/>
								<ListItemText>{item.title}</ListItemText>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</nav>
			<Button
				component={NavLink}
				to={""} //acá debería crear la página del perfil del tutor
				endIcon={<AccountBox />}
				variant="contained"
				color="secondary"
				onClick={() => {
					setOpen(false);
				}}>
				Mi perfil
			</Button>
			<Button
				endIcon={<Logout />}
				variant="contained"
				color="secondary"
				onClick={() => {
					dispatch(
						openConfirm([true, "logout", "¿Seguro/a que desea salir?", ""])
					);
					setOpen(false);
				}}>
				Salir
			</Button>
		</Box>
	);
};

export default NavListDrawer;
