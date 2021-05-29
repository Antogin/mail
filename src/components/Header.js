import { Link } from 'react-router-dom';
import UserMenu from '../components/UserMenu';

function Header({
  sidebarOpen,
}) {
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">
            {sidebarOpen ? null : <Link to='/messages'>back</Link>}
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">         
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;