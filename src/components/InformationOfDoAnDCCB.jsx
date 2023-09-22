import { SectionRow6 } from "./Functions";
import { actions, useStore } from "../store";
import iconBack from "/src/img/back-icon-button.png";
import iconClose from "/src/img/close-icon-button.png";
function InformationOfDoAnDCCB() {
	const [state, dispatch] = useStore();
	const { dataDCCBofBDG, data, displayFullMapBDG } = state;
	const handleToggleShowDisplayDoAnDCCB = () => {
		let arrayDCCB = [];
		dispatch(actions.setDisplayDCCBofBDG(false));
		dispatch(actions.setDisplayFullMapBDG(false));
		data.DCCB.forEach((dccb) => {
			let geoDataDCCB = {
				geometry: { coordinates: [], type: "MultiPolygon" },
				type: "Feature",
			};
			geoDataDCCB.geometry.coordinates = JSON.parse(dccb.Ranh);
			arrayDCCB.push(geoDataDCCB);
		});
		dispatch(actions.setDataGeoJsonDCCBofBDG(arrayDCCB));
	};
	const handleToggle = () => {
		dispatch(actions.setDisplayDataInformation(false));
		dispatch(actions.setDisplayDCCBofBDG(false));
		dispatch(actions.setData({}));
	};
	const handleViewFullMap = () => {
		if (displayFullMapBDG === true) {
			dispatch(actions.setDisplayFullMapBDG(false));
		} else {
			dispatch(actions.setDisplayFullMapBDG(true));
		}
	};
	return (
		<>
			<div className="div-header-info">
				<button
					className="btn-back-info"
					onClick={handleToggleShowDisplayDoAnDCCB}
				>
					<img src={iconBack} width={20} height={20} />
				</button>
				<h3 className="text-center-info">Thông tin đồ án</h3>
				<button className="btn-close-info" onClick={handleToggle}>
					<img src={iconClose} width={20} height={20} />
				</button>
			</div>
			<div
				style={{
					textAlign: "left",
					fontSize: 20,
					fontWeight: "bold",
				}}
			>
				Thông tin điều chỉnh cục bộ
			</div>
			<div className="div-box-info">
				<SectionRow6 name={"Đồ án:"} value={dataDCCBofBDG.TenDoAn} />
				<SectionRow6 name={"Số quyết định:"} value={dataDCCBofBDG.SoQD} />
				<SectionRow6
					name={"Cơ quan phê duyệt:"}
					value={dataDCCBofBDG.CoQuanPD}
				/>
				<SectionRow6 name={"Ngày duyệt:"} value={dataDCCBofBDG.NgayDuyet} />
			</div>
			<button style={{ cursor: "pointer" }} onClick={handleViewFullMap}>
				{displayFullMapBDG ? "Thu nhỏ" : "Xem Đầy Đủ"}
			</button>
		</>
	);
}

export default InformationOfDoAnDCCB;
