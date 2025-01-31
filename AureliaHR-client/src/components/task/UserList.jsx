import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { summary } from "../../assets/data";
import clsx from "clsx";
import { getInitials } from "../../utils";
import { MdCheck } from "react-icons/md";
import { useGetTeamListQuery } from "../../redux/slices/api/userApiSlice";

const UserList = ({ team, setTeam }) => {

  const {data, isLoading} = useGetTeamListQuery()
  const [ selectedUsers, setSelectedUsers ] = useState([])

  const handleChange = (el) => {
    setSelectedUsers(el)
    setTeam(el?.map((u) => u._id))
  }
  useEffect(() => {
    if (team?.length < 1) {
      data && setSelectedUsers([data[0]])
    } else {
      setSelectedUsers(team)
    }
  }, [isLoading])

  return (
    <div>
      <p className="text-white"> Assign Task To: </p>
      <Listbox
        value={selectedUsers}
        onChange={(el) => handleChange(el)}
        multiple
      >
        <div className="relative mt-1">
          <Listbox.Button className='relative w-full cursor-default rounded bg-white pl03 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-grey_200 sm:text-sm'>
            <span className="block truncate text-black">
              {selectedUsers?.map((user) => user.name).join(", ")}
            </span>

            <span className="pointer-events-none absolute inset-y-0 flex items-center  pr-2 right-0">
              <BsChevronExpand
                className="h-5 w-5 text-grey_400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          >

            <Listbox.Options className='z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-grey_300 py-1 text-base shadow-lg ring-1 ring0black/5 focus:outline-none sm:text-sm'>
              {data?.map((user, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) => 
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-accent_color_blue text-white' : 'text-white'
                    }`
                  }
                  value={user}
                >
                  {({ selected }) => (
                    <>
                      <div className={clsx('flex items-center gap-2 truncate', selected ? 'font-medium' : 'font-normal')}>
                        <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-accent_color_purple">
                          <span className="'text-center text-[10px]">
                            {getInitials(user.name)}
                          </span>
                        </div>
                        <span>{user.name}</span>
                      </div>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent_color_green">
                          <MdCheck className="h-5 w-5" aria-hidden='true'/>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>

              ))}
            </Listbox.Options>

          </Transition>

        </div>

      </Listbox>
    </div>
  )
}

export default UserList