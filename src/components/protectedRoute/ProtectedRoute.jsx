import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { successTutores } from "../../redux/tutores/tutoresSlice";
import { successStudent } from "../../redux/students/studentSlice";
import { successStudents } from "../../redux/students/studentsSlice";
import {
	successCareers,
	successCurriculums,
} from "../../redux/curriculums/curriculumsSlice";
import { successActions } from "../../redux/actions/actionsSlice";

const ProtectedRoute = ({ children, redirectTo }) => {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	if (!currentUser) {
		dispatch(successTutores([]));
		dispatch(successStudent(null));
		dispatch(successStudents([]));
		dispatch(successCareers([]));
		dispatch(successCurriculums([]));
		dispatch(successActions([]));
	}
	return currentUser ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
