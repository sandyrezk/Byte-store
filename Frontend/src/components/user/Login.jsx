import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// ✅ import الـ actions
import { setCurrentUsser, setLoggedInOut, setToken } from '../../redux/slices/userSlice'

function Login() {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const{isLoggedIn}=useSelector(state=>state.user)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

useEffect(()=>{
if(isLoggedIn) navigate('/')
},[])




    const loginUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/users/login', user)
            
            // ✅ لو الـ request نجح
            toast.success('Logged in successfully', {
                position: "top-right"
            })
            localStorage.setItem('currentToken', JSON.stringify(response.data.token))
            dispatch(setLoggedInOut(true))
            dispatch(setToken(response.data.token))
            dispatch(setCurrentUsser(response.data.user))
            navigate('/')

        } catch (error) {
            // ✅ لو في error
            if (error?.response?.status === 422 || 
                error?.response?.status === 500 || 
                error?.response?.status === 401) {
                setError(error.response.data.error)
                toast.error(error.response.data.error, {
                    position: "top-right"
                })
            }
        }
    }

    return (
        <div className='container'>
            <div className='row my-5'>
                <div className='col-md-6 mx-auto'>
                    {error && (
                        <div className="alert alert-danger my-2">
                            {error}
                        </div>
                    )}
                    <div className='card'>
                        <div className='card-header text-center mt-2 bg-white'>
                            Login
                        </div>
                        <div className='card-body'>
                            <form className='mt-5' onSubmit={(e) => loginUser(e)}>
                                <div className='mb-3'>
                                    <input
                                        type='email'
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        name='email'
                                        id='email'
                                        placeholder='Email'
                                        className='form-control'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <input
                                        type='password'
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        name='password'
                                        id='password'
                                        placeholder='Password'
                                        className='form-control'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <button type='submit' className='btn btn-primary'>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login