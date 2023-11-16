import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import swal from 'sweetalert';
import app from '../Firebase/Firebase'
import { addDoc } from 'firebase/firestore';
import { userRef } from '../Firebase/Firebase';
import bcrypt from 'bcryptjs';

const auth = getAuth(app);

const SignUp = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        Uname: "",
        Mobile: "",
        Password: "",
    });

    const [loading, setloading] = useState(false);
    const [otpSend, setOptSend] = useState(false);
    const [OTP, setOtp] = useState("");


    const generateRecaptha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
            },
        }, auth);
    }


    const requestOtp = () => {
        setloading(true);
        generateRecaptha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.Mobile}`, appVerifier)
            .then(conformationresult => {
                window.conformationresult = conformationresult;
                swal({
                    text: "OTP SEND",
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                });
                setOptSend(true);
                setloading(false);
            }).catch((error) => {
                console.log(error);
            })
    }
    const otpVerify = async () => {
        try {
            setloading(true);
            const confirmationResult = window.conformationresult;
            await confirmationResult.confirm(OTP);
            await Uploaddata();
            swal({
                text: "Successfully Registered",
                icon: "success",
                buttons: false,
                timer: 3000,
            });
            navigate('/Login');
        } catch (error) {
            console.log("OTP Confirmation Error:", error);
        } finally {
            setloading(false);
        }
    }


    const Uploaddata = async () => {
        try {
            const salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(form.Password, salt);
            await addDoc(userRef, {
                Uname: form.Uname,
                Password: hash,
                Mobile: form.Mobile
            });

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>

            <section class="text-gray-600 body-font relative">
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col text-center w-full mb-8">
                        <h1 class="text-6xl font-bold title-font mb-4 text-white">Create A Account </h1>
                    </div>
                    {otpSend ?
                        <>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-2xl  text-white">OTP:</label>
                                    <input
                                        type=''
                                        id="otp"
                                        name="otp"
                                        required
                                        value={OTP}
                                        onChange={(e) => setOtp(e.target.value)}
                                        class="w-full h-12 bg-transparent  rounded border border-gray-300 focus:border-red-500  focus:ring-2 focus:ring-red-200 text-xl outline-none text-white py-1 px-3  mt-2 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <button onClick={otpVerify} class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                                {loading ? <TailSpin height={20} color='white' /> : 'Conform OTP'} </button>

                        </>
                        : <>
                            <div class="lg:w-1/3 md:w-2/3 mx-auto">
                                <div class="flex flex-wrap -m-2">
                                    <div class="p-2 w-full">
                                        <div class="relative">
                                            <label for="name" class="leading-7 text-2xl  text-white">User Name:</label>
                                            <input type="text"
                                                id="Uname"
                                                name="Uname"
                                                required
                                                value={form.Uname}
                                                onChange={(e) => setForm({ ...form, Uname: e.target.value })}
                                                class="w-full h-12 bg-transparent  rounded border border-gray-300 focus:border-red-500  focus:ring-2 focus:ring-red-200 text-xl outline-none text-white py-1 px-3  mt-2 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
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
                                            <input type={'Password'}
                                                id="pass"
                                                name="pass"
                                                required
                                                value={form.Password}
                                                onChange={(e) => setForm({ ...form, Password: e.target.value })}
                                                class="w-full h-12 bg-transparent  rounded border border-gray-300 focus:border-red-500  focus:ring-2 focus:ring-red-200 text-xl outline-none text-white py-1 px-3  mt-2 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <button onClick={requestOtp} class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                                            {loading ? <TailSpin height={20} color='white' /> : 'Request OTP'} </button>


                                    </div>
                                    <div className='flex mx-auto mt-5'>
                                        <p className='text-xl text-white mr-3'>Already Create A Account ? </p>
                                        <Link to={'/Login'}> <span className='text-2xl text-sky-300'>Sign In</span></Link>
                                    </div>
                                    <div id='recaptcha-container'>

                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>

            </section>
        </div>
    )
}

export default SignUp
