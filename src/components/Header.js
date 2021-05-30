import { Link } from 'react-router-dom';
import UserMenu from '../components/UserMenu';
import logo from './../assets/logo-meilleursagentspro-neg.svg'

function Header({
  sidebarOpen,
  unreadMessages
}) {
  return (
    <header className="sticky top-0 bg-blue-800 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">
            <Link to='/messages'>
              <img src={logo} />
            </Link>
            <span className="ml-4	inline-flex items-center rounded justify-center h-5 text-white bg-green-500 px-2">{unreadMessages}</span>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center border-l-2 h-full">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;