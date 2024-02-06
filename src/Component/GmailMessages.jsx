import React, { useEffect, useState } from "react";
import Gmail from "./Gmail";

const GmailMessages = ({ accessToken }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Use the Gmail module to fetch Gmail data
                const detailedMessages = await Gmail(accessToken);

                // Update the component state with the detailed messages
                setMessages(detailedMessages);
            } catch (error) {
                console.error("Error fetching Gmail data:", error);
            }
        };

        fetchMessages();
    }, [accessToken]);

    useEffect(() => {
        // Log the messages after they are updated
        console.log("Messages:", messages);
    }, [messages]);
    // console.log(Object.entries(messages.snippet))
    // const snippets = messages.map(message => message.payload.parts);
    // console.log("sni",snippets);

    const snippets = messages.map((message) => {
        if (message && message.payload && message.payload.parts) {
            return message.payload.parts.map((part) => {
                if (part && part.body && part.body.data) {
                    try {
                        // Decode the base64 data
                        const decodedData = atob(part.body.data);
                        console.log("decoo", decodedData)
                        return decodedData;

                    } catch (error) {
                        console.error("Error decoding Base64:", error);
                        return "Error decoding message.";
                    }
                } else {
                    return "No data available";
                }
            });
        } else {
            return ["No parts available"];
        }
    });

    // console.log("snippets", snippets);
    // console.warn(messages.payload);
    const bodyy = messages.map((message) => {
        if (message && message.payload && message.payload.body) {
            try {
                // Decode the base64 data
                const decodedData1 = atob(message.payload.body.data);
                console.log("bodyyy", decodedData1)
                return decodedData1;

            } catch (error) {
                console.error("Error decoding Base64:", error);
                return "Error decoding message.";
            }
        } else {
            return "No data available";
        }
    });



    // const faltu =messages?.payload?.body?.data;
    console.warn("bodyy", bodyy)
    return (
        <div>
            <h2>Gmail Messages</h2>
            <ul>
                {messages.length > 0 && messages.map((message) => (
                    <li key={message.id}>
                        <strong>Snippet:</strong> {message.snippet}

                    </li>
                ))}
            </ul>
            <h2>msgs</h2>

            <p>
                {snippets.map((innerArray, outerIndex) => (
                    <ul key={outerIndex}>
                        {innerArray.map((snippet, innerIndex) =>
                            snippet === "Error decoding message." ? null : (
                                <li key={innerIndex}>
                                    <strong>msgs:</strong>{snippet}
                                </li>
                            )
                        )}
                    </ul>
                ))}
            </p>




            <h3>faltu msgs</h3>
            <p>
            {bodyy.map((faltu, index) =>
              faltu === "Error decoding message." ? null : (
                <li key={index}>
                  <strong>faltuuuu</strong>{faltu}
                </li>
              )
            )}
          </p>
          
        </div>
    );

};

export default GmailMessages;



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
// console.log("snip",snippets);

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