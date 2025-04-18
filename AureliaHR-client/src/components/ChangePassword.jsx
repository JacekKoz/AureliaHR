import React from 'react'
import { Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import Button from './Button'
import Loading from './Loading'
import ModalWrapper from './ModalWrapper'
import Textbox from './Textbox'
import { useChangePasswordMutation } from '../redux/slices/api/userApiSlice'
import { toast } from 'sonner'

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [changeUserPassword, { isLoading }] = useChangePasswordMutation()

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Passwords doesn't match")
      return
    }
    try {
      const res = await changeUserPassword(data).unwrap()
      toast.success("New User added successfully")

      setTimeout(() => {
        setOpen(false)
      }, 1500)
    } catch (err){
      console.log(err)
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-white mb-4'
          >
            Change Password
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder="New Password"
              type="password"
              name="password"
              label="New Password"
              className='w-full rounded'
              register={register("password", {
                required: "New Password is required!",
              })}
              error={errors.password ? errors.password.message : ""}
            />
            <Textbox
              placeholder="Confirm New Password"
              type="password"
              name="cpass"
              label="Confirm New Password"
              className='w-full rounded'
              register={register("cpass", {
                required: "Confirm New Password is required!",
              })}
              error={errors.cpass ? errors.cpass.message : ""}
            />
          </div>

          {isLoading ? (
            <div className='py-5'>
              <Loading/>
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse font-bold'>
              <Button
                type='submit'
                className='bg-button_color px-8 text-sm font-poppins text-white hover:bg-button_color/80'
                label='Save'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-poppins text-black sm:w-auto mr-2'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
                
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  )
}

export default ChangePassword