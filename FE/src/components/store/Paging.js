/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import './Paging.css';
import Pagination from "react-js-pagination";


const Paging = ({page, count, setPage}) => { 
  // const [page, setPage] = useState(1); 
  // const handlePageChange = (page) => { 
  //   setPage(page); 
  //   console.log(page)
  // }; 
  
  return ( 
    <Pagination 
      activePage={page} 
      itemsCountPerPage={10} 
      totalItemsCount={count} 
      pageRangeDisplayed={5} 
      prevPageText={"‹"} 
      nextPageText={"›"} 
      onChange={setPage} 
    /> 
  ); 
};



export default Paging;