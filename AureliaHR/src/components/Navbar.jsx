import React from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from '../assets/img/search-icon.svg';
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch =useDispatch()

  return (
    <div className='flex justify-between item-center bg-bg_color_2 px-4 py-3 2xl:py-4 sticky z-10 top-0'>
      <div className='flex gap-4'>
        <button onClick={() => dispatch(setOpenSidebar(true))}
        className='text-2xl text-black block md:hidden'
        >
          ☰
        </button>

        <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-white'>
          <img src={searchIcon} alt="" className='text-accent_color_2 text-xl h-5 w-5'/>

          <input type="text" 
            placeholder='Search...'  
            className='flex-1 outline-none bg-transparent placeholder:text-accent_color_2 text-black'
          />
        </div>
      </div>
      
      <div className='flex gap-2 item-center'>
        <NotificationPanel/>

        <UserAvatar />
      </div>
    </div>
  )
}

export default Navbar