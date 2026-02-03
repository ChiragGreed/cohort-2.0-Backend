import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [Notes, setNotes] = useState([]);
  const [Flag, setFlag] = useState(false);
  const [SelectedNote, setSelectedNote] = useState(null);

  function getData() {
    axios.get('http://localhost:4000/api/notes')
      .then((res) => {
        setNotes(res.data.notes);
      })
  }

  useEffect(() => { getData() }, []);

  function postData(title, description) {
    axios.post("http://localhost:4000/api/notes", {
      title: title.value,
      description: description.value
    })
      .then((res) => {
        console.log(res.data);
        getData();
      })
  }

  function patchData(title, description) {
    axios.patch(`http://localhost:4000/api/notes/${SelectedNote._id}`, {
      title: title.value,
      description: description.value
    })
      .then((res) => {
        console.log(res.data);
        getData();
      })
  }

  function deleteData(note) {
    axios.delete(`http://localhost:4000/api/notes/${note._id}`)
      .then((res) => {
        console.log(res.data);
        getData();
      })
  }

  function deletehandler(note) {
    deleteData(note);
  }

  function edithandler(note) {
    setSelectedNote(note);
    setFlag(true);
  }

  function Creationformhandler(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    postData(title, description);
  }

  function Editformhandler(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    patchData(title, description);
    goback();
  }

  function goback(note) {
    setSelectedNote(null);
    setFlag(false);
  }

  function RenderEdit_overlay() {
    return <div className="edit_overlay">
      <div className="edit_note">

        <form onSubmit={Editformhandler}>
          <input name="title" type="text" defaultValue={SelectedNote.title} placeholder="Enter Title" required />
          <input name="description" type="text" defaultValue={SelectedNote.description} placeholder="Enter Description" required />
          <button>Edit</button>
        </form>

      </div>
    </div>
  }

  function Rendernotes() {
    return Notes.map((note, idx) => {
      return <div key={idx} className="note">

        <div>
          <h2>{note.title}</h2>
          <p>{note.description}</p>
        </div>

        <div className="btns">
          <button onClick={() => { deletehandler(note) }} className="delete_btn">Delete</button>
          <button onClick={() => { edithandler(note) }} className="edit_btn">Edit</button>
        </div>

      </div>
    });
  }

  return (
    <div className="app">

      <form onSubmit={Creationformhandler}>
        <input name="title" type="text" placeholder="Enter Title" required />
        <input name="description" type="text" placeholder="Enter Description" required />
        <button>Create</button>
      </form>


      <div className="Notes">
        <Rendernotes />
      </div>

      {Flag && <RenderEdit_overlay />}
    </div>
  )
}

export default App
