// Props:
//   post    — { id, title, body, userId }
//   onClose — ถูกเรียกเมื่อผู้ใช้ปิด modal
function PostDetail({ post, onClose }) {
  // Guard: ถ้าไม่มี post ส่งเข้ามา ให้ render nothing
  // TODO: ทำไมถึงต้องมี guard นี้? post จะเป็น null ได้เมื่อไหร่?
  if (!post) return null;

  return (
    // Overlay backdrop
    <div
      className="fixed inset-0 z-20 flex items-end justify-center bg-black/40 sm:items-center p-4"
      onClick={
        // TODO: เรียก onClose เมื่อผู้ใช้คลิกที่ backdrop (พื้นหลังสีดำ) เท่านั้น
        // Hint: ตรวจสอบว่า e.target === e.currentTarget ก่อนเรียก onClose
        //       เพื่อกัน event ที่คลิกบน panel ด้านในไม่ให้ปิด modal
        undefined
      }
    >
      {/* Detail panel */}
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
              {post.userId}
            </div>
            <div>
              <p className="text-xs text-gray-400">Post #{post.id}</p>
              <p className="text-xs font-medium text-gray-600">User {post.userId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Panel body */}
        <div className="px-6 py-5">
          <h2 className="mb-3 text-lg font-semibold capitalize leading-snug text-gray-900">
            {post.title}
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">{post.body}</p>
        </div>

        {/* Panel footer */}
        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
            Edit Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
