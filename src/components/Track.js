import React from 'react';
import ListItem from './ListItem';

const Track = React.memo(({ album, id, external_urls, name, artists}) => {
    return (<ListItem imageUrl={album?.images[0].url} 
    id={id} 
    externalUrls={external_urls?.spotify} 
    releaseDate={album?.release_date} 
    name={name} 
    artist={artists[0].name} />);
});

export default Track;
