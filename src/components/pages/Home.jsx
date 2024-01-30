import { Container } from "@mui/material";
import HomeCard from "../cards/HomeCard";

const Home = ({ navLinks }) => {
	return (
		<Container
			sx={{
				display: "flex",
				flexWrap: { xs: "wrap", lg: "nowrap" },
				justifyContent: "center",
				alignItems: "center",
				height: "85vh",
				gap: 2,
			}}>
			{navLinks?.map((navLink) => {
				if (navLink.title !== "Principal" && navLink.title !== "Cerrar Sesión")
					return (
						<HomeCard
							data={navLink}
							key={navLink.path}
						/>
					);
			})}
		</Container>
	);
};

export default Home;
