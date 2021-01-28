import React from 'react';
import ListItem from './ListItem';

const Artist = React.memo(({ images, id, external_urls, name }) => {
    return (<ListItem imageUrl={images.length ? images[0].url : ''} 
        id={id} 
        externalUrls={external_urls?.spotify} 
        releaseDate="" 
        name={name} 
        artist={name} />);
});

export default Artist;
