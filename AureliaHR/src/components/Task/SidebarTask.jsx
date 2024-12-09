import React, { useContext, useState } from 'react'
import { ChevronLeft, ChevronRight, Divide, Plus, X } from 'react-feather'
import { Popover } from 'react-tiny-popover'
import { BoardContext } from '../../context/BoardContext'

const SidebarTask = () => {
  
  const blankBoard = {
    name:'',
    bgcolor:'#323232',
    list:[]
  }
  const [ boardData, setBoardData ] = useState(blankBoard)
  const [ collapsed, setCollapsed ] = useState(false)
  const [ showpop, setShowpop ] = useState(false)
  const { allboard, setAllBoard } = useContext(BoardContext)
  const setActiveboard = (i) => {
    let newBoard = {...allboard}
    newBoard.active = i
    setAllBoard(newBoard)
  }
  const addBoard = () => {
    let newB = {...allboard}
    newB.boards.push(boardData)
    setAllBoard(newB)
    setBoardData(blankBoard)
    setShowpop(!showpop)
  }
  return (
    <div className={`bg-bg_color_2 h-[calc(100vh-3rem)] border-r-bg_color_1 transition-all linear duration-500 flex-shrink-0 ${collapsed ? 'w-[42px]' : 'w-[280px]'}`}>
      {collapsed && <div className='p-2'>
        <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-border_color rounded-sm'>
          <ChevronRight size={18}></ChevronRight>
        </button>  
      </div>}
      {!collapsed && <div>
        <div className='workspace p-3 flex justify-between border-b-bg_color_1'>
          <h4>Remote Dev's Workspace</h4>
          <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-border_color rounded-sm p-1'>
            <ChevronLeft size={18}></ChevronLeft>
          </button>
        </div>
        <div className='boardlist'>
          <div className='flex justify-between px-3 py-2'>
            <h6>Your Boards</h6>
            
            <Popover
            isOpen={showpop}
            align='start'
            positions={['right', 'top', 'bottom', 'left']}
            content={
              <div className='ml-2 p-2 w-60 flex flex-col justify-center items-center bg-bg_color_2'>
                <button onClick={() => setShowpop(!showpop)} className='absolute right-2 top-2 hover:bg-bg_color_1 p-1 rounded'><X size={16}></X></button>
                  <h4 className='py-3'>Create Board</h4>
                  <img  src="https://placehold.co/200x120/png" alt="" />
                  <div className="mt-3 flex flex-col items-start w-full">
                    <label htmlFor="title">Board title <span>*</span></label>
                    <input value={boardData.name} onChange={(e)=>setBoardData({...boardData,name:e.target.value})} type="text" className='mb-2 h-8 px-2 w-full bg-bg_color_2' />
                    <label htmlFor="Color">Board Color</label>
                    <input value={boardData.bgcolor} onChange={(e)=>setBoardData({...boardData,bgcolor:e.target.value})} type="color" className='mb-2 h-8 px-2 w-full bg-bg_color_2' />
                    <button onClick={()=>addBoard()} className='w-full rounded h-8 bg-slate-700 mt-2 hover:bg-bg_color_2'>Create</button>
                  </div>
              </div>
            }
            >
            <button onClick={() => setShowpop(!showpop)} className='hover:bg-bg_color_2 p-1 rounded-sm'>
              <Plus size={16}></Plus>
            </button>
            </Popover>
          </div>
        </div>
        <ul>
          {allboard.boards && allboard.boards.map((x,i) => {
            return <li key={i}>
              <button onClick={() => setActiveboard(i)} className='px-3 py-2 w-full text-sm flex justify-start align-baseline hover:bg-accent_color_1'>
                <span className='w-6 h-max rounded-sm mr-2' style={{backgroundColor:`${x.bgcolor}`}}>&nbsp;</span>
                <span>{x.name}</span>
              </button>
            </li>
          })
          }
        </ul>
      </div>}
    </div>
  )
}


export default SidebarTask