import clsx from 'clsx';
import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, } from "react-icons/md";
import { PRIOTITYSTYELS, TASK_TYPE } from '../utils';
import TaskDialog from './task/TaskDialog';

const ICONS = {
  high: <MdKeyboardDoubleArrowUp/>,
  medium: <MdKeyboardArrowUp/>,
  low: <MdKeyboardArrowDown/>
}

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth)
  const [ open, setOpen ] = useState(false)

  return <>
    <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
      <div className='w-full flex justify-between '>
        <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium", PRIOTITYSTYELS[task?.priority])}>
          <span className='text-lg'>{ICONS[task?.priority]}</span>
          <span className='uppercase'>{task?.priority}</span>
        </div>

        {user?.isAdmin && <TaskDialog task={task}/>}
      </div>
      <>
      <div className='flex items-center gap-2'>
        <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}>

        </div>
      </div>
      </>
    </div>
  </>
  
}

export default TaskCard