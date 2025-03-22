import { useState } from 'preact/hooks';

const InfoCard = (content) => {
    const [flipped, setFlipped] = useState(false);

    const toggleFlip = () => {
        setFlipped(!flipped);
    };

    return (
        <div className="single-info-container" onClick={toggleFlip}>
            <div className={`info-text-container ${flipped ? 'flipped' : ''}`}>
                <div className="text-card-front">
                    <h3>{content.content.title}</h3>
                </div>
                <div className="text-card-back">
                        {content.content.body.map( el => {
                            return <p>{el}</p>
                        })}
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
