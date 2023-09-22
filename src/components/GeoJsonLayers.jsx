import { centerOfMass, polygon } from "@turf/turf";
import axios from "axios";
import { useEffect, useRef } from "react";
import { Marker, GeoJSON, useMapEvents, Popup, useMap } from "react-leaflet";
import { useStore, actions } from "../store";
import "../styles/App.css";
import proj4 from "proj4";

function GeoJsonLayers() {
	const [state, dispatch] = useStore();
	const {
		dataGeoJson,
		dataGeoJsonCNSDD,
		dataGeoJsonQHCT,
		dataGeoJsonDCCB,
		fileCoords,
		displayQHPK,
		displayQHSDD,
		displayKHSDD,
		displayBDG,
		dataGeoJsonDCCBofBDG,
		dataGeoJsonRanhOfBDG,
		dataDCCBofBDG,
		displayDCCBofBDG,
	} = state;
	const dataRef = useRef();
	const cnsddRef = useRef();
	const qhctRef = useRef();
	const dccbRef = useRef();
	const dccbOfBDGRef = useRef();
	const ranhOfBDGRef = useRef();
	const map = useMap();
	const mapClick = useMapEvents({
		click(event) {
			const { lat, lng } = event.latlng;
			if (displayBDG) {
				postDataBDG(lat, lng);
				mapClick.flyTo({ lat, lng }, 15);
			} else {
				postData(lat, lng);
				mapClick.flyTo({ lat, lng }, 18);
			}
		},
	});
	//============POST Coordinates VN2000============//
	useEffect(() => {
		if (!fileCoords.length) {
			return;
		} else {
			postCoords(fileCoords);
			map.flyToBounds(changeCoordsToWGS84(fileCoords), 14);
			dispatch(actions.setFileCoords([]));
		}
	}, [fileCoords]);
	const changeCoordsToWGS84 = (coords) => {
		let vn2000 =
			"+proj=tmerc +lat_0=0 +lon_0=105.75 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,-0.00928836,0.01975479,-0.00427372,0.252906278 +units=m +no_defs +type=crs";
		let wgs84 = "+proj=longlat +datum=WGS84 +no_defs +type=crs";
		let swapCoords = coords.map((arr) => {
			arr.reverse();
			return arr;
		});
		const wgs84Coords = swapCoords.map((arr) => proj4(vn2000, wgs84, arr));
		return wgs84Coords.map((arr) => {
			arr.reverse();
			return arr;
		});
	};
	const postCoords = async (coords) => {
		try {
			if (!coords.length) {
				return;
			} else {
				dispatch(actions.setIsLoading(true));
				dispatch(actions.setDisplaySearch(false));
				const response = await axios({
					method: "POST",
					url: "https://sqhkt-qlqh.tphcm.gov.vn/computing/930/api/v3.5/a-z/maqh/762",
					data: {
						ToaDo: `[${coords.map((arr) => `[${arr}]`)}]`,
					},
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				});
				dispatch(actions.setDisplayDataInformation(true));
				dispatch(actions.setData(response.data));
				dispatch(actions.setDataGeoJson(JSON.parse(response.data.QHPK)));
				dispatch(actions.setIsLoading(false));
			}
		} catch (error) {
			dispatch(actions.setIsLoading(false));
			console.log(error);
		}
	};
	//========================//
	const postData = async (lat, lng) => {
		try {
			dispatch(actions.setDataGeoJsonCNSDD([]));
			dispatch(actions.setDisplayCNSDD(false));
			dispatch(actions.setIsLoading(true));
			const response = await axios({
				method: "POST",
				url: "https://sqhkt-qlqh.tphcm.gov.vn/computing/930/api/v3.5/a-z/maqh/762",
				data: {
					Lat: lat,
					Lon: lng,
				},
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});
			dispatch(actions.setDisplayDataInformation(true));
			dispatch(actions.setData(response.data));
			checkShowMap(response.data);
			dispatch(actions.setIsLoading(false));
		} catch (error) {
			dispatch(actions.setIsLoading(false));
			console.log(error);
		}
	};
	const postDataBDG = async (lat, lng) => {
		try {
			dispatch(actions.setDisplayDCCBofBDG(false));
			dispatch(actions.setDisplayFullMapBDG(false));
			dispatch(actions.setIsLoading(true));
			const response = await axios({
				method: "POST",
				url: "https://sqhkt-qlqh.tphcm.gov.vn/api/doan/ranhqhpk",
				data: {
					Lat: lat,
					Lon: lng,
				},
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});
			dispatch(actions.setDisplayDataInformation(true));
			checkShowMap(response.data);
			dispatch(actions.setIsLoading(false));
		} catch (error) {
			dispatch(actions.setIsLoading(false));
			console.log(error);
		}
	};
	const checkShowMap = (data) => {
		if (displayQHPK) {
			return dispatch(actions.setDataGeoJson(JSON.parse(data.QHPK)));
		}
		if (displayKHSDD) {
			return dispatch(actions.setDataGeoJson(JSON.parse(data.KHSDD)));
		}
		if (displayQHSDD) {
			return dispatch(actions.setDataGeoJson(JSON.parse(data.QHSDD)));
		}
		if (displayBDG) {
			let arrayDCCB = [];
			let geoData = {
				coordinates: [],
				type: "MultiPolygon",
			};
			data.forEach((objData) => {
				dispatch(actions.setData(objData));
				geoData.coordinates = JSON.parse(objData.Ranh);
				objData.DCCB.forEach((dccb) => {
					let geoDataDCCB = {
						geometry: { coordinates: [], type: "MultiPolygon" },
						type: "Feature",
					};
					geoDataDCCB.geometry.coordinates = JSON.parse(dccb.Ranh);
					arrayDCCB.push(geoDataDCCB);
				});
			});
			dispatch(actions.setDataGeoJsonDCCBofBDG(arrayDCCB));
			dispatch(actions.setDataGeoJsonRanhOfBDG(geoData));
		}
	};
	useEffect(() => {
		if (displayDCCBofBDG) {
			let swapArr = JSON.parse(dataDCCBofBDG.Ranh)[0][0].map((arr) =>
				arr.reverse()
			);
			map.flyToBounds(swapArr, 14);
		}
	}, [displayDCCBofBDG]);

	useEffect(() => {
		if (dataRef.current) {
			dataRef.current.clearLayers(); // remove old data
			dataRef.current.addData(dataGeoJson); // might need to be geojson.features
		}
	}, [dataRef, dataGeoJson]);
	useEffect(() => {
		if (cnsddRef.current) {
			cnsddRef.current.clearLayers(); // remove old data
			cnsddRef.current.addData(dataGeoJsonCNSDD); // might need to be geojson.features
		}
	}, [cnsddRef, dataGeoJsonCNSDD]);
	useEffect(() => {
		if (qhctRef.current) {
			qhctRef.current.clearLayers(); // remove old data
			qhctRef.current.addData(dataGeoJsonQHCT); // might need to be geojson.features
		}
	}, [qhctRef, dataGeoJsonQHCT]);
	useEffect(() => {
		if (dccbRef.current) {
			dccbRef.current.clearLayers(); // remove old data
			dccbRef.current.addData(dataGeoJsonDCCB); // might need to be geojson.features
		}
	}, [dccbRef, dataGeoJsonDCCB]);
	useEffect(() => {
		if (ranhOfBDGRef.current) {
			ranhOfBDGRef.current.clearLayers(); // remove old data
			ranhOfBDGRef.current.addData(dataGeoJsonRanhOfBDG); // might need to be geojson.features
		}
	}, [ranhOfBDGRef, dataGeoJsonRanhOfBDG]);
	useEffect(() => {
		if (dccbOfBDGRef.current) {
			dccbOfBDGRef.current.clearLayers(); // remove old data
			dccbOfBDGRef.current.addData(dataGeoJsonDCCBofBDG); // might need to be geojson.features
		}
	}, [dccbOfBDGRef, dataGeoJsonDCCBofBDG]);
	const handleGetColor = (feature) => {
		return {
			color: "rgb(" + feature.properties.rgbcolor + ")",
			fillColor: "rgb(" + feature.properties.rgbcolor + ")",
			fill: true,
			fillOpacity: 1,
		};
	};
	const handleCenterMap = (marker) => {
		const centerPoint = centerOfMass(polygon(marker.geometry.coordinates[0]));
		const [longitude, latitude] = centerPoint.geometry.coordinates;
		return [latitude, longitude];
	};
	const handleGeoJson = (dataGeo, ref, color) =>
		dataGeo && <GeoJSON ref={ref} data={dataGeo} style={{ color: color }} />;
	return (
		<>
			{dataGeoJson && (
				<>
					{dataGeoJson.map((marker, index) => (
						<>
							<Marker
								key={index}
								position={handleCenterMap(marker)}
								interactive={true}
								icon={L.divIcon({
									html: `
									<img src="src/img/marker.png" width="40" height="40"">
									<div class="number">${index + 1}</div>
									</img>`,
									className: "leaflet-marker-icon",
									iconAnchor: [20, 40],
								})}
							>
								<Popup>
									<span>{index + 1}</span>
								</Popup>
							</Marker>
						</>
					))}
					<GeoJSON ref={dataRef} data={dataGeoJson} style={handleGetColor} />
				</>
			)}
			{/* Layer of Chức Năng Sử Dụng Đất */}
			{handleGeoJson(dataGeoJsonCNSDD, cnsddRef, "red")}
			{/* Layer of Quy Hoach Chi Tiet */}
			{handleGeoJson(dataGeoJsonQHCT, qhctRef, "#FF334F")}
			{/* Layer of Dieu Chinh Cuc Bo */}
			{handleGeoJson(dataGeoJsonDCCB, dccbRef, "#FF334F")}
			{/* Layer of Ranh BDG */}
			{handleGeoJson(dataGeoJsonRanhOfBDG, ranhOfBDGRef, "black")}
			{/* Layer of Ranh DCCB => BDG */}
			{handleGeoJson(dataGeoJsonDCCBofBDG, dccbOfBDGRef, "red")}
		</>
	);
}
export default GeoJsonLayers;
