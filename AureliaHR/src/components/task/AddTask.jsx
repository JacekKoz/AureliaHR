import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ModalWrapper from '../ModalWrapper'
import { BiImage } from 'react-icons/bi'
import Button from '../Button'
import { Dialog } from '@headlessui/react'
import Textbox from '../Textbox'
import SelectList from '../SelectList'
import UserList from './UserList'

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"]
const  PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"]

const uploadedFileURLs = []

const AddTask = ({ open, setOpen }) => {

  const task = ""

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler = () => {};

  const handleSelect = (e) => {
    setAssets(e.target.files);
  }

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-white mb-4'
          >
            {task ? "UPDATE TASK" : "ADD TASK"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6 text-white'>
            <Textbox
              placeholder='Task Title'
              type='text'
              name='title'
              label='Task Title'
              className='w-full rounded'
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team}/>
            
            <div className='flex gap-4'>
              <SelectList
                label='Task Stage'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className='w-full'>
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
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='Priority Level'
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />

              <div className='w-full flex items-center justify-center mt-4'>
                  <label
                    className='flex items-center gap-1 text-base hover:scale-110  transition duration-300 cursor-pointer my-4'
                    htmlFor='imgUpload'
                  >
                    <input
                      type="file"
                      className='hidden'
                      id='imgUpload'
                      onClick={(e) => handleSelect(e)}
                      accept='.jpg, .png, .jpeg'
                      multiple={true}
                    />
                    <BiImage/>
                    <span>AddAssets</span>
                  </label>
              </div>
            </div>

            <div className='gap-8'>
              {uploading ? (
                <span className='text-sm py-2 text-red'>
                  Uploading assets
                </span>
              ) : (
                <Button
                  label='Submit'
                  type='submit'
                  className='bg-button_color px-8 text-sm mr-2 font-poppins font-bold text-white hover:bg-button_color/80 sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-bold text-black sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>        
          </div>
        </form>
      </ModalWrapper>
    </>
  )
}

export default AddTask