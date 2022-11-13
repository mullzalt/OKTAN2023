import React from 'react'
import { useState } from 'react'
import { RichTextEditor, TextEditor } from '../../../components/editor'

const CreateCompetitions = () => {
    const [descData, setDescData] = useState('')

    const handleChange = (e) => {
        setDescData(e)
    }
  return (
    <div>
      
        <h1>Text Editor</h1>

        <RichTextEditor
            placeholder={"Tuliskan sesuatu..."}
            onChange={handleChange}
            value={'....'}
        />
    </div>
  )
}

export default CreateCompetitions