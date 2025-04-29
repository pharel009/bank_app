import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className='notfound'>
        <h2>Page not found</h2>
        <h1>404</h1>
        <p>Click <Link to="/">here</Link> to return home</p>
    </div>
  )
}
