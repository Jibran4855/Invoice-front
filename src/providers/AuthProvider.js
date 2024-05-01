import React, { useState, useEffect } from "react";
import Auth from "helpers/auth";
import { AuthServices } from "services/auth";
import { useSelector } from "react-redux";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [isRefreshUser, setIsRefreshUser] = useState(true);
  const isAuthorized = useSelector((state) => state.auth.loggedIn)

  useEffect(() => {
    const checkAuth = async () => {
      if (isRefreshUser) {
        let authUser = await AuthServices.getAuthUser();
        authUser.data.sessionExpire = Auth.checkTokenValid();
        setCurrentUser(authUser.data);
        setIsRefreshUser(false)
      }
    };
    checkAuth();
  }, [isAuthorized, isRefreshUser]);

  return (
    <AuthContext.Provider value={{ currentUser, refreshUser: setIsRefreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
