import { Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment, useRef } from "react"
import { IoClose } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"
import { Toaster } from "sonner"
import { sidebarLinks } from "./assets/sidebarLinks"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Tasks from "./pages/Tasks"
import Team from "./pages/Team"
import { setOpenSidebar } from "./redux/slices/authSlice"
import Trash from "./pages/Trash"
import TaskDetails from "./pages/TaskDetails"

function Layout() {
  const { user } = useSelector((state) => state.auth)

  const location = useLocation()

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="h-screen bg-accent_color_1 sticky top-0 hidden md:block">
        <Sidebar/>
      </div>

      <MobileSidebar/>

      <div className="flex-1 overflow-y-auto">
        <Navbar/>

        <div className="p-4 2xl:px-10">
          <Outlet/>
        </div>
      </div>
    </div>
  ): (
    <Navigate to="/log-in" state={{from: location}} replace/>
  )
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter="transition-opacity duration-700"
      enterFrom="opacity-x-10"
      enterTo="opacity-x-100"
      leave="transition-opacity duration-700"
      leaveFrom="opacity-x-100"
      leaveTo="opacity-x-0"
    >
      {(ref) => (   
        <div
          ref={(node) => (mobileMenuRef.current = node)}
          className={clsx(
            "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform",
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={() => closeSidebar()}
        >
          <div className="bg-accent_color_1 w-3/4 h-full">
            <div className="w-full flex justify-end px-5 mt-5">
              <button
                onClick={() => closeSidebar()}
                className="flex justify-end items-end"
              >
                <IoClose size={25} />
              </button>
            </div>

            <div className="px-5 py-5 text-start">
              <h1 className="text-2xl font-bold text-black font-vidaloka">AureliaHR</h1>
            </div>

            <nav className="px-3 py-5 space-y-4">
              {sidebarLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center w-full text-lg px-2 py-2 hover:bg-border_color rounded-full transition-all"
                >
                  <img
                    src={link.icon}
                    alt={`${link.label} icon`}
                    className="w-8 h-8 mr-3"
                  />
                  <span className="text-xl">{link.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </Transition>
  );
};
  
function App() {

  return (
    <main className='w-full min-h-screen bg-bg_color_1'>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/completed/:status' element={<Tasks />} />
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/team' element={<Team />} />
          <Route path='/trashed' element={<Trash />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Route>

        <Route path='/log-in' element={<Login/>} />

      </Routes>
      <Toaster richColor/>
    </main>
  )
}

export default App
