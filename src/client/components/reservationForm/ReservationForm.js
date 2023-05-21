import React, { useContext, useState} from "react";

import useMealSharingService from "../../services/MealSharingService";

import { SingleMealContext } from "../pages/singleMealPage/SingleMealPage";

import "./reservationForm.css";

const ReservationForm = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState('');

    const {postReservatiion} = useMealSharingService();

    const {isReservationFormVisible, setReservationFormVisible, mealId, max_reservations} = useContext(SingleMealContext);

    const postReservatiionData = () => {
        const data = {
            "meal_id": +mealId,
            "number_of_guests": +guests,
            "created_date": date,
            "contact_phonenumber": phone,
            "contact_name": name,
            "contact_email": email
        };

        postReservatiion(data);
        
    }

    return (
        <div className="overlay">
            <div className="reservation">
                <div className="reservationClose" onClick={() => setReservationFormVisible(!isReservationFormVisible)}>&times;</div>
                <div className="reservationSubtitle">Your reservation</div>
                <form className="reservationForm">
                    <input required placeholder="Name" type="text" className="reservationName" value={name} onChange={(e) => {setName(e.target.value)}}/>
                    <input required placeholder="Phone number" type="tel" className="resevationPhone" value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
                    <input required placeholder="Email" type="email" className="reservationEmail" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    <input required placeholder="Date" type="date" className="reservationDate" value={date} onChange={(e) => {setDate(e.target.value)}}/>
                    <input required placeholder="Number of guests" type="number" className="reservationGuestNumber" max={max_reservations} min={1} value={guests} onChange={(e) => {setGuests(e.target.value)}}/>
                    <button className="reservationFormBtn" onClick={postReservatiionData}>Submit</button>
                </form>
            </div>
        </div>
        
    )
}

export default ReservationForm;