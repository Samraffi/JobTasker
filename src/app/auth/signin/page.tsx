import { SignInButton } from "@/components/auth/SignInButton"

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to TaskJobber</h1>
        <p className="text-gray-600">Sign in to continue</p>
      </div>
      <SignInButton />
    </div>
  )
}