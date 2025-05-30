import { Tab } from "@headlessui/react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs ({ tabs, setSelected, children }) {
  return (
    <div className='w-full px-1 sm:px-0'>
      <Tab.Group>
       <Tab.List className='flex space-x-6 rounded-xl p-1'>
         {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) => 
                classNames("w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-grey_300",
                  selected
                    ? "text-button_color border-b-2 border-button_color"
                    : "text-grey_200 hover:text-button_color"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>

            </Tab>
            ))}
        </Tab.List>
        <Tab.Panels className="w-full mt-2">{children}</Tab.Panels>
      </Tab.Group>
    </div>
  ) 
}
