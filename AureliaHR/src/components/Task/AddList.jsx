import React, { useState } from 'react'
import { X, Plus} from 'react-feather'

const AddList = (props) => {

  const [ list, setList ] = useState('')
  const [ show, setShow ] = useState(false)
  
  const saveList = () => {
    if(!list){
      return
    }
    props.getList(list)
    setList('')
    setShow(!show)
  }

  const closeBtn = () => {
    setList('')
    setShow(!show)
  }

  return (
    <div>
      <div className='"flex flex-col g-fit flex-shrink-0 mr-3 w-60 rounded-md p-2 bg-black'>
        {show && <div>
          <textarea value={list} onChange={(e) => setList(e.target.value)} className='p-1 w-full rounded-md border-2 bg-bg_color_2 border-accent_color_1' name='' id='' cols="30" rows="2" placeholder='Enter list title...'></textarea>
          <div>
          <button onClick={() => saveList()} className='bg-accent_color_1 p-1 rounded-xl transition-all text-white mr-2'>Add list</button>
          <button onClick={() => closeBtn()} className='hover:bg-accent_color_1 p-1 rounded-xl transition-all'><X size={16}></X></button>
          </div>
        </div>}
        {!show && <button onClick={() => setShow(!show)} className='flex p-1 w-full justify-center rounded items-center mt-1 hover:bg-accent_color_1 h-8'>
          <Plus size={16}></Plus> Add list!  
        </button>}
      </div>
    </div>
  )
}

export default AddList