import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  // Lighter color for the current user's message
  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe
    ? "bg-teal-500" // Lighter color for current user's message
    : "bg-teal-900"; // Darker color for other user's message
  
  // Text color: black for sent messages, white for received messages
  const textColor = itsMe ? "text-black" : "text-white";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble ${textColor} ${chatColor}`}>
            {message.message}
          </div>
          <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;
