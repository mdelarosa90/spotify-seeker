import React from 'react';
import './style.css';
import homeImage from '../../assets/images/home.png';
import { useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { spotifyAuthCall } from '../../utils';
import {
	isAuthenticated as isAuthenticatedAtom,
	spotifyRefreshToken as spotifyRefreshTokenAtom,
	spotifyTokenResponse as spotifyTokenResponseAtom
} from '../../recoil/auth/atoms';
import { useRecoilState } from 'recoil';

const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${process.env
	.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_CALLBACK_HOST}&scope=user-read-private`;

export default function Home() {
	const location = useLocation();
	const history = useHistory();
	const [ isAuthenticated, setIsAuthenticated ] = useRecoilState(isAuthenticatedAtom);
	const [ spotifyRefreshToken, setSpotifyRefreshToken ] = useRecoilState(spotifyRefreshTokenAtom);
	const [ spotifyTokenResponse, setSpotifyTokenResponse ] = useRecoilState(spotifyTokenResponseAtom);
	const authenticateUser = useCallback(async (code) => {
		try {
			let response;
	
			// Si el refresh token existe, entonces haz una llamada a refresh token, de lo cotnrario solicita un token nuevo.
			if (spotifyRefreshToken) {
				// Haz la llamada
				response = await spotifyAuthCall({refresh_token: spotifyRefreshToken, grant_type: 'refresh_token'})
			} else {
				response = await spotifyAuthCall({code, grant_type: 'authorization_code',});
			}

			if(response.access_token) {
				setSpotifyRefreshToken(response?.refresh_token);
				setSpotifyTokenResponse(response);
				setIsAuthenticated(true);
			} else {
				throw new Error('Usuario no fue logeado');
			}
	
			//TODO redirigir a pantalla de buscador
			history.replace('/home');

		} catch (error) {
			alert('Usuario no fue logeado');
			setSpotifyTokenResponse(null);
			setSpotifyRefreshToken(null);
			setIsAuthenticated(false);
		}
	}, [setSpotifyTokenResponse, setSpotifyTokenResponse, setIsAuthenticated, spotifyRefreshToken]);

	useEffect(
		() => {
			const urlParams = new URLSearchParams(location.search);
			const spotifyCode = urlParams.get('code');
			if (spotifyCode || isAuthenticated) authenticateUser(spotifyCode);
		},
		[ location.search ]
	);
	const handleLoginClick = () => {
		window.location.replace(spotifyURL);
	};
	return (
		<div className="home-container">
			<div className="home-left-child">
				<h3>Bienvenido de nuevo</h3>
				<h6>Identifícate para encontrar tu musica favorita</h6>
				<button onClick={handleLoginClick}>Iniciar sesión</button>
			</div>
			<div className="home-right-child" style={{ backgroundImage: `url(${homeImage})` }} />
		</div>
	);
}
