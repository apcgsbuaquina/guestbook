import { useState, useEffect } from 'react';
import GuestbookForm from './components/GuestbookForm';
import GuestbookList from './components/GuestbookList';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/guestbook';

function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      console.log('Fetching entries from:', API_URL);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error('Error fetching entries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleNewEntry = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] font-[Segoe_UI,Tahoma,sans-serif] flex flex-col items-center justify-center py-6 px-4">
      {/* Main window area */}
      <div className="w-full max-w-2xl">
        {/* Window frame */}
        <div className="border border-[#868686] bg-[#f5f5f5] shadow-[2px_2px_6px_rgba(0,0,0,0.15)]">
          {/* Window title bar */}
          <div className="bg-gradient-to-b from-[#bbd4ee] to-[#9ab7d6] px-3 py-1.5 border-b border-[#7a9cc0] flex items-center justify-between">
            <span className="text-[#1a3a5c] text-xs font-semibold">Guestbook - Sign and View Messages</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 border border-[#868686] bg-gradient-to-b from-[#e8e8e8] to-[#d0d0d0]" />
              <div className="w-3 h-3 border border-[#868686] bg-gradient-to-b from-[#e8e8e8] to-[#d0d0d0]" />
              <div className="w-3 h-3 border border-[#868686] bg-gradient-to-b from-[#e8e8e8] to-[#d0d0d0]" />
            </div>
          </div>

          {/* Window content */}
          <div className="p-4">
            <GuestbookForm onNewEntry={handleNewEntry} />

            {/* Separator */}
            <div className="my-4 border-t border-[#c0c0c0]" />

            <GuestbookList entries={entries} loading={loading} />
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-[#ececec] border border-t-0 border-[#868686] px-3 py-1 flex items-center justify-between">
          <span className="text-[#444] text-xs">{entries.length} message{entries.length !== 1 ? 's' : ''}</span>
          <span className="text-[#888] text-xs">Connected to Supabase</span>
        </div>
      </div>
    </div>
  );
}

export default App;
