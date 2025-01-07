import axios from "axios";
import localforage from "localforage";

//Fetch all notes
export const getNotes = async () => {
  const token = await localforage.getItem("token");
  const response = await axios.get(`api/note`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//Create a new note
export const postNote = async (data) => {
  const token = await localforage.getItem("token");
  const result = await axios.post(`api/note`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    },
  });

  if (result.status !== 200 && result.status !== 201) {
    throw result;
  }
  return result;
};

//TODO check why it fails when multuple requests are made
//Delete note
export const deleteNote = async (id) => {
  const token = await localforage.getItem("token");
  const result = await axios.delete(`api/note/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    },
  });

  if (result.status !== 200 && result.status !== 201) {
    throw result;
  }
  return result;
};

//Update note
export const updateNote = async (id, data) => {
  const token = await localforage.getItem("token");
  const result = await axios.put(`api/note/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    },
  });

  if (result.status !== 200 && result.status !== 201) {
    throw result;
  }
  return result;
};

//Create a new user
export const postUser = async (data) => {
  const result = await axios.post(`api/user`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    },
  });

  if (result.status !== 200 && result.status !== 201) {
    throw result;
  }
  return result;
};

//Get id_token;
export const getUserData = async (accessToken, domain) => {
  const result = await axios.get(`https://${domain}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return result.data;
};
