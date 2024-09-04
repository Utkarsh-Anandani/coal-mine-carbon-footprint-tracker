import Image from "next/image";
import Navbar from "./components/Navbar";
import MiningForm from "./components/Miningform";
export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="mt-[5%]">
      <MiningForm />
    </div>
    
    </>
  );
}
