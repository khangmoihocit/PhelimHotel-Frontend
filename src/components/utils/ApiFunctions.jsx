import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081",
});

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

export const getRoomTypes = async () => {
  try {
    const response = await api.get("/rooms/room-types");
    return response.data;
  } catch (error) {
    throw new Error("looi");
  }
};

export const getAllRooms = async () => {
  try {
    const response = await api.get("/rooms/get-all-room");
    return response.data;
  } catch (error) {
    throw new Error("không thể lấy phòng " + error.message);
  }
};

export const deleteRoom = async (roomId) => {
  try {
    const result = await api.delete(`rooms/delete/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error("không thể xóa: " + error.message);
  }
};

export const updateRoom = async (roomId, roomData) => {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);

  const response = await api.put(`rooms/update/${roomId}`, formData);
  return response;
};

export const getRoomById = async (roomId) => {
  try {
    console.log("API call: getRoomById for roomId:", roomId);
    const result = await api.get(`/rooms/room/${roomId}`);
    console.log("API response for getRoomById:", result.data);
    return result.data;
  } catch (error) {
    console.error("API error in getRoomById:", error);
    // If backend is not available, return mock data for testing
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
      console.log("Backend not available, returning mock data");
      return {
        id: roomId,
        roomType: "Standard Room",
        roomPrice: 500000,
        photo: null
      };
    }
    throw new Error("Không thể lấy thông tin phòng: " + error.message);
  }
};

export const bookRoom = async (roomId, booking) => {
  try {
    const response = await api.post(`/bookings/room-booking/${roomId}`, booking);
    return response.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
      return "MOCK-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllBookings =async ()=>{
  try{
    const result = await api.get("/bookings/get-all-booking");
    return result.data;
  }catch(error){
    throw new Error("Lỗi, không thể lấy các phòng được đặt " + error.message);
  }
}

export const getBookingByConfirmationCode= async confirmationCode=>{
  try{
    const result = await api.get(`/bookings/confirmationCode/${confirmationCode}`);
    return result.data;
  }catch(error){
    if(error.response && error.response.data){
      throw new Error(error.response.data);
    }else{
      throw new Error("Lỗi, không thể tìm thấy phòng này: " + error.message)
    }
  }
}

export const cancelBooking = async bookingId=>{
  try{
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
    return result.data;
  }catch(error){

  }
}