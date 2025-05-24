import React, { useEffect, useState } from "react";
import { use } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

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
  };

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            name="roomType"
            id="roomType"
            className="form-select mb-2 shadow-sm"
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value == "Add New") {
                setShowNewRoomTypeInput(true);
              } else {
                handleRoomInputChange(e);
              }
            }}
          >
            <option value={""}>Chọn 1 phòng</option>
            <option value={"Add New"}>Thêm loại phòng mới...</option>
            {roomTypes.map((type, index) => (
              <option value={type} key={index}>
                {type}
              </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập 1 loại phòng mới"
                value={newRoomType}
                onChange={handleNewTypeRoomInputChange}
              />
              <button
                type="button"
                className="btn btn-success"
                onClick={handleAddNewRoomType}
              >
                Thêm
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;
