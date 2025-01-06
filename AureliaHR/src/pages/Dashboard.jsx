import React from 'react'
import { MdAdminPanelSettings, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu"
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary } from '../assets/data';
import clsx from 'clsx';
import Chart from '../components/Chart';
import { BGS, getInitials, PRIOTITYSTYELS, TASK_TYPE } from '../utils';
import UserInfo from '../components/UserInfo';

const TaskTable = ({ tasks }) => {
    const ICONS = {
      high: <MdKeyboardDoubleArrowUp/>,
      medium: <MdKeyboardArrowUp/>,
      low: <MdKeyboardArrowDown/>
    }
    

    const TableHeader = () => (
      <thead className=' border-b border-grey_100'>
        <tr className='text-white text-left'>
          <th className='py-2'>Task Title</th>
          <th className='py-2'>Priority</th>
          <th className='py-2'>Team</th>
          <th className='py-2 hidden md:block'>Created At</th>
        </tr>
      </thead>
    )

    const TableRow = ({ task }) => <tr className='border-b border-grey_200 text-white hover:bg-grey_400'>
      <td className='py-2'>
        <div className='flex item-center gap-2'>
          <div
          className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className='text-base text-white'>{task.title}</p>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex gap-1 item-center'>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className='capitalize'>{task.priority}</span>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm mr-1", BGS[index % BGS.length])}
            >
              <UserInfo user={m}/>
            </div>
          ))}
        </div>
      </td>
      <td className='py02 hidden md:block'>
        <span className='text-base text-grey_100'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>

    return (
      <>
        <div className='w-full md:w-2/3 bg-grey_300 px-2 md:px-4 pt-4 pb-4 shadow-md rounded '>
          <table className='w-full'>
            <TableHeader/>
            <tbody>
              {tasks?.map((task, id) => (
                  <TableRow
                    key={id}
                    task={task}
                  />
                ))}
            </tbody>
          </table>

        </div>
      </>
    )
}

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className='border-b border-white font-poppins'>
      <tr className='text-white  text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-grey_200 text-grey_100 hover:bg-grey_400 font-poppins'>
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-accent_color_purple'>
            <span className='text-center'>{getInitials(user?.name)}</span>
          </div>

          <div>
            <p> {user.name}</p>
            <span className='text-xs text-grey_200'>{user?.role}</span>
          </div>
        </div>
      </td>

      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-accent_color_blue" : "bg-button_color"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className='w-full md:w-1/3 bg-grey_300 h-fit px-2 md:px-6 py-4 shadow-md rounded font-poppins'>
      <table className='w-full mb-5'>
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {

  const totals = summary.tasks

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"],
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const Card = ({ label, count, bg, icon}) => {
    return (
      <div className='w-full h-32 bg-grey_300 p-3 shadow-sm rounded-md  flex item-center justify-between text-white font-poppins'>
        <div className='h-full flex flex-1 flex-col justify-between font-poppins'>
          <p className='text-base '>{label}</p>
          <span className='text-2xl '>{count}</span>
          <span className='text-sm text-grey_200'>{"110 last month"}</span>
        </div>

        <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white", bg)}>
          {icon}
        </div>
      </div>
    )
  }

  return (
    <div className='h-full py-4 font-poppins'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {
          stats.map(({icon, bg, label, total}, index) => (
            <Card
              key = {index}
              icon = {icon}
              bg = {bg}
              label = {label}
              count = {total}
            />
          ))
        }
      </div>

      <div className='w-full bg-grey_300 my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-white font-poppins'>Chart by Priority</h4>
        <Chart/>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        <TaskTable tasks={summary.last10Task}/>

        <UserTable users={summary.users}/>
      </div>

    </div>
  )
}

export default Dashboard