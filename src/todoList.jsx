import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { motion, animate, transform } from "framer-motion"
import Update from './updateTodo'
import App    from  './App'

function Main (props) {

const [update,setUpdate]   = useState([]);
const [checked, setChecked] = useState(false)
const [updateShown, isUpdateShown] = useState(false)


useEffect(()=> {
    const input = document.querySelectorAll('.no-margin input')
    const taskList = document.querySelector('#task-list')
    const form = document.querySelectorAll('.todo-list form')

    input.forEach((item)=> {
        if(item.name==='complete') {
            item.defaultChecked = true
        } else {
            item.defaultChecked = false
        }
        return item
    })

    form.forEach((item) => {
            if(item[0].name === taskList.value.toLowerCase()) {
                item.style.display = 'flex'
            } else if(taskList.value === 'All') {
                item.style.display = 'flex'
            } else {
                item.style.display = 'none'
            }  
        })
}, [props.list])

    const addTask = (e) => {
        const hideTodo = document.querySelector('.hide-todo')
        // const addContent = document.querySelector('.add-content')

            hideTodo.classList.remove('hide');
            hideTodo.classList.add('show');
            props.setIsShown(!props.isShown)
    }

    const handleSelect= (e) => {
        const form = document.querySelectorAll('.todo-list form')
        const formSpan = document.querySelector('.todo-list span')

        form.forEach((item)=> {
            if(item[0].name === e.target.value.toLowerCase()) {
                item.style.display = 'flex' 
            } else if(e.target.value === 'All') {
                item.style.display = 'flex' 
            } else {
                item.style.display = 'none' 
            }
            
        })
    }

    const handleButton = (id) => {
        const newList = props.list.filter((item) => item.id !== id)
        const formSpan = document.querySelector('.todo-list span')

        props.setList(newList)

        if(newList[0] === undefined) {
            formSpan.style.display = 'unset'
        } 
    }

    const handleCheck = (e) => {

        const input = document.querySelectorAll('.no-margin input')
        // const taskList = document.querySelector('#task-list')
        // const form = document.querySelectorAll('.todo-list form')


        const item = props.list.map((item) => {
            if(e.target.checked === false && e.target.id===item.id) {
                item.status  = 'incomplete'
            } else if(e.target.checked === true && e.target.id===item.id) {
                item.status  = 'complete'   
            }   
            return item
        }) 

        // form.forEach((item) => {
        //     if(item[0].name === taskList.value.toLowerCase()) {
        //         item.style.display = 'flex'
        //     } else {
        //         item.style.display = 'none'
        //     }
        //     return item
        // })
        
        input.forEach((item) => {
           if(item.checked=== true) {
            item.name= 'complete'
           } else if(item.checked=== false) {
            item.name = 'incomplete'
           }
           
           return item
        })

        props.setList(item)          
    }

    
    const updateList = (id) => {
        const updateTodo    = document.querySelector('.update-todo');
        const list          = props.list.filter((item) => item.id === id)

        setUpdate(list[0])
        
        updateTodo.classList.remove('hide');
        updateTodo.classList.add('show'); 
        isUpdateShown(!updateShown)
    }

    return (
        <>
            <Update list={props.list} setList={props.setList} 
            update={update} checked={checked} updateShown={updateShown} isUpdateShown={isUpdateShown}/>
            
            <div className='container-fluid'>
                <div className='todo'>
                    <div>
                        <motion.h1>TODO LIST</motion.h1>
                    </div>

                    <div className='todo-task'>
                        <button onClick={addTask}>Add Task</button>
                        <select onChange={handleSelect} name="task-list" id="task-list">
                            <option value="All">All</option>
                            <option value="Incomplete">Incomplete</option>
                            <option value="Complete">Complete</option>
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
                                        key={list.id}
                                        >    
                                            <div className='no-margin'>
                                                <input 
                                                onClick= {handleCheck} 
                                                type="checkbox" 
                                                name={list.status}
                                                id={list.id} 
                                                />
                                                <label htmlFor={list.status}>{list.name}</label>
                                            </div>

                                            <div className='button-label'>
                                                <button type='button' 
                                                onClick={() => handleButton(list.id)}
                                                ><i className="fas fa-trash"></i></button>
                                                <button type='button' 
                                                onClick={() => updateList(list.id)}
                                                ><i className="fas fa-pencil"></i></button>
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