// Props:
//   value    — ค่า string ของ input ที่ควบคุมจาก state (controlled input)
//   onChange — callback ที่จะถูกเรียกพร้อม string ใหม่ทุกครั้งที่ผู้ใช้พิมพ์
function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      {/* Search icon */}
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        ⌕
      </span>

      <input
        type="text"
        placeholder="Search posts by title..."
        value={value ?? ''}
        onChange={
          // TODO: เรียก onChange พร้อมส่ง string จาก e.target.value
          // Hint: (e) => onChange(e.target.value)
          undefined
        }
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
      />

      {/* ปุ่ม Clear — แสดงเฉพาะเมื่อมีข้อความใน input */}
      {/* TODO: แสดงปุ่มนี้เฉพาะเมื่อ value ไม่ว่างเปล่า */}
      {/* เมื่อกด ให้เรียก onChange('') เพื่อล้างคำค้นหา */}
      {false && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
