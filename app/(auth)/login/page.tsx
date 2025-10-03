import { LoginWithCredentialsForm } from "@/components/auth/LoginWithCredentialsForm";

export default function LoginPage() {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center pb-24">
      <div className="w-[500px] text-center space-y-6 pb-12">
        <h1 className="text-header-2">
          Hi, Welcome back!
        </h1>
        <p className="text-sm text-muted-foreground/70">Please login to your command center</p>
      </div>
      <LoginWithCredentialsForm />
    </main>
  );
}
