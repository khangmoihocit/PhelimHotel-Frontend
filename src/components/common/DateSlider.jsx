import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';

const DateSlider = ({onDateChange, onFilterChange}) => {
    const [dateRange, setDateRange] = useState({
        startDate: undefined,
        endDate: undefined,
        key:"selection"
    });
    
    const handleSelect = ranges => {
        setDateRange(ranges.selection);
        onDateChange(ranges.selection.startDate, ranges.selection.endDate);
        onFilterChange(ranges.selection.startDate, ranges.selection.endDate);
    };

    const handleClearFilter = () => {
        setDateRange({
            startDate: undefined,
            endDate: undefined,
            key:"selection"
        });
        onDateChange(null, null);
        onFilterChange(null, null);
    };
    
    return (
        <div className="mb-4">
            <div className="card">
                <div className="card-header">
                    <h5 className="mb-0">Lọc phòng đã đặt theo ngày</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-10">
                            <DateRangePicker 
                                ranges={[dateRange]}
                                onChange={handleSelect} 
                                className="w-100"
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={2}
                                direction="horizontal"
                            />
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                            <button 
                                className='btn btn-secondary w-100' 
                                onClick={handleClearFilter}
                                style={{height: 'fit-content'}}
                            >
                                <i className="fas fa-times me-2"></i>
                                Bỏ lọc
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateSlider;