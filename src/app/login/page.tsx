
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

    if (session?.user) redirect("/");
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <h1 className="text-3xl my-3">Hey, time to Sign In</h1>
      <LoginForm />
    </div>
  );
}