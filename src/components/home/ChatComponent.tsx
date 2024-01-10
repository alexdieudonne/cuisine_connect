import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/app/services/assistant";
import { authApi } from "@/app/services/auth";
import { setCredentials } from "@/app/services/slices/authSlice";
import {
  Widget,
  addResponseMessage,
  addUserMessage,
  toggleMsgLoader,
} from "react-chat-widget";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import ChatBot from "react-simple-chatbot";
import "react-chat-widget/lib/styles.css";
import Message from "@/types/message";
import { BaseResp } from "@/types/base";

function ChatComponent() {
  useEffect(() => {
    dispatch(setCredentials({ user: cookies.user, token: cookies.token }));
  }, []);

  const { data, isLoading, isError, error } = useGetMessagesQuery();
  const [mutation, data_] = useSendMessageMutation();

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
    toggleMsgLoader();
    mutation({ prompt: newMessage }).then((res) => {
      toggleMsgLoader();
      if ((res as { data: BaseResp<Message> }).data) {
        addResponseMessage(
          (res as { data: BaseResp<Message> }).data.data.content
        );
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  //   if (isError) return <div>{error}</div>;
  return (
    <Widget
      Title="Chat with us"
      subtitle="We are here to help you cooking"
      handleToggle={handleToggle}
      handleNewUserMessage={handleNewUserMessage}
    />
  );
}

export default ChatComponent;
