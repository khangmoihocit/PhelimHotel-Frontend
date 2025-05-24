import React, { useEffect, useState } from "react";
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";
import RoomFilter from "../common/RoomFilter";
import { Col } from "react-bootstrap";
import RoomsPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]); //danh sách phòng từ database
  const [currentPage, setCurrentPage] = useState(1); //trang hiện tại
  const [roomsPerPage, setRoomsPerPage] = useState(8); //dùng để quy định số lượng phòng hiển thị trên mỗi trang trong bảng danh sách phòng.
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]); //danh sách các phòng đã được lọc
  const [selectedRoomType, setSelectedRoomType] = useState(""); //loại phòng dùng để lọc
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  //load các phòng từ database
  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      setRooms(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Lỗi backend: " + error);
    }
  };

  //lọc các phòng
  useEffect(() => {
    if (selectedRoomType == "") {
      //chưa có phòng nào được chọn thì gắn phòng đang lọc là các phòng từ database
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  //xử lý khi ấn vào số trang
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //xử lý khi ấn btn xóa
  const handleDelete = async (roomId) => {
    try {
      const result = await deleteRoom(roomId);
      if (result === "") {
        setSuccessMessage("room no " + roomId + " was delete");
        fetchRooms();
      } else {
        console.error(`Lỗi không thể xóa phòng: ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  //tính tổng số trang
  const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <>
      {isLoading ? (
        <p>Loading existing rooms</p>
      ) : (
        <section className="mt-5 mb-5 container">
          <div className="d-flex justify-content-center mb-3 mt-5">
            <h2>Existing rooms</h2>
          </div>
          <Col md={6} className="mb-3 mb-md-0">
            {/* Ô để lọc*/}
            <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
          </Col>

          <table className="table table-bordered table-hover">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Loại phòng</th>
                <th>Giá phòng</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentRooms.map((room) => (
                <tr key={room.id} className="text-center">
                  <td>{room.id}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice}</td>
                  <td>
                    <Link to={`/edit-rom/${room.id}`}>
                      <span className="btn btn-info">
                        <FaEye />
                      </span>
                      <span className="btn btn-warning">
                        <FaEdit />
                      </span>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(room.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <RoomsPaginator
            currentPage={currentPage}
            totalPage={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
            onPageChange={handlePaginationClick}
          />
        </section>
      )}
    </>
  );
};

export default ExistingRooms;
