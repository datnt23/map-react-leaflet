import { actions, useStore } from "../store";
import { SectionRow6 } from "./Functions";
import iconBack from "/src/img/back-icon-button.png";
import iconClose from "/src/img/close-icon-button.png";

function InformationOfQHCT() {
	const [state, dispatch] = useStore();
	const { dataQHCT } = state;
	const handleToggleDisplayQHCT = () => {
		dispatch(actions.setDisplayQHCT(false));
		dispatch(actions.setDataGeoJsonQHCT([]));
	};
	const handleToggleClose = () => {
		dispatch(actions.setDisplayDataInformation(false));
		dispatch(actions.setDisplayQHCT(false));
		dispatch(actions.setDataGeoJsonQHCT([]));
	};
	return (
		<>
			<div className="div-header-info">
				<button className="btn-back-info" onClick={handleToggleDisplayQHCT}>
					<img src={iconBack} width={20} height={20} />
				</button>
				<h3 className="text-center-info">Quy hoạch chi tiết</h3>
				<button className="btn-close-info" onClick={handleToggleClose}>
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
				Thông tin dự án
			</div>
			<div className="div-box-info">
				<SectionRow6 name={"Tên dự án:"} value={dataQHCT.tenduan} />
				<SectionRow6 name={"Quận/Huyện:"} value={"TP.Thủ Đức"} />
				<SectionRow6
					name={"Diện tích (ha):"}
					value={parseFloat(dataQHCT.dientich).toFixed(2)}
				/>
				<SectionRow6 name={"Trạng thái:"} value={"Đã duyệt"} />
				<SectionRow6 name={"Cơ quan phê duyệt:"} value={dataQHCT.coquanpd} />
				<SectionRow6 name={"Số quyết định:"} value={dataQHCT.soqd} />
			</div>
		</>
	);
}

export default InformationOfQHCT;
