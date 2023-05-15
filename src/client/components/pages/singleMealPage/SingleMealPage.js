import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import useMealSharingService from "../../../services/MealSharingService";

import './singleMealPage.css';


const SingleMealPage = () => {
    const {mealId} = useParams();
    const [meal, setMeal] = useState(null);

    const {loading, error, getMeal, clearError} = useMealSharingService();

    useEffect(() => {
        getMealData();
    }, [])

    const getMealData = () => {
        clearError();
        getMeal(mealId).then(res => setMeal(res));
        
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !meal) ? <View meal={meal}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({meal}) => {
    const {title, description, location, price, max_reservations, status, url} = meal;

    return (
        <div className="single-meal">
            
            <div className="single-meal__info">
                <h2>{title}</h2>
                <p>{description}</p>
                <img src={url} alt={title} className="single-meal__img"/>
                <div className="single-meal__wrapper">
                    <div className="block">
                        <p>{location}</p>
                        <p>Price: {price}$</p>
                        <Link to="/meals" className="single-meal__back">Back to all</Link>
                    </div>
                    <div className="block">
                        <p>Max reservation: {max_reservations}</p>
                        <p>Status: {status}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleMealPage;