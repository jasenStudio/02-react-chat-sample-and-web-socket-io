import { useNavigate } from "react-router-dom";

const ChatBody = ({
  messages,
  lastMessageRef,
  typingStatus,
}: {
  messages: any;
  lastMessageRef: any;
  typingStatus: any;
}) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message: any) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          {typingStatus.isTyping &&
            !typingStatus.msg.includes(localStorage.getItem("userName")) && (
              <p>{typingStatus.msg}</p>
            )}
        </div>
        <div ref={lastMessageRef}></div>
      </div>
    </>
  );
};

export default ChatBody;
