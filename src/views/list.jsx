import React, { useState, useEffect } from 'react';
import DataService from '../services/list';

function List(props) {
  const [collection, setCollection] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { type } = props.match.params;
      let _source = null;
      console.log(type);
      switch (type) {
        case 'motos':
          _source = DataService.getBikes.then(r => r);
          break;
        case 'cars':
          _source = DataService.getCars.then(r => r);
          break;
        default: break;
      }
      _source
          .then(r => r.json()
              .then(
                  body => setCollection({...body, ...body.data})
              )
          )
    };
    fetchData();
    console.log(collection.length);
  }, []);

  console.log(collection.length);

  return (
      <div className="container">
        <div className="row">
          {
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
          }
        </div>
      </div>
  )
}

export default List;