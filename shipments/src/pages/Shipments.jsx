import { useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare,faTrash } from "@fortawesome/free-solid-svg-icons";

import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from 'flowbite-react';

function Shipments(params) {
  const shipments=params.shipments;
  const setShipments=params.setShipments; 
  const maxOnPage = 8;
  const {page:onPage} = useParams()
  const [currentPage, setCurrentPage] = useState(Number(onPage||1));
  const navigate = useNavigate();
  
  const deleteShipment=(e,index)=>{
    e.stopPropagation();
    shipments.splice(index,1)
    setShipments(shipments.slice())
  }
    
  const editShipmentInline=(e,index)=>{
    e.stopPropagation();
    console.log('edit')
    
  }

  const navigateToEditShipment=(e,index)=>{
    e.stopPropagation();
    navigate("/shipments/edit/"+index);
  }
  const navigateToOnPageChange=(page)=>{
    const p=page<2?'':'/'+page;
    setCurrentPage(page);
    navigate("/shipments"+p);
  }
  return (<div>
    <div className="container">
      <h2 className="mb-4">Shipments</h2>
      <Table className="table table-hover table-bordered">
        <thead>
        <tr>
          <th scope="col">ORDERNO</th>
          <th scope="col">DATE</th>
          <th scope="col">CUSTOMER</th>
          <th scope="col">TRACKINGNO</th>
          <th scope="col">CONSIGNEE</th>
          <th scope="col">STATUS</th>
          <th scope="col"> </th>
        </tr>
        </thead>
        <tbody>
        {shipments
          .slice((currentPage-1)*maxOnPage,(currentPage*maxOnPage))
          .map((shipment,index) => 
            <tr key={shipment.orderNo} className="link" onClick={(e)=>{editShipmentInline(e,index)}}>
              <td>{shipment.orderNo}</td>
              <td>{shipment.date}</td>
              <td>{shipment.customer}</td> 
              <td>{shipment.trackingNo}</td>
              <td>{shipment.consignee}</td>
              <td>{shipment.status}</td>
              <td>
                <div>
                  <Button variant="info" onClick={(e)=>{navigateToEditShipment(e,index+((currentPage-1)*maxOnPage))}}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                  <Button variant="danger" onClick={(e)=>deleteShipment(e,index+((currentPage-1)*maxOnPage))}><FontAwesomeIcon icon={faTrash} /></Button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="pagination">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={Math.ceil(shipments.length/maxOnPage)}
          // onPageChange={onPageChange}
          onPageChange={navigateToOnPageChange}
          previousLabel="Go back"
          nextLabel="Go forward"
          showIcons
        />
      </div>
    </div>
  </div>)
}

export default Shipments;