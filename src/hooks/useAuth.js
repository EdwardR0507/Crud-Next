import { useState, useContext, createContext } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { endPoints } from "@services/api/index";

// This object is created bcs the api is not working for now
const fakeData = {
  email: "admin@mail.com",
  id: 3,
  name: "Admin",
  password: "admin123",
  role: "admin",
};

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);
  const options = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };

  const signIn = async (email, password) => {
    const {
      data: { access_token },
    } = await axios.post(
      endPoints.auth.login,
      {
        email,
        password,
      },
      options
    );
    if (access_token) {
      Cookie.set("token", access_token, { expires: 5 });
      axios.defaults.headers.Authorization = `Bearer ${access_token}`;
      const { data } = await axios.get(endPoints.auth.profile);
      setUser(fakeData);
    }
  };
  return {
    user,
    signIn,
  };
}
