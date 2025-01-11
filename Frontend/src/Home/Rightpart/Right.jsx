import React, { useEffect } from 'react';
import ChatUser from './ChatUser';
import Messages from './Messages';
import Typesend from './Typesend';
import useConversation from '../../zustand/useConversation.js';
import { useAuth } from "../../context/Authprovider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    if (!selectedConversation) {
      setSelectedConversation(null);
    }
  }, [selectedConversation, setSelectedConversation]);

  return (
<div className="w-full flex flex-col bg-gradient-to-b from-teal-500 to-green-600 text-white h-full">
  <div className="h-screen bg-gradient-to-b from-teal-700 to-green-700 flex flex-col">
    {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <ChatUser />
            <div className="overflow-y-auto scrollbar-hidden" style={{ maxHeight: "calc(92vh - 8vh)" }}>
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="relative">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-center text-lg">
          Welcome{" "}
          <span className="font-semibold text-3xl">{authUser?.user?.fullname}</span>
          <br />
          No chat selected, please start your conversation by selecting anyone you want to contact
        </h1>
      </div>
    </div>
  );
};
