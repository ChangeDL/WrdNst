import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import ProfileButton from './ProfileButton';
import WrdNstLogo from '../../assets/WrdNstLogo.png'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='main-nav-container'>
			<div>
				<NavLink exact to="/">
					<img className='logo-header' src={WrdNstLogo} />
				</NavLink>
			</div>
			{isLoaded && (
				<div className='profile-button-nav'>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
