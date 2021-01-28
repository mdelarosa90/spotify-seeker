import React from 'react';
import ListItem from './ListItem';

const Episode = React.memo(({ images, id, external_urls, name, release_date, description }) => {
    return (<ListItem imageUrl={images[0].url} 
        id={id} 
        externalUrls={external_urls?.spotify} 
        releaseDate={release_date} 
        name={description} 
        artist={name} />);
});

export default Episode;
