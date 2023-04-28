import { useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import { motion, AnimatePresence } from "framer-motion"
import Todo from './todoList'
import { v4 as uuidv4 } from 'uuid';

// import './App.css'
function App(props) {
  
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [state,setState] = useState([]);
  const [isShown, setIsShown] = useState(false)

 
  
  let textName = 
  {
    name: title,
    id: uuidv4(),
    status: status
  }

  const div = {
    hidden: {scale: 0, x: '-50%', y: '-50%'},
    visible: {scale: [0.6,1], x: '-50%', y: '-50%',
      transition: {duration: 0.2}},
    exit: {scale: [1,0.6], x: '-50%', y: '-50%',
      transition: {duration: 0.15, ease: 'linear'}}
  }

  
  const onClick = (e) => {
    const hideTodo = document.querySelector('.hide-todo')
    hideTodo.classList.add('hide')
    hideTodo.classList.remove('show')
    
    setIsShown(!isShown)
    setTitle("")
    setStatus("incomplete")
  }

  const clickButton = (e) => {
    const hideTodo = document.querySelector('.hide-todo');

    if(e.target.form[0].value !== '') {
      hideTodo.classList.add('hide');
      hideTodo.classList.remove('show');  
    } 
  }

  const clickCancel = (e) => {
    const hideTodo = document.querySelector('.hide-todo')

    hideTodo.classList.add('hide')
    hideTodo.classList.remove('show')
    
    setIsShown(!isShown)
    setTitle("")
    setStatus("incomplete")
  }

  const handChange = (e) => {
    setTitle (
      e.target.value
    ) 
  }

  const handleSubmit = useCallback((e)=> {
    e.preventDefault();
    const formSpan = document.querySelector('.todo-list span') 
    formSpan.style.display = 'none';

    setState ( 
      [textName, 
        ...state]
    ) 

      setTitle("") 
      setStatus("incomplete")
      setIsShown(!isShown)   
    
  })

 

  const handleChange = (e) => {
   setStatus(e.target.value)
  }

  return (
    <>
      <Todo list={state} setList={setState} setStatus={setStatus} isShown={isShown} setIsShown={setIsShown}/>
      
      
        <div
        className ='hide-todo hide'
          // hide
        ><AnimatePresence>
          { isShown &&
          
          <motion.div 
            variants  = {div}
            initial   = 'hidden'
            animate   = 'visible'
            exit      = 'exit'
            // transition={{duration: 0.2}}
            className='hide-content'>
            
              <div onClick={onClick} className='bars'>
                <button className='bar'>X</button>
              </div>
            
              <div className= 'add-content'>
                <h4>Add TODO</h4>

                <form onSubmit={handleSubmit} id='form'>
                  <div className='form'>
                    <div id='title-form'>
                      <label htmlFor="title">Title</label>
                      <input 
                      onChange={(e) => setTitle(e.target.value)}
                      type="text" name="title" id="title" className='block' 
                      
                      value = {title}
                      required/>
                    </div>

                    <div id='status-form'>
                      <label htmlFor="status">Status</label>
                      <select 
                        onChange = {handleChange} 
                        value={status} 
                        name="status" id="status" className='block label'>
                        <option     value="incomplete">Incomplete</option>
                        <option     value="complete">Complete</option>
                      </select>
                    </div>

                    <div id='submit-cancel'>
                      <input 
                      onClick={clickButton} 
                      type="submit" value="Add Task" id='submit'/>
                      <input onClick={clickCancel} type="button" value="Cancel"   id='cancel'/>
                    </div>
                  </div>
                </form>
              </div>
          </motion.div>
          
          }
          </AnimatePresence>
        </div> 
      
    </>
  )

}

 


export default App
