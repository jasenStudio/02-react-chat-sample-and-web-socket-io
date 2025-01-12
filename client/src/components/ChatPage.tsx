import { FC, useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

interface Props {
  socket: any;
  users?: Record<any, any>[];
}

const ChatPage: FC<Props> = ({ socket, users }) => {
  const [messages, setMessages] = useState<any>([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("messageResponse", (data: any) =>
      setMessages([...messages, data])
    );
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data: any) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    socket.on("noTypingResponse", (data: any) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket} users={users!} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          lastMessageRef={lastMessageRef}
          typingStatus={typingStatus}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
