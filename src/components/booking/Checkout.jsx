import React, { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import { useParams } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunctions";
import { FaCar, FaTv, FaUtensils, FaWifi } from "react-icons/fa";
import RoomCarousel from "../common/RoomCarousel";

const Checkout = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoadding] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });

  const { roomId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          setRoomInfo(response);
          setIsLoadding(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoadding(true);
        });
    }, 2000);
  }, [roomId]);

  return (
    <div>
      <section className="container">
        <div className="row flex-column flex-md-row align-items-center">
          <div className="col-md-4 mt-5 mb-5">
            {isLoading ? (
                <p>Đang tải thông tin phòng...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="room-info">
                    <img src={`data:image/jpg;base64, ${roomInfo.photo}`}
                     alt="Ảnh phòng"
                     style={{width:"100%", height:"auto"}} />
                     <table style={{border:"2px", margin:"30px 0 0 0"}}>
                        <tbody>
                            <tr>
                                <th>Loại phòng: </th>
                                <th>{roomInfo.roomType} </th>
                            </tr>
                            <tr>
                                <th>Giá phòng: </th>
                                <th>{roomInfo.roomPrice} </th>
                            </tr>
                            <tr>
                                <th>Dịch vụ:</th>
                                <th>
                                    <ul className="list-unstyled">
                                        <li>
                                            <FaWifi /> Wifi
                                        </li>
                                        <li>
                                            <FaTv /> Netfilx Premium
                                        </li>
                                        <li>
                                            <FaUtensils /> Ăn sáng
                                        </li>
                                        <li>
                                            <FaCar /> Dịch vụ xe
                                        </li>
                                    </ul>
                                </th>
                            </tr>
                        </tbody>
                     </table>
                </div>
            )}
          </div>
          <div className="col-md-8">
            <BookingForm />
          </div>
        </div>
      </section>
      <div className="container">
        <RoomCarousel/>
      </div>
    </div>
  );
};

export default Checkout;
