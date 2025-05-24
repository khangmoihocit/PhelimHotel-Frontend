import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081",
});

//This function add room to database
export const addRoom = async (photo, roomType, roomPrice) => {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms/add/new-room", formData);
  if (response.status == 201) {
    return true;
  } else {
    return false;
  }
};

//This function gets all room types from the database
export const getRoomTypes = async () => {
  try {
    const response = await api.get("/rooms/room-types");
    return response.data;
  } catch (error) {
    throw new Error("looi");
  }
};

//This function gets all rooms from the database
export const getAllRooms = async () => {
  try {
    const response = await api.get("/rooms/get-all-room");
    return response.data;
  } catch (error) {
    throw new Error("không thể lấy phòng " + error);
  }
};

export const deleteRoom = async (roomId) => {
    try{
        const result = await api.delete(`rooms/delete/room/${roomId}`);
        return result.data;
    }catch(error){
        throw new Error("không thể xóa: " + error);
    }
};
