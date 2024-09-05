import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-[1500px] px-2">
        <h1 className="mt-4 text-xl">Dashboard</h1>
        <Link href="/create-mine-form">
          <div className="flex max-w-40 flex-col items-center">
            <div className="relative mt-2 flex aspect-square w-full items-center justify-center rounded-md border">
              <div className="absolute h-[2px] w-1/4 rounded-full bg-secondary-foreground"></div>
              <div className="absolute h-[2px] w-1/4 rotate-90 rounded-full bg-secondary-foreground"></div>
            </div>
            <span>Add Data</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
