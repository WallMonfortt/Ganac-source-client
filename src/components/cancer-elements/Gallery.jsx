import { useState } from 'preact/hooks';

const Gallery = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const images = [
        './img/MG.webp',
        './img/REY.webp',
        './img/DSC.webp',
        './img/D9C.webp',
    ];

    const openModal = (image) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedImage('');
    };

    return (
        <div className="gallery-container">
            <div className="gallery">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Gallery Image ${index + 1}`}
                        className="gallery-image"
                        onClick={() => openModal(image)}
                    />
                ))}
            </div>

            {isOpen && (
                <div className="galery-modal" onClick={closeModal}>
                    <img src={selectedImage} alt="Selected" className="modal-image" />
                </div>
            )}
        </div>
    );
};

export default Gallery;
