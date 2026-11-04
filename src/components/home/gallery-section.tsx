const photos = [
  { src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85", alt: "Volunteers arranging donated food", label: "Food support" },
  { src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=85", alt: "Children learning together", label: "Education" },
  { src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=85", alt: "Hands holding a donation box", label: "Giving" },
  { src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=85", alt: "Hands planting a young tree", label: "Plantation" },
  { src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=900&q=85", alt: "Community members stacking hands", label: "Togetherness" },
];

export function GallerySection() {
  return (
    <section id="stories" className="section-padding scroll-mt-20 overflow-hidden bg-[#12352d] text-[#f6faf8]">
      <div className="container-shell">
        <div className="grid gap-6 border-b border-white/15 pb-9 lg:grid-cols-[1fr_0.5fr] lg:items-end">
          <div><p className="section-kicker text-[#9bd9c5]">Community stories</p><h2 className="section-heading text-balance mt-5">Proof that showing up changes things.</h2></div>
          <p className="max-w-md text-base leading-7 text-[#bdd0ca] lg:justify-self-end">From one street to the next, these are the moments that turn a group of strangers into a community.</p>
        </div>
        <div className="mt-8 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-12">
          {photos.map((photo, index) => (
            <figure key={photo.src} className={`group relative overflow-hidden rounded-2xl ${index === 0 ? "sm:row-span-2 lg:col-span-5" : "lg:col-span-3"} ${index === 1 ? "lg:col-span-4" : ""} ${index === 3 ? "lg:col-span-4" : ""} ${index === 4 ? "lg:col-span-3" : ""}`}>
              <img src={photo.src} alt={photo.alt} className="size-full object-cover transition duration-700 group-hover:scale-[1.035]" loading={index < 2 ? "eager" : "lazy"} decoding="async" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 to-transparent px-5 pb-5 pt-16 text-sm font-bold text-white"><span>{photo.label}</span><span className="text-xs text-white/65">0{index + 1}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
