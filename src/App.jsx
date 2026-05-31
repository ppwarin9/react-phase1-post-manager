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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) throw new Error('HTTP' + res.status);
        const result = await res.json();
        setPosts(result);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // ── Event Handlers ─────────────────────────────────────────────────────────

  // TODO 4: handleSearch(query)
  // รับ string แล้ว setSearchQuery ด้วยค่านั้น
  // หมายเหตุ: SearchBar เรียก onChange(string) ไม่ใช่ onChange(event)
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // TODO 5: handleSelectPost(post)
  // รับ post object แล้วเก็บลง selectedPost state
  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  // TODO 6: handleCloseDetail()
  // reset selectedPost กลับเป็น null เพื่อปิด modal
  const handleCloseDetail = () => {
    setSelectedPost(null);
  };

  // TODO 7: handleDelete(id)
  // ขั้นตอน:
  //   1. เรียก DELETE https://jsonplaceholder.typicode.com/posts/{id}
  //      (JSONPlaceholder ไม่ลบข้อมูลจริง แต่ต้องเรียก API ด้วย)
  //   2. อัปเดต posts state โดยกรองเอา post ที่มี id ตรงออก
  //      Hint: setPosts((prev) => prev.filter(...))
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: 'DELETE',
        },
      );
      if (!res.ok) throw new Error('HTTP' + res.status);

      const result = await res.json();
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      setIsError(error.message);
    } finally {
      setLoading(false);
    }
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
    try {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPostData),
      });
      if (!res.ok) throw new Error('HTTP' + res.status);
      const result = await res.json();
      setPosts((prev) => [result, ...prev]);
      setShowForm(false);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <LoadingSpinner />}
      {isError && <ErrorMessage />}
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
            <SearchBar value={searchQuery} onChange={handleSearch} />
          </div>

          {/* TODO 10: ส่ง prop ให้ PostList ครบ
              - posts: ใช้ filteredPosts (ไม่ใช่ posts ดิบ)
              - onSelect: handler ที่เปิด modal รายละเอียด
              - onDelete: handler ที่ลบโพสต์ */}
          <PostList
            posts={filteredPosts}
            onSelect={handleSelectPost}
            onDelete={handleDelete}
          />

          {/* TODO 11 */}
          {selectedPost && (
            <PostDetail post={selectedPost} onClose={handleCloseDetail} />
          )}

          {/* TODO 12 */}
          {showForm && (
            <PostForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
