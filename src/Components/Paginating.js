import React from "react";
import Pagination from "react-js-pagination";

export default function Paginating(props) {

  return (
    <Pagination
      hideFirstLastPages
      activePage={props.currentPage}
      itemsCountPerPage={props.pagingPref}
      totalItemsCount={props.totalItemsCount}
      pageRangeDisplayed={3}
      onChange={props.setPageChange}
    />
  );
}
