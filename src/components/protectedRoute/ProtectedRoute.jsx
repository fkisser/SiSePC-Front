import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, redirectTo }) => {
	const { currentUser } = useSelector((state) => state.user);
	return currentUser ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
