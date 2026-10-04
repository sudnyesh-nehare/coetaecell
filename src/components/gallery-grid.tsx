import { assets } from '@/content/site';
import { ImagePanel } from './ui';
export function GalleryGrid() {
  return (
    <div className="gallery-grid">
      {[assets.collaboration, assets.ideas, assets.workshop].map((image, i) => (
        <ImagePanel
          key={image.src}
          image={image}
          className={`gallery-image gallery-image-${i}`}
          sizes="(max-width: 680px) 85vw, 33vw"
        />
      ))}
    </div>
  );
}
