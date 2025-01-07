import clsx from 'clsx';
import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { BGS, formatDate, PRIOTITYSTYELS, TASK_TYPE } from '../utils';
import TaskDialog from './task/TaskDialog';
import UserInfo from './UserInfo';
import AddSubTask from './task/AddSubTask';

const ICONS = {
  high: <MdKeyboardDoubleArrowUp/>,
  medium: <MdKeyboardArrowUp/>,
  low: <MdKeyboardArrowDown/>
}

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth)
  const [ open, setOpen ] = useState(false)

  return (
    <>
      <div className='w-full h-fit bg-grey_300 shadow-md p-4 rounded text-white font-poppins'>
        <div className='w-full flex justify-between '>
          <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium", PRIOTITYSTYELS[task?.priority])}>
            <span className='text-lg'>{ICONS[task?.priority]}</span>
            <span className='uppercase font-bold'>{task?.priority}</span>
          </div>

          {user?.isAdmin && <TaskDialog task={task}/>}
        </div>
        
        <>
        <div className='flex items-center gap-2'>
          <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}/>
        <h4 className='line-clamp-1'>{task?.title}</h4>
        </div>
        <span className='tex-sm text-grey_200'>
          {formatDate(new Date(task?.date))}
        </span>
        </>

        <div className='w-full border-t border-grey_400 my-2'/>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-3 '>
            <div className='flex gap-1 items-center text-sm text-grey_200'>
              <BiMessageAltDetail/>
              <span>{task?.activities?.length}</span>
            </div>

            <div className='flex gap-1 items-center text-sm text-grey_200'>
              <MdAttachFile/>
              <span>{task?.assets?.length}</span>
            </div>

            <div className='flex gap-1 items-center text-sm text-grey_200'>
              <FaList/>
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>

          <div className='flex flex-row-reverse'>
            {task?.team?.map((m, index) => (
              <div
              key={index}
              className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm mr-1", BGS[index % BGS?.length])}
              >
                <UserInfo user={m}/>
              </div>
            ))}
          </div>
        </div>
         
        {task?.subTasks?.length > 0 ? (
          <div className='py-4 border-t border-grey_200'>
            <h5 className='text-base line-clamp-1 text-grey_100'>{task?.subTasks[0].title}</h5>
            
            <div className='p-4 space-x-8'>
              <span className='text-sm text-grey_100'>
                {formatDate(new Date(task?.subTasks[0].date))}
              </span>
              <span className='bg-accent_color_green/10 px-3 py-1 rounded-full text-accent_color_green font-medium'>
                {task?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className='py-4 border-t border-grey_400'>
              <span className='text-grey_200'>No Sub Task</span>
            </div>
          </>
        )}

        <div className='w-full pb-2'>
          <button
            onClick={() => setOpen(true)}
            disabled={user.isAdmin ? false : true}
            className='w-full flex gap-4 items-center text-sm text-white disabled:cursor-not-allowed disabled::text-grey_200'
            >
            <IoMdAdd className='text-lg'/>
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task._id}/>
    </>
  )  
}

export default TaskCard