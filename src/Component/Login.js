import { getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { userRef } from '../Firebase/Firebase';
import bcrypt from 'bcryptjs';
import { AppState } from '../App';
const Login = () => {
    const UseAppstate = useContext(AppState);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        Mobile: "",
        Password: "",
    });

    const Login = async () => {
        setloading(true);
        try {
            const quer = query(userRef, where('Mobile', '==', form.Mobile))
            const querysnapshot = await getDocs(quer)
    
            let isUserMatched = false;
    
            querysnapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.Password, _data.Password);
    
                if (isUser) {
                    UseAppstate.setLogin(true);
                    UseAppstate.setUserName(_data.Uname);
                    swal({
                        title: 'Login Success',
                        icon: 'success',
                        buttons: false,
                        timer: 3000,
                    });
                    navigate('/');
                    isUserMatched = true;
                }
            });
    
            if (!isUserMatched) {
                // Password doesn't match, clear the password field
                setForm({ ...form, Password: '' });
    
                swal({
                    title: 'Password Does Not Match',
                    icon: 'error',
                    buttons: false,
                    timer: 3000,
                });
            }
    
            setloading(false);
        } catch (error) {
            swal({
                title: error.message,
                icon: 'error',
                buttons: false,
                timer: 3000,
            });
        }
    }
    

    const [loading, setloading] = useState(false);
    return (
        <div>
            <section class="text-gray-600 body-font relative">
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col text-center w-full mb-8">
                        <h1 class="text-6xl font-bold title-font mb-4 text-white">Login</h1>
                    </div>
                    <div class="lg:w-1/3 md:w-2/3 mx-auto">
                        <div class="flex flex-wrap -m-2">
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-2xl  text-white">Mobile No :</label>
                                    <input type="number"
                                        id="number"
                                        name="number"
                                        required
                                        value={form.Mobile}
                                        onChange={(e) => setForm({ ...form, Mobile: e.target.value })}
                                        class="w-full h-12 bg-transparent  rounded border border-gray-300 focus:border-red-500  focus:ring-2 focus:ring-red-200 text-xl outline-none text-white py-1 px-3  mt-2 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-2xl  text-white">Password:</label>
                                    <input type="password"
                                        id="pass"
                                        name="pass"
                                        required
                                        value={form.Password}
                                        onChange={(e) => setForm({ ...form, Password: e.target.value })}
                                        class="w-full h-12 bg-transparent  rounded border border-gray-300 focus:border-red-500  focus:ring-2 focus:ring-red-200 text-xl outline-none text-white py-1 px-3  mt-2 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <button onClick={Login} class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                                    {loading ? <TailSpin height={20} color='white' /> : 'Login'} </button>


                            </div>
                            <div className='flex mx-auto mt-5'>
                                <p className='text-xl text-white mr-3'>Do Not Have A Account ? </p>
                                <Link to={'/SignUp'}> <span className='text-2xl text-sky-300'>Sign Up</span></Link>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </div>
    )
}

export default Login
