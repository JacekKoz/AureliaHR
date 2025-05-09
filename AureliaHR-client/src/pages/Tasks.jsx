import React, { useState } from 'react'
import { FaList } from "react-icons/fa"
import { MdGridView } from "react-icons/md"
import { IoMdAdd } from "react-icons/io";
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Title from '../components/Title'
import Button from "../components/Button";
import Tabs from '../components/Tabs';
import TaskTitle from '../components/TaskTitle';
import BoardView from '../components/BoardView';
import { tasks } from '../assets/data';
import Table from '../components/task/Table';
import AddTask from '../components/task/AddTask';
import { useGetAllTaskQuery } from '../redux/slices/api/taskApiSlice';

const TABS = [
  { title: "Board View", icon: <MdGridView/> },
  { title: "Last View", icon: <FaList/> }
]

const TASK_TYPE = {
  todo: "bg-accent_color_blue",
  "in progress": "bg-accent_color_yellow",
  completed: "bg-accent_color_green"
}

const Tasks = () => {

  const params = useParams()

  const [ selected, setSelected ] = useState(0)
  const [ open, setOpen ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const status = params?.status || ""

  const {data, isLoading} = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  })
  if (loading || isLoading) {
    return (
      <div className='py-10'>
        <Loading />
      </div>
    )
  }
  
  return (

    <div className='w-full'>
      <div className='flex items-center justify-between mb-4 text-white'>
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<IoMdAdd className='text-lg font-bold' />}
            className='flex flex-row-reverse gap-1 items-center bg-button_color text-white rounded-md py-2 2xl:py-2.5 font-bold'
          />
        )}
      </div>

      <div>
        <Tabs tabs={TABS} setSelected={setSelected}>
          {!status && (
            <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
              <TaskTitle label="To Do" className={TASK_TYPE.todo}/>
              <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]}/>
              <TaskTitle label="Completed" className={TASK_TYPE.completed}/>
            </div>
          )}

          {selected !== 1 ? (
            <BoardView tasks={data?.tasks}/>
            ) : (
              <div className='w-full'>
                <Table tasks={data?.tasks}/>
              </div>
            )}
        </Tabs>
      </div>

      <AddTask open={open} setOpen={setOpen}/>

    </div>
    )
}

export default Tasks