import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/allusers", {
          credentials: "include",
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        setAllUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error("Error in useGetAllUsers:", err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();

    return () => controller.abort();
  }, []);

  return [allUsers, loading, error];
}

export default useGetAllUsers;
