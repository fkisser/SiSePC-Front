import axios from "axios";
import { errorActions, loadedActions, loadingActions, successActions } from "../redux/actions/actionsSlice";

export const fetchActions = async (dispatch, token) => {
  dispatch(loadingActions());
  try {
    const response = await axios.get("https://si-se-pc-back.vercel.app/acciones", { headers: { 'x-token': token } });
    const { acciones } = response.data;
    dispatch(successActions(acciones));
  } catch (error) {
    dispatch(errorActions(error.response?.data?.msg));
  }
}

export const createGAction = async (dispatch, token, data) => {
  dispatch(loadingActions());
  try {
    const response = await axios({
      method: "post",
      url: "https://si-se-pc-back.vercel.app/acciones",
      data: { ...data },
      headers: { 'x-token': token }
    });
    const { accion } = response.data;
    if (accion) {
      dispatch(loadedActions());
      return true;
    }
    else {
      dispatch(errorActions(response?.data?.msg));
      return false;
    }

  } catch (error) {
    dispatch(errorActions(error.response?.data?.msg));
    return false;
  }
}
export const updateAction = async (dispatch, token, data, id) => {
  dispatch(loadingActions());
  try {
    const response = await axios({
      method: "patch",
      url: `https://si-se-pc-back.vercel.app/acciones/${id}`,
      data,
      headers: { 'x-token': token }
    });
    const { accion } = response.data;
    if (accion) {
      dispatch(loadedActions());
      return true;
    }
    else {
      dispatch(errorActions(response.data.msg));
      return false;
    }
  } catch (error) {
    dispatch(errorActions(error.response?.data?.msg));
    return false;
  }
}