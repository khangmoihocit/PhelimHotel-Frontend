import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";
import RoomCard from "../room/RoomCard";
import RoomPaginator from "./RoomPaginator";
import { FaHotel, FaRedo } from "react-icons/fa";

const RoomSearchResult = ({ results, onClearSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedResult = results.slice(startIndex, endIndex);
  return (
    <>
      {results.length > 0 ? (
        <>          <div className="search-results-header">
            <h3 className="search-results-title">
              <FaHotel /> Kết Quả Tìm Kiếm
            </h3>
            <p className="search-results-subtitle">
              Tìm thấy {totalResults} phòng phù hợp với yêu cầu của bạn
            </p>
          </div>
          
          <Row className="search-results-grid">
            {paginatedResult.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </Row>
          
          <div className="search-results-actions">
            {totalPages > 1 && (
              <div className="search-pagination-container">
                <RoomPaginator 
                  currentPage={currentPage} 
                  totalPage={totalPages} 
                  onPageChange={handlePageChange}
                />
              </div>
            )}            <Button 
              variant="secondary" 
              onClick={onClearSearch}
              className="clear-search-button"
            >
              <FaRedo /> Tìm kiếm mới
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default RoomSearchResult;
