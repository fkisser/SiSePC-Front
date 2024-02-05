import axios from "axios";
import { errorCurriculums, loadingCurriculums, successCareers, successCurriculums } from "../redux/curriculums/curriculumsSlice";

export const fetchCareers = async (dispatch) => {
  dispatch(loadingCurriculums());
  try {
    const response = await axios.get("https://si-se-pc-back.vercel.app/carreras");
    const { carreras } = response.data;
    dispatch(successCareers(carreras));
    const response2 = await axios.get("https://si-se-pc-back.vercel.app/planes");
    const { planes } = response2.data;
    dispatch(successCurriculums(planes));
  } catch (error) {
    dispatch(errorCurriculums(error.response?.data?.msg));
  }
}