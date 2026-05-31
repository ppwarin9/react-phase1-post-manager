const navItems = [
  { label: 'Dashboard', icon: '▦', active: false },
  { label: 'Posts', icon: '◧', active: true },
  { label: 'Comments', icon: '◫', active: false },
  { label: 'Albums', icon: '◨', active: false },
  { label: 'Users', icon: '◩', active: false },
];

function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-gray-200 bg-white md:block min-h-[calc(100vh-65px)]">
      <div className="p-4">
        {/* Stats summary */}
        <div className="mb-6 rounded-lg bg-indigo-50 p-3">
          <p className="text-xs font-medium text-indigo-600">Total Posts</p>
          <p className="mt-1 text-2xl font-bold text-indigo-900">100</p>
          <p className="text-xs text-indigo-500">from JSONPlaceholder</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
