import React, { useState } from 'react'; // Importing useState
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js"; // Ensure this path is correct

function Typesend() {
  const [message, setMessage] = useState(""); // Correctly using useState
  const { loading, sendMessages } = useSendMessage(); // Ensure useSendMessage returns these values

  const handleSubmit = async (e) => {
    console.log(e.target.value);

    e.preventDefault();
    if (!message.trim()) return; // Prevent sending empty messages
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh] bg-gradient-to-b from-teal-700 to-green-700">
        <div className="w-[70%] mx-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-teal-500 rounded-xl outline-none mt-1 px-4 py-3 w-full bg-black text-white"
            disabled={loading} // Disable input while loading
          />
        </div>
        <button type="submit" disabled={loading}>
          <IoSend className="text-3xl text-white" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
