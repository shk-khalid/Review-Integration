import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ReviewReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reply: string) => void;
  existingReply?: string;
}

export function ReviewReplyModal({
  isOpen,
  onClose,
  onSubmit,
  existingReply,
}: ReviewReplyModalProps) {
  const [reply, setReply] = useState(existingReply || '');

  useEffect(() => {
    if (isOpen) {
      setReply(existingReply || '');
    }
  }, [isOpen, existingReply]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Reply to Review</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write your reply..."
            className="w-full h-32 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <div className="mt-4 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(reply)}
              disabled={!reply.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Submit Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}