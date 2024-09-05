import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from "react-router-dom";
import { changeLoginStatus } from '../features/login/loginSlice';

function Root(props) {
    const loggedIn = useSelector(state => state.login.loggedIn)
    const user = useSelector(state => state.login.user)

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/verify`, {withCredentials: true})
        .then(response => {
            // console.log(response.data)
            dispatch(changeLoginStatus({loggedIn: true, user: response.data}))
        })
        .catch(error => {
            dispatch(changeLoginStatus({loggedIn: false, user: null}))
        })
    }, [])

    return (
        <>
            <header className='flex flex-row justify-between p-6 shadow-lg shadow-indigo-500/50 fixed w-full bg-slate-300'>
                <a href="/"><h1 className='text-xl font-medium'>Library</h1></a>
                <nav>
                    <ul className='flex flex-row justify-between text-base font-normal gap-10'>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to="/books">Books</Link>
                        </li>
                        <li>
                            <Link to="/authers">Authers</Link>
                        </li>
                        {
                            loggedIn ? <li><Link to="/logout">Log out</Link>
                                       </li> : <li>
                                           <Link to="/login">Log in</Link>
                                       </li>
                        }
                    </ul>
                </nav>
                { loggedIn && <div className='flex flex-row justify-center items-center bg-slate-400 rounded-full  w-7 h-7 mr-3 text-center'>
                    <span className='font-medium '>{user.name.charAt(0)}</span>
                </div>}
            </header>
            <Outlet />
            <footer>
            </footer>
        </>
    );
}



export default Root;