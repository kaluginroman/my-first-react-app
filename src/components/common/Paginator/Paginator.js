import React, {useState} from 'react';

let Paginator = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 10}) => {

  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  const [portionNumber, setPortionNumber] = useState(1);
  const portionCount = Math.ceil(pagesCount / portionSize);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const PrevButton = () => {
    return (
      <button
        className="App-pagination-item App-pagination-item--prev"
        disabled={!(portionNumber > 1)}
        onClick={() => {
          setPortionNumber(portionNumber - 1)
        }}/>
    )
  }

  const NextButton = () => {
    return (
      <button
        className="App-pagination-item App-pagination-item--next"
        disabled={!portionCount > portionNumber}
        onClick={() => {
          setPortionNumber(portionNumber + 1)
        }}/>
    )
  }

  return (
    <div className="App-pagination">
      <PrevButton/>
      {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(p => {
        return (
          <button onClick={(e) => {
            onPageChanged(p)
          }} className={currentPage === p ?
            'App-pagination-item App-pagination-item--selected'
            : 'App-pagination-item'} key={p}>{p}</button>
        )
      })}
      <NextButton/>
    </div>
  )
};

export default Paginator;