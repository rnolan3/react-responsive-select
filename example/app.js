import React from 'react'
import ReactDOM from 'react-dom'
import Select from 'react-responsive-select'
import options from './data'

const target = document.getElementById('app')

ReactDOM.render(<Select
  name="test"
  optionKeys={ { label: 'name', value: 'abbreviation' } }
  options={ options }
  placeholder="Select One" />, target)
