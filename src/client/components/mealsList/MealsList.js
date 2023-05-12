import React, { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMealSharingService from "../../services/MealSharingService";

import './mealsList.css';

const MealsList = () => {
    const [data, setData] = useState(null);
    const {loading, error, getAllMeals} = useMealSharingService();

    useEffect(() => {
        getMeals();
    }, [])

    const getMeals = () => {
        getAllMeals().then(res => setData(res));
        
    }

    const mealsList = () => {
        const items = data.map(item => {
            return (
                <li className="listItem" key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <p>Price: {item.price}$</p>
                </li>
            )  
        })
        
        return (
            <ul>
                {items}
            </ul>
        )
    }

    const errorMessage = error ?  <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? mealsList() : null;

    return (
        <div>
            {errorMessage}
            {spinner}
            {content}
        </div>

    )
}

export default MealsList