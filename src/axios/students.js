import axios from "axios";
import { errorStudents, loadingStudents, successStudents } from "../redux/students/studentsSlice";
import { errorStudent, loadingStudent, successStudent } from "../redux/students/studentSlice";

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
export const getStudentByDNI = async (dispatch, token, dni) => {
  dispatch(loadingStudent());
  try {
    const response = await axios({
      method: "get",
      url: `https://si-se-pc-back.vercel.app/estudiantes/dni/${dni}`,
      headers: { 'x-token': token }
    });
    const { estudiante } = response.data;
    dispatch(successStudent(estudiante));
    return true;
  } catch (error) {
    dispatch(errorStudents(error.response?.data?.msg));
    return false;
  }
}
export const createStudent = async (dispatch, token, data) => {
  dispatch(loadingStudent());
  try {
    const response = await axios({
      method: "post",
      url: "https://si-se-pc-back.vercel.app/estudiantes",
      data: { ...data },
      headers: { 'x-token': token }
    });
    const { estudiante } = response.data;
    dispatch(successStudent(estudiante));
    return true;
  } catch (error) {
    dispatch(errorStudents(error.response?.data?.msg));
    return false;
  }
}
export const updateStudent = async (dispatch, token, data, id) => {
  dispatch(loadingStudent());
  try {
    const response = await axios({
      method: "patch",
      url: `https://si-se-pc-back.vercel.app/estudiantes/${id}`,
      data,
      headers: { 'x-token': token }
    });
    const { estudiante } = response.data;
    dispatch(successStudent(estudiante));
    return true;
  } catch (error) {
    dispatch(errorStudent(error));
    return false;
  }
}