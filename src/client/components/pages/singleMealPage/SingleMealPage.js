import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect, createContext} from 'react';

import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import useMealSharingService from "../../../services/MealSharingService";
import Reviews from '../../reviews/Reviews';
import ReservationForm from '../../reservationForm/ReservationForm';

import './singleMealPage.css';

export const SingleMealContext = createContext();

const SingleMealPage = () => {

    const {mealId} = useParams();
    const [meal, setMeal] = useState(null);
    const [isReviewsVisible, setReviewsVisible] = useState(false);
    const [isReservationFormVisible, setReservationFormVisible] = useState(false);
    const [isReviewFormVisible, setReviewFormVisible] = useState(false);

    const {loading, error, getMeal, clearError} = useMealSharingService();


    useEffect(() => {
        getMealData();
    }, [])

    const getMealData = () => {
        clearError();
        getMeal(mealId).then(res => setMeal(res));
        
    }

    const render = () => {
        const {title, description, location, price, max_reservations, status, url} = meal;
        
    
        return (
            <SingleMealContext.Provider value={{isReservationFormVisible, setReservationFormVisible, isReviewFormVisible, setReviewFormVisible, mealId, max_reservations}}>
                <div className="single-meal">
                
                <div className="single-meal__info">
                    <div className="single-meal__title">
                        <h2>{title}</h2>
                        <p className="single-meal__description">{description}</p>
                        <img src={url} alt={title} className="single-meal__img"/>
                    </div>
                    
                    <div className="single-meal__wrapper">
                        <div className="block">
                            <p>{location}</p>
                            <p>Price: {price}$</p>
                            <Link to="/meals" className="single-meal__back">Back to all</Link>
                        </div>
                        <div className="block">
                            <p>Reservation: {status}</p>
                            <p>Max persons: {max_reservations}</p>
                            <button className="btnSingleMeal" onClick={() => setReservationFormVisible(!isReservationFormVisible)}>Reservate</button>
                        </div>
                    </div>
                </div>
                {isReviewsVisible && <Reviews id={mealId} />}
                {isReservationFormVisible && <ReservationForm/>}
                <button className="btnSingleMeal btnReview" onClick={() => setReviewsVisible(!isReviewsVisible)}>Reviews</button>
            </div>
            </SingleMealContext.Provider>
            
        )
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !meal) ? render() : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SingleMealPage;