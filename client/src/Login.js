import React,  {useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Login = ({ history }) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const onLogin = () => {
        setLoading(true)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem('token', userCredential._tokenResponse.idToken);
                history.push("/home")
            })
            .catch(e => alert(e.message))
            .finally(() => setLoading(false))
    }

    return (
        <div className="w-full h-screen bg-gradient-to-r from-blue-100 via-blue-300 to-purple-500 flex justify-center items-center">
            <div className="w-96 bg-white shadow-lg">
                <div className="m-5">
                    <label className="block text-xl font-bold mb-2">Email</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        className="border-grey-200 border-2 rounded w-full p-2 h-10"
                    />
                </div>
                <div className="m-5">
                    <label className="block text-xl font-bold mb-2">Password</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        className="border-grey-200 border-2 rounded w-full p-2 h-10"
                    />
                </div>
                <div className="m-5">
                    <button
                        onClick={onLogin}
                        className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 text-black px-10 py-2 rounded text-xl font-bold"
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