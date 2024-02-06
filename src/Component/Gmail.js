// import axios from 'axios';

// const gmailApiUrl = 'https://www.googleapis.com/gmail/v1/users/me/messages';

// // const token = localStorage.getItem(access_token)

// const Gmail = async (token) => {
//     const headers = { Authorization: `Bearer ${token}` };

//     try {
//         const response = await axios.get(gmailApiUrl, { headers });
//         return response.data.messages;
        
//     } catch (error) {
//         if (error.response && error.response.status === 401) {
//             console.error("Unauthorized access. Check the validity of the access token.");
//         } else {
//             console.error("Error Fetching Gmail data", error);
//         }
//         throw error;
//     }
// };

// export default Gmail;


// Gmail.js
import axios from 'axios';

const gmailApiUrl = 'https://www.googleapis.com/gmail/v1/users/me/messages';

const Gmail = async (token) => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
        const response = await axios.get(gmailApiUrl, { headers });
        const messageIds = response.data.messages.map((message) => message.id);

        // Fetch detailed information for each message
        const detailedMessages = await Promise.all(
            messageIds.map(async (messageId) => {
                const detailedResponse = await axios.get(`${gmailApiUrl}/${messageId}`, { headers });
                return detailedResponse.data;
            })
        );

        return detailedMessages;

    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized access. Check the validity of the access token.");
        } else {
            console.error("Error Fetching Gmail data", error);
        }
        throw error;
    }
};

export default Gmail;




// import React, { useEffect, useState } from "react";
// import Gmail from "./Gmail";

// const GmailMessages = ({ accessToken }) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         // Use the Gmail module to fetch Gmail data
//         const detailedMessages = await Gmail(accessToken);

//         // Update the component state with the detailed messages
//         setMessages(detailedMessages);
//       } catch (error) {
//         console.error("Error fetching Gmail data:", error);
//       }
//     };

//     fetchMessages();
//   }, [accessToken]);

//   useEffect(() => {
//     // Log the messages after they are updated
//     console.log("Messages:", messages);
//   }, [messages]);

//   const snippets = messages.map((message) => {
//     if (message && message.payload && message.payload.parts) {
//       return message.payload.parts.map((part) => {
//         if (part && part.body && part.body.data) {
//           return part.body.data;
//         } else {
//           return "No data available";
//         }
//       });
//     } else {
//       return ["No parts available"];
//     }
//   });

//   const decodedSnippets = snippets.map((snippet) => {
//     try {
//       return atob(snippet);
//     } catch (error) {
//       console.error("Error decoding Base64:", error);
//       return "Error decoding message.";
//     }
//   });

//   const htmlSnippets = decodedSnippets.map((snippet) => {
//     return <div dangerouslySetInnerHTML={{ __html: snippet }} />;
//   });

//   return (
//     <div>
//       <h2>Gmail Messages</h2>
//       <ul>
//         {messages.length > 0 && messages.map((message) => (
//           <li key={message.id}>
//             <strong>Snippet:</strong> {message.snippet}
//             <p>
//               <strong>Body:</strong> {htmlSnippets[messages.indexOf(message)]}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default GmailMessages;