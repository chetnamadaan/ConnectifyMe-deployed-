import React, { useState, useEffect } from 'react';
import User from './User';
import useGetAllUsers from '../../context/useGetAllUsers';

const Users = () => {
  const [allUsers, loading] = useGetAllUsers();
  console.log(allUsers);
  return (
    <div className="w-full flex flex-col bg-gradient-to-b from-teal-950 to-green-950 text-white h-full">
      <h1 className="px-8 py-2 text-white font-semibold bg-teal-900 rounded-md">
        Messages
      </h1>
      <div
        className="py-2 overflow-y-auto w-full scrollbar-hidden"
        style={{ maxHeight: 'calc(84vh - 10vh)' }}
      >
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
