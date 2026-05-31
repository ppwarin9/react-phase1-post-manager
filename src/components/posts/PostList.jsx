/* eslint-disable no-unused-vars */
import PostCard from './PostCard';

// Props:
//   posts    — array ของ post objects ทั้งหมด
//   onSelect — ส่งต่อให้ PostCard เพื่อเปิด modal รายละเอียด
//   onDelete — ส่งต่อให้ PostCard เพื่อลบโพสต์
function PostList({ posts, onSelect, onDelete }) {
  // TODO: ถ้า posts array ว่างเปล่า ให้ return EmptyState UI ด้านล่าง
  // Hint: if (posts.length === 0) return <EmptyState />

  return (
    <>
      {/* จำนวนผลลัพธ์ */}
      <p className="mb-4 text-sm text-gray-500">
        {/* TODO: แสดงจำนวน post ที่กำลัง render อยู่ */}
        {/* ตัวอย่าง: "Showing 12 posts" */}
      </p>

      {/* Grid ของ cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* TODO: loop ผ่าน posts แล้ว render PostCard ทีละตัว */}
        {/* Hint:
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            ))
        */}
      </div>
    </>
  );
}

// ── Empty State (แสดงเมื่อ posts array ว่างเปล่า) ─────────────────────────────
// TODO: return JSX นี้ใน PostList เมื่อ posts.length === 0
export function EmptyState({ searchQuery }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-24 text-center">
      <div className="mb-3 text-4xl">📭</div>
      <p className="text-base font-semibold text-gray-700">No posts found</p>
      <p className="mt-1 text-sm text-gray-400">
        {searchQuery
          ? `No results for "${searchQuery}". Try a different keyword.`
          : 'Create your first post using the button above.'}
      </p>
    </div>
  );
}

export default PostList;
