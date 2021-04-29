import React, { useEffect, useState } from 'react';

const Layout = () => {
	const [location, setLocation] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [locationArray, setLocationArray] = useState([]);
	const handleAdd = (e) => {
		e.preventDefault();
		console.log({ location });
		setLocationArray((locationArray) => [...locationArray, location]);
	};

	useEffect(() => {
		const mapboxgl = window.mapboxgl;
		const MapboxDirections = window.MapboxDirections;
		// var MapboxDirections = require('@mapbox/mapbox-gl-directions');
		mapboxgl.accessToken =
			'pk.eyJ1Ijoidmlzc2hubnUiLCJhIjoiY2tvMmU3ZXliMGh0NDJxbHAxcDc4dGh2YyJ9.Ob26Zvm3pLL8ZKhxAPlU5w';

		// get current location

		function success(pos) {
			var crd = pos.coords;
			console.log(crd);
			setupMap([crd.longitude, crd.latitude]);
			console.log([crd.longitude, crd.latitude]);
		}

		function error(err) {
			console.warn(`ERROR(${err.code}): ${err.message}`);
			setupMap([28.7041, 77.1025]);
		}

		navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });

		const setupMap = (center) => {
			var map = new mapboxgl.Map({
				container: 'map',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: center,
				zoom: 12,
			});
			map.addControl(new mapboxgl.NavigationControl());

			var directions = new MapboxDirections({
				accessToken: mapboxgl.accessToken,
			});

			map.addControl(directions, 'top-left');
		};
	}, []);
	return (
		<div>
			<button type='button' className='homeButton'>
				Home
			</button>
			<div className='container '>
				<div className='card-container'>
					<div className='row '>
						<form className='form'>
							<div className='row'>
								<div className='col lg-3'>
									<div className='form-group'>
										<label htmlFor='location'>Location</label>
										<input
											type='text'
											className='form-control'
											id='location'
											value={location}
											onChange={(e) => setLocation(e.target.value)}
										/>
									</div>
								</div>
								<div className='col lg-3'>
									<div className='form-group'>
										<label htmlFor='latitude'>Latitude</label>
										<input
											type='number'
											className='form-control'
											id='latitude'
											value={latitude}
											onChange={(e) => setLatitude(e.target.value)}
										/>
									</div>
								</div>
								<div className='col lg-3'>
									<div className='form-group'>
										<label htmlFor='longitude'>Longitude</label>
										<input
											type='number'
											className='form-control'
											id='longitude'
											value={longitude}
											onChange={(e) => setLongitude(e.target.value)}
										/>
									</div>
								</div>
								<div className='col lg-3 btn-submit'>
									<button type='button ' className='btn btn-primary' onClick={handleAdd}>
										Submit
									</button>
								</div>
							</div>
						</form>
					</div>
					<div className='row'>
						<div className='col lg-6 all-coordinates p-0'>
							<h4>All Coordinates</h4>
						</div>
						<div className='col lg-6 p-0'>
							<div id='map'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
