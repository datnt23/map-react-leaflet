import { actions, useStore } from "../store";
import { SectionRow6 } from "./Functions";
import iconBack from "/src/img/back-icon-button.png";
import iconClose from "/src/img/close-icon-button.png";
function InformationOfDCCB() {
	const [state, dispatch] = useStore();
	const { dataDCCB } = state;
	const handleToggleDisplayDCCB = () => {
		dispatch(actions.setDisplayDCCB(false));
		dispatch(actions.setDataGeoJsonDCCB([]));
	};
	const handleToggleClose = () => {
		dispatch(actions.setDisplayDataInformation(false));
		dispatch(actions.setDisplayDCCB(false));
		dispatch(actions.setDataGeoJsonDCCB([]));
	};
	return (
		<>
			<div className="div-header-info">
				<button className="btn-back-info" onClick={handleToggleDisplayDCCB}>
					<img src={iconBack} width={20} height={20} />
				</button>
				<h3 className="text-center-info">Điều chỉnh cục bộ</h3>
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
				Thông tin điều chỉnh cục bộ
			</div>
			<div className="div-box-info">
				<SectionRow6 name={"Tên dự án:"} value={dataDCCB.tendccb} />
				<SectionRow6
					name={"Diện tích (ha):"}
					value={parseFloat(dataDCCB.dientich).toFixed(2)}
				/>
				<SectionRow6 name={"Trạng thái:"} value={"Đã duyệt"} />
				<SectionRow6 name={"Cơ quan phê duyệt:"} value={dataDCCB.coquanpd} />
				<SectionRow6 name={"Số quyết định:"} value={dataDCCB.soqd} />
				<SectionRow6 name={"Ngày duyệt:"} value={dataDCCB.ngayduyet} />
			</div>
		</>
	);
}

export default InformationOfDCCB;
