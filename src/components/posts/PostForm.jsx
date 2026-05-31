// Props:
//   onSubmit — ถูกเรียกพร้อม { title, body, userId } เมื่อ form ถูก submit

import { useState } from 'react';

//   onCancel — ถูกเรียกเมื่อผู้ใช้กดยกเลิก
function PostForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubMitting] = useState(false);
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setErrors({
        title: !title.trim() ? 'Title is required' : '',
        body: !body.trim() ? 'Body is required' : '',
      });
      return;
    } else {
      onSubmit({ title, body, userId: 1 });
      setSubMitting(true);
    }
    setTitle('');
    setBody('');
  }

  return (
    // Overlay backdrop
    <div className="fixed inset-0 z-20 flex items-end justify-center bg-black/40 sm:items-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Form header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            Create New Post
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Title field */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 transition ${
                errors.title
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
              }`}
            />
            {/* TODO: แสดง error message นี้ เฉพาะเมื่อ errors.title มีค่า */}
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Body field */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Body <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Write your post content..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={`w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 transition ${
                errors.body
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
              }`}
            />
            {/* TODO: แสดง error message นี้ เฉพาะเมื่อ errors.body มีค่า */}
            {errors.body && (
              <p className="mt-1 text-xs text-red-500">{errors.body}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
