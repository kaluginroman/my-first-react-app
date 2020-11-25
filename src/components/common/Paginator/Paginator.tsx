import React, {useState} from 'react';

type PropsType = {
  totalItemsCount: number,
  pageSize: number,
  onPageChanged: (pageNumber: number) => void,
  currentPage: number,
  portionSize: number
}

let Paginator: React.FC<PropsType> = ({ totalItemsCount,
                                        pageSize,
                                        onPageChanged,
                                        currentPage,
                                        portionSize = 10
                                      }) => {

  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  const [portionNumber, setPortionNumber] = useState<number>(1);
  const portionCount = Math.ceil(pagesCount / portionSize);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className="App-pagination">
      <button
        className="App-pagination-item App-pagination-item--prev"
        disabled={!(portionNumber > 1)}
        onClick={() => {
          setPortionNumber(portionNumber - 1)
        }}/>
      {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(p => {
        return (
          <button onClick={(e) => {
            onPageChanged(p)
          }} className={currentPage === p ?
            'App-pagination-item App-pagination-item--selected'
            : 'App-pagination-item'} key={p}>{p}</button>
        )
      })}
      <button
        className="App-pagination-item App-pagination-item--next"
        disabled={!(portionCount > portionNumber)}
        onClick={() => {
          setPortionNumber(portionNumber + 1)
        }}/>
    </div>
  )
};

export default Paginator;