import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const HomeCard = ({ data }) => {
	const { title, path, icon } = data;
	return (
		<Button
			component={NavLink}
			to={path}
			variant="outlined"
			startIcon={icon}
			size={"large"}
			sx={{
				width: { xs: "100%", md: "500px" },
				height: { xs: "100px", md: "150px", lg: "100%" },
				textAlign: "center",
				transition: "all ease .5s",
				"&:hover": {
					backgroundColor: "#046CBB",
					color: "white",
					transition: "all ease .5s",
					fontSize: { xs: "18px", sm: "22px" },
				},
			}}>
			{title}
		</Button>
	);
};

export default HomeCard;
