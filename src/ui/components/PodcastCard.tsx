import React from 'react';
import './../../shared/styles/card.scss';

interface CardProps {
  image: string;
  title: string;
  author: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ image, title, author, onClick }) => {
  return (
    <div
      className="card flex-column-center justify-content-center align-items hoverEffect"
      onClick={onClick}
    >
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>Author: {author}</p>
      </div>
    </div>
  );
};

export default Card;
