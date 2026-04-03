import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Register() {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        address: '',
        city: '',
        zipcode: ''
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()
        const{isLoggedIn}=useSelector(state=>state.user)
    
    useEffect(()=>{
    if(isLoggedIn) navigate('/')
    },[])

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/users/register', user)
            if (!response.data.error) {
                toast.success(response.data.message, {
                    position: "top-right"
                })
                navigate('/login')
            } else {
                toast.error(response.data.error, {
                    position: "top-right"
                })
            }
        } catch (error) {
            if (error?.response?.status === 422 || error?.response?.status === 500 || error?.response?.status === 401) {
                setError(error.response.data.error)
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
                            Register
                        </div>
                        <div className='card-body'>
                            <form className='mt-5' onSubmit={(e) => registerUser(e)}>
                                <div className='mb-3'>
                                    <input
                                        type='text'
                                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                                        name='username'
                                        id='username'
                                        placeholder='Username'
                                        className='form-control'
                                    />
                                </div>
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
                                    <input
                                        type='text'
                                        onChange={(e) => setUser({ ...user, address: e.target.value })}
                                        name='address'
                                        id='address'
                                        placeholder='Address'
                                        className='form-control'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <input
                                        type='text'
                                        onChange={(e) => setUser({ ...user, city: e.target.value })}
                                        name='city'
                                        id='city'
                                        placeholder='City'
                                        className='form-control'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <input
                                        type='text'
                                        onChange={(e) => setUser({ ...user, zipcode: e.target.value })}
                                        name='zipcode'
                                        id='zipcode'
                                        placeholder='Zip Code'
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

export default Register