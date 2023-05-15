import React, { useState, useEffect, createContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMealSharingService from "../../services/MealSharingService";

import './mealsList.css';

import Filter from "../filter/Filter";

export const MealsContext = createContext();

const MealsList = () => {
    const [data, setData] = useState(null);
    const [price, setPrice] = useState('');
    const [text, setText] = useState('');
    const [option, setOption] = useState('');

    const {loading, error, getAllMeals} = useMealSharingService();

    useEffect(() => {
        getMeals();
    }, [])

    const getMeals = () => {
        getAllMeals().then(res => setData(res));
        
    } 

    const filteredMeals = data && data.filter(meal => {
        const isIncludedInTitle = meal.title.toLowerCase().includes(text.toLowerCase());
        const isMatchingLocation = option ? meal.location === option : true;
        const isPriceUnderMaxPrice = price ? meal.price <= +price : true;
        return isIncludedInTitle && isMatchingLocation && isPriceUnderMaxPrice;
    });

    const renderList = () => {
        if (filteredMeals.length === 0) {
            return <p>No meals found.</p>;
        }
        const items = filteredMeals.map((item) => {
            return (
                <li className="meal-list_item" key={item.id}>
                    <Link to={`/meals/${item.id}`}>
                        <div className="meal-list__wrapper">
                            <div className="meal-list__block">
                                <img src={item.url} alt={item.title} className="meal-list__img"/>
                            </div>
                            <div className="meal-list__block">
                                <p>{item.location}</p>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                                <p>Price: {item.price}$</p>
                            </div>
                        </div>
                    </Link>
                </li>

            );
        });
        
        return <ul>{items}</ul>;
    };

    return (
        <MealsContext.Provider value={{text, setText, data, option, setOption, price, setPrice}}>
            <div className="meals-list">
                <Filter />
                {error && <ErrorMessage />}
                {loading && <Spinner />}
                {data && renderList()}
            </div>
        </MealsContext.Provider>
    );
}

export default MealsList