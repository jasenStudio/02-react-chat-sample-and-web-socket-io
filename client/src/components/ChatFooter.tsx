import React, { useState, useEffect, useRef } from "react";

interface Props {
  socket: any;
}

const ChatFooter = ({ socket }: Props) => {
  const [message, setMessage] = useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", {
        msg: `${localStorage.getItem("userName")} is typing`,
        isTyping: true,
      });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("no-typing", {
        msg: `${localStorage.getItem("userName")} is not typing`,
        isTyping: false,
      });
    }, 1000);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName")!,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id!,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage} method="POST">
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
        />
        <button className="sendBtn" type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
