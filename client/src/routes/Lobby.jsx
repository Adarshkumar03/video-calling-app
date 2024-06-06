import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";
const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoomId] = useState("");
  const navigate = useNavigate();
  const socket = useSocket();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", {
        room,
        email,
      });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback((data)=>{
    const {room} = data;
    navigate(`/room/${room}`)
  }, [navigate]);

  useEffect(()=>{
    socket.on("room:join", handleJoinRoom);
    return () => {socket.off("room:join", handleJoinRoom)}
  }, [socket, handleJoinRoom])

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
          value={room}
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
