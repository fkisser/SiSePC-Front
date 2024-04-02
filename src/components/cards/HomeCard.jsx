import { Button, Icon, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const HomeCard = ({ data }) => {
	const { title, path, icon, disabled } = data;
	return (
		<Button
			component={NavLink}
			to={path}
			variant="outlined"
			disabled={disabled}
			sx={{
				width: { xs: "100%", md: "45%" },
				height: { xs: "25%", md: "50%", lg: "75%" },
				textAlign: "center",
				transition: "all ease .5s",
				display: "flex",
				flexDirection: { xs: "row", md: "column" },
				flexGrow: { lg: 1 },
				gap: 1,
				alignItems: "center",
				justifyContent: "center",
				"&:hover": {
					backgroundColor: "#046CBB",
					color: "white",
					transition: "all ease .5s",
				},
			}}>
			<Icon fontSize={"large"}>{icon}</Icon>
			<Typography
				component={"h1"}
				fontSize={{ xs: "18px", sm: "22px" }}>
				{title}
			</Typography>
		</Button>
	);
};

export default HomeCard;
