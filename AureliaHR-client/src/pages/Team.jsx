import { useState } from 'react'
import Title from '../components/Title'
import { IoMdAdd } from 'react-icons/io'
import { getInitials } from '../utils'
import clsx from 'clsx'
import Button from '../components/Button'
import ConfirmatioDialog, { UserAction }from "../components/Dialogs";
import AddUser from '../components/AddUser'
import { useDeleteUserMutation, useGetTeamListQuery, useUserActionMutation } from '../redux/slices/api/userApiSlice'
import { toast } from 'sonner'

const Team = () => {

  const [ openDialog, setOpenDialog ] = useState(false)
  const [ open, setOpen ] = useState(false)
  const [ openAction, setOpenAction ] = useState(false)
  const [ selected, setSelected ] = useState(null)

  const {data, isLoading, refetch} = useGetTeamListQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [userAction] = useUserActionMutation()

  const userActionHandler = async () => {
    try {
      const result = await userAction({
        isActive: !selected?.isActive,
        id: selected?._id,
      })

      refetch()

      toast.success(result.data.message)

      setSelected(null)
      setTimeout(() => {
        setOpenAction(false)
      }, 500)

    } catch (error) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    }
  }

  const deleteHandler = async () => {
    try {
      const result = await deleteUser(selected._id)

      refetch()
      toast.success("Delete successfully")
      setSelected(null)

      setTimeout(() => {
        setOpenDialog(false)
      }, 500)

    } catch (error) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    }
  }

  const deleteClick = (id) => {
    setSelected(id)
    setOpenDialog(true)
  }

  const editClick = (el) => {
    setSelected(el)
    setOpen(true)
  }

  const userStatusClick = (el) => {
    setSelected(el)
    setOpenAction(true)
  }

  const TableHeader = () => (
    <thead className='border-b border-grey_200 font-poppins'>
      <tr className='text-white text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Title</th>
        <th className='py-2'>Email</th>
        <th className='py-2'>Role</th>
        <th className='py-2'>Active</th>
      </tr>
    </thead>
  )


  const TableRow = ({ user }) => (
    <tr className='border-b border-grey_200 text-white hover:bg-grey_400 font-poppins'>
      <td className='p-2'>
        <div className='flex items-center gap-32'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-accent_color_blue'>
            <span className='text-xs md:text-sm text-center'>
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>

      <td className='p-2'>{user.title}</td>
      <td className='p-2'>{user.email || "user.email.com"}</td>
      <td className='p-2'>{user.role}</td>
    

      <td>
        <button
          onClick={() => userStatusClick(user)}
          className={clsx('w-fit px-4 py-1 rounded-full', user?.isActive ? "bg-accent_color_green" : "bg-accent_color_yellow")}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>

      <td className='p-2 flex gap-4 justify-end'>
        <Button
          className='text-accent_color_green/80 hover:text-accent_color_green sm:px-0'
          label='Edit'
          type='button'
          onClick={() => editClick(user)}
        />

        <Button
          className='text-red/80 hover:text-red sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(user)}
        />
      </td>
    </tr>
  )

  return (
    <>
      <div  className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8 text-white'>
          <Title title = "Team Members"/>
          <Button
            label='Add New User'
            icon = {<IoMdAdd className='text-lg font-bold'/>}
            className={'flex flex-row-reverse gap-1 items-center font-bold bg-button_color text-white rounded-md 2xl:py-2.5'}
            onClick={() => setOpen(true)}
          />
        </div>

        <div className='bg-grey_300 px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader/>
              <tbody>
                {data?.map((user, index) => (
                  <TableRow key={index} user={user}/>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  )
}

export default Team

