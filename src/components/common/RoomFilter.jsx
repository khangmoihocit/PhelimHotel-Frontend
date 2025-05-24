import React, { useState } from "react";

//data: danh sách các phòng
//setFilteredData: các phòng đã được lọc
const RoomFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectRoomType = e.target.value;
    setFilter(selectRoomType);

    //lấy ra các phòng được lọc theo loại phòng
    const filteredRooms = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectRoomType.toLowerCase())
    );
    setFilteredData(filteredRooms);
  };

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  //tất cả các loại phòng trong database
  const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Lọc theo kiểu phòng
      </span>
      <select
        className="form-select"
        value={filter}
        onChange={handleSelectChange}
      >
        <option value={""}>chọn 1 loại phòng...</option>

        {roomTypes.map((type, index) => (
          <option value={String(type)} key={index}>
            {String(type)}
          </option>
        ))}
      </select>

      <button className="btn btn-hotel" type="button" onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
  );
};

export default RoomFilter;
