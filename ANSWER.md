# Post Manager Dashboard — สรุปและ Interview Q&A

## สรุปสิ่งที่แก้ในเซสชันนี้

| ไฟล์ | Bug ที่พบ | วิธีแก้ |
|---|---|---|
| App.jsx | `LoadingSpinner` อยู่นอก `return` เลยไม่ render | ย้ายเข้าไปใน JSX return |
| App.jsx | `prev.filter(id)` — filter ไม่มี callback | เปลี่ยนเป็น `prev.filter((post) => post.id !== id)` |
| PostCard.jsx | `onSelect(post.id)` — ส่ง id แทน object ทั้งก้อน | เปลี่ยนเป็น `onSelect(post)` |
| PostList.jsx | Ternary condition กลับด้าน + EmptyState อยู่ใน `<p>` | ใช้ early return `if (posts.length === 0) return <EmptyState />` |
| PostDetail.jsx | `e.target === e.currentTarget` ไม่มี `if` เลย `onClose()` เรียกทุกครั้ง | เพิ่ม `if` ก่อนเรียก |
| PostForm.jsx | `setErrors(onCancel)` — ใส่ function เป็น error state | เปลี่ยนเป็น object `{ title: '...', body: '...' }` |
| PostForm.jsx | `errors(...)` — เรียก object เหมือน function | เปลี่ยนเป็น `errors.title &&` และ `errors.body &&` |
| PostForm.jsx | `{!submitting && 'Creating...'}` — logic กลับด้าน | เปลี่ยนเป็น ternary `submitting ? 'Creating...' : 'Create Post'` |
| SearchBar.jsx | `{false && ...}` — hardcode ซ่อน clear button | เปลี่ยนเป็น `{value && ...}` |

---

## Interview Q&A

---

### Q1: ทำไม JSX expression ที่เขียนนอก `return` ถึงไม่ render?

```js
// ❌ ไม่ render — อยู่ใน function body ปกติ
{
  loading && <LoadingSpinner />;
}

// ✅ render ได้ — อยู่ใน return
return (
  <div>
    {loading && <LoadingSpinner />}
  </div>
);
```

**คำตอบ:** React render เฉพาะ JSX ที่ถูก `return` ออกมาจาก component เท่านั้น
บล็อก `{}` ใน function body ปกติแค่ evaluate expression แล้วทิ้ง ไม่ได้ส่งอะไรให้ React เลย

---

### Q2: `Array.filter()` ต้องการ argument แบบไหน?

```js
// ❌ ผิด — ส่ง value ตรงๆ
posts.filter(id);          // filter ไม่รู้จะเปรียบเทียบยังไง → return []

// ✅ ถูก — ส่ง callback function
posts.filter((post) => post.id !== id);
```

**คำตอบ:** `.filter()` ต้องการ **callback function** ที่รับแต่ละ element แล้ว return `true/false`
ถ้าส่งค่าที่ไม่ใช่ function เข้าไป JavaScript จะ throw TypeError หรือ return array ว่าง

---

### Q3: `e.target` กับ `e.currentTarget` ต่างกันอย่างไร?

```jsx
<div onClick={(e) => {
  if (e.target === e.currentTarget) onClose(); // ปิดเฉพาะเมื่อคลิก backdrop
}}>
  <div className="modal-panel">
    ...คลิกตรงนี้ไม่ปิด...
  </div>
</div>
```

**คำตอบ:**
- `e.target` — element ที่ถูกคลิกจริงๆ (อาจเป็น child)
- `e.currentTarget` — element ที่ผูก event listener ไว้

เมื่อ user คลิก panel ด้านใน `e.target` = panel, `e.currentTarget` = backdrop → ไม่เท่ากัน → ไม่ปิด
เมื่อ user คลิก backdrop โดยตรง `e.target` = backdrop = `e.currentTarget` → ปิด

---

### Q4: ทำไม `{}` (empty object) ถึงเป็น truthy ใน JavaScript?

```js
// ❌ errors คือ {} — always truthy!
{errors && <p>{errors.body}</p>}   // แสดง <p></p> ตลอด

// ✅ เช็คที่ property แทน
{errors.body && <p>{errors.body}</p>}  // แสดงเฉพาะเมื่อ errors.body มีค่า
```

**คำตอบ:** JavaScript ถือว่า **ทุก object เป็น truthy** เสมอ ไม่ว่าจะว่างหรือไม่
ค่าที่เป็น falsy มีแค่: `false`, `0`, `''`, `null`, `undefined`, `NaN`
ดังนั้นต้องเช็คที่ property จริงๆ ที่ต้องการแทน

