import { useState, useEffect } from 'preact/hooks';
import Gallery from './Gallery';

const RotatingImage = () => {
    const [flipped, setFlipped] = useState(false);

    const toggleFlip = () => {
        setFlipped(!flipped);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setFlipped(prevFlipped => !prevFlipped);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="image-container" onClick={toggleFlip}>
            <div className={`image ${flipped ? 'flipped' : ''}`}>
                <div className="img-card-front">
                    <Gallery />
                </div>
                    <Gallery />
                <div className="img-card-back">
                </div>
            </div>
        </div>
    );
};

export default RotatingImage;
