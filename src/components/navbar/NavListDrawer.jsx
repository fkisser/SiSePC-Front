import { Logout } from "@mui/icons-material";
import {
	Box,
	Button,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { openConfirm } from "../../redux/confirm/confirmSlice";

const NavListDrawer = ({ navLinks, setOpen }) => {
	const dispatch = useDispatch();
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
			}}>
			<nav>
				<List>
					{navLinks?.map((item) => (
						<ListItem
							disablePadding
							key={item.title}>
							<ListItemButton
								component={NavLink}
								to={item.path}
								sx={{ gap: 1 }}
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
				startIcon={<Logout />}
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
