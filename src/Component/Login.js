import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import GmailMessages from "./GmailMessages";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";

const Login = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const login = useGoogleLogin({
    onSuccess: async (res) => {
      const access_token = res.access_token;
      localStorage.setItem("access_token", access_token);
      setAccessToken(access_token);
      console.log("response", res);
    },
    scope: "email profile openid https://www.googleapis.com/auth/gmail.readonly",
  });


  const logout = () => {
    localStorage.removeItem("access_token");
    setAccessToken(null);
    console.log("after logout", accessToken);
  };

  return (
    <div className="Container">
      <div>
        <div className="text-center mt-5">
          {!accessToken && (
            <div >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <FcGoogle style={{ minHeight: '25vh', minWidth: '30vh' }} />
              </div>

              <button className="btn btn-outline-primary" onClick={() => login()}> Sign in with Google</button>
            </div>
          )}

          {accessToken && (
            <div className="btn btn-outline-danger" style={{
              display: "flex",
              justifyContent: "center"
            }}>
            <div style={{display:"flex", justifyContent:"center"}}>
            <FcGoogle style={{minHeight:'25vh',minWidth:'30vh',cursor:'pointer'}} onClick={() => logout()}/>
            </div>
            
            </div>
          )}
        </div>

        {accessToken && <GmailMessages accessToken={accessToken} />}

      </div>
    </div>
  );
};

export default Login;
