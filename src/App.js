import React, { useState, useEffect } from 'react';
import List from './List';
import ALert from './ALert';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setALert] = useState({
    show: true,
    msg: 'cu-cu',
    type: 'success',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
    } else if (name && isEditing) {
      // deal with editing
    } else {
      //show alert
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };

      setList([...list, newItem]);
      setName('');
    }
  };

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <ALert {...alert} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            className='grocery'
            type='text'
            value={name}
            placeholder='e.g cabbage'
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} />
          <button className='clear-btn'>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
