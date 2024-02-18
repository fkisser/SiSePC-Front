import axios from "axios"
import { errorUser, loadingUser, successUser } from "../redux/user/userSlice";
import { fetchTutores } from "./tutores";

export const login = async (dispatch, dni, password) => {
  dispatch(loadingUser());
  try {
    const response = await axios.post("https://si-se-pc-back.vercel.app/autenticacion/login", { dni, contraseña: password });
    const { tutor, token } = response.data;
    tutor.token = token;
    if (tutor) {
      if (tutor.isAdmin) {
        fetchTutores(dispatch, token);
      }
      dispatch(successUser(tutor));
    }
    else dispatch(errorUser(response.data));
  } catch (error) {
    dispatch(errorUser(error.response?.data?.msg));
  }
}