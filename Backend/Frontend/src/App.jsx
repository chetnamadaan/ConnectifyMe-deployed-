import React from 'react';
import './index.css';
import Left from './Home/Leftpart/Left';
import Right from './Home/Rightpart/Right';
import Signup from './components/Signup';
import Login from './components/Login';
import { useAuth } from './context/Authprovider';
import { Navigate, Route, Routes } from 'react-router-dom';
import {Toaster} from "react-hot-toast";

function App() {
  const [authUser] = useAuth(); // Destructure only authUser since setAuthUser is unused.
  console.log(authUser);

  return (
    <>
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            // <div className="flex h-screen">
            //   <Left />
            //   <Right />
            // </div>
            <div className="drawer lg:drawer-open">
  <input
    id="my-drawer-2"
    type="checkbox"
    className="drawer-toggle"
  />
  <div className="drawer-content flex flex-col items-center justify-center">
    <Right /> {/* Component or element for the main content */}
  </div>
  <div className="drawer-side">
    <label
      htmlFor="my-drawer-2"
      aria-label="close sidebar"
      className="drawer-overlay"
    ></label>
    <ul className="menu w-80 min-h-full bg-black text-base-content">
      <Left /> {/* Component or elements for the sidebar content */}
    </ul>
  </div>
</div>

          ) : (
            <Navigate to={"/login"}/>
          )
        }
      />
      <Route path="/login" element={authUser? <Navigate to="/"/>:<Login />} />
      <Route path="/signup" element={authUser? <Navigate to="/"/>:<Signup />} />
    </Routes>
    <Toaster/>
    </>
  );
}

export default App;
