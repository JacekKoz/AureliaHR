import React, { useState } from 'react'
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { toast } from 'sonner';
import { use } from 'react';
import clsx from 'clsx';
import { BGS, formatDate, PRIOTITYSTYELS, TASK_TYPE } from '../../utils';
import { tasks } from '../../assets/data';
import Button from '../Button';
import UserInfo from '../UserInfo';

const ICONS = {
  high: <MdKeyboardDoubleArrowUp/>,
  medium: <MdKeyboardArrowUp/>,
  low: <MdKeyboardArrowDown/>
}

const Table = ({ tasks }) => {
  
  const [openDialog, setOpenDialog] = useState(false)
  const [selected, setSelected] = useState(null)

  const deleteClicks = () => {}

  const TableHeader = () => (
    <thead className='w-full border-b border-grey_300'>
      <tr className='w-full text-white  text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2 line-clamp-1'>Created At</th>
        <th className='py-2'>Assets</th>
        <th className='py-2'>Team</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-grey_200 text-grey_400 hover:bg-grey_300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className='w-full line-clamp-2 text-base text-white'>
            {task?.title}
          </p>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className='capitalize line-clamp-1 text-grey_200'>
            {task?.priority} Priority
          </span>
        </div>
      </td>

      <td className='py-2'>
        <span className='text-sm text-grey_200'>
          {formatDate(new Date(task?.date))}
        </span>
      </td>

      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='flex gap-1 items-center text-sm text-grey_200'>
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-grey_200'>
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-grey_200'>
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm ",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className='py-2 flex gap-2 md:gap-4'>
        <Button
          className='text-accent_color_green/80 hover:text-accent_color_green sm:px-0 text-sm md:text-base'
          label='Edit'
          type='button'
        />

        <Button
          className='text-red/90 hover:text-red sm:px-0 text-sm md:text-base'
          label='Delete'
          type='button'
          onClick={() => deleteClicks(task._id)}
        />
      </td>

    </tr>
  )
      


  return (
    <>
      <div className='bg-bg_color_2 px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <TableHeader/>
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      /> */}
    </>
  )
}

export default Table