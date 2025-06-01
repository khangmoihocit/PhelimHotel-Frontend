import { parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';

const BookingsTables = ({bookingInfo, handleBookingCancellation}) => {
    const [filteredBookings, setFilteredBooking] = useState(bookingInfo) //room đã filter
    const filterBookings = (startDate, endDate)=>{
        let filtered = bookingInfo;
        if(startDate && endDate){
            filtered = bookingInfo.filter(booking=>{
                const bookingStartDate = parseISO(booking.checkInDate);
                const bookingEndDate = parseISO(booking.checkOutDate);
                return bookingStartDate >= startDate && bookingEndDate <=endDate && bookingEndDate >= startDate;
            });
        }
        setFilteredBooking(filtered);
    }
    useEffect(()=>{
        setFilteredBooking(bookingInfo);
    }, [bookingInfo])
    return (
        <div>
            
        </div>
    );
};

export default BookingsTables;