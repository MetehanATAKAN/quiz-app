import React from 'react'
import './loading.css';

const Loading = () => {
  return (
    <div className="loading-screen" data-testid="loading-spinner">
      <div className="loading-spinner"></div>
    </div>
  )
}

export default Loading