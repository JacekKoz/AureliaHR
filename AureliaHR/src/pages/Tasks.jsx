import React, { useState } from 'react'
import BoardHeader from '../components/Task/BoardHeader'
import { BoardContext } from '../context/BoardContext'
import SidebarTask from '../components/Task/SidebarTask'
import Board from '../components/Task/Board'


const Tasks = () => {

  const boardData = {
    active: 0,
    boards: [
      {
        name: 'My Board',
        bgcolor: '#069',
        list: [
          {id: "1", title: "To do", items:[{id: "cdrFt", title: "Project Description 1"}]},
          {id: "2", title: "In Progress", items:[{id: "cdrFv", title: "Project Description 2"}]},
          {id: "1", title: "Done", items:[{id: "cdrFb", title: "Project Description 3"}]}
        ]
      }
    ]
  }
const [allboard, setAllBoard] = useState(boardData)

  return (
    <>
      <BoardHeader/>
      <BoardContext.Provider value={{ allboard, setAllBoard }}>
        <div className='content flex'>
          <SidebarTask/>
          <Board/>
        </div>
      </BoardContext.Provider>
    </>
  )
}

export default Tasks