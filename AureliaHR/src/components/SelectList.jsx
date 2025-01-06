import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";

const SelectList = ({ lists, selected, setSelected, label }) => {
  return (
    <div className="w-full">
      {label && <p className="text-white">{label}</p>}

      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className='relative w-full cursor-default rounded bg-white pl-10 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-grey_200 sm:text-sm'>
            <span className="block truncate text-black">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-black"
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
            <Listbox.Options className='z-50 absolute mt-1 max-h-60 overflow-auto rounded-md bg-grey_300 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
              {lists.map((list, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) => 
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-accent_color_blue text-white' : 'text-white'
                    }`
                  }
                  value={list}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${ selected ? 'font-medium' : 'font-normal'}`}>
                        {list}
                      </span>
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

export default SelectList