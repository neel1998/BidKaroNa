import React,  {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [ loading, setLoading ] = useState(false);
    return (
        <div className="w-full h-screen bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex justify-center items-center">
            <div className="w-96 bg-white shadow-lg">
                <div className="m-5">
                    <label className="block text-xl font-bold mb-2">Email</label>
                    <input
                        //value={email}
                        //onChange={e => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        className="border-grey-200 border-2 rounded w-full p-2 h-10"
                    />
                </div>
                <div className="m-5">
                    <label className="block text-xl font-bold mb-2">Password</label>
                    <input
                        //value={password}
                        //onChange={e => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        className="border-grey-200 border-2 rounded w-full p-2 h-10"
                    />
                </div>
                <div className="m-5">
                    <button
                        //onClick={onLogin}
                        className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-200 text-white px-10 py-2 rounded text-xl font-bold"
                    >
                        {loading ? 'Logging you in ...' : 'Login'}
                    </button>
                </div>
                <div className="m-5">
                    <Link to="/signup">
                        Don't have an account?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;