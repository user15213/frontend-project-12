import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels } from '../features/channels/channelsSlice';
import { fetchMessages } from '../features/messages/messagesSlice';

export default function Home() {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channels.items);
  const messages = useSelector(state => state.messages.items);
  const channelsStatus = useSelector(state => state.channels.status);
  const messagesStatus = useSelector(state => state.messages.status);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  if (channelsStatus === 'loading' || messagesStatus === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (channelsStatus === 'failed' || messagesStatus === 'failed') {
    return <div>Ошибка при загрузке данных.</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: 250, borderRight: '1px solid #ccc', padding: 16 }}>
        <h2>Каналы</h2>
        <ul>
          {channels.map(ch => (
            <li key={ch.id}>{ch.name}</li>
          ))}
        </ul>
      </aside>
      <main style={{ flex: 1, padding: 16 }}>
        <h2>Сообщения</h2>
        <ul>
          {messages.map(msg => (
            <li key={msg.id}>
              <strong>{msg.username}:</strong> {msg.body}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
