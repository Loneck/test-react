import React, { useState, useEffect } from 'react';
import DataService from '../services/list';

function List(props) {
  const [collection, setCollection] = useState([])
  const { type } = props.match.params;

  useEffect(() => {
    async function fetchData() {
      let _source = null;
      console.log(type);
      switch (type) {
        case 'motos':
          _source = DataService.getBikes.then(r => r);
          _source
              .then(r => r.json())
              .then(
                  body => setCollection([...body.data])
              )
          break;
        case 'cars':
          _source = DataService.getCars.then(r => r);
          _source
              .then(r => r.json())
              .then(
                  body => setCollection([...body])
              )
          break;
        default: break;
      }
    };
    fetchData();
  }, []);

  return (
      <div className="container">
        <div className="row">
          {type === "motos" ? (
            collection.length > 0 && collection.map(
              o => (
                <div className="col-4">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div><img src="https://via.placeholder.com/300.png/09f/fff" alt="" style={{ borderRadius: '20px' }} /></div>
                      <div style={{ padding: '5px' }}>id: {o.id}</div>
                      <div style={{ padding: '5px' }}>modelo: {o.name}</div>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (collection.length > 0 && collection.map(
                o => (
                  <div className="col-4">
                    <div className="card mb-3">
                      <div className="card-body">
                        <div><img src="https://via.placeholder.com/300.png/09f/fff" alt="" style={{ borderRadius: '20px' }} /></div>
                        <div style={{ padding: '5px' }}>modelo: {o.Name}</div>
                        <div style={{ padding: '5px' }}>año: {o.Year}</div>
                        <div style={{ padding: '5px' }}>origen: {o.Origin}</div>
                      </div>
                    </div>
                  </div>
                )
              )

          )}
        </div>
      </div>
  )
}

export default List;