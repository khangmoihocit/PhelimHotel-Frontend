import { parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DateSlider from '../common/DateSlider';

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
        }        setFilteredBooking(filtered);
    };
    useEffect(()=>{
        setFilteredBooking(bookingInfo);
    }, [bookingInfo]);
    return (
        <section className='p-4'>
            <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings}/>
            <table className='table table-bordered table-hover shadow'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đặt phòng</th>
                        <th>Mã phòng</th>
                        <th>Loại phòng</th>
                        <th>Ngày nhận phòng</th>
                        <th>Ngày trả phòng</th>
                        <th>Tên khách hàng</th>
                        <th>Email</th>
                        <th>Số người lớn</th>
                        <th>Số trẻ em</th>
                        <th>Tổng số khách</th>
                        <th>Code phòng</th>
                        <th colSpan={2}>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {filteredBookings.map((booking, index)=>{
                        return (
                            <tr key={booking.bookingId}>
                                <td>{index + 1}</td>
                                <td>{booking.bookingId}</td>
                                <td>{booking.roomResponse.id}</td>
                                <td>{booking.roomResponse.roomType}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                                <td>{booking.guestFullName}</td>
                                <td>{booking.guestEmail}</td>
                                <td>{booking.numOfAdults}</td>
                                <td>{booking.numOfChildren}</td>
                                <td>{booking.totalNumOfGuest}</td>
                                <td>{booking.bookingConfirmationCode}</td>
                                <td>
                                    <button className='btn btn-danger btn-sm'
                                    onClick={()=>handleBookingCancellation(booking.bookingId)}>Hủy</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {filteredBookings.length === 0 && <p>Không có phòng nào được đặt trong ngày bạn chọn</p>}
        </section>
    );
};

export default BookingsTables;