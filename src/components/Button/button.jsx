import React from 'react'
import './button.css';

const Button = ({
    name = 'button',
    onClick,
    disabled
}) => {
  return (
    <button onClick={onClick} disabled = {disabled}>
        {name}
    </button>
  )
}

export default Button