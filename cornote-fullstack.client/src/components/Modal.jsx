import { useEffect} from "react";

function Modal({ title, body, showModal, onClose, onChange }) {

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
    <dialog className="modal">
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
        <button>Update</button>
        <button onClick={handleClose}>Close</button>
      </form>
    </dialog>
  );
}

export default Modal;
