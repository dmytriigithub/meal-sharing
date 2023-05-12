import React from 'react';
import img from './error-icon.svg';
import "./errorMessage.css"

const ErrorMessage = () => {
    return (
        <div className='error'>
            <h1>Something went wrong.</h1>
            <p>We apologize for the inconvenience. Please try again later.</p>
            <img style={{ display: 'block', width: "250px", height: "250px",objectFit: 'contain', margin: "0 auto"}}  src={img} alt="Error"/>
        </div>
        
    )
}

export default ErrorMessage;