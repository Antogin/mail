import {
  useHistory,
} from 'react-router-dom';

import { AuthContext } from '../context/auth';
import { useCallback, useContext, useEffect } from 'react';

function Login() {
  const { loginIn, getRealtors, realtors } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    getRealtors()
  }, [getRealtors])


  const onClick = useCallback(async (id) => {
    await loginIn(id)
    history.push(`/messages`);
  }, [history, loginIn])

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Chose a Realtor</h2>
      </header>
      <div className="p-3">
        <ul className="my-1">

          {realtors.map((realtor) => {
            return <li className="flex px-2 cursor-pointer realtor" key={realtor.id} onClick={() => onClick(realtor.id)}>
              <div className="w-9 h-9 rounded-full flex-shrink-0 bg-red-500 my-2 mr-3">
                <img src={realtor.logo} alt="Agency logo"/>
              </div>
              <div className="flex-grow flex items-center border-b border-gray-100 text-sm py-2">
                <div className="self-center">{realtor.name} </div>
              </div>
            </li>
          })}

        </ul>
      </div>
    </div>
  );
}

export default Login;