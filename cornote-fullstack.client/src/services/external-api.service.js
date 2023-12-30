import axios from "axios";

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

//Fetch all notes
export const getNotes = async () => {
  const response = await fetch(`api/note`);
  return response;
};
