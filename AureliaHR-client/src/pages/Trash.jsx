import React, { useState } from 'react'
import { MdDelete, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdOutlineRestore, } from "react-icons/md";
import clsx from 'clsx';
import { TASK_TYPE, PRIOTITYSTYELS } from '../utils/index';
import Button from '../components/Button';
import Title from '../components/Title';
import { tasks } from '../assets/data';
import ConfirmatioDialog from '../components/Dialogs';
import AddUser from '../components/AddUser';
import { useDeleteRestoreTaskMutation, useGetAllTaskQuery } from '../redux/slices/api/taskApiSlice';
import Loading from '../components/Loading';
import { toast } from 'sonner';
import { FaFontAwesome } from 'react-icons/fa';
// import AddUser from '../components/AddUser';


const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {

  const [ openDialog, setOpenDialog ] = useState(false)
  const [ open, setOpen ] = useState(false)
  const [ msg, setMsg ] = useState(null)
  const [ type, setType ] = useState("delete")
  const [ selected, setSelected ] = useState("")

  const { data, isLoading, refetch} = useGetAllTaskQuery({
    strQuery: "",
    isTrashed: "true",
    search: ""
  })
  console.log(data)
  const [deleteRestoreTask] = useDeleteRestoreTaskMutation()

  const deleteRestoreHandler = async() => {
    try {
      let result

      switch (type) {
        case "delete":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "delete",
          }).unwrap()
          break
        
        case "deleteAll":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "deleteAll",
          }).unwrap()
          break

        case "restore":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "restore",
          }).unwrap()
          break

        case "restoreAll":
          result = await deleteRestoreTask({
            id: selected,
            actionType: "restoreAll",
          }).unwrap()
          break
      }

      toast.success(result.message)

      setTimeout(() => {
        setOpenDialog(false)
        refetch()
      }, 500)
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error.error)
    }
  }

  const deleteAllClick = () => {
    setType("deleteAll")
    setMsg("Are you sure you want to delete all?")
    setOpenDialog(true)
  }

  const restoreAllClick = () => {
    setType("restoreAll")
    setMsg("Are you sure you want to restore all?")
    setOpenDialog(true)
  }

  const deleteClick = (id) => {
    setType("delete")
    setSelected(id)
    setOpenDialog(true)
  }

  const restoreClick = (id) => {
    setSelected(id)
    setType("restore")
    setMsg("Are you sure you want to restore?")
    setOpenDialog(true)
  }

  if (isLoading)
    return (
      <div className='py-10'>
        <Loading/>
      </div>
    )

  const TableHeader = () => (
    <thead className='border-b border-grey_200'>
      <tr className='text-white text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Stage</th>
        <th className='py-2 line-clamp-1'>Modified On</th>
      </tr>
    </thead>
  )
  

  const TableRow = ({ item }) => (
    <tr className='border-b border-grey_200 text-white hover:bg-grey_400'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx('w-4 h-4 rounded-full', TASK_TYPE[item.stage])}
          />
          <p className='w-full line-clamp-2 text-base text-white'>
            {item.title}
          </p>
        </div>
      </td>

      <td className='py-2 capitalize'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>
            {ICONS[item?.priority]}
          </span>
          <span className=''>{item?.priority}</span>
        </div>
      </td>

      <td className='py-2 capitalize text-center md:text-start'>
        {item?.stage}
      </td>
      <td className='py-2 text-sm'>{new Date(item?.date).toDateString()}</td>

      <td className='py-2 flex gap-1 justify-end'>
        <Button
          icon={<MdOutlineRestore className='text-xl text-grey_100' />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdDelete className='text-xl text-red' />}
          onClick={() => deleteClick(item._id)}
        />
      </td>

    </tr>
  )

  return (
    
    <>
    <div className='w-full md:px-1 px-0 mb-6 text-white font-poppins'>
      <div className='flex items-center justify-between mb-8 '>
        <Title title='Trashed Tasks' />

        <div className='flex gap-2 md:gap-4 items-center '>
          <Button
            label='Restore All'
            icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
            className='flex flex-row-reverse gap-1 items-center bg-button_color font-bold text-white text-sm md:text-base rounded-md 2xl:py-2.5'
            onClick={() => restoreAllClick()}
          />
          <Button
            label='Delete All'
            icon={<MdDelete className='text-lg hidden md:flex ' />}
            className='flex flex-row-reverse gap-1 items-center bg-button_color font-bold text-white text-sm md:text-base rounded-md 2xl:py-2.5'
            onClick={() => deleteAllClick()}
          />
        </div>
      </div>
      <div className='bg-grey_300 px-2 md:px-6 py-4 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <table className='w-full mb-5'>
            <TableHeader />
            <tbody>
              {data?.tasks?.map((tk, id) => (
                <TableRow key={id} item={tk} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* <AddUser open={open} setOpen={setOpen} /> */}

    <ConfirmatioDialog
      open={openDialog}
      setOpen={setOpenDialog}
      msg={msg}
      setMsg={setMsg}
      type={type}
      setType={setType}
      onClick={() => deleteRestoreHandler()}
    />
  </>
  )
}

export default Trash