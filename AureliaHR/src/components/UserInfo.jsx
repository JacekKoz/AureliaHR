import { Popover, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { getInitials } from "../utils"

const UserInfo = ({ user }) => {
  return (
    <div className="px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className="group inline-flex item outline-none">
              <span>{getInitials(user?.name)}</span>
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
              <Popover.Panel className='absolute left-1/2 z-10 mt-3 w-90 max-2-sm translate-x-1/2 transform px-4 sm:px-0'>
                <div className="flex gap-5 item-center rounded-lg shadow-lg bg-grey_200 p-4">
                  <div className="w-16 h-16 bg-red rounded-full text-white flex item-center justify-center text-2xl">
                    <span className="text-center font-bold">
                      {getInitials(user?.name)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <p className="text-white text-xl font-bold">{user.name}</p>
                    <span className="text-base text-grey_300">
                      {user.title}
                    </span>
                    <span className="text-base text-accent_color_blue">
                      {user.email}
                    </span>
                  </div>  

                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default UserInfo