---

### Q5: Controlled Input ใน React คืออะไร?

```jsx
// Controlled — React เป็นเจ้าของค่า input
<input
  value={searchQuery}           // ค่ามาจาก state
  onChange={(e) => setSearchQuery(e.target.value)}  // อัปเดต state ทุกครั้งที่พิมพ์
/>
```

**คำตอบ:** Controlled Input คือ input ที่ค่าของมันถูกควบคุมโดย React state
ทุกการพิมพ์ → `onChange` → `setState` → React re-render → input แสดงค่าใหม่
ตรงข้ามกับ Uncontrolled Input ที่ DOM เก็บค่าเอง (ใช้ `ref` อ่านค่า)

---

### Q6: Early return pattern ใน React component คืออะไร และใช้เมื่อไหร่?

```jsx
function PostList({ posts }) {
  // Early return — return ก่อนถึง main render
  if (posts.length === 0) return <EmptyState />;

  return (
    <div>
      {posts.map(...)}
    </div>
  );
}
```

**คำตอบ:** Early return คือการ `return` JSX อื่นก่อนถึง main render เมื่อเงื่อนไขบางอย่างเป็นจริง
ใช้เมื่อ:
- ข้อมูลว่างหรือ null → แสดง empty state
- กำลัง loading → แสดง spinner
- เกิด error → แสดง error message

ข้อดีคือโค้ดชัดเจนกว่าการซ้อน ternary ใน JSX

---

### Q7: `try/catch/finally` ทำงานอย่างไรใน async function?

```js
const handleDelete = async (id) => {
  try {
    setLoading(true);
    const res = await fetch(...);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    setPosts((prev) => prev.filter((post) => post.id !== id));
  } catch (error) {
    setIsError(error.message);  // ทำงานเมื่อเกิด error ใดๆ ใน try
  } finally {
    setLoading(false);          // ทำงานเสมอ ไม่ว่าจะสำเร็จหรือล้มเหลว
  }
};
```

**คำตอบ:**
- `try` — รันโค้ดปกติ
- `catch` — ทำงานเมื่อเกิด error ใดๆ (network error, throw, parse error)
- `finally` — ทำงาน **เสมอ** ทั้งสำเร็จและล้มเหลว เหมาะสำหรับ cleanup เช่น `setLoading(false)`

---

### Q8: ทำไมต้อง `e.stopPropagation()` ในบางกรณี?

```jsx
// ใน PostCard
<button
  onClick={(e) => {
    e.stopPropagation();  // หยุดไม่ให้ event ลอยขึ้นไปที่ parent
    onDelete(post.id);
  }}
>
  Delete
</button>
```

**คำตอบ:** Event Bubbling คือพฤติกรรมที่ event ลอย (bubble) ขึ้นจาก child ไปหา parent ตามลำดับ
ถ้าไม่ stop ปุ่ม Delete กด → event ลอยขึ้น → parent รับ event → `onSelect` อาจถูกเรียกด้วย
`e.stopPropagation()` หยุดการ bubble ณ จุดนั้น

---

### Q9: `??` (Nullish Coalescing) ต่างจาก `||` อย่างไร?

```js
value ?? ''   // ใช้ '' เฉพาะเมื่อ value เป็น null หรือ undefined
value || ''   // ใช้ '' เมื่อ value เป็น falsy ทุกค่า (รวม 0, false, '')
```

**คำตอบ:**
- `||` — fallback เมื่อ left side เป็น **falsy** (0, '', false, null, undefined)
- `??` — fallback เฉพาะเมื่อ left side เป็น **null หรือ undefined** เท่านั้น

ใน SearchBar ใช้ `value ?? ''` เพราะถ้า value เป็น `''` (string ว่าง) ก็ยังต้องการใช้ `''` ไม่ใช่ fallback

---

### Q10: Conditional Rendering ใน React มีกี่วิธี?

```jsx
// 1. Short-circuit && — แสดงเมื่อ condition เป็น true
{isLoading && <Spinner />}

// 2. Ternary — มี 2 ทางเลือก
{isLoading ? <Spinner /> : <Content />}

// 3. Early return — return ก่อนถึง main JSX
if (!post) return null;

// 4. Variable — เก็บ JSX ในตัวแปร
const content = isLoading ? <Spinner /> : <Content />;
return <div>{content}</div>;
```

