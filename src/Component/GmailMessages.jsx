import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base64 } from "js-base64";
import "./GmailMessages.css";

const GmailMessages = ({ accessToken }) => {
  const [userInfo, setUserInfo] = useState({});
  const [messages, setMessages] = useState([]);

  const getAttachments = async (messageId, attachmentId) => {
    const attachmentUrl = `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`;
    const headers = { Authorization: `Bearer ${accessToken}` };

    try {
      const response = await axios.get(attachmentUrl, { headers });
      const attachmentData = response.data.data;

      // Decode the base64-encoded attachment data
      const decodedAttachment = Base64.decode(attachmentData);

      // Display or download the attachment as needed
      console.log("Decoded Attachment Data:", decodedAttachment);

      // Example: Display the attachment content in a new window
      // window.open(`data:application/pdf;base64,${decodedAttachment}`);
    } catch (error) {
      console.error("Error fetching attachment:", error);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfoUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
      const headers = { Authorization: `Bearer ${accessToken}` };

      try {
        const response = await axios.get(userInfoUrl, { headers });
        setUserInfo(response.data);
        console.log("user", response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchMessages = async () => {
      const gmailApiUrl = "https://www.googleapis.com/gmail/v1/users/me/messages";
      const headers = { Authorization: `Bearer ${accessToken}` };

      try {
        const response = await axios.get(gmailApiUrl, { headers });
        // console.log("response",response);
        const messageIds = response.data.messages.map((message) => message.id);

        const detailedMessages = await Promise.all(
          messageIds.map(async (messageId) => {
            const detailedResponse = await axios.get(
              `${gmailApiUrl}/${messageId}`,
              { headers }
            );
            const detailedMessage = detailedResponse.data;
            console.log("Detailed Messages", detailedMessage);

            // Fetch attachments for each message
            if (detailedMessage.payload.parts) {
              detailedMessage.payload.parts.forEach((part) => {
                if (part.filename && part.filename.length > 0) {
                  getAttachments(detailedMessage.id, part.body.attachmentId);
                }
              });
            }
            return detailedMessage;
          })
        );

        setMessages(detailedMessages);
      } catch (error) { 
        if (error.response && error.response.status === 401) {
          console.error(
            "Unauthorized access. Check the validity of the access token."
          );
        } else {
          console.error("Error fetching Gmail data:", error);
        }
      }
    };

    fetchMessages();
    fetchUserInfo();
  }, [accessToken]);

  const getMessageBody = (message) => {
    try {
      const parts = message?.payload?.parts;
      let body = "";

      if (parts && parts.length > 0) {
        for (let part of parts) {
          if (part.mimeType === "text/plain" && part?.body?.data) {
            // Decode the base64-encoded text/plain body data
            body = Base64.decode(part.body.data);
          } else if (
            part.mimeType === "text/html" &&
            part.body &&
            part.body.data
          ) {
            // Decode the base64-encoded text/html body data
            body = Base64.decode(part.body.data);
            // You can choose to render the HTML content directly or use a library like DOMPurify to sanitize and render it safely
            // For simplicity, let's assume rendering the HTML content directly
            return <div dangerouslySetInnerHTML={{ __html: body }}></div>;
          }
        }
      }

      if (body) {
        return (
          <>
            {body}
            {/* Render attachments */}
            {message.payload.parts &&
              message.payload.parts.map((part, index) => (
                <div key={index}>
                  {part.filename && part.filename.length > 0 && (
                    <a
                      href={`data:${part.mimeType};base64,${part.body.data}`}
                      download={part.filename} >
                      Download Attachment
                    </a>
                  )}
                </div>
              ))}
          </>
        );
      } else if(message && message.payload && message.payload.body) {

        // If no parts are found, try to decode the entire body
        const data = Base64.decode(message.payload.body.data);
        // console.log("bodydata", data);
        return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
      } else {
        return "No message body available";
      }
    } catch (error) {
      console.error("Error parsing message body:", error);
    }
  };

  return (
    <>
      <div className="user-info">
        <h3 className="user-info__title">User Information:</h3>
        <p className="user-info__item">
          <strong>Name:</strong> {userInfo.name}
        </p>
        <p className="user-info__item">
          <strong>Email:</strong> {userInfo.email}
        </p>
        <p className="user-info__item">Profile Picture</p>
        <img
          className="user-info__picture"
          src={userInfo.picture}
          alt="profile"
        />
      </div>

      <div className="gmail-messages-container">
        <h2 className="gmail-messages-heading">Gmail Messages</h2>
        <ul className="gmail-messages-list">
          {messages.map((message) => (
            <li className="gmail-message" key={message.id}>
              <strong className="gmail-message-from">From:</strong>{" "}
              {
                message.payload.headers.find((header) => header.name === "From")
                  .value
              }
              <br /><br />
              <strong className="gmail-message-subject">Subject:</strong>{" "}
              {
                message.payload.headers.find(
                  (header) => header.name === "Subject"
                ).value
              }
              <br />
              <br />
              <strong className="gmail-message-snippets">Snippets:</strong>
              {""}
              {message.snippet}
              <br />
              <br />
              <strong className="gmail-message-body">Message Body:</strong>{" "}
              {getMessageBody(message)}
              <br />
            </li>
          ))}
        </ul>
        <br />
      </div>
    </>
  );
};

export default GmailMessages;
