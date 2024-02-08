import React, { useEffect, useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  useEffect(() => {
    setStart(1);
    setEnd(Math.min(totalPages, 5))
  }, [totalPages])

  const handlePrevClick = () => {
    if (start > 1) {
      setStart(start - 1);
      setEnd(end - 1);
      onPageChange(currentPage - 1)
    }
  };

  const handleNextClick = () => {
    if (end < totalPages) {
      setStart(start + 1);
      setEnd(end + 1);
      onPageChange(currentPage + 1)
    }
  };

  const pages = [];

  for (let i = start; i <= end; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`mx-1 px-3 py-1 rounded-full ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrevClick}
        className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-700"
      >
        Prev
      </button>
      {start > 1 && <button className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-700">...</button>}
      {pages}
      {end < totalPages && <button className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-700">...</button>}
      <button
        onClick={handleNextClick}
        className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-700"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
