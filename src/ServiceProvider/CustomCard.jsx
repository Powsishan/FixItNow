import React from 'react';
import { Card, Button } from 'react-bootstrap';



const CustomCard = ({ table, handleTableSelect }) => {
  return (
    <div className="card p-3 newCard-card">
      <div className="row align-items-center">
        <div className="col-12 col-md-4 text-center">
          <Card.Img variant="top" src={`http://localhost:3001${table.img}`} className="fixed-size-image" />
        </div>
        <div className="col-12 col-md-8">
          <h4 className="mb-0 mt-0 newCard-card-title">{table.firstName} {table.lastName}</h4>
          <span>{table.JobTitle}</span>
          <div className="p-2 mt-2 bg-primary rounded text-white newCard-stats">
            <div className="d-flex flex-column mb-2">
              <span className="newCard-articles">Description</span>
              <p>{table.Description}</p>
            </div>
            <div className="d-flex flex-column">
              <span className="newCard-rating">Rating</span>
              <span className="newCard-number3">8.9</span>
            </div>
          </div>
          <div className="button mt-2 d-flex flex-row flex-md-nowrap align-items-center newCard-button-group">
            <Button variant="outline-primary" className="btn-sm w-100 mb-2 mb-md-0 newCard-btn-outline-primary">View</Button>
            <Button variant="primary" className="btn-sm w-100 ml-md-2 newCard-btn-primary" onClick={() => handleTableSelect(table.table_name)}>Book now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
