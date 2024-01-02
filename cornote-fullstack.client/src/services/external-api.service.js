import axios from "axios";

//Fetch all notes
export const getNotes = async () => {
  const response = await fetch(`api/note`);
  return response;
};

//Create a new note
export const postNote = async (data) => {
  const result = await axios.post(`api/note`, data, {
    headers: { "Content-Type": "application/json" },
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    },
  });

  if (result.status !== 200 && result.status !== 201) {
    throw result;
  }
  return result;
};

//Delete note
export const deleteNote = async (id) => {
  const result = await axios.delete(`api/note/${id}`, {
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
  const result = await axios.put(`api/note/${id}`, data, {
    headers: { "Content-Type": "application/json" },
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    },
  });

  if (result.status !== 200 && result.status !== 201) {
    throw result;
  }
  return result;
};
