import React from "react";
import "../Pagination.css";

function Pagination({rowsPerPage, totalRows, setCurrentPage, currentPage}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    const getFirstAndLastItem = (number, array) => {
        if (number === 0) {
            return 1;
        }
        if (number === array.length + 1) {
            return array.length;
        }
        return number;
    };

    return (
        <div className="pagination">
            <button onClick={() => setCurrentPage(1)}>first</button>

            <button
                onClick={() =>
                    setCurrentPage(getFirstAndLastItem(currentPage - 1, pageNumbers))
                }
            >
                ≪
            </button>

            <p>
                page {currentPage} of {pageNumbers.length}
            </p>
            <button
                onClick={() =>
                    setCurrentPage(getFirstAndLastItem(currentPage + 1, pageNumbers))
                }
            >
                ≫
            </button>
            <button onClick={() => setCurrentPage(pageNumbers.length)}>last</button>
        </div>
    );
}

export default Pagination;
