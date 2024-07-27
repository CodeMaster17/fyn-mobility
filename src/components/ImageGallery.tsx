import React, { useEffect, useState, useRef } from 'react';
import { IMAGE_API } from '../constants';

// Defining the type for the image data
interface ImageData {
    id: number;
    url: string;
    thumbnailUrl: string;
    title: string;
}

const ImageGallery: React.FC = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastImageRef = useRef<HTMLImageElement | null>(null);

    // Fetching images from an API
    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${IMAGE_API}${page}`);
            const data = await response.json();
            setImages((prevImages) => [...prevImages, ...data]);
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoading(false);
        }
    };

    // Loading more images when the component mounts or page changes
    useEffect(() => {
        fetchImages();
    }, [page]);

    // Intersection Observer for lazy loading
    useEffect(() => {
        const observerCallback: IntersectionObserverCallback = (entries) => {
            if (entries[0].isIntersecting && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        const options: IntersectionObserverInit = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };

        if (lastImageRef.current) {
            observer.current = new IntersectionObserver(observerCallback, options);
            observer.current.observe(lastImageRef.current);
        }

        return () => {
            if (observer.current && lastImageRef.current) {
                observer.current.unobserve(lastImageRef.current);
            }
        };
    }, [loading]);

    return (
        <>
            <div className="image-container">
                {images.map((image, index) => {
                    const isLastImage = index === images.length - 1; // Checking if this is the last image
                    return (
                        <div key={`${page}-${index}`} className='image-item'>
                            <div className='image-id'>
                                <span>
                                    page:&nbsp;
                                </span>
                                <span className='number-container'>
                                    {`${page}`}
                                </span>
                                <span>
                                    &nbsp;
                                    &nbsp;
                                    index:&nbsp;
                                </span>
                                <span className='number-container'>
                                    {`${index}`}
                                </span>
                            </div>
                            <br />
                            <div className='image-card'>
                                <img
                                    src={image.thumbnailUrl}
                                    alt={image.title}
                                    ref={isLastImage ? lastImageRef : null}
                                    loading="lazy"
                                    className="image"
                                />
                            </div>
                            <p className='text'>{image.title}</p>
                        </div>
                    );
                })}
            </div>
            {loading && <p>Loading more images...</p>}
        </>
    );
};

export default ImageGallery;