**คำตอบ:** มี 4 วิธีหลัก เลือกตามความเหมาะสม:
- `&&` — เมื่อมีแค่ทางเดียว (show/hide)
- ternary — เมื่อมี 2 ทาง
- early return — เมื่อ component ทั้งหมดควรแสดง UI อื่นแทน
- variable — เมื่อ logic ซับซ้อน อ่านยากถ้าอยู่ใน JSX

---

### Q11: Functional update ใน `setState` คืออะไร และเมื่อไหรควรใช้?

```js
// ❌ อาจผิดเมื่อ state อัปเดตหลายครั้งพร้อมกัน
setPosts([newPost, ...posts]);

// ✅ ใช้ functional update — รับ state ล่าสุดเสมอ
setPosts((prev) => [newPost, ...prev]);
```

**คำตอบ:** Functional update คือการส่ง callback เข้า `setState` แทนที่จะส่งค่าตรงๆ
React จะส่ง state ล่าสุด (prev) เข้า callback ให้เอง

ใช้เมื่อ:
- state ใหม่ขึ้นอยู่กับ state เก่า เช่น filter, append, toggle
- มีการ setState หลายครั้งติดกันใน function เดียว

ถ้าส่งค่าตรงๆ React อาจใช้ state ที่ capture ไว้ใน closure ซึ่งอาจเป็นค่าเก่าได้

---

### Q12: `useEffect` dependency array `[]` ทำงานอย่างไร?

```js
// ไม่มี dependency array — ทุกครั้งที่ re-render
useEffect(() => { ... });

// [] — ทำงานครั้งเดียวตอน mount (เหมือน componentDidMount)
useEffect(() => { ... }, []);

// [id] — ทำงานครั้งแรก และทุกครั้งที่ id เปลี่ยน
useEffect(() => { ... }, [id]);
```

**คำตอบ:**
- ไม่มี `[]` → run ทุก render (แทบไม่ใช้)
- `[]` → run ครั้งเดียวตอน component mount เหมาะสำหรับ fetch ข้อมูลครั้งแรก
- `[dep]` → run เมื่อ dep เปลี่ยนค่า React เปรียบเทียบด้วย `Object.is()`

โปรเจกต์นี้ใช้ `[]` เพราะต้องการ fetch posts แค่ครั้งเดียวตอนโหลด

---

### Q13: ทำไมห้าม mutate state โดยตรง?

```js
// ❌ mutate โดยตรง — React ไม่รู้ว่า state เปลี่ยน ไม่ re-render
posts.push(newPost);
setPosts(posts);

// ✅ สร้าง array ใหม่เสมอ
setPosts([newPost, ...posts]);
setPosts((prev) => prev.filter((post) => post.id !== id));
```

**คำตอบ:** React ตรวจสอบการเปลี่ยนแปลงด้วยการเปรียบเทียบ reference (`===`)
ถ้า mutate array/object เดิม reference ไม่เปลี่ยน → React คิดว่าไม่มีอะไรเปลี่ยน → ไม่ re-render
ต้องสร้าง array/object ใหม่เสมอเพื่อให้ reference เปลี่ยน

---

### Q14: `key` prop ใน `.map()` สำคัญอย่างไร?

```jsx
// ❌ ไม่มี key — React warning และ re-render ผิดพลาด
{posts.map((post) => <PostCard post={post} />)}

// ❌ ใช้ index เป็น key — ผิดเมื่อ list เปลี่ยนลำดับหรือลบ
{posts.map((post, i) => <PostCard key={i} post={post} />)}

// ✅ ใช้ id ที่ unique และคงที่
{posts.map((post) => <PostCard key={post.id} post={post} />)}
```

**คำตอบ:** React ใช้ `key` เพื่อระบุว่า element ไหนเปลี่ยน/เพิ่ม/ลบ ใน list
ถ้าไม่มี key React ต้อง re-render ทั้ง list ทุกครั้ง (ช้า และอาจ bug กับ form state)
`key` ต้อง unique ใน list นั้น และคงที่ (ไม่เปลี่ยนเมื่อ re-render)
ห้ามใช้ index เป็น key เมื่อ list มีการเพิ่ม/ลบ/เรียงลำดับ

---

### Q15: ทำไม `async` ใส่ตรงๆ ใน `useEffect` ไม่ได้?

```js
// ❌ ไม่ได้ — useEffect callback ต้องไม่ return Promise
useEffect(async () => {
  const data = await fetch(...);
}, []);

// ✅ สร้าง async function ข้างใน แล้วเรียก
useEffect(() => {
  const fetchData = async () => {
    const data = await fetch(...);
  };
  fetchData();
}, []);
```

