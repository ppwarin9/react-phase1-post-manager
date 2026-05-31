function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <span className="text-xs font-bold text-white">PM</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">PostManager</span>
        </div>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#" className="text-sm font-medium text-indigo-600">
            Dashboard
          </a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Users
          </a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Settings
          </a>
        </nav>

        {/* User avatar */}
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-gray-600 sm:block">Admin User</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
            A
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
