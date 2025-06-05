import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081",
});

export const getHeader = ()=>{
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token ? "Present" : "Missing"); // Debug log
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
}

export const addRoom = async (photo, roomType, roomPrice) => {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms/add/new-room", formData); //request param
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
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const bookRoom = async (roomId, booking) => {
  try {
    const response = await api.post(
      `/bookings/room-booking/${roomId}`,
      booking
    ); //request body
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(error.message);
    }
  }
};

export const getAllBookings = async () => {
  try {
    const result = await api.get("/bookings/get-all-booking");
    return result.data;
  } catch (error) {
    throw new Error("Lỗi, không thể lấy các phòng được đặt " + error.message);
  }
};

export const getBookingByConfirmationCode = async (confirmationCode) => {
  try {
    const result = await api.get(
      `/bookings/confirmationCode/${confirmationCode}`
    );
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(error);
    }
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
    return result.data;
  } catch (error) {}
};

export const getAvailableRooms = async (
  checkInDate,
  checkOutDate,
  roomType
) => {
  const result = await api.get(
    `rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
  );
  console.log(checkInDate);
  return result;
};

export const registerUser = async (registration) => {
  try {
    const response = await api.post("/auth/register-user", registration);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Lỗi đăng ký tài khoản: " + error.message);
    }
  }
};

export const loginUser = async (login) => {
  try {
    console.log("Attempting login with:", { email: login.email, password: "***" }); // Debug log
    const response = await api.post("/auth/login", login);
    
    if (response.status >= 200 && response.status < 300) {
      console.log("Login successful:", response.data); // Debug log
      return response.data;
    } else {
      console.log("Login failed with status:", response.status); // Debug log
      return null;
    }
  } catch (error) {
    console.error("Login error:", error);
    console.error("Error response:", error.response?.data);
    return null;
  }
};

export const getUserProfile = async userId=>{
  try{
    const response = await api.get(`users/${userId}`, {headers: getHeader()});
    return response.data;
  }catch(error){
    throw new Error(error.message);
  }
}


export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}


export async function getUser(userId, token) {
	try {
		console.log("Getting user with ID:", userId); // Debug log
		console.log("Request URL:", `/users/${userId}`); // Debug log
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error in getUser:", error.response?.data || error.message);
		throw error
	}
}

export async function getBookingsByUserId(userId, token) {
	try {
		console.log("Getting bookings for user ID:", userId); // Debug log
		console.log("Request URL:", `/bookings/user/${userId}/bookings`); // Debug log
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.response?.data || error.message)
		throw new Error("Failed to fetch bookings")
	}
}
