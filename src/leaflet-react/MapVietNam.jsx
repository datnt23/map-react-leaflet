import "../styles/App.css";
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { center } from "@turf/turf";

function MapVietNam() {
	const [data, setData] = useState([]);
	const [centerMap, setCenterMap] = useState({
		lat: 14.315518579685076,
		lng: 108.33959143366701,
	});
	const [findLocation, setFindLocation] = useState({});
	const mapRef = useRef();
	const centerRef = useRef();
	const ZOOM = 12;
	useEffect(() => {
		fetch(
			"https://data.opendevelopmentmekong.net/geoserver/ODMekong/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ODMekong%3Aa4eb41a4-d806-4d20-b8aa-4835055a94c8&outputFormat=application%2Fjson"
		)
			.then((response) => response.json())
			.then((dataJson) => {
				setData(dataJson);
			})
			.catch((error) => console.error(error));
	}, []);
	useEffect(() => {
		if (mapRef.current) {
			mapRef.current.clearLayers(); // remove old data
			mapRef.current.addData(data); // might need to be geojson.features
		}
	}, [mapRef, data]);

	useEffect(() => {
		if (centerRef.current) {
			centerRef.current.flyTo(findLocation, 10); // remove old data
		}
	}, [centerRef, findLocation]);

	const onEachFeature = (feature, layer) => {
		layer.on("click", (e) => {
			let location = {
				lat: getCenter(e.target.feature)[1],
				lng: getCenter(e.target.feature)[0],
			};
			setFindLocation(location);
		});
		layer.bindPopup(
			feature.properties.Name_VI +
				" Latitude: " +
				getCenter(feature)[1] +
				" Longitude: " +
				getCenter(feature)[0]
		);
	};
	const getCenter = (find) => {
		const centerPoint = center(find);
		const [longitude, latitude] = centerPoint.geometry.coordinates;
		return [longitude, latitude];
	};
	return (
		<>
			<MapContainer
				ref={centerRef}
				center={centerMap}
				zoom={ZOOM}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{data && (
					<GeoJSON ref={mapRef} data={data} onEachFeature={onEachFeature} />
				)}
			</MapContainer>
		</>
	);
}

export default MapVietNam;
