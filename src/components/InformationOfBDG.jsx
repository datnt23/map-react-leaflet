import { actions, useStore } from "../store";
import { RowCol6 } from "./Functions";
import iconClose from "/src/img/close-icon-button.png";
import iconArrow from "/src/img/arrow-icon.png";
function InformationOfBDG() {
	const [state, dispatch] = useStore();
	const { data, displayFullMapBDG } = state;
	const handleGetDCCB = (obj) => {
		dispatch(actions.setDisplayDCCBofBDG(true));
		dispatch(actions.setDisplayFullMapBDG(false));
		dispatch(actions.setDataDCCBofBDG(obj));
	};
	const handleDCCBofBDG = (obj, index) => {
		return (
			<div className="row-mt-2" key={index} onClick={() => handleGetDCCB(obj)}>
				<div className="col-12">
					{obj.SoQD} {obj.NgayDuyet}{" "}
					<img src={iconArrow} style={{ width: 30 }} />
				</div>
			</div>
		);
	};
	const handleToggleClose = () => {
		dispatch(actions.setDisplayDataInformation(false));
		dispatch(actions.setData({}));
		dispatch(actions.setDisplayFullMapBDG(false));
		dispatch(actions.setDisplayDCCBofBDG(false));
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
				<h3 className="text-center-info">Thông tin đồ án</h3>
				<button className="btn-close-info" onClick={handleToggleClose}>
					<img src={iconClose} width={20} height={20} />
				</button>
			</div>
			<div className="div-scroll-info">
				<div className="div-box-info">
					<div className="section">
						<RowCol6 name={"Tên đồ án:"} value={data.TenDoAn} />
						<RowCol6 name={"Số quyết định:"} value={data.SoQD} />
						<RowCol6 name={"Ngày phê duyệt:"} value={data.NgayDuyet} />
						<RowCol6 name={"Cơ quan phê duyệt:"} value={data.CoQuanPD} />
						<RowCol6 name={"Chủ đầu tư:"} value={data.ChuDauTu} />
						<RowCol6 name={"Diện tích (ha):"} value={data.DienTich} />
						<RowCol6 name={"Dân số quy hoạch:"} value={data.DanSoQH} />
						<RowCol6 name={"Đơn vị tư vấn thiết kế:"} value={data.DonViTVTK} />
					</div>
				</div>
				{!data.DCCB.length ? (
					<></>
				) : (
					<>
						<div
							style={{
								width: "420px",
								height: "20px",
								textAlign: "center",
								fontSize: 20,
								alignItems: "center",
							}}
						>
							Danh sách đồ án điều chỉnh cục bộ
						</div>
						<div className="div-box-info">
							<div className="section">
								{data.DCCB.map((obj, index) => (
									<>{handleDCCBofBDG(obj, index)}</>
								))}
							</div>
						</div>
					</>
				)}
				<button style={{ cursor: "pointer" }} onClick={handleViewFullMap}>
					{displayFullMapBDG ? "Thu nhỏ" : "Xem Đầy Đủ"}
				</button>
			</div>
		</>
	);
}

export default InformationOfBDG;
