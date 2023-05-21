import React, { useState, useEffect, useContext } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMealSharingService from '../../services/MealSharingService';
import ReviewForm from '../reviewForm/ReviewForm';

import { SingleMealContext } from '../pages/singleMealPage/SingleMealPage';

import "./reviews.css"

const Reviews = ({id}) => {
    const [review, setReview] = useState([]);

    const {loading, error, getReview, clearError} = useMealSharingService();

    const {isReviewFormVisible, setReviewFormVisible, mealId} = useContext(SingleMealContext);

    useEffect(() => {
        getReviewData();
    }, [])

    const getReviewData = () => {
        clearError();
        getReview(id).then(res => {
            console.log(res);
            setReview(res);
        })
    }

    const paintStars =(stars) => {
        let array = [0, 1, 2, 3, 4];
        const item = array.map((item, i) => {
            if (item < stars) {
                return <span key={i} className="active"></span>;
            } else {
               return <span key={i}></span>
            }
        })
        return item;
    }

    const render = () => {
        if (!review.length) {
            return (
                <div className="emptyList">
                    <p className='noReview'>No reviews found.</p>
                    <button className="btnSingleMeal btnReview" onClick={() => setReviewFormVisible(!isReviewFormVisible)}>Send Reviews</button>
                </div>
            );
        }
        const items = review.map((item) => {
            return (
                <li className="review-list_item" key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p>{item.date.slice(0, 10)}</p>
                    <div className="rating-result">
                        {paintStars(item.stars)}
                        <p className='rating-stars'>{item.stars}/5</p>
                    </div>
                </li>

            );
        });
        return <ul>
            {items}
            <button className="btnSingleMeal btnReview" onClick={() => setReviewFormVisible(!isReviewFormVisible)}>Send Reviews</button>
        </ul>;
    };

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !review) ? render() : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
            {isReviewFormVisible && <ReviewForm/>}
        </>
    )
}

export default Reviews;