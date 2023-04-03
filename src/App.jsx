import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Main from './mainTwo'
import { v4 as uuidv4 } from 'uuid';

// import './App.css'
function App() {
  
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [state,setState] = useState([]);

  
  
  const onClick = (e) => {
    const hideTodo = document.querySelector('.hide-todo')
    const addContent = document.querySelector('.add-content')

    hideTodo.classList.add('hide')
    hideTodo.classList.remove('show')
    addContent.classList.add('scale-down')
    addContent.classList.remove('scale-up') 
    
    setTitle("")
    setStatus("incomplete")
  }

  const clickButton = (e) => {
    const hideTodo = document.querySelector('.hide-todo');
    const addContent = document.querySelector('.add-content');

    if(e.target.form[0].value !== '') {
      hideTodo.classList.add('hide');
      hideTodo.classList.remove('show');
      addContent.classList.add('scale-down');
      addContent.classList.remove('scale-up');
    }
  }

  const clickCancel = (e) => {
    const hideTodo = document.querySelector('.hide-todo')
    const addContent = document.querySelector('.add-content')

    hideTodo.classList.add('hide')
    hideTodo.classList.remove('show')
    addContent.classList.add('scale-down')
    addContent.classList.remove('scale-up')
    setTitle("")
    setStatus("incomplete")
  }

  const handChange = (e) => {
    setTitle (
      e.target.value
    ) 
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = title
    const formSpan = document.querySelector('.todo-list span')
    const name = document.querySelector("#name")

    const textName = {
      name: body,
      id: uuidv4(),
      status: status,
      checked: false
    }

    formSpan.style.display = 'none'

      setState (
        [textName, ...state]
      ) 

      setTitle("") 
      setStatus("incomplete")

      if (textName.status === 'complete') {
        textName.checked = true
      } else {
        textName.checked = false
      } 

      // console.log(e.target)
      
  }

  const handleChange = (e) => {
   setStatus(e.target.value)
  }

  return (
    <>
    <Main list={state} setList={setState} setStatus={setStatus}/>
     
      <div className='hide-todo hide'>
        
        <div className='hide-content '>
          
            <div onClick={onClick} className='bars'>
              <button className='bar'>X</button>
            </div>
          
            <div className='add-content scale-down'>
              <h4>Add TODO</h4>

              <form onSubmit={handleSubmit} id='form'>
                <div className='form'>
                  <div id='title-form'>
                    <label htmlFor="title">Title</label>
                    <input onChange={(e) => setTitle(e.target.value)}
                    type="text" name="title" id="title" className='block' value={title} required/>
                  </div>

                  <div id='status-form'>
                    <label htmlFor="status">Status</label>
                    <select onChange = {handleChange} value={status} name="status" id="status" className='block label'>
                      <option value="incomplete">Incomplete</option>
                      <option value="complete">Complete</option>
                    </select>
                  </div>

                  <div id='submit-cancel'>
                    <input onClick={clickButton} type="submit" value="Add Task" id='submit'/>
                    <input onClick={clickCancel} type="button" value="Cancel"   id='cancel'/>
                  </div>
                </div>
              </form>
            </div>
        </div>
      </div> 
    </>
  )

}

 


export default App
