import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }else{
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    if (!name) {
      //display alert


      // setAlert({
      //   show: true,
      //   msg: 'please enter a value',
      //   type: 'danger'
      // });
      showAlert(true, 'danger', 'Please enter a value')

    } else if (name && isEditing) {
      //deal with editing
      showAlert(true, 'success', 'item added to the list')
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'item updated')
    } else {
      //show alert
      showAlert(true, 'success', 'item added to the list')

      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      }

      setList([...list, newItem])
      setName('')
    }
  }

  // ~~~~~~~~~~~~~~~ Function List ~~~~~~~~~~~~~~~~~~~~~~~~~//

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'list emptied')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const thisItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(thisItem.title)
  }

  return <>
    <section className="section-center">
      <form
        onSubmit={handleSubmit}
      >
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem} />
        {list.length > 0 && <button className="clear-btn" onClick={clearList}>clear items</button>}
      </div>

    </section>
  </>
}

export default App
