import { useState } from "react";
import { addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";

export default function AddRoom() {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });
  
  const [imagePreview, setImagePreview] = useState(""); //lưu đường dẫn ảnh
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      value = value === "" ? "" : Number(value);
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  //chuyển ảnh sang url và đưa vào state
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage)); //chuyển ảnh sang url
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice
      );
      if (success != undefined) {
        setSuccessMessage("Tạo phòng thành công");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreview("");
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(()=>{
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000)
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow rounded p-4 border-0 bg-light">
              <h2 className="mt-2 mb-4 text-center text-primary">Thêm phòng mới</h2>
              {successMessage &&(
                <div className="alert alert-success fade show">{successMessage}</div>
              )}
              {errorMessage &&(
                <div className="alert alert-danger fade show">{errorMessage}</div>
              )}



              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="roomType" className="form-label fw-bold">Loại phòng</label>
                  <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}/>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="roomPrice" className="form-label fw-bold">Giá phòng</label>
                  <input
                    className="form-control"  
                    required
                    type="number"
                    min="0"
                    id="roomPrice"
                    name="roomPrice"
                    value={newRoom.roomPrice}
                    onChange={handleRoomInputChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="photo" className="form-label fw-bold">Ảnh phòng</label>
                  <input
                    className="form-control"
                    required
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
                        style={{ maxWidth: "300px", maxHeight: "300px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                        className="mb-2 border"
                      />
                    </div>
                  )}
                </div>

                <div className="d-grid mt-2 d-md-flex gap-2">
                  <Link to={"/existing-rooms"} className="btn btn-outline-info">Quay lại</Link>
                  <button className="btn btn-primary btn-lg shadow-sm" type="submit">
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
}
