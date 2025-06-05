import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";
import "./RoomTypeSelector.css";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]); // danh sách loại phòng từ database
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false); //dùng để show input thêm loại phòng
  const [newRoomType, setNewRoomType] = useState(""); //loại phòng mới

  //lấy các loại phòng từ database
  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(Array.isArray(data) ? data : []); // Đảm bảo là mảng
    });
  }, []);

  //tạo loại phòng mới
  const handleNewTypeRoomInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  //lưu phòng vừa tạo vào mảng roonTypes
  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };  return (
    <div className="room-type-selector-container">
      {roomTypes.length > 0 && (
        <>
          <select
            name="roomType"
            id="roomType"
            className="form-control-modern"
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value == "Add New") {
                setShowNewRoomTypeInput(true);
              } else {
                handleRoomInputChange(e);
              }
            }}
          >
            <option value={""}>Chọn loại phòng</option>
            <option value={"Add New"}>Thêm loại phòng mới...</option>
            {roomTypes.map((type, index) => (
              <option value={type} key={index}>
                {type}
              </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className="input-group">
              <input
                type="text"
                className="form-control-modern"
                placeholder="Nhập loại phòng mới"
                value={newRoomType}
                onChange={handleNewTypeRoomInputChange}
              />
              <button
                type="button"
                className="room-type-add-btn"
                onClick={handleAddNewRoomType}
              >
                ✓ Thêm
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RoomTypeSelector;
