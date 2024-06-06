import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
const Lobby = () => {
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");

  const socket = useSocket();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", {
        roomId,
        email,
      });
    },
    [email, roomId, socket]
  );

  useEffect(()=>{
    socket.on("room:join", data => {
        console.log(`Data from BE ${data}`);
    });
  }, [socket])

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="room"
          required
        />
        <br />
        <label htmlFor="room">Room Id</label>
        <input
          type="text"
          name="room"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          id="room"
          required
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Lobby;
