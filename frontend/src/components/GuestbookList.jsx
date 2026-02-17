export default function GuestbookList({ entries, loading }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="py-6 text-center text-xs text-[#666]">
                Loading messages...
            </div>
        );
    }

    if (entries.length === 0) {
        return (
            <div className="py-6 text-center text-xs text-[#888]">
                No messages yet. Be the first to sign the guestbook.
            </div>
        );
    }

    return (
        <div>
            <fieldset className="border border-[#c0c0c0] p-3">
                <legend className="text-xs font-semibold text-[#333] px-1">Messages</legend>

                {/* List view header */}
                <div className="border border-[#c0c0c0]">
                    <div className="flex bg-gradient-to-b from-[#ffffff] to-[#e8e8e8] border-b border-[#c0c0c0] text-xs font-semibold text-[#333]">
                        <div className="min-w-[7rem] w-1/5 px-2 py-1 border-r border-[#c0c0c0]">Name</div>
                        <div className="flex-1 px-2 py-1 border-r border-[#c0c0c0]">Message</div>
                        <div className="min-w-[8rem] w-1/4 px-2 py-1">Date</div>
                    </div>

                    {/* Scrollable rows */}
                    <div className="max-h-80 overflow-y-auto bg-white">
                        {entries.map((entry, index) => (
                            <div
                                key={entry.id}
                                className={`flex text-xs border-b border-[#e8e8e8] last:border-b-0 hover:bg-[#cce4f7] ${index % 2 === 0 ? 'bg-white' : 'bg-[#f6f6f6]'
                                    }`}
                            >
                                <div className="min-w-[7rem] w-1/5 px-2 py-1.5 border-r border-[#e8e8e8] font-medium text-[#1a3a5c] break-all">
                                    {entry.name}
                                </div>
                                <div className="flex-1 px-2 py-1.5 border-r border-[#e8e8e8] text-[#333] break-words">
                                    {entry.message}
                                </div>
                                <div className="min-w-[8rem] w-1/4 px-2 py-1.5 text-[#888]">
                                    {formatDate(entry.created_at)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </fieldset>
        </div>
    );
}
