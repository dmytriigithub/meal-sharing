import React, { useContext} from 'react';
import { MealsContext } from '../mealsList/MealsList';

import "./filter.css"

function Filter() {

   const {text, setText, data, option, setOption, price, setPrice} = useContext(MealsContext);

    const onTitleValueChange = (e) => {
        setText(e.target.value);
    }

    const onLocationValueChange = (e) => {
        setOption(e.target.value);
    }

    const onPriceValueChange = (e) => {
        setPrice(e.target.value);
    }


    const getOptions = () => {
        const optionsValue = data.map(item => {     
            return (
                <option key={item.id} value={item.location}>
                    {item.location}
                </option>
            )
        })

        return optionsValue;
    
    }
  
    return (
        <div className='filter'>
            <input value={text} type="text" placeholder="Search meal" onChange={onTitleValueChange} />
            <select id="country" value={option} onChange={onLocationValueChange}>
                <option value="">Choose country</option>
                {data && getOptions()}
            </select>
            <input value={price} type="text" placeholder="Max price" onChange={onPriceValueChange} />
        </div>
    );
}

export default Filter;