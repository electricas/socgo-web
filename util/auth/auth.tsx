import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import firebaseClient from "./firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any, context: any) => {
  firebaseClient();

  const [user, setUser] = useState<firebase.User | null>(null);
  const [userClaims, setUserClaims] = useState();

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", {});
        return;
      }
      const token = await user.getIdToken(true);
      setUser(user);
      nookies.set(undefined, "token", token, {
        maxAge: 3300,
      });
      firebase
        ?.auth()
        ?.currentUser?.getIdTokenResult()
        .then((idTokenResult) => {
          const { claims } = idTokenResult;
          setUserClaims(claims as any);
        });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, userClaims }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
