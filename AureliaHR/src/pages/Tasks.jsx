import React, { useContext } from 'react'
import { MoreHorizontal, Edit2, X } from 'react-feather'
import AddCard from '../components/AddCard';
import { BoardContext } from '../context/BoardContext';

const Tasks = () => {
  const {allboard,setAllBoard} = useContext(BoardContext);
  const bdata = allboard.boards[allboard.active];

  const cardData = (e,ind) => {
    let newList = [...bdata.list]
    newList [ind].items.push({id:Utils.makeid(5),title:e})

    let board_ = {...allboard}
    board_.boards[board_.active].list = newList
    setAllBoard(board_)
  }

  return (
    <div className='flex flex-col bg-bg_color_1 w-full font-poppins text-white h-screen'>
      <div className='p-3 bg-black flex justify-between w-full bg-opacity-50'>
        <h2>Task Board</h2>
        <div className='flex item-center justify-center'>

        </div>
      </div>
      <div className='flex flex-col w-full h-full flex-grow relative'>
        <div className='absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden'>
          {bdata.list && bdata.list.map((x,ind) => {

            return <div key={ind} className='mr-3 w-60 h-fit rounded-md p-2 bg-black'>
            <div className='list-body'>
              <div className='flex justify-between p-1'>
                <span>{x.title}</span>
                <button className='hover:bg-accent_color_1 p-1 rounded-xl transition-all'><MoreHorizontal size={16}></MoreHorizontal></button>
              </div>

              {x.items && x.items.map((item, index) => {
               return <div key={index} className='item flex justify-between items-center bg-bg_color_2 p-1 cursor-pointer rounded-md border-2 border-accent_color_1 hover:border-accent_color_2'>
                  <span>{item.title}</span>
                  <span className='flex justify-start items-start'>
                    <button className='hover:bg-accent_color_1 p-1 rounded-xl transition-all'><Edit2 size={16}></Edit2></button>
                  </span>
                </div>
              })}

              <AddCard getcard={() => cardData(e)} />
            </div>
          </div>
          })
          }

         
        </div>
      </div>
    </div>
  )
}

export default Tasks;

