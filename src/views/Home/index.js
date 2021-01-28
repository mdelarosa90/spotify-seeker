import React from 'react';
import { useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import seekerImage from '../../assets/images/seeker.png';
import HomeFilters from '../../components/HomeFilters';
import Track from '../../components/Track';
import Album from '../../components/Album';
import Artist from '../../components/Artist';
import Playlist from '../../components/Playlist';
import Episode from '../../components/Episode';
import { spotifyTokenResponse } from '../../recoil/auth/atoms';
import { spotifyResult } from '../../recoil/songs/atoms';
import { filterType as filterTypeSelector} from '../../recoil/songs/selectors';
import { spotifySearchCall } from '../../utils';
import './style.css';

const Home = () => {
	const [ searchText, setSearchText ] = useState('');
	const [ tokenResponse ] = useRecoilState(spotifyTokenResponse);
	const [ searchResponse, setSearchResponse ] = useRecoilState(spotifyResult);
	const [filterType] = useRecoilState(filterTypeSelector);
	const resetFilter = useResetRecoilState(filterTypeSelector);

	const handleSearchClick = async () => {
		// TODO hacer o ejecutar la llamada API de Spotify
		try {
			let type = filterType ?? 'track';

			const paramsArray = [
				{
					q: searchText
				},
				{
					type
				},
				{
					offset: 50
				}
			];
			const response = await spotifySearchCall(paramsArray, tokenResponse.access_token);
			setSearchResponse(response);
		} catch (error) {
			throw error;
		}
	};

	const handleResetFilterClick = () => {
		resetFilter();
		setSearchResponse([]);
		setSearchText('');
	}

	return (
		<div className="home">
			<div style={{ backgroundImage: `url(${seekerImage})` }} className="home-cover-container" />
			<h2 className="home-title">Busca tu canción favorita</h2>
			<div className="home-search-box">
				<input
					type="text"
					className="home-search-box-input"
					value={searchText}
					onChange={({ target: { value } }) => setSearchText(value)}
				/>
				<button className="home-search-box-button" onClick={handleSearchClick}>
					Buscar
				</button>
			</div>
			<HomeFilters />
			<button className="home-clean-button"  onClick={handleResetFilterClick}>Limpiar Filtros</button>
			{searchResponse?.tracks?.items && (<div className="home-tracks-container">
				<p className="home-tracks-title">Canciones</p>
				<div className="home-tracks-container-items">
					{searchResponse?.tracks?.items?.map((item, index) => <Track key={index} {...item} />)}
				</div>
			</div>)}
			{searchResponse?.albums?.items && <div className="home-albums-container">
				<p className="home-albums-title">Album</p>
				<div className="home-albums-container-items">
					{searchResponse?.albums?.items?.map((item, index) => <Album key={index} {...item} />)}
				</div>
			</div>}
			{searchResponse?.artists?.items && <div className="home-artists-container">
				<p className="home-artists-title">Artista</p>
				<div className="home-artists-container-items">
					{searchResponse?.artists?.items?.map((item, index) => <Artist key={index} {...item} />)}
				</div>
			</div>}
			{searchResponse?.episodes?.items && <div className="home-episodes-container">
				<p className="home-episodes-title">Episodios</p>
				<div className="home-episodes-container-items">
					{searchResponse?.episodes?.items?.map((item, index) => <Episode key={index} {...item} />)}
				</div>
			</div>}
			{searchResponse?.playlists?.items && <div className="home-playlists-container">
				<p className="home-playlists-title">Playlists</p>
				<div className="home-playlists-container-items">
					{searchResponse?.playlists?.items?.map((item, index) => <Playlist key={index} {...item} />)}
				</div>
			</div>}
		</div>
	);
};

export default Home;
