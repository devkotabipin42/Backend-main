import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);

  function fetchNotes() {
    axios.get("https://backend-3-g5io.onrender.com/api/notes").then((res) => {
      setNotes(res.data.note);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e){
    e.preventDefault()
    const {title,description} = e.target.elements
    console.log(title.value,description.value);

    axios.post('https://backend-3-g5io.onrender.com/api/notes',{
      title:title.value,
      description:description.value
    })
    .then((res)=>{
      console.log(res.data);
      fetchNotes()
    })
  }
   
  function handleDelNote(noteId){
    console.log(noteId);
    axios.delete('https://backend-3-g5io.onrender.com/api/notes/'+noteId)
    .then((res)=>{
      console.log(res.data);
      fetchNotes()
      
    })
  }

  function handleUpdate(noteId){
    const newDescription=prompt('Enter new description:')
    const newTitle=prompt('Enter the Title')
    if(!newTitle)return
    axios.patch('https://backend-3-g5io.onrender.com/api/notes/'+noteId,{description:newDescription,title:newTitle,})
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
  }
  return (
    <>
    <form className=" border-2  flex gap-2 flex-col gap-3 " onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Enter title" className=" border-2 border-amber-500 text-white "/>
      <input name="description" type="text" placeholder="Enter description" className=" border-2 border-amber-500 text-white "/>
      <button className="h-fit px-2 bg-blue-800">Create note</button>
    </form>
    <div className="notes flex gap-3">
      {notes.map((note, index) => {
        return (
          <div className="note flex flex-col gap-3" key={index}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button className="h-fit w-fit bg-cyan-900 px-3 rounded active:scale-95 cursor-pointer" onClick={()=>{
              {handleDelNote(note._id)}
            }}>Delete</button>
            <button className="h-fit w-fit bg-cyan-900 px-3 rounded active:scale-95 cursor-pointer"onClick={()=>{handleUpdate(note._id)}}>Update</button>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default App;
