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