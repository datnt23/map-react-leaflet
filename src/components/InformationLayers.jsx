import { actions, useStore } from "../store";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile from "./PDFFile";
import { RowCol6, SectionRow6 } from "./Functions";
import proj4 from "proj4";
import iconClose from "/src/img/close-icon-button.png";
function InformationLayers() {
	const [state, dispatch] = useStore();
	const { data, dataGeoJson } = state;
	const QHPK = JSON.parse(data.QHPK);
	const QHSDD = JSON.parse(data.QHSDD);
	const KHSDD = JSON.parse(data.KHSDD);
	const thongTinChung = JSON.parse(data.ThongTinChung);
	const DCCB = JSON.parse(data.DCCB);
	const QHCT = JSON.parse(data.QHChiTiet);
	const handleGetCNSDD = (geometry, properties) => {
		dispatch(actions.setDisplayCNSDD(true));
		dispatch(actions.setDataGeoJsonCNSDD(geometry));
		dispatch(actions.setDataCNSDD(properties));
	};
	const handleToggle = () => {
		dispatch(actions.setDisplayDataInformation(false));
	};
	const handleGetDCCB = (dccb) => {
		let ten;
		dccb.forEach((a) => {
			ten = a.properties.tendccb;
		});
		return ten;
	};
	const handleGetQHCT = (qhct) => {
		let ten;
		qhct.forEach((a) => {
			ten = a.properties.tenduan;
		});
		return ten;
	};
	const handleGetQHPK = (qhpk) => {
		let ten;
		qhpk.forEach((a) => {
			ten = a.tendoan;
		});
		return ten;
	};
	const handleGetQHSDD = (qhsdd) => {
		let ten;
		qhsdd.forEach((a) => {
			ten = a.tendoan;
		});
		return ten;
	};
	const handleCNSDD = (obj, index) => {
		if (obj.properties.maquyuoc === "DGT") {
			return (
				<div
					className="div-box-info"
					key={index}
					style={{
						backgroundColor: "rgb(" + obj.properties.rgbcolor + ")",
						color: "white",
					}}
				>
					<SectionRow6 name={"Số thứ tự:"} value={index + 1} />
					<SectionRow6
						name={"Chức năng SDĐ:"}
						value={obj.properties.chucnang}
					/>
					<div className="section">
						<div className="row">
							<div className="col-6">
								Diện tích (m<sup>2</sup>):
							</div>
							<div className="col-6">
								{parseFloat(obj.properties.dientich).toFixed(2)}
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<>
					<div
						className="div-box-info"
						key={index}
						style={{
							cursor: "pointer",
							backgroundColor: "rgb(" + obj.properties.rgbcolor + ")",
							color: "white",
						}}
						onClick={() => handleGetCNSDD(obj.geometry, obj.properties)}
					>
						<SectionRow6 name={"Số thứ tự:"} value={index + 1} />
						<SectionRow6 name={"Ô phố:"} value={obj.properties.maopho} />
						<SectionRow6
							name={"Chức năng SDĐ:"}
							value={obj.properties.chucnang}
						/>
						<div className="section">
							<div className="row">
								<div className="col-6">
									Diện tích (m<sup>2</sup>):
								</div>
								<div className="col-6">
									{parseFloat(obj.properties.dientich).toFixed(2)}
								</div>
							</div>
						</div>
					</div>
				</>
			);
		}
	};
	const handleClickQHPK = () => {
		dispatch(actions.setDisplayQHPK(true));
		dispatch(actions.setDataQHPK(QHPK));
		dispatch(actions.setDataGeoJson(QHPK));
	};
	const handleClickQHSDD = () => {
		dispatch(actions.setDisplayQHSDD(true));
		dispatch(actions.setDataQHSDD(QHSDD));
		dispatch(actions.setDataGeoJson(QHSDD));
	};
	const handleClickKHSDD = () => {
		dispatch(actions.setDisplayKHSDD(true));
		dispatch(actions.setDataKHSDD(KHSDD));
		dispatch(actions.setDataGeoJson(KHSDD));
	};
	const handleClickDCCB = (geoData) => {
		let ranhLayer;
		geoData.forEach((obj) => {
			ranhLayer = JSON.parse(obj.properties.ranhlayer);
			dispatch(actions.setDataDCCB(obj.properties));
		});
		dispatch(actions.setDataGeoJsonDCCB(ranhLayer));
		dispatch(actions.setDisplayDCCB(true));
	};
	const handleClickQHCT = (geoData) => {
		let ranhLayer;
		geoData.forEach((obj) => {
			ranhLayer = JSON.parse(obj.properties.ranhlayer);
			dispatch(actions.setDataQHCT(obj.properties));
		});
		dispatch(actions.setDataGeoJsonQHCT(ranhLayer));
		dispatch(actions.setDisplayQHCT(true));
	};
	const handleDownloadCoords = () => {
		const element = document.createElement("a");
		let vn2000 =
			"+proj=tmerc +lat_0=0 +lon_0=105.75 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,-0.00928836,0.01975479,-0.00427372,0.252906278 +units=m +no_defs +type=crs";
		let wgs84 = "+proj=longlat +datum=WGS84 +no_defs +type=crs";
		let transfer = JSON.parse(thongTinChung.ranh)[0][0].map((arr) => {
			return proj4(wgs84, vn2000, arr);
		});
		let swapCoords = transfer.map((arr) => {
			arr.reverse();
			return arr;
		});
		let coordinate = swapCoords
			.map((arr) => arr.join(" ").replace(/,/g, " "))
			.join("\n");
		const fileCoordinates = new Blob([coordinate], {
			type: "text/plain",
		});
		element.href = URL.createObjectURL(fileCoordinates);
		element.download = "VN_2000.txt";
		element.click();
	};
	return (
		<>
			<div className="div-header-info">
				<h3 className="text-center-info">Thông tin thửa đất</h3>
				<button className="btn-close-info" onClick={handleToggle}>
					<img src={iconClose} width={20} height={20} />
				</button>
			</div>
			<div className="div-scroll-info">
				<div className="div-box-info">
					<div className="section">
						<RowCol6 name={"Tỉnh/Thành:"} value={"TP.Hồ Chí Minh"} />
						<RowCol6 name={"Quận/Huyện:"} value={thongTinChung.tenquanhuyen} />
						<RowCol6 name={"Phường/Xã:"} value={thongTinChung.tenphuongxa} />
						<RowCol6 name={"Số hiệu thửa đất:"} value={thongTinChung.sothua} />
						<RowCol6 name={"Số hiệu tờ bản đồ:"} value={thongTinChung.soto} />
						<RowCol6
							name={`Diện tích lô đất(m²):`}
							value={parseFloat(thongTinChung.dientich)}
						/>
						{!QHPK.length ? null : (
							<div className="row">
								<div className="col-6">Quy hoạch phân khu:</div>
								<div
									className="col-6"
									style={{
										cursor: "pointer",
										color: "#4688d6",
										boxShadow: "3px",
									}}
									onClick={() => handleClickQHPK()}
								>
									{handleGetQHPK(thongTinChung.dsttdoan)}
								</div>
							</div>
						)}
						{!QHSDD.length ? null : (
							<div className="row">
								<div className="col-6">Quy hoạch sử dụng đất:</div>
								<div
									className="col-6"
									style={{
										cursor: "pointer",
										color: "#4688d6",
										boxShadow: "3px",
									}}
									onClick={() => handleClickQHSDD()}
								>
									{handleGetQHSDD(thongTinChung.dsttdoanqhsdd)}
								</div>
							</div>
						)}
						{!KHSDD.length ? null : (
							<div className="row">
								<div className="col-6">Kế hoạch sử dụng đất:</div>
								<div
									className="col-6"
									style={{
										cursor: "pointer",
										color: "#4688d6",
										boxShadow: "3px",
									}}
									onClick={() => handleClickKHSDD()}
								>
									Đang cập nhật...
								</div>
							</div>
						)}
						{!DCCB.length ? null : (
							<div className="row">
								<div className="col-6">Điều chỉnh cục bộ:</div>
								<div
									className="col-6"
									style={{
										cursor: "pointer",
										color: "#4688d6",
										boxShadow: "3px",
									}}
									onClick={() => handleClickDCCB(DCCB)}
								>
									{handleGetDCCB(DCCB)}
								</div>
							</div>
						)}
						{!QHCT.length ? null : (
							<div className="row">
								<div className="col-6">Quy hoạch chi tiết:</div>
								<div
									className="col-6"
									style={{
										cursor: "pointer",
										color: "#4688d6",
										boxShadow: "3px",
									}}
									onClick={() => handleClickQHCT(QHCT)}
								>
									{handleGetQHCT(QHCT)}
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="div-box-info">
					<div className="section">
						<div className="row">
							<div className="col-4" style={{ cursor: "pointer" }}>
								<PDFDownloadLink
									document={<PDFFile data={state.data} />}
									fileName="Information"
								>
									<div className="div-section-item-col-4">
										<div>Xuất thông tin</div>
									</div>
								</PDFDownloadLink>
							</div>
							<div
								className="col-4"
								style={{ cursor: "pointer" }}
								onClick={handleDownloadCoords}
							>
								<div className="div-section-item-col-4">
									<div>Xuất tọa độ</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					style={{
						width: "420px",
						height: "20px",
						textAlign: "center",
						fontSize: 20,
						alignItems: "center",
					}}
				>
					Nhấn vào ô chức năng để xem thông tin
				</div>
				<div>
					{dataGeoJson.map((obj, index) => (
						<>{handleCNSDD(obj, index)}</>
					))}
				</div>
			</div>
		</>
	);
}
export default InformationLayers;
