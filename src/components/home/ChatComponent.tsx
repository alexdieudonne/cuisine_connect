import { useGetMessagesQuery } from "@/app/services/assistant";
import React, { useCallback } from "react";
import ChatBot from "react-simple-chatbot";

function ChatComponent() {
  const { data, isLoading, isError, error } = useGetMessagesQuery();

  useCallback(() => {
    console.log(data);
  }, [data]);

  const messages =
    data?.data?.map((m, i) => ({
      id: m._id,
      message: m.content,
      trigger: i,
    })) ?? steps;
  if (isLoading) return <div>Loading...</div>;
  //   if (isError) return <div>{error}</div>;
  return (
    <div className="fixed bottom-0 right-2">
      <ChatBot steps={messages} />
    </div>
  );
}

const steps = [
  {
    id: "0",
    message: "Welcome to react chatbot!",
    trigger: "1",
  },
  {
    id: "1",
    message: "Bye!",
    end: true,
  },
];

export default ChatComponent;
