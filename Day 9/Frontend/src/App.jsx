import { useState } from 'react';
import axios from 'axios';
const App = () => {


  const [Notes, setNotes] = useState([]);

  axios.get('http://localhost:4000/api/notes')
    .then((res) => {
      setNotes(res.data.notes);
    })


  function Rendernotes() {
    return Notes.map((note, idx) => {
      return <div key={idx} className="notes">
        <h2>{note.title}</h2>
        <p>{note.description}</p>
      </div>
    });
  }


  return (
    <div className="app">
      <Rendernotes />
    </div>
  )
}

export default App
