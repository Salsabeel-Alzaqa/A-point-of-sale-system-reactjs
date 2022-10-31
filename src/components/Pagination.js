import React from 'react';
const Pagination = ({ productsPerPage,AllProducts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(AllProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <footer className='mx-auto'> 
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    </footer>
  );
};
export default Pagination;