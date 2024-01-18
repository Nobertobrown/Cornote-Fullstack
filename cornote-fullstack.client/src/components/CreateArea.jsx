import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import { postNote } from "../services/external-api.service";
import { useAuth0 } from "@auth0/auth0-react";

function CreateArea(props) {
  const {isAuthenticated} = useAuth0();
  const [NoteContent, changeNoteContent] = useState({
    title: "",
    body: "",
  });

  const [pressed, toggle] = useState(false);

  function handleClick(event) {
    isAuthenticated &&
      postNote({
        ...NoteContent,
        UserId: props.user.sub,
      });
    props.onAdd(NoteContent);
    changeNoteContent((prevNote) => {
      return {
        ...prevNote,
        title: "",
        body: "",
      };
    });
    event.preventDefault();
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
      <form method="post" className="create-note">
        {pressed && (
          <input
            name="title"
            onChange={handleChange}
            value={NoteContent.title}
            placeholder="Title"
            autoFocus
          />
        )}

        <textarea
          name="body"
          onClick={expandForm}
          onChange={handleChange}
          value={NoteContent.body}
          placeholder="Take a note..."
          rows={pressed ? 3 : 1}
        />
        <Zoom in={pressed}>
          <Fab type="submit" onClick={handleClick}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
