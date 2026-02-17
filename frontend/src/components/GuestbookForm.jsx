import { useState } from 'react';

const API_URL = 'http://localhost:3000/guestbook';

export default function GuestbookForm({ onNewEntry }) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to submit');
            }

            const newEntry = await res.json();
            setName('');
            setMessage('');
            onNewEntry(newEntry);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Group box */}
            <fieldset className="border border-[#c0c0c0] p-3">
                <legend className="text-xs font-semibold text-[#333] px-1">Leave a Message</legend>

                {error && (
                    <div className="mb-3 p-2 bg-[#fff0f0] border border-[#e0a0a0] text-[#cc0000] text-xs">
                        {error}
                    </div>
                )}

                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <label htmlFor="name" className="text-xs text-[#333] w-16 shrink-0">
                            Name:
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="flex-1 px-2 py-1 text-sm bg-white border border-[#a0a0a0] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] focus:outline-none focus:border-[#3a6ea5] text-[#222]"
                        />
                    </div>

                    <div className="flex items-start gap-2">
                        <label htmlFor="message" className="text-xs text-[#333] w-16 shrink-0 pt-1">
                            Message:
                        </label>
                        <textarea
                            id="message"
                            placeholder="Write something..."
                            rows={3}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="flex-1 px-2 py-1 text-sm bg-white border border-[#a0a0a0] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] focus:outline-none focus:border-[#3a6ea5] text-[#222] resize-none"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-1 text-xs bg-gradient-to-b from-[#f0f0f0] to-[#dcdcdc] border border-[#a0a0a0] text-[#222] shadow-[1px_1px_2px_rgba(0,0,0,0.1)] hover:from-[#e8e8e8] hover:to-[#d0d0d0] active:from-[#d0d0d0] active:to-[#c0c0c0] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}
