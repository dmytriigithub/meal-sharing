import React, { useContext, useState, useEffect } from "react";

import useMealSharingService from "../../services/MealSharingService";

import { SingleMealContext } from "../pages/singleMealPage/SingleMealPage";

import "./reviewForm.css";


const ReviewForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stars, setStars] = useState('');


    const {postReview} = useMealSharingService();

    useEffect(() => {
        console.log(new Date().toJSON().slice(0, 10))
    }, [])

    

    const {isReviewFormVisible, setReviewFormVisible, mealId} = useContext(SingleMealContext);

    const postReviewData = () => {
        const data = {
            "meal_id": +mealId,
            "stars": +stars,
            "created_date": new Date().toJSON().slice(0, 10),
            "description": description,
            "name": name,
        };
        

        postReview(data);
        
    }

    return (
        <div className="overlay">
            <div className="review">
                <div className="reviewClose" onClick={() => setReviewFormVisible(!isReviewFormVisible)}>&times;</div>
                <div className="reviewSubtitle">Write your review</div>
                <form className="reviewForm">
                    <input required placeholder="Name" type="text" className="reviewName" value={name} onChange={(e) => {setName(e.target.value)}}/>
                    <textarea required placeholder="Description" cols={255} rows={10} className="resevationPhone" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                    <input required placeholder="Stars" type="number" className="reviewStars" value={stars} max={5} min={0} onChange={(e) => {setStars(e.target.value)}}/>
                    <button className="reviewFormBtn" onClick={postReviewData}>Submit</button>
                </form>
            </div>
        </div>
        
    )
}

export default ReviewForm;