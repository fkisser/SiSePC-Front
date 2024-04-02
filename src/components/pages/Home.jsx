import { Container } from "@mui/material";
import HomeCard from "../cards/HomeCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCareers } from "../../axios/careers";

const Home = ({ navLinks }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		fetchCareers(dispatch);
	}, [dispatch]);
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
				if (
					navLink.title !== "Principal" &&
					navLink.title !== "Cerrar Sesión" &&
					!navLink.disabled
				)
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
