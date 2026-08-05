import Link from 'next/link';

export default function About() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 py-20 md:py-20 w-full">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-12 items-center md:items-start">
        {/* LEFT: Square Portrait */}
        <div className="flex justify-center md:justify-start flex-shrink-0">
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-60 lg:h-60 overflow-hidden border-2 border-[#e0e0e0] flex-shrink-0">
            <img
              src="/rishika.jpeg"
              alt="Rishika Miranda"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT: Text Content */}
        <div className="flex flex-col flex-1 md:min-w-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] leading-tight mb-6">
            Hi, I am Rishika
          </h2>
          <div className="space-y-4 text-[15px] text-[#3a3a3a] leading-relaxed font-light">
            <p>
              I'm a Bangalore-based architect and creative lead working across architecture, interiors, storytelling and experiential design. Architecture is how I make sense of the world.
            </p>
            <p>
              Over the years, that has led me far beyond buildings. Into interiors, furniture, travel, art, craft, culture and the many ways people shape the spaces around them. Much of my work takes shape through Kyrah Design Studio, while other interests find their way into writing, events, collaborations and the occasional side project. This website is a collection of projects, places and ideas that continue to inform how I think, design and create.
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <Link
              href="/about"
              className="text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#6b6b6b] transition-colors border-b border-[#1a1a1a] pb-1"
            >
              How I Got Here →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}