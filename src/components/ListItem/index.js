import React from 'react';
import './style.css';

export default React.memo(function ListItem({ imageUrl, id, externalUrls, releaseDate, name, artist }) {
	const handleListItemClick = () => {
		window.open(externalUrls, '_blank');
	};

	return (
		<div className="list-item" onClick={handleListItemClick}>
			<img src={imageUrl} alt={id} className="list-item-img" />
			<p className="list-item-title">{name}</p>
			<p className="list-item-artist">{artist}</p>
			<p className="list-item-release-date">{releaseDate}</p>
		</div>
	);
});
