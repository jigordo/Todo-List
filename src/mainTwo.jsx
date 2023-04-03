import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { motion } from "framer-motion"
import Update from './mainthree'

function Main (props) {

    const [update,setUpdate] = useState('')

    useEffect(()=> {
        console.log(update) 
    }, [update])

    const handleClick = (e) => {
        const hideTodo = document.querySelector('.hide-todo')
        const addContent = document.querySelector('.add-content')
        const bars = document.querySelector('.bars')

            hideTodo.classList.remove('hide')
            hideTodo.classList.add('show')
            addContent.classList.remove('scale-down')
            addContent.classList.add('scale-up')
        
    }

    const handleButton = (id) => {
        const newList = props.list.filter((item) => item.id !== id)
        const formSpan = document.querySelector('.todo-list span')

        props.setList(newList)

        if(newList[0] === undefined) {
            formSpan.style.display = 'unset'
        }

        console.log(newList)

    }

    const handleCheck = (e) => {

        props.list.map((item) => {
            if(e.target.checked === false && e.target.id===item.id) {
                // list.checked = false
                item.checked =  false
                item.status  = 'incomplete'
            } else if(e.target.checked === true && e.target.id===item.id) {
                item.checked =  true
                item.status  = 'complete'
            }

            console.log(item)
        })      
    }

    
    const updateList = (id) => {
        const updateTodo    = document.querySelector('.update-todo');
        const updateContent = document.querySelector('.update-content');
        const updateTitle = document.querySelector('#update-title');
        const list = props.list.filter((item) => item.id === id)

        // console.log(updateTitle)
        // console.log(update)
        
        setUpdate(list[0])

        
        updateTodo.classList.remove('hide')
        updateTodo.classList.add('show')
        updateContent.classList.remove('scale-down')
        updateContent.classList.add('scale-up')   
    }

    return (
        <>
            <Update update={update} setUpdate={setUpdate}/>
            
            <div className='container-fluid'>
                <div className='todo'>
                    <div >
                        <motion.h1>TODO LIST</motion.h1>
                    </div>

                    <div className='todo-task'>
                        <button onClick={handleClick}>Add Task</button>
                        <select name="task-list" id="task-list">
                            <option value="All">All</option>
                            <option value="Incomplete">Incomplete</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className='todo-list'>
                        <span>No Todos</span>

                            {
                                props.list.map((list) =>   
                                    <motion.form
                                        initial={{ y: 10}}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        action='' 
                                        key={list.id}>
                                            
                                            <div className='no-margin'>
                                                <input onClick= {handleCheck} type="checkbox" name="name" id={list.id} defaultChecked={list.checked}/>
                                                <label htmlFor="name">{list.name}</label>
                                            </div>

                                            <div className='button-label'>
                                                <button type='button' onClick={() => handleButton(list.id)}><i className="fas fa-trash"></i></button>
                                                <button type='button' onClick={() => updateList(list.id)}><i className="fas fa-pencil"></i></button>
                                            </div>

                                            
                                    </motion.form>   
                                    
                                )      
                            }
                        
                    </div>
                    
                </div>
                    
            </div>
        </>
    )
}


export default Main