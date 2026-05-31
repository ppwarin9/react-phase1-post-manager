# React Phase 1 — Post Manager Dashboard

A hands-on React training project. Build a **Post Manager Dashboard** using Vite + React + Tailwind CSS, consuming the [JSONPlaceholder](https://jsonplaceholder.typicode.com) API.

โปรเจกต์ฝึก React แบบลงมือทำ สร้าง **Post Manager Dashboard** ด้วย Vite + React + Tailwind CSS โดยดึงข้อมูลจาก [JSONPlaceholder](https://jsonplaceholder.typicode.com)

---

## Setup / วิธีติดตั้ง

```bash
pnpm install   # install dependencies / ติดตั้ง dependencies
pnpm dev       # start dev server at http://localhost:5173
```

---

## Allowed Tools / เครื่องมือที่ใช้ได้

| Allowed / ใช้ได้ | NOT Allowed / ห้ามใช้ |
|---|---|
| `useState` | axios |
| `useEffect` | TanStack Query |
| `props` | Zustand / Redux |
| `fetch` | React Hook Form |
| Array methods `.map()` `.filter()` `.find()` | React Router |
| Conditional rendering | Any other library |

---

## API Endpoints

| Method | URL | EN | TH |
|---|---|---|---|
| GET | `/posts` | Fetch all posts | ดึง post ทั้งหมด |
| POST | `/posts` | Create a new post | สร้าง post ใหม่ |
| DELETE | `/posts/:id` | Delete a post by id | ลบ post ตาม id |

Base URL: `https://jsonplaceholder.typicode.com`

> JSONPlaceholder does not persist data — simulate all changes in React state.  
> JSONPlaceholder ไม่ได้บันทึกข้อมูลจริง — ให้จำลองการเปลี่ยนแปลงใน React state แทน

---

## TODO Overview / ภาพรวม TODO ทั้งหมด

ทำตามลำดับนี้:

| Order | File | What to do (EN) | สิ่งที่ต้องทำ (TH) |
|---|---|---|---|
| 1 | `SearchBar.jsx` | Wire `onChange` handler | เชื่อม `onChange` handler |
| 2 | `App.jsx` | Compute `filteredPosts` (derived value) | คำนวณ `filteredPosts` (derived value) |
| 3 | `App.jsx` | `handleSearch` — update searchQuery | `handleSearch` — อัปเดต searchQuery |
| 4 | `App.jsx` | Wire SearchBar props | ผูก props ให้ SearchBar |
| 5 | `PostList.jsx` | Map posts → PostCard + empty state | Map posts → PostCard + empty state |
| 6 | `PostCard.jsx` | Wire View Details + Delete buttons | ผูกปุ่ม View Details และ Delete |
| 7 | `App.jsx` | `handleSelectPost` + `handleCloseDetail` | `handleSelectPost` + `handleCloseDetail` |
| 8 | `App.jsx` | Render PostDetail conditionally | แสดง PostDetail แบบ conditional |
| 9 | `PostDetail.jsx` | Backdrop click closes modal | คลิก backdrop เพื่อปิด modal |
| 10 | `PostForm.jsx` | State + validation + handleSubmit | State + validation + handleSubmit |
| 11 | `App.jsx` | `handleCreate` — POST new post | `handleCreate` — POST post ใหม่ |
| 12 | `App.jsx` | `handleDelete` — DELETE + update state | `handleDelete` — DELETE + อัปเดต state |
| 13 | `App.jsx` | Wire New Post button + PostForm + PostList | ผูกปุ่ม New Post + PostForm + PostList |

---

## Detailed TODO Guide / คู่มืออธิบาย TODO แต่ละข้อ

---

### `SearchBar.jsx`

#### TODO — `onChange` handler

**EN:** Every time the user types a character, call `onChange` with the new value from `e.target.value`. This makes the input "controlled" — its value is always driven by the state in `App.jsx`.

**TH:** ทุกครั้งที่ผู้ใช้พิมพ์ตัวอักษร ให้เรียก `onChange` พร้อมส่งค่าใหม่จาก `e.target.value` เข้าไป วิธีนี้ทำให้ input เป็น "controlled" — ค่าของมันถูกควบคุมด้วย state ใน `App.jsx` เสมอ

```jsx
// ก่อน (Before)
onChange={undefined}

// หลัง (After)
onChange={(e) => onChange(e.target.value)}
```

#### TODO — Clear button

**EN:** Show the clear `✕` button only when `value` is not an empty string. When clicked, call `onChange('')` to reset the search.

**TH:** แสดงปุ่ม `✕` เฉพาะเมื่อ `value` ไม่ว่างเปล่า เมื่อกดให้เรียก `onChange('')` เพื่อล้างคำค้นหา

```jsx
// ก่อน (Before)
{false && <button ...>✕</button>}

// หลัง (After)
{value && <button onClick={() => onChange('')}>✕</button>}
```

---

### `App.jsx`

#### TODO 8 — `filteredPosts` (derived value)

**EN:** Filter the `posts` array to keep only posts whose `title` contains the `searchQuery` string. This is a **derived value** — do NOT use `useState`. It is re-computed automatically every render.

**TH:** กรอง array `posts` เอาเฉพาะ post ที่ `title` มีคำตรงกับ `searchQuery` นี่คือ **derived value** — ห้ามใช้ `useState` เพราะ React จะคำนวณค่านี้ใหม่ทุก render โดยอัตโนมัติ

```js
const filteredPosts = posts.filter((post) =>
  post.title.toLowerCase().includes(searchQuery.toLowerCase())
);
```

> **ทำไม derived value ถึงดีกว่า state?**  
> ถ้าเก็บ `filteredPosts` ใน `useState` คุณต้องคอย sync มันทุกครั้งที่ `posts` หรือ `searchQuery` เปลี่ยน — นั่นคือ bug ที่รอเกิด ใช้ derived value แทนเพื่อให้ข้อมูลเป็น single source of truth เสมอ

---

#### TODO 9 — `handleSearch(query)`

**EN:** Receive a string `query` from SearchBar and update `searchQuery` state with it. When `searchQuery` changes, `filteredPosts` is automatically recomputed.

**TH:** รับ string `query` จาก SearchBar แล้วอัปเดต `searchQuery` state ด้วยค่านั้น เมื่อ `searchQuery` เปลี่ยน `filteredPosts` จะถูกคำนวณใหม่อัตโนมัติ

```js
const handleSearch = (query) => {
  setSearchQuery(query);
};
```

---

#### TODO 10 — `handleSelectPost(post)`

**EN:** Receive a full post object and store it in `selectedPost` state. Once `selectedPost !== null`, the `PostDetail` modal will appear.

**TH:** รับ post object ทั้งก้อนแล้วเก็บลง `selectedPost` state เมื่อ `selectedPost !== null` PostDetail modal จะปรากฏขึ้นมา

```js
const handleSelectPost = (post) => {
  setSelectPost(post);
};
```

---

#### TODO 11 — `handleCloseDetail()`

**EN:** Reset `selectedPost` back to `null`. This hides the `PostDetail` modal.

**TH:** Reset `selectedPost` กลับเป็น `null` ทำให้ PostDetail modal หายไป

```js
const handleCloseDetail = () => {
  setSelectPost(null);
};
```

---

#### TODO 12 — `handleDelete(id)`

**EN:** Two steps:
1. Call the DELETE API (JSONPlaceholder won't actually delete anything, but you still send the request).
2. Remove the post from `posts` state using `.filter()` so the UI updates immediately.

**TH:** ทำ 2 ขั้นตอน:
1. เรียก DELETE API (JSONPlaceholder ไม่ได้ลบจริง แต่ต้องส่ง request ไป)
2. ลบ post ออกจาก `posts` state ด้วย `.filter()` เพื่อให้ UI อัปเดตทันที

```js
const handleDelete = async (id) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
  });
  setPosts((prev) => prev.filter((post) => post.id !== id));
};
```

---

#### TODO 13 — `handleCreate(newPostData)`

**EN:** Three steps:
1. POST the new post data to JSONPlaceholder.
2. Receive the created post object back (will have `id: 101`).
3. Prepend that object to the front of `posts` array and close the form.

**TH:** ทำ 3 ขั้นตอน:
1. POST ข้อมูล post ใหม่ไปที่ JSONPlaceholder
2. รับ post object ที่สร้างกลับมา (จะมี `id: 101`)
3. เพิ่ม post นั้นไว้ด้านหน้า array `posts` แล้วปิด form

```js
const handleCreate = async (newPostData) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(newPostData),
    headers: { 'Content-Type': 'application/json' },
  });
  const created = await res.json();
  setPosts((prev) => [created, ...prev]);
  setShowForm(false);
};
```

---

#### Wire the UI

**EN:** Connect all the handlers and derived values to the JSX:

**TH:** เชื่อม handler และ derived value เข้ากับ JSX ทั้งหมด:

```jsx
{/* New Post button */}
<button onClick={() => setShowForm(true)}>+ New Post</button>

{/* SearchBar */}
<SearchBar value={searchQuery} onChange={handleSearch} />

{/* PostList — ส่ง filteredPosts ไม่ใช่ posts! */}
<PostList
  posts={filteredPosts}
  onSelect={handleSelectPost}
  onDelete={handleDelete}
/>

{/* PostDetail — แสดงเมื่อ selectedPost ไม่ใช่ null */}
{selectedPost && (
  <PostDetail post={selectedPost} onClose={handleCloseDetail} />
)}

{/* PostForm — แสดงเมื่อ showForm เป็น true */}
{showForm && (
  <PostForm
    onSubmit={handleCreate}
    onCancel={() => setShowForm(false)}
  />
)}
```

---

### `PostList.jsx`

#### TODO — Empty state

**EN:** If `posts.length === 0` (no results after filtering), render `<EmptyState>` instead of the grid.

**TH:** ถ้า `posts.length === 0` (ไม่มีผลลัพธ์หลังกรอง) ให้ render `<EmptyState>` แทน grid

```jsx
if (posts.length === 0) return <EmptyState searchQuery={searchQuery} />;
```

> **ปัญหาที่พบบ่อย:** คุณต้องรับ `searchQuery` เป็น prop ใน PostList ก่อน เพื่อส่งต่อให้ EmptyState แสดงข้อความที่ถูกต้อง

#### TODO — Results count

**EN:** Show the actual number of posts being displayed, e.g. `"Showing 12 posts"`.

**TH:** แสดงจำนวน post ที่กำลังแสดงอยู่จริง เช่น `"Showing 12 posts"`

```jsx
<p>Showing {posts.length} posts</p>
```

#### TODO — Map posts → PostCard

**EN:** Use `.map()` to render one `<PostCard>` per post. Always provide a `key` prop with a unique, stable value (use `post.id`).

**TH:** ใช้ `.map()` เพื่อ render `<PostCard>` หนึ่งตัวต่อหนึ่ง post ต้องใส่ `key` prop ด้วยค่าที่ unique และคงที่ (ใช้ `post.id`)

```jsx
{posts.map((post) => (
  <PostCard
    key={post.id}
    post={post}
    onSelect={onSelect}
    onDelete={onDelete}
  />
))}
```

---

### `PostCard.jsx`

#### TODO — View Details button

**EN:** When clicked, call `onSelect` with the full `post` object so `App.jsx` can store it in `selectedPost`.

**TH:** เมื่อกด ให้เรียก `onSelect` พร้อมส่ง `post` object ทั้งก้อน เพื่อให้ `App.jsx` เก็บลง `selectedPost`

```jsx
onClick={() => onSelect(post)}
```

#### TODO — Delete button

**EN:** When clicked, call `onDelete` with `post.id`. Also call `e.stopPropagation()` to prevent the click from bubbling up to the card (which would trigger `onSelect` at the same time).

**TH:** เมื่อกด ให้เรียก `onDelete` พร้อมส่ง `post.id` และต้องเรียก `e.stopPropagation()` ด้วย เพื่อป้องกัน event ไม่ให้ bubble ขึ้นไปที่ card (ซึ่งจะทำให้ `onSelect` ถูกเรียกพร้อมกัน)

```jsx
onClick={(e) => {
  e.stopPropagation();
  onDelete(post.id);
}}
```

---

### `PostDetail.jsx`

#### TODO — Backdrop click closes modal

**EN:** The outer `div` is the dark backdrop. Clicking it should close the modal. But clicking *inside* the white panel should NOT close it. Use `e.target === e.currentTarget` to check whether the click was on the backdrop itself.

**TH:** `div` ด้านนอกคือ backdrop สีดำ การคลิกที่มันควรปิด modal แต่การคลิก *ภายใน* panel สีขาวไม่ควรปิด modal ใช้ `e.target === e.currentTarget` เพื่อตรวจว่าคลิกที่ backdrop จริง ๆ

```jsx
onClick={(e) => {
  if (e.target === e.currentTarget) onClose();
}}
```

> **ทำไม `e.target === e.currentTarget`?**  
> `e.target` คือ element ที่ถูกคลิกจริง ๆ  
> `e.currentTarget` คือ element ที่ผูก event handler ไว้ (backdrop `div`)  
> ถ้าทั้งสองตัวเป็น element เดียวกัน แปลว่าผู้ใช้คลิกตรง backdrop ไม่ใช่ panel ด้านใน

---

### `PostForm.jsx`

#### TODO 1–4 — State declarations / ประกาศ state

**EN:** Declare four pieces of state using `useState`:

**TH:** ประกาศ state 4 ตัวด้วย `useState`:

| State | Initial value | Purpose (EN) | Purpose (TH) |
|---|---|---|---|
| `title` | `''` | Tracks the title input | เก็บค่าใน title input |
| `body` | `''` | Tracks the body textarea | เก็บค่าใน body textarea |
| `submitting` | `false` | True while the POST request is in-flight | `true` ระหว่างที่ POST request กำลังทำงาน |
| `errors` | `{}` | Object holding field-level validation errors | Object เก็บ error ของแต่ละ field |

```js
const [title, setTitle] = useState('');
const [body, setBody] = useState('');
const [submitting, setSubmitting] = useState(false);
const [errors, setErrors] = useState({});
```

#### TODO 5 — `handleSubmit(e)`

**EN:** Five steps in order:
1. `e.preventDefault()` — stop the browser from reloading the page.
2. Validate: if `title` is empty, add `{ title: 'Title is required' }` to `errors` and return early.
3. Validate: if `body` is empty, add `{ body: 'Body is required' }` to `errors` and return early.
4. `setSubmitting(true)` — disable the button.
5. Call `onSubmit({ title, body, userId: 1 })`, then `setSubmitting(false)`.

**TH:** ทำ 5 ขั้นตอนตามลำดับ:
1. `e.preventDefault()` — กันไม่ให้ browser reload หน้า
2. Validate: ถ้า `title` ว่าง ให้ set `errors` เป็น `{ title: 'Title is required' }` แล้ว `return` เลย
3. Validate: ถ้า `body` ว่าง ให้ set `errors` เป็น `{ body: 'Body is required' }` แล้ว `return` เลย
4. `setSubmitting(true)` — ปิดปุ่ม submit
5. เรียก `onSubmit({ title, body, userId: 1 })` แล้ว `setSubmitting(false)`

#### TODO — Wire inputs / เชื่อม inputs

**EN:** For each input/textarea, bind `value` to its state and `onChange` to its setter. Use `errors.title` and `errors.body` to conditionally show the red border and error message.

**TH:** สำหรับแต่ละ input/textarea ให้ผูก `value` กับ state และ `onChange` กับ setter ใช้ `errors.title` และ `errors.body` เพื่อแสดง border แดงและ error message แบบ conditional

```jsx
// Title input
value={title}
onChange={(e) => setTitle(e.target.value)}

// Body textarea
value={body}
onChange={(e) => setBody(e.target.value)}

// Error border
className={errors.title ? 'border-red-400 ...' : 'border-gray-300 ...'}

// Error message
{errors.title && <p className="text-red-500">{errors.title}</p>}

// Submit button
disabled={submitting}
```

---

## File Status / สถานะไฟล์

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx         ✅ Done
│   │   └── Sidebar.jsx        ✅ Done
│   ├── posts/
│   │   ├── PostList.jsx       🔧 TODO: map + empty state
│   │   ├── PostCard.jsx       🔧 TODO: button handlers
│   │   ├── PostDetail.jsx     🔧 TODO: backdrop click
│   │   └── PostForm.jsx       🔧 TODO: all state + logic
│   └── ui/
│       ├── SearchBar.jsx      🔧 TODO: onChange + clear button
│       ├── LoadingSpinner.jsx  ✅ Done
│       └── ErrorMessage.jsx   ✅ Done
├── App.jsx                    🔧 TODO: TODO 8–13 + JSX wiring
│                                ✅ Fetch + loading + error (Done)
├── main.jsx                   ✅ Done
└── index.css                  ✅ Done
```

---

## Difficulty Progression / ลำดับความยาก

```
Phase 1 → Basic CRUD + API fetch          ← อยู่ที่นี่ (You are here)
Phase 2 → Search / filter
Phase 3 → Form validation
Phase 4 → Component refactoring
Phase 5 → Performance (useMemo, useCallback)
Phase 6 → localStorage persistence
```

---

## After each TODO / หลังทำ TODO เสร็จแต่ละข้อ

ส่งโค้ดให้ Claude ตรวจ — คุณจะได้รับ:
1. **Code review** — จุดที่ต้องปรับ + bad practices
2. **React interview questions** — คำถามที่ interviewer มักถาม
3. **JS fundamentals questions** — closures, array methods, async/await
4. **Edge cases** — สิ่งที่ควรคิดถึงแต่มักลืม
5. **Next TODO** — โจทย์ถัดไป

---

## Tech Stack

- [Vite](https://vite.dev) v8
- [React](https://react.dev) v19
- [Tailwind CSS](https://tailwindcss.com) v4
