// Props:
//   post     — { id, title, body, userId }
//   onSelect — ถูกเรียกพร้อม post object เมื่อผู้ใช้กดปุ่ม View Details
//   onDelete — ถูกเรียกพร้อม post.id เมื่อผู้ใช้กดปุ่ม Delete
function PostCard({ post, onSelect, onDelete }) {
  return (
    <div className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
      {/* User badge */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
          {post.userId}
        </div>
        <span className="text-xs text-gray-400">User {post.userId}</span>
        <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
          #{post.id}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 line-clamp-2 text-sm font-semibold capitalize text-gray-900 leading-snug">
        {post.title}
      </h3>

      {/* Body preview */}
      <p className="mb-4 line-clamp-3 flex-1 text-xs text-gray-500 leading-relaxed">
        {post.body}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
        <button
          onClick={
            // TODO: เรียก onSelect พร้อมส่ง post object เข้าไป
            // Hint: () => onSelect(post)
            undefined
          }
          className="flex-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
        >
          View Details
        </button>
        <button
          onClick={
            // TODO: เรียก onDelete พร้อมส่ง post.id เข้าไป
            // Hint: () => onDelete(post.id)
            // สำคัญ: ต้องเรียก e.stopPropagation() ด้วย เพื่อกัน event ไม่ให้ bubble ขึ้นไปที่ card
            undefined
          }
          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PostCard;
