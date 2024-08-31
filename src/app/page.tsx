import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto py-8 max-w-screen-xl">
      <h1 className="text-2xl font-medium pb-2">
        Coal mine carbon footprint tracker
      </h1>
      <p>
        A web application to track the carbon footprint of coal mines and
        improve their sustainability.
      </p>
    </div>
  );
}
