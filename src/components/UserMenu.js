import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/auth';

function UserMenu() {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const history = useHistory()

  const { loginIn, getRealtors, realtor, realtors } = useContext(AuthContext);

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

  const onClick = useCallback(async (id) => {
    await loginIn(id)
    setDropdownOpen(false)
    history.push('/messages')
  }, [setDropdownOpen, history, loginIn])

  useEffect(() => {
    if (dropdownOpen) {
      getRealtors()
    }
  }, [dropdownOpen, getRealtors])

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
    <div className="relative inline-flex w-20">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center w-full"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img className="w-8 h-8 rounded-full" width="32" height="32" alt="User" src={realtor?.logo} />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium">
            <i className="mypro-icon mypro-icon-arrow-down text-white"></i>
          </span>
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

            {realtors
              .filter(({ id }) => id !== realtor.id)
              .map(realtor => {
                return (
                  <li key={realtor.id}>
                    <button
                      className="text-sm flex items-center py-1 px-3"
                      onClick={() => onClick(realtor.id)}
                    >
                      {realtor.name}
                    </button>
                  </li>)
              })}

          </ul>
        </div>

        : null
      }
    </div >
  )
}

export default UserMenu;