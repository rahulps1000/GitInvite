"use client"

import { signIn } from "next-auth/react"


const LoginForm = () => {
    return (
            <button onClick={() => signIn('github', {callbackUrl: '/'})}>
                Sign In With GitHub
            </button>
    );
};

export default LoginForm;