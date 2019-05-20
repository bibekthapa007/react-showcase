import React, { useState, useEffect } from "react";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

// 10, 2, 1
const fetchPageNumbers = (totalPages, currentPage, pageNeighbours) => {
  const totalNumbers = pageNeighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

    let pages = range(startPage, endPage);

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = totalPages - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    switch (true) {
      // handle: (1) < {5 6} [7] {8 9} (10)
      case hasLeftSpill && !hasRightSpill: {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = [LEFT_PAGE, ...extraPages, ...pages];
        break;
      }

      // handle: (1) {2 3} [4] {5 6} > (10)
      case !hasLeftSpill && hasRightSpill: {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, RIGHT_PAGE];
        break;
      }

      // handle: (1) < {4 5} [6] {7 8} > (10)
      case hasLeftSpill && hasRightSpill:
      default: {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
        break;
      }
    }

    return [1, ...pages, totalPages];
  }

  return range(1, totalPages);
};

function Pagination() {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(60);
  useEffect(() => {
    const pages = fetchPageNumbers(200, currentPage, 1);
    setPages(pages);
  }, [currentPage]);

  function handleClick(page) {
    if (page === "LEFT") {
      setCurrentPage(currentPage - 1);
    } else if (page === "RIGHT") {
      setCurrentPage(currentPage + 1);
    } else if (typeof page == "number") {
      console.log("Hello" + page);
      setCurrentPage(page);
    }
  }
  return (
    <div className="pagination">
      {pages.map(page => {
        return (
          <button
            key={page}
            className="page-botton"
            onClick={() => handleClick(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
