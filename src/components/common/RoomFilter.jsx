import React, { useState } from 'react';

const RoomFilter = ({data, setFilteredData}) => {
    const [filter, setFilter] = useState("");

    const handleSelectChange = (e) =>{
        const selectRoomType = e.target.value;
        setFilter(selectRoomType);
        const filteredRooms = data.filter
    }

    return (
        <div>
            
        </div>
    );
};

export default RoomFilter;