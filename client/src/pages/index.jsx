
import { Inter } from 'next/font/google'
import { useState } from 'react'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [loginData, setLoginData] = useState();
    const [sessionData, setSessionData] = useState();
    const [logoutData, setLogoutData] = useState();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await axios.post("http://localhost:3000/api/session", { email, password }, { withCredentials: true })
        setLoginData(res.data)
    }

    async function getSessionData(e) {
        e.preventDefault();
        const res = await axios.get("http://localhost:3000/api/session", { withCredentials: true })
        setSessionData(res.data)
    }

    async function logout(e) {
        e.preventDefault();
        const res = await axios.delete("http://localhost:3000/api/session", { withCredentials: true })
        setLogoutData(res.data)
    }


    return (
        <div className='h-screen grid place-items-center bg-slate-200'>
            <div className='w-5/12 flex flex-col gap-5 p-20'>
                <form className='bg-white p-5 rounded-md shadow-md flex flex-col gap-3' onSubmit={handleSubmit}>
                    <h1 className='text-xl text-center'>LOGIN</h1>
                    <input type="email" placeholder='email' className='border-b border-zinc-500' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='password' className='border-b border-zinc-500' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='bg-green-500'>SUBMIT</button>
                    <div className="bg-zinc-200 p-2">{JSON.stringify(loginData)}</div>
                </form>

                <form className='bg-white p-5 rounded-md shadow-md flex flex-col gap-3' onSubmit={getSessionData}>
                    <h1 className='text-xl text-center'>Session</h1>
                    <button className='bg-green-500'>Get Session</button>
                    <div className="bg-zinc-200 p-2">{JSON.stringify(sessionData)}</div>
                </form>

                <form className='bg-white p-5 rounded-md shadow-md flex flex-col gap-3' onSubmit={logout}>
                    <h1 className='text-xl text-center'>Logout</h1>
                    <button className='bg-green-500'>Logout</button>
                    <div className="bg-zinc-200 p-2">{JSON.stringify(logoutData)}</div>
                </form>
            </div>

        </div>
    )


}
