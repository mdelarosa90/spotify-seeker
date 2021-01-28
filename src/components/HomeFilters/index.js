import React from 'react';
import './styles.css';

import { album as albumAtom, artist as artistAtom, playlist as playlistAtom, episode as episodeAtom } from '../../recoil/songs/atoms';
import { useRecoilState } from 'recoil';

const HomeFilters = () => {
	const [ album, setAlbum ] = useRecoilState(albumAtom);
	const [ artist, setArtist ] = useRecoilState(artistAtom);
	const [ playlist, setPlaylist ] = useRecoilState(playlistAtom);
	const [ episode, setEpisode ] = useRecoilState(episodeAtom);

	return (
		<div className="home-filters">
			<label>
				Album
				<input type="checkbox" name="album" checked={!!album} onChange={({ target: { checked } }) => setAlbum(checked ? 'album' : null)} />
			</label>
			<label>
				Artista
				<input
					type="checkbox"
					name="artist"
					checked={!!artist}
					onChange={({ target: { checked } }) => setArtist(checked ? 'artist' : null)}
				/>
			</label>
			<label>
				Playlist
				<input
					type="checkbox"
					name="playlist"
					checked={!!playlist}
					onChange={({ target: { checked } }) => setPlaylist(checked ? 'playlist' : null)}
				/>
			</label>
			<label>
				Episodio
				<input
					type="checkbox"
					name="episode"
					checked={!!episode}
					onChange={({ target: { checked } }) => setEpisode(checked ? 'episode' : null)}
				/>
			</label>
		</div>
	);
};

export default HomeFilters;
