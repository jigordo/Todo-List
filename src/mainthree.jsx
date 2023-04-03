import { useState, useEffect } from 'react'

function Update(props) {

    const [newTitle,setNewTitle] = useState('')

    useEffect(()=> {
        
    })

    const handleTitle = (e) => {
        
        // setNewTitle(e.target.value)
        // e.target.value = props.update.name 
        // console.log(newTitle)

        // console.log(e)
        console.log(e)
    }

    

    const handleSubmit = (e) => {
        e.preventDefault();

        
    }

    const clickCancel = () => {
        const updateTodo    = document.querySelector('.update-todo')
        const updateContent = document.querySelector('.update-content')
        const updateTitle = document.querySelector('#update-title');

        updateTodo.classList.add('hide')
        updateTodo.classList.remove('show')
        updateContent.classList.add('scale-down')
        updateContent.classList.remove('scale-up')

        updateTitle.value = updateTitle.defaultValue
        
    }

    return (
    <>

        <div className='update-todo hide'>
                <div className='update-content scale-down'>
                
                    <div onClick={clickCancel} className='bars'>
                        <button className='bar'>X</button>
                    </div>
                
                    <div className='add-update-content'>
                    <h4>Update TODO</h4>
                        <form id='form'>
                            <div className='form'>
                            
                                <div id='update-title-form'>
                                    <label htmlFor="update-title">Title</label>
                                    <input onChange={handleTitle} 
                                    type="text" name="update-title" 
                                    id="update-title" 
                                    className='block' 
                                    defaultValue= {props.update.name}
                                    required/>
                                </div>

                                <div id='update-status-form'>
                                    <label htmlFor="status">Status</label>
                                    <select  name="status" id="update-status" className='block label'>
                                        <option value="incomplete">Incomplete</option>
                                        <option value="complete">Complete</option>
                                    </select>
                                </div>

                                <div id='update-submit-cancel'>
                                    <input onClick={handleSubmit} type="submit" value="Update Task" id='update-submit'/>
                                    <input type="button" value="Cancel" id= 'update-cancel'/>
                                </div>

                            </div>
                        </form>
                        
                    </div>
                </div>
        </div>
    </>
    )
}

export default Update

