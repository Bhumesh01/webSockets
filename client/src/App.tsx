import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket|null>(null);
  let messageRef = useRef<HTMLInputElement>(null);
  // we want that when the component first mounts the connect to the websocket server is made
  useEffect(()=>{
    const wss = new WebSocket("ws://localhost:8000");
    // event handlers
    // wss.onerror = ()=>{
      
    // }
    wss.onopen = ()=>{
      setSocket(wss);
    }
    wss.onclose = ()=>{
      alert("socket closed");
    }
    // whenever there's a message from the server call the following function:
    wss.onmessage = (ev)=>{
      alert(ev.data);
    }
    return  () => {
    wss.close();
  };
  }, [])
  function sendMessage(){
    if(!socket)return;
    socket?.send(`${messageRef.current?.value}`);
  }
  return (
    <div style={{fontSize: "20px", display: "flex", justifyContent: "center", placeItems: "center", fontWeight: "bold", gap: "5px"}}>
      <input ref={messageRef} style={{padding: "5px", fontSize: "20px"}} type='text' placeholder='Enter your message' />
      <button onClick={sendMessage} style={{color: "blue", border: "1px solid"}}>Send</button>
    </div>
  )
}

export default App
