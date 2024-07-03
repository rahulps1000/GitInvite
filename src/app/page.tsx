import Image from "next/image";
import styles from "./page.module.css";
import Logout from "@/components/Logout";
import { getServerSession } from "next-auth/next"

import { redirect } from "next/navigation";

const HomePage = async () => {
    const session = await getServerSession();

    if (!session?.user) redirect("/login");

    return (
        <div className="flex flex-col items-center m-4">
            <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
            <Image
                src={session?.user?.image!}
                alt={session?.user?.name!}
                width={72}
                height={72}
                className="rounded-full"
            />
            <Logout />
        </div>
    );
};

export default HomePage;
