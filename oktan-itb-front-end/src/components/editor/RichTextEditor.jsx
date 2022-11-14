import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiFillInfoCircle, AiFillQuestionCircle } from 'react-icons/ai';
import 'react-quill/dist/quill.snow.css';


const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link',
]


const RichTextEditor = ({ placeholder, onChange, value, readOnly, header }) => {
  const [widgetState, setWidgetState] = useState({
    value: value || ''
  })


  const handleChange = (value) => {
    setWidgetState({ value: value })
    if (typeof onChange === 'function') {
      onChange(widgetState.value)
    }
  }

  return (
    <div>
      <div className="m-2">
        <span>{header}</span>
      </div>
      <ReactQuill
        theme={readOnly ? 'bubble' : 'snow'}
        value={widgetState.value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  )
}

export default RichTextEditor