**คำตอบ:** `useEffect` callback ควร return เฉพาะ cleanup function (หรือไม่ return อะไรเลย)
`async function` return `Promise` เสมอ → React จะได้รับ Promise แทน cleanup function → warning และ memory leak
วิธีแก้คือประกาศ async function ข้างในแล้วเรียกมันทันที ซึ่งเป็น pattern ที่ใช้ในโปรเจกต์นี้

---

### Q16: Lifting State Up คืออะไร?

```jsx
// ❌ ถ้า App ต้องรู้ searchQuery แต่เก็บไว้ใน SearchBar
function SearchBar() {
  const [query, setQuery] = useState(''); // ใครอื่นเข้าถึงไม่ได้
}

// ✅ ยก state ขึ้นไปที่ App แล้วส่งลงมาเป็น prop
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return <SearchBar value={searchQuery} onChange={setSearchQuery} />;
}
```

**คำตอบ:** เมื่อ component หลายตัวต้องใช้ state ร่วมกัน ให้ยก state ขึ้นไปที่ parent ที่ใกล้ที่สุดที่ครอบทั้งคู่
Parent เก็บ state และส่งลงมาเป็น props + callback
โปรเจกต์นี้ทำแบบนี้: `searchQuery` อยู่ใน `App` และส่งไปทั้ง `SearchBar` (รับ input) และ `PostList` (กรองผลลัพธ์)

---

### Q17: `<></>` (Fragment) ใช้เพื่ออะไร?

```jsx
// ❌ ต้องมี wrapper div ที่ไม่จำเป็น
return (
  <div>
    <p>Showing {posts.length} posts</p>
    <div className="grid">...</div>
  </div>
);

// ✅ Fragment ไม่สร้าง DOM node จริง
return (
  <>
    <p>Showing {posts.length} posts</p>
    <div className="grid">...</div>
  </>
);
```

**คำตอบ:** JSX ต้องมี root element เดียว Fragment (`<>...</>`) คือ wrapper ที่ไม่สร้าง DOM node จริง
ทำให้ไม่เพิ่ม element ที่ไม่จำเป็นใน HTML และไม่ทำให้ CSS layout เสีย

---

### Q18: `useState` initial value ทำงานอย่างไร?

```js
const [posts, setPosts] = useState([]);
//                                  ↑ initial value
```

**คำตอบ:** Initial value ถูกใช้แค่ **ครั้งแรก** ที่ component mount เท่านั้น
ทุก re-render ถัดไป React จะใช้ค่าล่าสุดของ state ไม่ใช่ initial value
ถ้า initial value คำนวณแพง สามารถส่ง function แทนได้ (lazy initialization): `useState(() => computeExpensiveValue())`

---

### Q19: component re-render เมื่อไหร่?

**คำตอบ:** Component re-render เมื่อ:
1. **State เปลี่ยน** — เรียก `setState` ด้วยค่าใหม่
2. **Props เปลี่ยน** — parent ส่ง props ค่าใหม่ลงมา
3. **Parent re-render** — ถ้า parent render ใหม่ child ก็ render ใหม่ตามด้วย (ถ้าไม่ได้ memo ไว้)

สิ่งที่ไม่ทำให้ re-render:
- เปลี่ยน local variable ปกติ (ไม่ใช่ state)
- `setState` ด้วยค่าเดิม (React เปรียบเทียบด้วย `Object.is()` และ bail out)

---

### Q20: Props ส่งข้อมูลได้ทิศทางไหน?

```jsx
// ✅ ส่งลงได้ (parent → child)
<PostCard post={post} onDelete={handleDelete} />

// ✅ ส่งขึ้นได้ผ่าน callback (child → parent)
function PostCard({ onDelete }) {
  return <button onClick={() => onDelete(post.id)}>Delete</button>;
}

// ❌ ส่งข้ามไม่ได้ (sibling → sibling โดยตรง)
// ต้อง lift state ขึ้นไปที่ parent ร่วมกันก่อน
```

**คำตอบ:** Props ไหลทางเดียว (one-way data flow) จาก parent ลง child เสมอ
การส่งข้อมูล child → parent ทำผ่าน callback function ที่ parent ส่งลงมาเป็น prop
React ออกแบบแบบนี้เพื่อให้ตามหาได้ว่า state เปลี่ยนมาจากไหน (predictable data flow)
