import React, { useEffect } from "react";
import { useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { useParams } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });
  const [imagePreview, setImagePreview] = useState(""); //lưu đường dẫn ảnh
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { roomId } = useParams();

  //chuyển ảnh sang url và đưa vào state
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage)); //chuyển ảnh sang url
  };

  //server trả về photo là dạng base64, 
  function base64ToImageUrl(base64String) {
    if (!base64String) return "";
    //Nếu là png thì đổi lại.
    return `data:image/jpg;base64,${base64String}`;
  }

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      value = value === "" ? "" : Number(value);
    }
    setRoom({ ...room, [name]: value });
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        //lấy phòng vừa được chọn để hiện lên trang edit
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        // Chuyển base64 thành URL ảnh
        const imageUrl = base64ToImageUrl(roomData.photo);
        setImagePreview(imageUrl);
      } catch (error) {
        setErrorMessage(error);
      }
    };
    fetchRoom();
  }, [roomId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Starting room update...");
    console.log("Room data being sent:", room);
    
    try {
      const response = await updateRoom(room.id, room);
      console.log("Update response:", response);
      
      if (response.status === 200) {
        setSuccessMessage("Cập nhật phòng thành công");
        const updateRoomData = await getRoomById(roomId);
        setRoom(updateRoomData);
        setImagePreview(base64ToImageUrl(updateRoomData.photo));
        setErrorMessage("");
      } else {
        setErrorMessage("Lỗi cập nhật thất bại");
      }
    } catch (error) {
      console.error("Update error:", error);
      console.error("Error response:", error.response);
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow rounded p-4 border-0 bg-light">              <h2 className="mt-2 mb-4 text-center text-primary">
                Cập nhập phòng
              </h2>
              
              {successMessage && (
                <div className="alert alert-success fade show">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="alert alert-danger fade show">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="roomType" className="form-label fw-bold">
                    Loại phòng
                  </label>
                  <RoomTypeSelector
                    handleRoomInputChange={handleRoomInputChange}
                    newRoom={room}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="roomPrice" className="form-label fw-bold">
                    Giá phòng
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    id="roomPrice"
                    name="roomPrice"
                    value={room.roomPrice}
                    onChange={handleRoomInputChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="photo" className="form-label fw-bold">
                    Ảnh phòng
                  </label>
                  <input
                    className="form-control"
                    id="photo"
                    name="photo"
                    type="file"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="text-center mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview room photo"
                        style={{
                          maxWidth: "300px",
                          maxHeight: "300px",
                          borderRadius: "12px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                        className="mb-2 border"
                      />
                    </div>
                  )}
                </div>

                <div className="d-grid mt-2 gap-2 d-md-flex">
                  <Link
                    to={"/existing-rooms"}
                    className="btn btn-outline-info ml-5"
                  >
                    Back
                  </Link>
                  <button className="btn btn-outline-warning" type="submit">
                    Lưu phòng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditRoom;
