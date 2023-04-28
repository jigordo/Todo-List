import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion"

function Update(props) { 
    

 useEffect(()=> {
    const input = document.querySelectorAll('.no-margin input')

    input.forEach((item)=> {
        if(item.name==='complete') {
            item.defaultChecked = true
            item.checked = true
        } else if(item.name==='incomplete') {
            item.defaultChecked = false
            item.checked = false
        }
        return item
    })
 }, [props.list])

 const div = {
    hidden: {scale: 0, x: '-50%', y: '-50%'},
    visible: {scale: [0.6,1], x: '-50%', y: '-50%',
      transition: {duration: 0.2}},
    exit: {scale: [1,0.6], x: '-50%', y: '-50%',
      transition: {duration: 0.2, ease: 'linear'}, opacity: 0}
  }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateTodo    = document.querySelector('.update-todo')
        const input = document.querySelectorAll('.no-margin input')
        const itemInput = props.list.filter(item => item.id === props.update.id)
        
        const items = props.list.map((item) => {
            if (item.id===e.target.form[0].className) {
                 item.name=e.target.form[0].value
                 item.status=e.target.form[1].value
            } 
            return item
        })
        
        input.forEach((item) => {
            if(item.id ===e.target.form[1].className) {
                item.name = e.target.form[1].value
            }
         })

         updateTodo.classList.add('hide')
         updateTodo.classList.remove('show')
         props.setList(items)
         props.isUpdateShown(!props.updateShown)      
    }

    const clickBars = () => {
        const updateTodo    = document.querySelector('.update-todo')
        const updateContent = document.querySelector('.update-content')
        const updateTitle = document.querySelector('#update-title');

        updateTodo.classList.add('hide')
        updateTodo.classList.remove('show')
        props.isUpdateShown(!props.updateShown)
        // updateContent.classList.add('scale-down')
        // updateContent.classList.remove('scale-up')

        updateTitle.defaultValue = ""
        updateTitle.value = ""
    }


    

    const clickCancel = () => {
        const updateTodo    = document.querySelector('.update-todo')
        const updateContent = document.querySelector('.update-content')
        const updateTitle = document.querySelector('#update-title');

        updateTodo.classList.add('hide')
        updateTodo.classList.remove('show')
        props.isUpdateShown(!props.updateShown)
        // updateContent.classList.add('scale-down')
        // updateContent.classList.remove('scale-up')

        updateTitle.defaultValue = ""
        updateTitle.value = "" 
    }

    return (
    <>

        <div className='update-todo hide'>
            <AnimatePresence>
            { props.updateShown &&
                <motion.div 
                variants={div}
                initial= 'hidden'
                animate= 'visible'
                exit= 'exit'
                className='update-content '>
                
                    <div onClick={clickBars} className='bars'>
                        <button className='bar'>X</button>
                    </div>
                
                    <div className='add-update-content'>
                        <h4>Update TODO</h4>
                            <form id='form'>
                                <div className='form'>
                                
                                    <div id='update-title-form'>
                                        <label htmlFor="update-title">Title</label>
                                        <input 
                                        type="text" 
                                        name="update-title" 
                                        id="update-title" 
                                        className={props.update.id} 
                                        defaultValue={props.update.name}
                                        required/>
                                    </div>

                                    <div id='update-status-form'>
                                        <label htmlFor="status">Status</label>
                                        <select 
                                        // onChange={handleSelect}  
                                        name="status" id="update-status" className={props.update.id} defaultValue={props.update.status}>
                                            <option value="incomplete">Incomplete</option>
                                            <option value="complete">Complete</option>
                                        </select>
                                    </div>

                                    <div id='update-submit-cancel'>
                                        <input onClick={handleSubmit} type="submit" value="Update Task" id='update-submit'/>
                                        <input onClick={clickCancel} type="button" value="Cancel" id= 'update-cancel'/>
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

export default Update

