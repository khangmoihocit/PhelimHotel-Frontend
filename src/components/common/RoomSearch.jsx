import moment from "moment/moment";
import React, { useState } from "react";
import { getAvailableRooms } from "../utils/ApiFunctions";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomSearchResult from "./RoomSearchResult";
import "./RoomSearch.css";

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);
    if (!checkIn.isValid() || !checkOut.isValid()) {
      setErrorMessage("Vui lòng nhập lại ngày");
      return;
    }
    if (!checkOut.isSameOrAfter(checkIn)) {
      setErrorMessage("Ngày nhận phòng phải trước ngày trả phòng");
      return;
    }
    setIsLoading(true);
    getAvailableRooms(
      searchQuery.checkInDate,
      searchQuery.checkOutDate,
      searchQuery.roomType
    )
      .then((response) => {
        setAvailableRooms(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);
    if (checkIn.isValid && checkOut.isValid) {
      setErrorMessage("");
    }
    setSearchQuery((prev) => ({
    ...prev,
    [name]: value,
  }));
  };

  const ClearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
    });
  };
  return (
    <>
      <Container className="room-search-container">
        <div className="search-form-content">
          <h2 className="search-title">Tìm Phòng Khách Sạn</h2>
          <p className="search-subtitle">Khám phá những phòng tuyệt vời nhất cho kỳ nghỉ của bạn</p>
          
          <Form onSubmit={handleSearch}>
            <Row className="justify-content-center search-row">
              <Col xs={12} md={3}>
                <Form.Group controlId="checkInDate" className="form-group-modern">
                  <Form.Label className="form-label-modern">Ngày nhận phòng</Form.Label>
                  <Form.Control
                    type="date"
                    name="checkInDate"
                    value={searchQuery.checkInDate}
                    onChange={handleInputChange}
                    min={moment().format("YYYY-MM-DD")}
                    className="form-control-modern"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={3}>
                <Form.Group controlId="checkOutDate" className="form-group-modern">
                  <Form.Label className="form-label-modern">Ngày trả phòng</Form.Label>
                  <Form.Control
                    type="date"
                    name="checkOutDate"
                    value={searchQuery.checkOutDate}
                    onChange={handleInputChange}
                    min={moment().format("YYYY-MM-DD")}
                    className="form-control-modern"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={3}>
                <Form.Group className="form-group-modern">
                  <Form.Label className="form-label-modern">Loại phòng</Form.Label>
                  <div className="room-type-selector-container">
                    <RoomTypeSelector
                      handleRoomInputChange={handleInputChange}
                      newRoom={searchQuery}
                    />
                  </div>
                </Form.Group>
              </Col>
              
              <Col xs={12} md={3}>
                <div className="search-button-container">
                  <Button type="submit" className="search-button">
                    🔍 Tìm kiếm
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>

          {errorMessage && (
            <div className="error-message">
              ⚠️ {errorMessage}
            </div>
          )}
        </div>
      </Container>

      {isLoading && (
        <Container className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Đang tìm kiếm phòng phù hợp...</div>
        </Container>
      )}

      {!isLoading && availableRooms && availableRooms.length > 0 && (
        <div className="search-results-section">
          <RoomSearchResult
            results={availableRooms}
            onClearSearch={ClearSearch}
          />
        </div>
      )}

      {!isLoading && availableRooms && availableRooms.length === 0 && searchQuery.checkInDate && (
        <Container>
          <div className="no-results">
            😔 Không tìm thấy phòng nào phù hợp với yêu cầu của bạn
          </div>
        </Container>
      )}
    </>
  );
};

export default RoomSearch;
