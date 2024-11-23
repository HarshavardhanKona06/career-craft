import CraftInProgress from "@/components/sections/craft-in-progress";
import {Metadata} from "next";

export const metadata:Metadata = {
    title: "Networking",
}

export default function Home() {
    return (
        <main>
            <CraftInProgress />
        </main>
    );
}
