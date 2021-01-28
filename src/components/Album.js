import React from 'react';
import ListItem from './ListItem';

const Album = React.memo(({ images, id, external_urls, name, artists, release_date}) => {
    return (<ListItem imageUrl={images[0].url} 
    id={id} 
    externalUrls={external_urls?.spotify} 
    releaseDate={release_date} 
    name={name} 
    artist={artists[0].name} />);
});

export default Album;