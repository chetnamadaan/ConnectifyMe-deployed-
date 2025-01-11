import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./Authprovider"; 
import io from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => {
    return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null); 
    const [onlineUsers, setOnlineUsers] = useState([]); 
    const [authUser] = useAuth();

    useEffect(() => {
        if (authUser) {

            const socketInstance = io("http://localhost:3000", {
                query: {
                    userId: authUser.user._id, 
                },
            });

            setSocket(socketInstance); 

            socketInstance.on("getOnlineUsers", (users) => {
                setOnlineUsers(users); 
            });


            return () => {
                socketInstance.disconnect(); 
            };
        } else {
            if (socket) {
                setSocket(null);
            }
        }
    }, [authUser]); 

    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(socketContext);
};
