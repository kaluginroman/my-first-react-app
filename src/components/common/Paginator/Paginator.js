import React from 'react';
import './Users.css';

let Paginator = ({totalUsersCount, pageSize, onPageChanged, currentPage, ...props}) => {

  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return (
    <div className="App-pagination">
      {pages.map(p => {
        return (
          <button onClick={(e) => {
            onPageChanged(p)
          }} className={currentPage === p ?
            'App-pagination-item App-pagination-item--selected'
            : 'App-pagination-item'} key={p}>{p}</button>
        )
      })}
    </div>
  )
};

export default Paginator;