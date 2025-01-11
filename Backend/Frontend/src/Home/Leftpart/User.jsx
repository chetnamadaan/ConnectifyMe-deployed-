import React from 'react';
import useConversation from '../../zustand/useConversation.js';
import { useSocketContext } from '../../context/SocketContext';

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-teal-700 duration-300 ${isSelected ? 'bg-teal-800' : ''}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className='flex space-x-4 py-3 px-8 hover:bg-teal-700 duration-300 cursor-pointer'>
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-12 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt={`${user.fullname}'s profile`}
            />
          </div>
        </div>

        <div>
          <h1 className='font-bold text-white'>{user.fullname}</h1>
          <span className='text-gray-300'>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
