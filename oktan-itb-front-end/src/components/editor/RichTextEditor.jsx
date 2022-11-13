import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiFillInfoCircle, AiFillQuestionCircle } from 'react-icons/ai';



const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
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


const RichTextEditor = ({placeholder, onChange, value}) => {
    const [widgetState, setWidgetState] = useState({
        value: value || ''
    })


    const handleChange = (value) => {    
        setWidgetState((prev) => {
            return {
                ...prev,
                value: value
            }
        })
        if(typeof onChange === 'function'){
            onChange(widgetState.value)
        }    
      }

  return (
    <div className='grid grid-cols-2 p-4 gap-2'>
        <div className='border-2 border-r-8 rounded-r-lg col-span-2'>
            <div className='col-span-1 col-end-2 bg-base-200'>
                <div className="tooltip text-info tooltip-right m-2" data-tip="Highligth text untuk melakukan format pada text ">
                    <span>help</span>
                    <AiFillQuestionCircle className='inline-block mr-2'/>
                </div>
                <div className='col-span-1 bg-base-100'>
                    <ReactQuill
                    theme='bubble'
                    value={widgetState.value}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                    placeholder= {placeholder}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default RichTextEditor