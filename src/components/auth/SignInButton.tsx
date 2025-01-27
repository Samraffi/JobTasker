// "use client"

// import { signIn } from "next-auth/react"

// export function SignInButton() {
//   const signInWithGitHub = async () => {
//     try {
//       console.log('Attempting to sign in with GitHub...')
//       const result = await signIn('github', { 
//         callbackUrl: '/',
//         redirect: true 
//       })
//       console.log('Sign in result:', result)

//       return result;
//     } catch (error) {
//       console.error('Sign in error:', error)
//     }
//   }

//   return (
//     <button
//       onClick={signInWithGitHub}
//       className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
//     >
//       <GithubIcon />
//       Sign in with GitHub
//     </button>
//   )
// }

// function GithubIcon() {
//   return (
//     <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
//       <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.163 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.161 22 16.419 22 12c0-5.523-4.477-10-10-10z" />
//     </svg>
//   )
// }

// components/auth/SignInButton.tsx
'use client';

import { signIn } from 'next-auth/react';
import { Github } from 'lucide-react';

export default function SignInButton() {
  const handleSignIn = async () => {
    try {
      console.log('Attempting to sign in with GitHub...');
      await signIn('github', {
        callbackUrl: '/',
        redirect: true,
      });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center gap-2 bg-[#24292F] text-white px-4 py-2 rounded-md hover:bg-[#24292F]/90 transition-colors"
    >
      <Github className="w-5 h-5" />
      Sign in with GitHub
    </button>
  );
}