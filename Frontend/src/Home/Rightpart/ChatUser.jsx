import React, { useEffect } from "react";
import { CiMenuFries } from "react-icons/ci"; // Ensure this is imported
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext";

function ChatUser() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  // Function to get online status of a user
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  // Log changes to the selected conversation
  useEffect(() => {
    console.log("Selected Conversation updated:", selectedConversation);
  }, [selectedConversation]);

  // Handle click to set the selected conversation
  const handleUserClick = () => {
    setSelectedConversation({ fullname: "Chetna", _id: "uniqueUserId" }); // Example data
  };
  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-gradient-to-b from-teal-700 to-green-700 ">
    <label
      htmlFor="my-drawer-2"
      className="btn btn-ghost drawer-button lg:hidden absolute left-5"
    >
      <CiMenuFries className="text-white text-xl " />
    </label>

    <div
      className="flex space-x-3 items-center justify-center h-[8vh] bg-gradient-to-b from-teal-700 to-green-700 hover:bg-gradient-to-b hover:from-teal-600 hover:to-green-600 duration-300 cursor-pointer"
      onClick={handleUserClick}
    >
      <div className="avatar online">
        <div className="w-16 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="User Avatar"
          />
        </div>
      </div>
      <div>
          {selectedConversation ? (
            <>
              <h1 className="text-xl text-white">{selectedConversation.fullname}</h1>
              <span className="text-sm text-white">
                {getOnlineUsersStatus(selectedConversation._id)}
              </span>
            </>
          ) : (
            <h1 className="text-xl text-white">No User Selected</h1>
          )}
        </div>
      </div>
    </div>
  );
}


export default ChatUser;
