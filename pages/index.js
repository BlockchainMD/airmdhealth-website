import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to AirMD Health. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="container">
      <header>AirMD Health</header>
      <main>
        <div className="chat-window">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              {m.content}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
          <button className="doctor-btn">Get Care Now</button>
        </div>
      </main>
      <style jsx>{`
        .container { display: flex; flex-direction: column; height: 100vh; background: #343541; color: #fff; }
        header { padding: 16px; font-weight: bold; font-size: 1.5rem; text-align: center; border-bottom: 1px solid #444; }
        main { flex: 1; display: flex; flex-direction: column; }
        .chat-window { flex: 1; overflow-y: auto; padding: 16px; }
        .message { margin-bottom: 12px; max-width: 80%; }
        .message.assistant { background: #444654; padding: 8px 12px; border-radius: 8px; }
        .message.user { background: #10a37f; padding: 8px 12px; border-radius: 8px; margin-left: auto; text-align: right; }
        .input-area { display: flex; padding: 16px; border-top: 1px solid #444; }
        .input-area input { flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #666; background: #40414f; color: #fff; }
        .input-area button { margin-left: 8px; padding: 8px 12px; border: none; border-radius: 4px; cursor: pointer; }
        .input-area button:hover { opacity: 0.9; }
        .input-area button:first-of-type { background: #10a37f; color: #fff; }
        .input-area .doctor-btn { background: #f59e0b; color: #000; }
      `}</style>
      <style jsx global>{`
        body { margin: 0; }
      `}</style>
    </div>
  );
}
