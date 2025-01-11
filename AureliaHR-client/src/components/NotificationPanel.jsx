import { Popover, Transition } from "@headlessui/react"
import moment from 'moment'
import { Fragment, useState } from "react"
import { BiSolidMessageRounded } from 'react-icons/bi'
import { HiBellAlert } from 'react-icons/hi2'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { Link, Links } from 'react-router-dom'
import ViewNotification from './ViewNotification'

const data = [
  {
    _id: "65c5bbf3787832cf99f28e6d",
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c27a0e18c0a1b750ad5cad",
      "65c30b96e639681a13def0b5",
    ],
    text: "New task has been assigned to you and 2 others. The task priority is set a normal priority, so check and act accordingly. The task date is Thu Feb 29 2024. Thank you!!!",
    task: null,
    notiType: "alert",
    isRead: [],
    createdAt: "2024-02-09T05:45:23.353Z",
    updatedAt: "2024-02-09T05:45:23.353Z",
    __v: 0,
  },
  {
    _id: "65c5f12ab5204a81bde866ab",
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    text: "New task has been assigned to you and 2 others. The task priority is set a high priority, so check and act accordingly. The task date is Fri Feb 09 2024. Thank you!!!",
    task: {
      _id: "65c5f12ab5204a81bde866a9",
      title: "Test task",
    },
    notiType: "alert",
    isRead: [],
    createdAt: "2024-02-09T09:32:26.810Z",
    updatedAt: "2024-02-09T09:32:26.810Z",
    __v: 0,
  },
];

const ICONS = {
  alert: (
    <HiBellAlert className='h-5 w-5 text-white group-hover:text-accent_color_yellow' />
  ),
  message: (
    <BiSolidMessageRounded className='h-5 w-5 text-black group-hover:text-border_color' />
  ),
};

const NotificationPanel = () => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const { data, refetch } = useGetNotificationsQuery()
  const [markAsRead] = useMarkNotiAsReadMutation()

  const readHandler = async (type, id) => {
    await markAsRead({ type, id }).unwrap()

    refetch()
  }

  const viewHandler = async (el) => {
    setSelected(el)
    readHandler("one", el._id)
    setOpen(true)
  }

  const callsToAction = [
    { name : "Cancel", href: "#", icon: "" },
    {
      name: "Mark All Read",
      href: "#",
      icon: "",
      onClick: () => readHandler("all", "")
    }
  ]

  return (
    <>
      <Popover className='relative'>
        <Popover.Button className='inline-flex items-center outline-none'>
          <div className='w-10 h-10 flex items-center justify-center text-white relative'>
            <IoIosNotificationsOutline className='text-2xl' />
            {data?.length > 0 && (
              <span className='absolute text-center top-0 right-1 text-xs text-white font-poppins w-4 h-4 rounded-full bg-red'>
                {data?.length}
              </span>
            )}
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <Popover.Panel className='absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max px-4'>
            {({ close }) =>
              data?.length > 0 && (
                <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-grey_400 text-sm leading-6 shadow-lg ring-1 ring-offset-border_color/5'>
                  <div className='p-4'>
                    {data?.slice(0, 5).map((item, index) => (
                      <div
                        key={item._id + index}
                        className='group relative flex gap-x-4 rounded-xl p-4  hover:bg-grey_300 transition-all'
                      >
                        <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-transparent'>
                          {ICONS[item.notiType]}
                        </div>

                        <div
                          className='cursor-pointer'
                          onClick={() => viewHandler(item)}
                        >
                          <div className='flex items-center gap-3 font-semibold text-white capitalize'>
                            <p> {item.notiType}</p>
                            <span className='text-xs font-normal lowercase'>
                              {moment(item.createdAt).fromNow()}
                            </span>
                          </div>
                          <p className='line-clamp-1 mt-1 text-white'>
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='grid grid-cols-2 divide-x bg-grey_400 '>
                    {callsToAction.map((item) => (
                      <Link
                        key={item.name}
                        onClick={
                          item?.onClick ? () => item.onClick() : () => close()
                        }
                        className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-white hover:bg-grey_300 transition-all'
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
          </Popover.Panel>
        </Transition>

      </Popover>

      <ViewNotification open={open} setOpen={setOpen} el={selected}/>
    </>
  )
}

export default NotificationPanel