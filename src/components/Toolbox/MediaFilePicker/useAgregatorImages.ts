import { Photo } from 'clients/interfaces';
import unsplashClient from 'clients/UnsplashClient';
import { useRef, useState } from 'react';

interface Image {
  id: string;
  url: string;
  authorUrl: string | null;
  authorName: string | null;
}

export default function useMediaPicker() {
  const [images, setImages] = useState<Image[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const query = useRef<string | null>(null);

  const loadMoreImages = async (q: string | null = null) => {
    if (q !== query.current) {
      query.current = q;
      setCurrentPage(1);
    }
    let newImages: Photo[] = [];
    const params = {
      page: currentPage + 1,
    };
    if (!query.current) {
      newImages = await unsplashClient.getPhotos(params);
    } else {
      newImages = await unsplashClient.searchPhotos(query.current, params);
    }
    const formattedImages: Image[] = formatPhotos(newImages);
    setImages((imgs) => [...imgs, formattedImages]);
    setCurrentPage((prev) => prev + 1);
  };

  return {
    images,
    loadMoreImages,
  };
}

function formatPhotos(photos: Photo[]): Image[] {
  return photos.map((img) => ({
    authorName: img.user.name,
    authorUrl: img.user.portfolio_url,
    url: img.urls.full,
    id: img.id,
  }));
}
