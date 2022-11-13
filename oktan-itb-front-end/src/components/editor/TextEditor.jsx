import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import PropTypes from 'prop-types';


export class TextEditor extends Component {

  constructor(props){
    super(props)
    this.state = { editorState: props.values}
    this.onChange = props.onChange
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange ({target}) {
    this.onChange(target)
  }

  
  render() {
    return (
      <div className='flex'>
        <div className='border-2 border-r-8 rounded-br-lg p-4 w-full'>
        <ReactQuill
          theme='bubble'
          value={this.props.value}
          onChange={this.handleChange}
          modules={TextEditor.modules}
          formats={TextEditor.formats}
          placeholder= {this.props.placeholder}
        />
        </div>
      </div>
    )
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
TextEditor.modules = {
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
TextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 
]

TextEditor.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  values: PropTypes.string
}

export default TextEditor