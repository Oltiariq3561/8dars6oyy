import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\\.,;:\s@"]+(\.[^<>()[\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    function validate() {
        if (usernameRef.current.value.length < 3) {
            alert("Username is not valid!");
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = 'red';
            return false;
        }

        if (!validateEmail(emailRef.current.value)) {
            alert('Emailni togri yoz');
            emailRef.current.focus();
            emailRef.current.style.outlineColor = 'red';
        }

        if (passwordRef.current.value !== rePasswordRef.current.value) {
            alert("Parollar mos kelmadi!");
            passwordRef.current.focus();
            passwordRef.current.style.outlineColor = 'red';
            return false;
        }

        return true;
    }

    function handleRegister(event) {
        event.preventDefault();
        const valid = validate();
        if (!valid) {
            return;
        }

        const user = {
            "username": usernameRef.current.value,
            "email": emailRef.current.value,
            "password": passwordRef.current.value
        };

        fetch('https://auth-rg69.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'User registered successfully!') {
                    navigate('/login');
                }
                if (data.message === 'Failed! Username is already in use!' || data.message === 'Failed! Email is already in use!') {
                    alert(data.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md space-y-4">
                <input ref={usernameRef} type="text" placeholder="username..." className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input ref={emailRef} type="email" placeholder="email..." className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input ref={passwordRef} type="password" placeholder="password..." className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input ref={rePasswordRef} type="password" placeholder="re password..." className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={handleRegister} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" >REGISTER</button>
            </form>
        </div>
    );
}

export default Register;