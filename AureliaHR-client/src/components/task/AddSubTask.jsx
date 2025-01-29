import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import { useCreateSubTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";

const AddSubTask = ({ open, setOpen, id }) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  
  const [addSubTask] = useCreateSubTaskMutation()
  
  const handleOnSubmit = async (data) => {
    try {
      const res = await addSubTask({ data, id }).unwrap()

      toast.success(res.message)
      
      setTimeout(() => {
        setOpen(false)
      }, 500)
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-white mb-4'
          >
            ADD SUB-TASK
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6 text-white">
            <Textbox
              placeholder="Sub-Task title"
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register('title',{
                required: 'Title is required!',
              })}
              error={errors.title ? errors.title.message : ""}
            />

            <div className="flex item-center gap-4 text-white">
              <Textbox
               placeholder='Date'
               type='date'
               name='date'
               label='Task Date'
               className='w-full rounded'
               register={register("date", {
                 required: "Date is required!",
               })}
               error={errors.date ? errors.date.message : ""}
              />
              <Textbox
              placeholder='Tag'
              type='tag'
              name='tag'
              label='Tag'
              className='w-full rounded'
              register={register('tag', {
                required: "Tag is required!"
              })}
              error={errors.date ? errors.date.message : ""}
              />
            </div>
          </div>

          <div className="py-3 mt-4 flex sm:flex-row-reverse gap-4">
            <Button
              type="submit"
              className='bg-button_color text-sm font-poppins text-white hover:bg-button_color/80 sm:ml-3 sm:w-auto'
              label="Add Task"
            />

            <Button
              type='button'
              className='bg-white border text-sm font-poppins text-black sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  )
}

export default AddSubTask
