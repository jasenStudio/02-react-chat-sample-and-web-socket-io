interface Props {
  users: Record<any, any>[];
  socket: any;
}
const ChatBar = ({ users }: Props) => {
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.length > 0
            ? users.map((user) => <p key={user.socketID}>{user.userName}</p>)
            : "No hay usuario activos"}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
