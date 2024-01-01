import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Note(props) {
  function handleClick() {
    // props._id;
    props.onDelete(props.id);
  }

  function handleEdit(){
   props.onEdit(props.title, props.body, true) 
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.body}</p>
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
