import { useState } from 'react'
import { diffChars } from 'diff'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState('')

  const generateNotesDiff = () => {
    const diffy = notes.map((note, index) => {
      if (index === 0) {
        return diffChars('', note)
      }
      return diffChars(notes[index - 1], note);
    })

    diffy.reverse()

    return diffy.map((change) => {
      return <div>{
        change.map((part) => {
          // green for additions, red for deletions
          // grey for common parts
          const color = part.added ? 'green' :
            part.removed ? 'red' : 'grey';
          return <span style={{ color: color }}>{part.value}</span>
        })
      }</div>
    })
  }

  return (
    <>
      <div style={{ padding: 12 }}>
        <input type="text" style={{ padding: 8, width: 300 }} value={currentNote} onChange={(e) => setCurrentNote(e.target.value)} />
        <button onClick={() => setNotes([...notes, currentNote])}>Add Note</button>
      </div>
      <div>
        {generateNotesDiff()}
      </div>
    </>
  )
}

export default App
