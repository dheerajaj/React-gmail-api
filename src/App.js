// import React, { useState, useEffect } from 'react';
// import Gmail from './Component/Gmail';
// import Login from './Component/Login';

// // import jwt from 'jsonwebtoken';


// function App() {
//   const [accessToken, setAccessToken] = useState(null);
//   const [token, setToken] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [loadingMessages, setLoadingMessages] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (token) {
//       setLoadingMessages(true);
//       setError(null);

//       Gmail(token)
//         .then((response) => setMessages(response))
//         .then((response)=>console.log("in",response))
//         .catch((error) => {
//           setError(error);
//           console.error(error);
//         })
//         .finally(() => setLoadingMessages(false));
//     }
//   }, [token]);

//   const handleLoginSuccess = (response) => {
//     const accessToken = response?.credential;
//     console.log("accessToken:", accessToken);

//     // const decoded = jwt.decode(accessToken);
//     const [headerEncoded, payloadEncoded] = accessToken.split('.');
//     // Decode each part using base64 decoding
//     const decodeBase64 = (data) => {
//       const padding = '='.repeat((4 - (data.length % 4)) % 4);
//       const base64 = (data + padding).replace(/-/g, '+').replace(/_/g, '/');
//       return atob(base64);
//     };

//     const header = JSON.parse(decodeBase64(headerEncoded));
//     const payload = JSON.parse(decodeBase64(payloadEncoded));

//     console.log('Header:', header);
//     console.log('Payload:', payload);
//     const token = payload.jti;

//     if (token) {
//       setAccessToken(token);
//     } else {
//       console.error("Access token is missing in the login response:", response);
//     }
//   };



//   return (
//     <div>
//       {token ? (
//         <>
//           {loadingMessages ? (
//             <p>Loading messages...</p>
//           ) : error ? (
//             <p>Error fetching messages: {error.message}</p>
//           ) : (
//             <ul>
//               {messages.map((message) => (
//                 <li key={message.id}>{message.snippet}</li>
//               ))}
//             </ul>
//           )}
//           <button onClick={() => setToken(null)}>Logout</button>
//         </>
//       ) : (
//         <Login onSuccess={handleLoginSuccess} />
//       )}
//     </div>
//   );
// }

// // export default App;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Login from './Component/Login';


function App() {
  // const [accessToken, setAccessToken] = useState(null);
  // const [messages, setMessages] = useState([]);
  // const [loadingMessages, setLoadingMessages] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get('code');
  
  //   if (code) {
  //     // Handle the callback by exchanging the authorization code for tokens
  //     handleCallback(code);
  //   }
  // }, []);
  

  // const handleCallback = async (code) => {
  //   console.log("code",code);

  //   try {
  //     const response = await axios.get(`http://localhost:3001/callback?code=${code}`);
  //     console.log('Callback Response:', response.data);

  //     // Extract access token from the response
  //     const accessToken = response.data.accessToken;
  //     console.log('Access Token:', accessToken);
  //     setAccessToken(accessToken);
  //   } catch (error) {
  //     console.error('Error handling callback:', error);
  //     setError(error);
  //   }
  // };

  // useEffect(() => {
  //   if (accessToken) {
  //     setLoadingMessages(true);
  //     setError(null);

  //     axios
  //       .get('https://www.googleapis.com/gmail/v1/users/me/messages', {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       })
  //       .then((response) => setMessages(response.data.messages))
  //       .catch((error) => {
  //         setError(error);
  //         console.error('Error Fetching Gmail data', error);
  //       })
  //       .finally(() => setLoadingMessages(false));
  //   }
  // }, [accessToken]);

  
  // const handleLoginSuccess = (response) => {
  //   console.log('Login success response:', response);
  
  //   if (response.tokenObj && response.tokenObj.access_token) {
  //     const accessToken = response.tokenObj.access_token;
  //     const idToken = response.tokenObj.id_token;
      
  //     console.log('Access Token:', accessToken);
  //     console.log('ID Token:', idToken);
  
  //     setAccessToken(accessToken);
  //   } else {
  //     console.error('Access token not found in login response.');
  //   }
  // };
  

  return (
    // <div>
    //   {accessToken ? (
    //     <>
    //       {loadingMessages ? (
    //         <p>Loading messages...</p>
    //       ) : error ? (
    //         <p>Error fetching messages: {error.message}</p>
    //       ) : (
    //         <ul>
    //           {messages.map((message) => (
    //             <li key={message.id}>{message.snippet}</li>
    //           ))}
    //         </ul>
    //       )}
    //       <button onClick={() => setAccessToken(null)}>Logout</button>
    //     </>
    //   ) : (
    //     <Login />
    //   )}
    // </div>
    <div>
    <Login />
    </div>
  );
}

export default App;
