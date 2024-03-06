
// import React, { useState } from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// import Gmail from "./Gmail"; // Import your Gmail module

// function Login() {
//   const [user, setUser] = useState([]);

//   const login = useGoogleLogin({
//     onSuccess: async (res) => {
//       const access_token = res.access_token;
//       console.log("response", res);
//       console.log("token", access_token);

//       // Use the Gmail module to fetch Gmail data
//       try {
//         const messages = await Gmail(access_token);

//         // Print the messages to the console
//         console.log("Gmail messages:", messages);

//         // Continue with your existing code or handle the messages data as needed
//         setUser({ name: res.data.name, picture: res.data.picture });

//         // Store access token in local storage
//         localStorage.setItem("access_token", access_token);
//         console.log("access token", access_token);

//         // Alert for successful login
//         alert("Login successfully");
//       } catch (error) {
//         console.error("Error fetching Gmail data:", error);

//         // Handle errors as needed
//         // For example, you can display an error message to the user
//       }
//     },
//     onError: (error) => {
//       console.error("Error during Google login:", error);

//       // Handle errors during login
//       // You can display an error message to the user
//     },
//     clientId :"252815931106-ghbote4aal4alf8643e3q0528bkrv46c.apps.googleusercontent.com", // Replace with your actual client ID
//     scope: "https://www.googleapis.com/auth/gmail.readonly", // Add the necessary scope
//   });

//   return (
//     <div>
//       <div className="text-center mt-5">
//         <div className="btn btn-outline-primary" onClick={() => login()}>
//           Sign in with Google
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


// Login.js
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import GmailMessages from "./GmailMessages";

const Login = () => {
  // const [user, setUser] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (res) => {
      const access_token = res.access_token;
      localStorage.setItem("access_token", access_token);
      console.log("response", res);
      console.log("token", access_token);

      // Update the component state with the access token
      setAccessToken(access_token);

      // Check if 'res.data' exists before accessing 'name'
      // if (res.data && res.data.name) {
      //   // Continue with your existing code or handle the detailed messages data as needed
      //   setUser({ name: res.data.name, picture: res.data.picture });
    
      //   console.log("access token", access_token);
      //   alert("Login successfully");
      // }
    },
    scope: "email profile openid https://www.googleapis.com/auth/gmail.readonly",
  });

  return (
    <div>
      <div className="text-center mt-5">
        <div className="btn btn-outline-primary">
         <button  onClick={() => login()}> Sign in with Google</button>
        </div>
      </div>

      {accessToken && <GmailMessages accessToken={accessToken} />}
    </div>
  );
};

export default Login;