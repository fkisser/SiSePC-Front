import { Button, Icon, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const HomeCard = ({ data }) => {
	const { title, path, icon } = data;
	return (
		<Button
			component={NavLink}
			to={path}
			variant="outlined"
			sx={{
				width: { xs: "100%", md: "45%" },
				height: { xs: "25%", md: "50%", lg: "100%" },
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
					fontSize: { xs: "18px", sm: "50px" },
				},
			}}>
			<Icon>{icon}</Icon>
			<Typography component={"h1"}>{title}</Typography>
		</Button>
	);
};

export default HomeCard;
