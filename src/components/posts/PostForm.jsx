// Props:
//   onSubmit — ถูกเรียกพร้อม { title, body, userId } เมื่อ form ถูก submit
//   onCancel — ถูกเรียกเมื่อผู้ใช้กดยกเลิก
function PostForm({ onSubmit, onCancel }) {
  // TODO 1: ประกาศ state สำหรับ `title` — ค่าเริ่มต้น: ''
  // TODO 2: ประกาศ state สำหรับ `body`  — ค่าเริ่มต้น: ''
  // TODO 3: ประกาศ state สำหรับ `submitting` — ค่าเริ่มต้น: false (ใช้แสดงสถานะ loading บนปุ่ม submit)
  // TODO 4: ประกาศ state สำหรับ `errors` — ค่าเริ่มต้น: {} (object สำหรับเก็บ error แต่ละ field)

  // TODO 5: handleSubmit(e)
  //   a. เรียก e.preventDefault() เพื่อป้องกันไม่ให้หน้าเว็บ reload
  //   b. Validate: title ต้องไม่ว่าง, body ต้องไม่ว่าง
  //      ถ้าข้อมูลไม่ผ่าน ให้ set errors state แล้ว return เลย (ไม่ส่ง form)
  //   c. Set submitting เป็น true
  //   d. เรียก onSubmit({ title, body, userId: 1 })
  //   e. Set submitting กลับเป็น false หลังเสร็จ

  return (
    // Overlay backdrop
    <div className="fixed inset-0 z-20 flex items-end justify-center bg-black/40 sm:items-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        {/* Form header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">Create New Post</h2>
          <button
            type="button"
            onClick={onCancel}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form body */}
        <form
          onSubmit={/* TODO: ผูก handleSubmit เข้ากับ form */undefined}
          className="px-6 py-5 space-y-4"
        >
          {/* Title field */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter post title..."
              value={/* TODO: ผูก title state เข้ากับ input นี้ */undefined}
              onChange={/* TODO: อัปเดต title state เมื่อผู้ใช้พิมพ์ */(e) => {}}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 transition ${
                false /* TODO: เปลี่ยนเป็น errors.title เพื่อแสดง border แดงเมื่อมี error */
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
              }`}
            />
            {/* TODO: แสดง error message นี้ เฉพาะเมื่อ errors.title มีค่า */}
            {false && (
              <p className="mt-1 text-xs text-red-500">{/* TODO: ใส่ errors.title ที่นี่ */}</p>
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
              value={/* TODO: ผูก body state เข้ากับ textarea นี้ */undefined}
              onChange={/* TODO: อัปเดต body state เมื่อผู้ใช้พิมพ์ */(e) => {}}
              className={`w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 transition ${
                false /* TODO: เปลี่ยนเป็น errors.body เพื่อแสดง border แดงเมื่อมี error */
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
              }`}
            />
            {/* TODO: แสดง error message นี้ เฉพาะเมื่อ errors.body มีค่า */}
            {false && (
              <p className="mt-1 text-xs text-red-500">{/* TODO: ใส่ errors.body ที่นี่ */}</p>
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
              disabled={false /* TODO: disable ปุ่มเมื่อ submitting เป็น true */}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {/* TODO: แสดง "Creating..." เมื่อ submitting เป็น true แทนที่จะแสดง "Create Post" */}
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
