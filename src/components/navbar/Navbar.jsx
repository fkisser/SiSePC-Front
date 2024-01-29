import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import NavListDrawer from "./NavListDrawer";
import Confirm from "../confirm/Confirm";
import { useLocation } from "react-router";

const Navbar = ({ navLinks }) => {
	const [open, setOpen] = useState(false);
	const location = useLocation();
	if (location.pathname !== "/login")
		return (
			<>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							color="inherit"
							size="large"
							onClick={() => setOpen(true)}>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							sx={{ flexGrow: 1 }}>
							Sistema de Seguimiento del Programa Continuar
						</Typography>
					</Toolbar>
				</AppBar>

				<Drawer
					open={open}
					anchor="left"
					onClose={() => setOpen(false)}>
					<NavListDrawer
						navLinks={navLinks}
						setOpen={setOpen}
					/>
				</Drawer>
				<Confirm />
			</>
		);
};

export default Navbar;
