import React, { useEffect, useState } from 'react';
import './pager.css';

/**
 * Componente paginador
 * @param props 
 * @returns 
 */
function Pager(props: any) {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(props.totalPages);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const data = await props.fetchFunction(currentPage, itemsPerPage, props.magType);
      const _totalItems = data.pagination.total;
      console.log(_totalItems);
      setTotalItems(_totalItems);
      const totalPage = (itemsPerPage < _totalItems) ? (Number(_totalItems) / Number(itemsPerPage)) : 1;
      setTotalPages(totalPage);
    }
    fetch();
  }, [currentPage, itemsPerPage, props.magType, totalPages]);

  /*
   * Manipula event Previa Pagina y hace una petición a la funcion de obtención de data
   */
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /*
   * Manipula event Proxima Pagina y hace una petición a la funcion de obtención de data
   */
  const handleNextPage = () => {
    if (currentPage <= totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.currentTarget.value);
    setItemsPerPage(value);
  }

  /**
   * Renderiza el Tag Pager
   */
  return (

    <div className='pagination justify-content-center'>
      {(totalItems > 0 ?
        <>
          <nav>
            <ul className="pagination justify-content-center">
              <li className={"page-item " + (currentPage === 1 ? "disabled" : "")}>
                <button className="page-link" onClick={handlePrevPage}>&laquo;</button>
              </li>
              
              <select className="form-control" onChange={handleItemsPerPage}>
                <option value="10">Mostrar 10</option>
                <option value="50">Mostrar 50</option>
                <option value="100">Mostrar 100</option>
              </select>

              <li className={"page-item " + (currentPage === totalPages ? "disabled" : "")}>
                <button className="page-link" onClick={handleNextPage}>&raquo;</button>
              </li>
            </ul>
          </nav>


        </>
        : null)}
    </div>

  );
}

export default Pager;