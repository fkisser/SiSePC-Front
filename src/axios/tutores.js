import axios from "axios";
import { errorTutores, loadingTutores, successTutores } from "../redux/tutores/tutoresSlice";

export const fetchTutores = async (dispatch, token) => {
  dispatch(loadingTutores());
  try {
    const response = await axios.get("https://si-se-pc-back.vercel.app/tutores", { headers: { 'x-token': token } });
    const { partTutores } = response.data;
    dispatch(successTutores(partTutores));
  } catch (error) {
    dispatch(errorTutores(error.response?.data?.msg));
  }
}






