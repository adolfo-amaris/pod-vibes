import React from 'react';

interface CardProps {
    image: string;
    title: string;
    author: string;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ image, title, author, onClick }) => {
    return (
        <div style={cardStyle} onClick={onClick}>
            <img src={image} alt={title} style={imageStyle} />
            <div style={textContainerStyle}>
                <h3 style={titleStyle}>{title}</h3>
                <p style={authorStyle}>{author}</p>
            </div>
        </div>
    );
};

const cardStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    maxWidth: '200px',
    textAlign: 'center' as const,
};

const imageStyle = {
    width: '100%',
    borderRadius: '4px',
};

const textContainerStyle = {
    marginTop: '10px',
};

const titleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '5px 0',
};

const authorStyle = {
    fontSize: '14px',
    color: '#666',
};

export default Card;
