import { useGetMessagesQuery, useSendMessageMutation } from "@/app/services/assistant";
import { authApi } from "@/app/services/auth";
import { setCredentials } from "@/app/services/slices/authSlice";
import { Widget, addResponseMessage, addUserMessage } from "react-chat-widget";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import ChatBot from "react-simple-chatbot";
import "react-chat-widget/lib/styles.css";

function ChatComponent() {
  useEffect(() => {
    dispatch(setCredentials({ user: cookies.user, token: cookies.token }));
  }, []);

  const { data, isLoading, isError, error } = useGetMessagesQuery();
  const [mutation, data_ ] = useSendMessageMutation()

  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["user", "token"]);
  const [chatWindowOpen, setChatWindowOpen] = useState(true);

  useMemo(() => {
    if (data) {
      data.data.forEach((m) => {
        if (m.role === "assistant") {
          return addResponseMessage(m.content);
        } else {
          return addUserMessage(m.content);
        }
      });
    }
  }, [data]);

  const handleToggle = (open) => {
    setChatWindowOpen((prev) => !prev);
  };
  const messages = data?.data?.map((m, i) => {
    const trigger = i === data.data.length - 1 ? m._id : data.data[i + 1]._id;
    return { id: m._id, message: m.content, user: m.role === "user", trigger };
  });

  const handleNewUserMessage = (newMessage: string) => {
    
    // Now send the message throught the backend API
  };

  if (isLoading) return <div>Loading...</div>;
  //   if (isError) return <div>{error}</div>;
  return (
    <Widget
      handleToggle={handleToggle}
      handleNewUserMessage={handleNewUserMessage}
    />
  );
}

export default ChatComponent;
