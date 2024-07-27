import axios from "axios";
const bashUrl = "https://task-managment-backend-rosy.vercel.app/";
const token = JSON.parse(localStorage.getItem("projecttoken")) || "";
export const ResisterUser = async (payload) => {
  try {
    return await axios.post(`${bashUrl}user/register`, payload);
  } catch (error) {
    return {
      error,
      message: "error getting in user registration",
    };
  }
};

export const LoginUser = async (payload) => {
  try {
    const data = await axios.post(`${bashUrl}user/login`, payload);
    return data;
  } catch (error) {
    return {
      error,
      message: "error getting user login",
    };
  }
};

export const GetAllProject = async () => {
  try {
    return await axios.get(`${bashUrl}project`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return {
      error,
      message: "error getting in project getting",
    };
  }
};

export const AddNewProject = async (payload) => {
  try {
    const data = await axios.post(`${bashUrl}project/add`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return {
      error,
      message: "error getting in add project",
    };
  }
};

export const AddNewTask = async (payload, id) => {
  try {
    const response = await axios.patch(
      `${bashUrl}project/update/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    return { error, message: "error creating task" };
  }
};
export const GetAllTask = async () => {
  try {
    return await axios.get(`${bashUrl}project/task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return { error };
  }
};

export const DeleteProject = async (id) => {
  try {
    const response = await axios.delete(`${bashUrl}project/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return { error, message: "error delete project" };
  }
};
