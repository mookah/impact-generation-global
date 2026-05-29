import Image from "next/image";

export default function SchoolMinistryPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative h-[60vh] flex items-center justify-center text-white">
        <Image
          src="/images/school-ministry.jpg"
          alt="School Ministry"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold">School Ministry</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Guiding students toward purpose, faith, and wise life choices.
          </p>
        </div>
      </section>
    </main>
  );
}