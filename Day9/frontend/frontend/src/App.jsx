
import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([
    {
    title:'test title1',
    description:'test description'
  },
  {
    title:'test title2',
    description:'test description'
  },
  {
    title:'test title3',
    description:'test description'
  },
  {
    title:'test title4',
    description:'test description'
  }
])

axios.get('http://localhost:3000/api/notes')
.then((res)=>{
  setNotes(res.data.note)
})
  return (
    <div className='notes'>
      {
        notes.map((note,index)=>{
         return <div className='note' key={index}>
      <h1>{note.title}</h1>
      <p>{note.description}</p>
    </div>
        })
      }
    </div>
  )
}

export default App
