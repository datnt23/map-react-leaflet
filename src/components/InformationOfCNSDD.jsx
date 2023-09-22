import { actions, useStore } from "../store";
import { SectionRow6 } from "./Functions";
import iconBack from "/src/img/back-icon-button.png";
import iconClose from "/src/img/close-icon-button.png";
function InformationOfCNSDD() {
	const [state, dispatch] = useStore();
	const { dataCNSDD } = state;
	const handleToggleDisplayCNSDD = () => {
		dispatch(actions.setDisplayCNSDD(false));
		dispatch(actions.setDataGeoJsonCNSDD([]));
	};
	const handleToggleClose = () => {
		dispatch(actions.setDisplayDataInformation(false));
		dispatch(actions.setDisplayCNSDD(false));
		dispatch(actions.setDataGeoJsonCNSDD([]));
	};
	return (
		<>
			<div className="div-header-info">
				<button className="btn-back-info" onClick={handleToggleDisplayCNSDD}>
					<img src={iconBack} width={20} height={20} />
				</button>
				<h3 className="text-center-info">Thông tin thửa đất</h3>
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
				Thông tin ô chức năng
			</div>
			<div className="div-box-info">
				<SectionRow6
					name={"Mã ô phố:"}
					value={dataCNSDD.maopho || "Đang cập nhật..."}
				/>
				<SectionRow6
					name={"Chức năng:"}
					value={dataCNSDD.chucnang || "Đang cập nhật..."}
				/>
				<SectionRow6
					name={"Dân số:"}
					value={dataCNSDD.danso || "Đang cập nhật..."}
				/>
				<SectionRow6
					name={"Diện tích:"}
					value={
						parseFloat(dataCNSDD.dientich).toFixed(2) || "Đang cập nhật..."
					}
				/>
				<SectionRow6
					name={"Mật độ xây dựng:"}
					value={dataCNSDD.matdo || "Đang cập nhật..."}
				/>
				<SectionRow6
					name={"Tầng cao:"}
					value={dataCNSDD.tangcao || "Đang cập nhật..."}
				/>
				<SectionRow6
					name={"Hệ số sử dụng đất:"}
					value={dataCNSDD.hesosdd || "Đang cập nhật..."}
				/>
			</div>
		</>
	);
}
export default InformationOfCNSDD;
