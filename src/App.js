import React, { useState, useEffect } from 'react';
import List from './List';
import ALert from './ALert';

const getLocalStorage = () => {
  const list = localStorage.getItem('groceryList');
  if(list) {
    return JSON.parse(localStorage.getItem('groceryList'))
  }
  return []
}
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setALert] = useState({
    show: false,
    msg: '',
    type: '',
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      // deal with editing
      setList((prev) =>
        prev.map((item) => {
          return item.id === editID ? { ...item, title: name } : item;
        })
      );
      setName('')
      setIsEditing(false);
      setEditID(null);
      showAlert(true, 'success', 'value was changed')
    } else {
      //show alert
      showAlert(true, 'success', 'new item was added');
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };

      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    // setALert({show: show, type: type, msg: msg});
    setALert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, 'danger', 'list is empty');
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item was removed');
    setList((prev) => prev.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem('groceryList', JSON.stringify(list))
  }, [list])

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <ALert {...alert} removeAlert={showAlert} list={list} />}

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
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button onClick={clearList} className='clear-btn'>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
