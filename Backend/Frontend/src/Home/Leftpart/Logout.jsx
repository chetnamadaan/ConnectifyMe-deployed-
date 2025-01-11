import React, {useState, useEffect} from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from 'axios';
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading]=useState(false)
  const handleLogout=async()=>{
    setLoading(true)
    try {
      const res= await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt")
      setLoading(false)
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in logout", error);
      toast.error("Error in logging out");
      
    }
  }
  return (
    <div className='h-[10vh] bg-gradient-to-b from-teal-700 to-green-700'>
  <div>
    <RiLogoutCircleLine
      className='text-5xl text-white hover:bg-teal-600 cursor-pointer rounded-full duration-300 px-2 py-2 ml-2 mt-1'
      onClick={handleLogout}
    />
  </div>
</div>
  )
}

export default Logout
