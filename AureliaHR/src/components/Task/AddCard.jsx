import React, { useState } from 'react'
import { Plus, X } from 'react-feather'

const AddCard = (props) => {

  const [ card, setCard ] = useState('')
  const [ show, setShow ] = useState(false)

  const saveCard = () => {
    if(!card){
      return
    }
    props.getCard(card)
    setCard('')
    setShow(!show)
  }

  const closeBtn = () => {
    setCard('')
    setShow(!show)
  }

  

  return (
    <div>
      <div className="flex flex-col">
        {show && <div>  
          <textarea value={card} onChange={(e) => setCard(e.target.value)} className='p-1 w-full rounded-md border-2 bg-bg_color_2 border-accent_color_1 ' name="" id="" cols="30" rows="10" placeholder='Enter Card Title...'></textarea>
          <div className='flex p-1'>
            <button onClick={() => saveCard()} className='bg-accent_color_1 p-1 rounded-xl transition-all text-white mr-2'>Add Card</button>
            <button onClick={() => closeBtn()} className='hover:bg-accent_color_1 p-1 rounded-xl transition-all'><X size={16}></X></button>
          </div>
        </div>}
        {!show && <button onClick={() => setShow(!show)} className='flex p-1 w-full justify-start rounded items-center mt-1 hover:bg-accent_color_1 transition-all'>
          <Plus size={16}></Plus> Add a card
        </button>}
      </div>
    </div>
  )
}
export default AddCard
