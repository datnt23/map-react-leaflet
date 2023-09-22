import { useRef } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "./styles/App.css";
import "leaflet/dist/leaflet.css";
import { actions, useStore } from "./store";
import TableLayersControl from "./components/TableLayersControl";
import Layers from "./components/Layers";
import iconLayers from "/src/img/layer-icon-button.png";
import SearchCoordinates from "./components/SearchCoordinates";
import InformationOfBDG from "./components/InformationOfBDG";
import InformationOfDoAnDCCB from "./components/InformationOfDoAnDCCB";
import iconSearch from "/src/img/search-icon-button.png";
import iconInformation from "/src/img/info-icon-button.png";
import InformationRoutes from "./components/InformationRoutes";
import GeoJsonLayers from "./components/GeoJsonLayers";

function App() {
	const [state, dispatch] = useStore();
	const {
		center,
		data,
		dataGeoJson,
		displayDataInformation,
		isLoading,
		controlOpacity,
		displaySearch,
		displayBDG,
		displayTableLayers,
		displayStreet,
		displayStatellite,
		displayDCCBofBDG,
	} = state;
	const centerRef = useRef();
	const ZOOM = 13;
	const handleToggleInformationData = () => {
		dispatch(actions.setDisplayDataInformation(true));
	};
	const handleToggleDisplaySearch = () => {
		dispatch(actions.setDisplaySearch(true));
	};
	const handleOpacityChange = (event) => {
		const newOpacity = parseFloat(event.target.value);
		dispatch(actions.setControlOpacity(newOpacity));
	};
	const handleDisplayTableLayers = () => {
		dispatch(actions.setDisplayTableLayers(true));
	};
	return (
		<div className="div-map">
			<MapContainer
				ref={centerRef}
				center={center}
				zoom={ZOOM}
				zoomControl={false}
			>
				<ZoomControl position="bottomright" />
				{displayStreet && (
					<>
						<TileLayer
							url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
							subdomains={["mt0", "mt1", "mt2", "mt3"]}
							maxZoom={18}
						/>
						<Layers />
					</>
				)}
				{displayStatellite && (
					<>
						<TileLayer
							attribution="'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'"
							url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
						/>
						<Layers />
					</>
				)}
				<GeoJsonLayers />
			</MapContainer>
			{displayTableLayers ? (
				<TableLayersControl />
			) : (
				<button
					style={{
						position: "absolute",
						top: "40px",
						right: "10px",
						zIndex: "1000",
						backgroundColor: "#ebebeb",
						fontWeight: "bold",
						width: "150px",
						textAlign: "center",
						fontSize: 18,
						height: "30px",
						cursor: "pointer",
					}}
					onClick={handleDisplayTableLayers}
				>
					<img
						src={iconLayers}
						style={{ width: "15px", height: "15px", paddingRight: "5px" }}
					/>
					Kiểu hiển thị
				</button>
			)}
			{displaySearch ? (
				<SearchCoordinates />
			) : (
				<button className="btn-search" onClick={handleToggleDisplaySearch}>
					<img
						src={iconSearch}
						width={25}
						height={25}
						style={{
							height: "25px",
							width: "25px",
							paddingTop: "3px",
						}}
					/>
				</button>
			)}
			<div
				style={{
					position: "absolute",
					top: "10px",
					right: "140px",
					zIndex: "1000",
					backgroundColor: "#ebebeb",
					color: "#0084ff",
					fontWeight: "bold",
					width: "30px",
					textAlign: "center",
					borderRadius: "50%",
					fontSize: 18,
				}}
			>
				{controlOpacity}
			</div>
			<input
				type="range"
				min="0"
				max="1"
				width={10}
				step="0.1"
				value={controlOpacity}
				onChange={handleOpacityChange}
				style={{
					cursor: "pointer",
					position: "absolute",
					top: "10px",
					zIndex: "1000",
					right: "5px",
				}}
			/>
			{isLoading === true ? (
				<>
					<div className="div-info">
						<div class="lds-ring">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				</>
			) : (
				<>
					{displayBDG ? (
						<>
							{!data.Ranh ? (
								<></>
							) : (
								<>
									{displayDataInformation ? (
										<div className="div-info">
											{displayDCCBofBDG ? (
												<InformationOfDoAnDCCB />
											) : (
												<InformationOfBDG />
											)}
										</div>
									) : (
										<button
											className="btn-info"
											onClick={handleToggleInformationData}
										>
											<img
												src={iconInformation}
												width={25}
												height={25}
												style={{
													height: "25px",
													width: "25px",
													paddingTop: "3px",
												}}
											/>
										</button>
									)}
								</>
							)}
						</>
					) : (
						<>
							{!dataGeoJson.length ? (
								<></>
							) : (
								<>
									{displayDataInformation ? (
										<InformationRoutes />
									) : (
										<button
											className="btn-info"
											onClick={handleToggleInformationData}
										>
											<img
												src={iconInformation}
												width={25}
												height={25}
												style={{
													height: "25px",
													width: "25px",
													paddingTop: "3px",
												}}
											/>
										</button>
									)}
								</>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
}

export default App;
