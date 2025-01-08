import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import { postNote } from "../services/external-api.service";
import { useAuth0 } from "@auth0/auth0-react";

function CreateArea(props) {
  const { isAuthenticated } = useAuth0();
  const [NoteContent, changeNoteContent] = useState({
    title: "",
    body: "",
  });

  const [pressed, toggle] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isAuthenticated) {
      try {
        const newNote = await postNote({ //This is what slows down the process
          ...NoteContent,
          UserId: props.user.sub,
        });
        props.onAdd(newNote);
        changeNoteContent((prevNote) => {
          return {
            ...prevNote,
            title: "",
            body: "",
          };
        });
      } catch (error) {
        console.log("Create note error:", error);
      } finally {
        location.reload(); // TODO: find a better solution, read more on suspense
      }
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    changeNoteContent((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function expandForm() {
    toggle(true);
  }

  return (
    <div>
      <form method="post" className="create-note" onSubmit={handleSubmit}>
        {pressed && (
          <input
            name="title"
            onChange={handleChange}
            value={NoteContent.title}
            placeholder="Title"
            autoFocus
            required
          />
        )}

        <textarea
          name="body"
          onClick={expandForm}
          onChange={handleChange}
          value={NoteContent.body}
          placeholder="Take a note..."
          rows={pressed ? 3 : 1}
          required
        />
        <Zoom in={pressed}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
