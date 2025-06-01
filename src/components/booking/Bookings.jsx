import React, { useEffect, useState } from 'react';
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions';
import BookingsTables from './BookingsTables';

const Bookings = () => {
    const [bookingInfo, setBookingInfo] = useState([]);
    const [isLoading, setIsLoadding] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(()=>{
        setTimeout(()=>{
            getAllBookings().then(data=>{
                setBookingInfo(data);
                setIsLoadding(false);
            }).catch(error => {
                setError(error);
                setIsLoadding(true);
            })
        }, 1000)
    }, []);

    const handleBookingCancellation = async bookingId =>{
        try{
            await cancelBooking(bookingId);
            const data = await getAllBookings();
            setBookingInfo(data);
        }catch(error){  
            setError(error);
        }
    }

    return (
        <section className='container' style={{backgroundColor:"whitesmoke"}}>
            <header title={"Danh sách đặt phòng"}/>
            {error && ( <div className='text-danger'>{error}</div>)}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <BookingsTables bookingInfo={bookingInfo} handleBookingCancellation={handleBookingCancellation}/>
            )}            
        </section>
    );
};

export default Bookings;