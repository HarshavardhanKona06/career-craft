import CraftInProgress from "@/components/sections/craft-in-progress";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Applications",
}

export default function Home() {
    return (
        <main>
            <CraftInProgress />
        </main>
    );
}
