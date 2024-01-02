import { useEffect } from "react";

function Modal({
  title,
  body,
  bg_color,
  showModal,
  onClose,
  onChange,
  handleUpdate,
}) {
  function handleChange(event) {
    const { name, value } = event.target;

    onChange((prevModal) => {
      return {
        ...prevModal,
        [name]: value,
      };
    });
  }

  function handleClose(e) {
    onClose(false);
    e.preventDefault();
  }

  useEffect(() => {
    const modal = document.querySelector("dialog");
    showModal ? modal.showModal() : modal.close();
  }, [showModal]);

  return (
    <dialog className={"modal " + bg_color}>
      <h1>Update Note</h1>
      <form>
        <input
          autoFocus
          name="title"
          onChange={handleChange}
          value={title}
          placeholder="Title"
        />

        <textarea
          name="body"
          onChange={handleChange}
          value={body}
          placeholder="Take a note..."
          rows={3}
        />
        <div className="flex-row">
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default Modal;
