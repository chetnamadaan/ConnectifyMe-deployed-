import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./Authprovider"; // Ensure this is properly imported
import io from "socket.io-client";

const socketContext = createContext();

// Custom hook to use the socket context
export const useSocketContext = () => {
    return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null); // State to manage the socket instance
    const [onlineUsers, setOnlineUsers] = useState([]); // State to manage online users
    const [authUser] = useAuth(); // Get authenticated user data

    useEffect(() => {
        if (authUser) {
            // Establish Socket.io connection
            const socketInstance = io("http://localhost:3000", {
                query: {
                    userId: authUser.user._id, // Pass userId as query parameter
                },
            });

            setSocket(socketInstance); // Store the socket instance in state

            // Listen for online users event
            socketInstance.on("getOnlineUsers", (users) => {
                setOnlineUsers(users); // Update online users
            });

            // Cleanup when component unmounts or authUser changes
            return () => {
                socketInstance.disconnect(); // Disconnect the socket
            };
        } else {
            // If authUser is null, clean up the socket instance
            if (socket) {
                setSocket(null);
            }
        }
    }, [authUser]); // Run whenever authUser changes

    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    );
};

// Custom hook to use socket context
export const useSocket = () => {
    return useContext(socketContext);
};
