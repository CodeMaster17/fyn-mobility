import React, { useEffect } from "react";

// Define the type for the image data
interface ImageData {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

type Props = {};

const ImageGallery: React.FC<Props> = (props: Props) => {
    // Initialize state with the correct type
    const [apiData, setAPIData] = React.useState<ImageData[]>([]);

    // Fetch data from the API
    const getData = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=9&_page=1');
        const data: ImageData[] = await res.json(); // Type the fetched data
        setAPIData(data);
        console.log(data); // Log the fetched data instead of the state
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <section className="w-full border-red">
            <div className="image-container">

                {apiData.length > 0 ? (
                    apiData.map((item) => (
                        <div key={item.id} className="image-item">
                            <div className="w-full border-red image-card">
                                <img src={item.url} alt={item.title} className="image" />
                            </div>
                            <h3>{item.title}</h3>
                        </div>
                    ))
                ) : (
                    <p>No images found.</p>
                )}
            </div>
        </section>
    );
};

export default ImageGallery;