import axios from "axios";

//Create a new note
const postNote = async (data) => {
  const result = await axios.post("api/notes", data, {
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    },
  });

  if (result.status !== 200 && result.status !== 201) {
    throw result;
  }
  return result.data;
};

export const createNote = async ({ request }) => {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  const result = postNote(body);
  return result;
};


//Fetch all notes
export const getNotes = async () => {
    const response = await fetch("notes");
    console.log(response)
    return response;
}