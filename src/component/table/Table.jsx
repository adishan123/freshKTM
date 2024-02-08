import React, { useContext, useEffect, useState } from 'react';
import HomeContext from '../../contextapi/HomeContextContainer';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import Pagination from '../pagination/Pagination';

const Table = ({ columns, data }) => {
  const { limit, setOffset, setlimit, characters } = useContext(HomeContext)

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState()
  const [totalPages, setTotalPages] = useState();

  const handleLimitChange = (e) => {
    setlimit(e.target.value)
    setCurrentPage(1)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (currentPage) {
      setOffset(currentPage * limit)

      if (characters) {
        setCurrentItems(characters.results)
      }
    }
  }, [currentPage])

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(characters?.total / limit))
      setCurrentItems(data);
    }
  }, [data, limit])


  if (!currentItems) {
    return
  }

  const returnValue = (value) => {
    var htmlValue = ''
    if (typeof (value) == "string" || typeof (value) == "number") {
      htmlValue = `<p>${value}</p>`;
    }
    else {
      htmlValue = `<img src="${value.path}.${value.extension}" width="50" height="50" alt=""/>`
    }

    return <div dangerouslySetInnerHTML={{ __html: htmlValue }} />
  }



  return (
    <div className='overflow-x-auto'>
      <table className="min-w-full  divide-y divide-gray-200 bordered">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-1 whitespace-normal break-words">
                  <Link to={routes.CHARACTER + row['id'] + '/profile'}>
                    {returnValue(row[column.accessor])}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4">
        <nav className="flex justify-between items-center">
          <select
            onChange={handleLimitChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
          >
            <option value={20}>20</option>
            <option value={15}>15</option>
            <option value={10}>10</option>
            <option value={5}>5</option>
          </select>
          <div className="flex space-x-2">
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
              limit={limit}
            />
          </div>
        </nav>
      </div>

    </div>
  );
};

export default Table;
