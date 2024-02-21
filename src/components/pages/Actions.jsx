import { useEffect } from "react";
import { fetchActions } from "../../axios/actions";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../actions/Actions";

const ActionsPage = () => {
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.user.currentUser);
	useEffect(() => {
		fetchActions(dispatch, token);
	}, [dispatch, token]);
	return <Actions />;
};

export default ActionsPage;
