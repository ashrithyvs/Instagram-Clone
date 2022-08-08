import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckUser = () => {
  const [user, setUser] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function findUser() {
      if (localStorage.getItem("accessToken")) {
        setUser(true);
        setLoading(false);
      } else {
        navigate("/login");
      }
    }
    findUser();
  }, []);
  return {
    user,
    setUser,
    isLoading,
  };
};

export default useCheckUser;
