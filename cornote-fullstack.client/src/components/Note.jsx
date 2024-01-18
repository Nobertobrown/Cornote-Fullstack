import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { truncate } from "../utilities/utilities";

function Note(props) {
  function handleClick() {
    // props._id;
    props.onDelete(props._id, props.id);
  }

  function handleEdit() {
    console.log("Props from note component",props)
    // props._id,
    props.onEdit(props._id, props.id, props.title, props.body, props.bg, true);
  }

  return (
    <div className={"note " + props.bg}>
      <h1>{props.title}</h1>
      <p>{truncate(props.body, 50)}</p>
      <div className="flex-row">
        <button className="edit-btn" onClick={handleEdit}>
          <EditIcon />
        </button>
        <button className="delete-btn" onClick={handleClick}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default Note;
