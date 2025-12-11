'use client';

export default function VideoHero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto max-h-screen object-contain"
      >
        <source src="/images/MindVideo_20251209210325_311.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
      {/* Overlay optionnel pour améliorer la lisibilité si nécessaire */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
    </section>
  );
}

