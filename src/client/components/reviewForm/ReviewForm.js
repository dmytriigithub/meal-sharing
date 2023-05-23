import React, { useContext, useState} from "react";

import useMealSharingService from "../../services/MealSharingService";

import { SingleMealContext } from "../pages/singleMealPage/SingleMealPage";

import "./reviewForm.css";


const ReviewForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stars, setStars] = useState('');


    const {postReview} = useMealSharingService();

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
                    <div className="rating-area">
                        <input type="radio" id="star-5" name="rating" value="5" onChange={(e) => {setStars(e.target.value)}}/>
                        <label htmlFor="star-5" title="Rating «5»"></label>	
                        <input type="radio" id="star-4" name="rating" value="4" onChange={(e) => {setStars(e.target.value)}}/>
                        <label htmlFor="star-4" title="Rating «4»"></label>    
                        <input type="radio" id="star-3" name="rating" value="3" onChange={(e) => {setStars(e.target.value)}}/>
                        <label htmlFor="star-3" title="Rating «3»"></label>  
                        <input type="radio" id="star-2" name="rating" value="2" onChange={(e) => {setStars(e.target.value)}}/>
                        <label htmlFor="star-2" title="Rating «2»"></label>    
                        <input type="radio" id="star-1" name="rating" value="1" onChange={(e) => {setStars(e.target.value)}}/>
                        <label htmlFor="star-1" title="Rating «1»"></label>
                    </div>
                    <button className="reviewFormBtn" onClick={ name && description ? postReviewData: null}>Submit</button>
                </form>
            </div>
        </div>
        
    )
}

export default ReviewForm;