/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react'

import './App.css'
import axios from 'axios'

function App() {
  // const [count, setCount] = useState(0)
  
  const [data, setData] = useState()

  // test
  // test
  const [newToDo, setNewToDo] = useState(
    {
      todo: "",
      created: Date.now()
    }
  )


  useEffect(() => {
    console.log("useEFFECT TRIGGERED")
  }, [data])


  useEffect(() => {

    axios({
      method: "get",
      url: "http://localhost:3000/gettodos"
    })
      .then(res => {
        console.log("res", res)
        // console.log("sorted", sorted)
        setData(res.data)

      })
      .catch(err => console.log("err", err))

  }, [])
// add new Todo
  const handleAddTodo = () => {
        if (!newTodo.trim()) return //prevents adding empty todos
        const todoItem = {
          todo: newTodo,
          created: new Date()
        }
        axios({
          method: "post",
          url: "http://localhost:3000/create",
          data: todoItem //sends new todo to the backend
        })
        .then((res) => {
          console.log("todo added", res)
          setData([...data, res.data]) //add the new todo to the state.

          setNewTodo("") // it clears the input
        })
        .catch(err => console.log("error adding todo", err))
      }; 

    const handleDeleteTodo = (id) => {
      console.log("Deleting toddo with ID:", id); //debug
      axios({
        method: "delete",
        url: `http://localhost:3000/delete/${id}`,
      })
      .then((res) => {
        console.log("Todo Deleted:", res.data); //filter out the deleted item from the state
        setData(data.filter((item) => item._id !== id));
      })
      .catch((err) => console.log("Error deleting todo:", err));
    };

    //enable edit mode
    const handleEditTodo = (id, currentText) => {
      setEditingId(id); //set the id of the todo being edited
      setEditingText(currentText); // set the current text to the input field
    };

    //save the edited todo
    const handleSaveEdit = (id) => {
      axios({
        method: "put",
        url: `http://localhost:3000/update/${id}`,
        data: { todo: editingText}, //send updated text to the backend
      })
      .then((res) => {
        console.log("Todo Updated:", res); //refresh the list from the server after updating
        axios({
          method: "get",
          url: "http://localhost:3000/gettodos"
        })
        .then((res) => {
          console.log("Updated List:", res.data);
          setData(res.data); // update the state with the refreshed list
        })
        .catch((err) => console.log("Fetch error after update:", err));
        setEditingId(null); //exit edit mode
        setEditingText(""); // clear edit text state
      })
      .catch((err) => console.log("Error updating todo:", err));
    };

  const handleNewToDo = (e) => {

    console.log("handleNewToDo Hit", e)
    console.log("handleNewToDo Hit", e.target)
    console.log("handleNewToDo Hit", e.target.value)

    setNewToDo((prev) => ({
      ...prev,
      todo: e.target.value
    }))


  }
  const handleSubmit = (e) => {

    console.log("HandleSubmit HIT", newToDo)

    console.log("i am getting stuff")
    axios({
      method: "post",
      url: "http://localhost:3000/create",
      data: newToDo
    })
      .then(res => {
        console.log("res", res)
        // setNewToDo({todo: ""})
      })
      .catch(err => console.log(reportError))

  }

  const handleDelete = (e) => {
    console.log("DEL Hit", e.target.id)

    axios({
      method: "delete",
      url: `http://localhost:3000/delete/${e.target.id}`
    })
    .then(res => {
      console.log("re", res)
      console.log(res.data._id)
      setData((prev) => prev.filter((item) => item._id != res.data._id))
    })
    .catch(err => console.log(err))
  }




  return (
    <>
      {console.log("data", data)}
      <h1>ToDo List</h1>
                  {console.log("newTodo:", newTodo)}
                  {/* input field and button for adding new todo */}
                  <div style={{ marginBottom: "20px"}}>
                    <input
                    type = "text"
                    placeholder = "Enter a new todo"
                    value = {newTodo}
                    onChange = {(e) => setNewTodo(e.target.value)}
                    style = {{ marginRight: "10px", padding: "5px"}} />
                    <button onClick={handleAddTodo} style={{ padding: "5px"}}>Add ToDo</button>
                  </div>
   {/* display todos */}
        {data && data.map((item) => {
          return (
              <div key={item._id}
              style={{ border: '2px solid cyan',
                margin: "10px",
                padding: "10px",
               }}>
                {editingId === item._id ? (
                  //edit mode
                  <div>
                    <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={{marginRight: "10px"}}
                    />
                    <button onClick={() => handleSaveEdit(item._id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                ): ( 
                  <div>
                    <p>{item.todo}</p>
              <button onClick={() => handleDeleteTodo(item._id)}>Delete</button>
              <button onClick={() => handleEditTodo(item._id, item.todo)}>Edit</button>
                  </div>
                )}
              </div>
          )
        })}
    </>
  );
return (
  <>
    {console.log("data", data)}
    {console.log("newToDo", newToDo)}

    <input value={newToDo.todo || ""} onChange={(e) => handleNewToDo(e)} />

    <button onClick={(e) => handleSubmit(e)}>Submit</button>


    {data && data.sort((a,b) =>  b.created - a.created).map((item) => {
      return (

        <div key={item._id}  style={{ marginBottom: "20px" }}>

          <div style={{ border: '2px solid red' }}>

            <p> {item.todo}</p>
            <button id={item._id} onClick={(e) => handleDelete(e)}>delete</button>
            <button>edit</button>

          </div>
        </div>
      )
    })}

  </>
)
}

export default App
