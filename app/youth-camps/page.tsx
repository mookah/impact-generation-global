import Image from "next/image";

export default function YouthCampsPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative h-[60vh] flex items-center justify-center text-white">
        <Image
          src="/images/youth-camps.jpg"
          alt="Youth Camps"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold">Youth Camps</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Life-changing camps for faith, growth, and transformation.
          </p>
        </div>
      </section>
    </main>
  );
}