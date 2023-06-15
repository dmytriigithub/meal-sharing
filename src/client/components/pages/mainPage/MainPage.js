import React from 'react';
import img from '../../../resources/img/background.jpg';
import './mainPage.css';

const MainPage = () => {

    return (
        <div className='main_page'>
            <img src={img} width="800" alt="background" />
        </div>
    )
}

export default MainPage;