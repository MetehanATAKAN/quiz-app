import React from 'react'
import './input.css';

const Input = ({
    setValue,
    placeholder='input',
    isError = false
}) => {

    const changeInput = (e) => {
        setValue(e);
    }
  return (
    <input 
    className={isError ? `input-error input` : 'input'}
    type='text'
    required
    onChange={(e)=>changeInput(e.target.value)}
    placeholder={placeholder}
    >

    </input>
  )
}

export default Input