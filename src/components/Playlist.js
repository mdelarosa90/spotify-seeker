import React from 'react';
import ListItem from './ListItem';

const PlayList = React.memo(({ images, id, external_urls, name, description }) => {
    return (<ListItem imageUrl={images[0].url} 
        id={id} 
        externalUrls={external_urls?.spotify} 
        releaseDate=""
        name={description} 
        artist={name} />);
});

export default PlayList;
