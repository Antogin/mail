import { useState, useRef, useEffect } from 'react';

function UserMenu() {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img className="w-8 h-8 rounded-full" width="32" height="32" alt="User" />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium">Acme</span>
        </div>
      </button>
      {dropdownOpen ?
        <div
          className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border py-1.5 shadow-lg overflow-hidden mt-1"

          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <ul>
            <li>
              <button
                className="text-sm flex items-center py-1 px-3"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                User 1
              </button>
            </li>
            <li>
              <button
                className="text-sm flex items-center py-1 px-3"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                User 2
              </button>
            </li>
          </ul>
        </div>

        : null}
    </div>
  )
}

export default UserMenu;