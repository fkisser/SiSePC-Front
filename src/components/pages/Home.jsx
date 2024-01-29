import { Container } from "@mui/material";
import HomeCard from "../cards/HomeCard";

const Home = ({ navLinks }) => {
	return (
		<Container
			sx={{
				display: "grid",
				justifyContent: "center",
				alignItems: "center",
				height: "90vh",
			}}>
			{navLinks?.map((navLink) => {
				if (navLink.title !== "Home" && navLink.title !== "Cerrar Sesión")
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
