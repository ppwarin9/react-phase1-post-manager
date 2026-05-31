/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import PostList from './components/posts/PostList';
import PostForm from './components/posts/PostForm';
import PostDetail from './components/posts/PostDetail';
import SearchBar from './components/ui/SearchBar';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorMessage from './components/ui/ErrorMessage';

function App() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [posts, setPosts] = useState([]); // posts ทั้งหมดที่ fetch มา
  const [loading, setLoading] = useState(false); // true ขณะกำลัง fetch
  const [isError, setIsError] = useState(null); // เก็บ Error object ถ้า fetch ล้มเหลว
  const [searchQuery, setSearchQuery] = useState(''); // คำค้นหาปัจจุบัน
  const [selectedPost, setSelectedPost] = useState(null); // post ที่เลือกเพื่อดู detail
  const [showForm, setShowForm] = useState(false); // toggle แสดง/ซ่อน PostForm

  // ── TODO 1: Fetch posts on mount ───────────────────────────────────────────
  // ขั้นตอน:
  //   1. setLoading(true) ก่อนเริ่ม fetch
  //   2. fetch จาก https://jsonplaceholder.typicode.com/posts
  //   3. ถ้า res.ok เป็น false → throw new Error (ใช้ template literal + res.status)
  //   4. แปลง response เป็น JSON แล้ว setPosts(...)
  //   5. catch: setIsError(error)
  //   6. finally: setLoading(false)  ← ต้องอยู่ใน finally เสมอ ไม่ใช่แค่ใน try
  useEffect(() => {
    const fetchData = async () => {
      // เขียนโค้ด fetch ที่นี่
    };
    fetchData();
  }, []);

  // ── TODO 2: Loading / Error guards ────────────────────────────────────────
  // ถ้า loading เป็น true  → return <LoadingSpinner />
  // ถ้า isError ไม่ใช่ null → return <ErrorMessage />

  // ── Derived state (ห้ามใส่ใน useState) ────────────────────────────────────
  // TODO 3: กรอง posts ตาม searchQuery (case-insensitive, เทียบจาก post.title)
  // ชื่อตัวแปร: filteredPosts
  // Hint: posts.filter((post) => post.title.toLowerCase().includes(...))
  const filteredPosts = posts;

  // ── Event Handlers ─────────────────────────────────────────────────────────

  // TODO 4: handleSearch(query)
  // รับ string แล้ว setSearchQuery ด้วยค่านั้น
  // หมายเหตุ: SearchBar เรียก onChange(string) ไม่ใช่ onChange(event)
  const handleSearch = (query) => {
    // เขียนโค้ดที่นี่
  };

  // TODO 5: handleSelectPost(post)
  // รับ post object แล้วเก็บลง selectedPost state
  const handleSelectPost = (post) => {
    // เขียนโค้ดที่นี่
  };

  // TODO 6: handleCloseDetail()
  // reset selectedPost กลับเป็น null เพื่อปิด modal
  const handleCloseDetail = () => {
    // เขียนโค้ดที่นี่
  };

  // TODO 7: handleDelete(id)
  // ขั้นตอน:
  //   1. เรียก DELETE https://jsonplaceholder.typicode.com/posts/{id}
  //      (JSONPlaceholder ไม่ลบข้อมูลจริง แต่ต้องเรียก API ด้วย)
  //   2. อัปเดต posts state โดยกรองเอา post ที่มี id ตรงออก
  //      Hint: setPosts((prev) => prev.filter(...))
  const handleDelete = async (id) => {
    // เขียนโค้ดที่นี่
  };

  // TODO 8: handleCreate(newPostData)
  // ขั้นตอน:
  //   1. POST ไปที่ https://jsonplaceholder.typicode.com/posts
  //      headers: { 'Content-Type': 'application/json' }
  //      body: JSON.stringify(newPostData)
  //   2. แปลง response เป็น JSON
  //   3. เพิ่ม post ใหม่ไว้ด้านหน้า array (prepend)
  //      Hint: setPosts((prev) => [createdPost, ...prev])
  //   4. ปิด form: setShowForm(false)
  const handleCreate = async (newPostData) => {
    // เขียนโค้ดที่นี่
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 max-w-7xl">
          {/* ── Page Header ── */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your posts — powered by JSONPlaceholder
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              + New Post
            </button>
          </div>

          {/* ── Search Bar ── */}
          {/* TODO 9: ส่ง prop onChange ให้ถูกต้อง
              - SearchBar รับ onChange เป็น function ที่รับ string (ไม่ใช่ event)
              - ใช้ handler ที่เขียนไว้ด้านบน */}
          <div className="mb-6">
            <SearchBar value={searchQuery} onChange={/* TODO */ undefined} />
          </div>

          {/* TODO 10: ส่ง prop ให้ PostList ครบ
              - posts: ใช้ filteredPosts (ไม่ใช่ posts ดิบ)
              - onSelect: handler ที่เปิด modal รายละเอียด
              - onDelete: handler ที่ลบโพสต์ */}
          <PostList
            posts={filteredPosts}
            onSelect={/* TODO */ undefined}
            onDelete={/* TODO */ undefined}
          />

          {/* TODO 11: แสดง PostDetail เฉพาะเมื่อ selectedPost ไม่ใช่ null
              Hint: {selectedPost && <PostDetail ... />}
              Props ที่ต้องส่ง: post, onClose */}

          {/* TODO 12: แสดง PostForm เฉพาะเมื่อ showForm เป็น true
              Hint: {showForm && <PostForm ... />}
              Props ที่ต้องส่ง: onSubmit, onCancel */}
        </main>
      </div>
    </div>
  );
}

export default App;
