import axios from "axios";
import { errorStudents, loadingStudents, successStudents } from "../redux/students/studentsSlice";

export const fetchStudents = async (dispatch, token) => {
  dispatch(loadingStudents());
  try {
    const response = await axios.get("https://si-se-pc-back.vercel.app/estudiantes", { headers: { 'x-token': token } });
    const { estudiantes } = response.data;
    dispatch(successStudents(estudiantes));
  } catch (error) {
    dispatch(errorStudents(error.response?.data?.msg));
  }
}
export const createStudent = async (dispatch, token, data) => {
  dispatch(loadingStudents());
  try {
    await axios({
      method: "post",
      url: "https://si-se-pc-back.vercel.app/estudiantes",
      data: { ...data },
      headers: { 'x-token': token }
    });
    return true;
  } catch (error) {
    dispatch(errorStudents(error.response?.data?.msg));
    return false;
  }
}