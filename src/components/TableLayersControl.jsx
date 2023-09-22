import { actions, useStore } from "../store";
import { FigureCol6Item } from "./Functions";
import iconClose from "/src/img/close-icon-button.png";
import streetLayer from "/src/img/basic-layer.png";
import statelliteLayer from "/src/img/earth-layer.png";
import layerQHPK from "/src/img/ttqh.png";
import layerQHSDD from "/src/img/layer-qhsdd.png";
import layerKHSDD from "/src/img/layer-qhsdd.png";
import layerBDG from "/src/img/layer-scan.png";

function TableLayersControl() {
	const [state, dispatch] = useStore();
	const {
		displayStreet,
		displayStatellite,
		displayQHPK,
		displayQHSDD,
		displayBDG,
		displayKHSDD,
	} = state;
	const handleClickClose = () => {
		dispatch(actions.setDisplayTableLayers(false));
	};
	return (
		<div className="block-mode">
			<div className="blockmode-header">
				Chọn kiểu hiển thị
				<img
					className="blockmode-header-close"
					src={iconClose}
					style={{
						float: "right",
						width: 15,
						padding: "4px",
						marginRight: "-6px",
						cursor: "pointer",
					}}
					onClick={handleClickClose}
				/>
				<div style={{ clear: "both" }} />
			</div>
			<div className="blockmode-content">
				<div className="content-title">Loại nền bản đồ</div>
				<div className="row-block">
					<FigureCol6Item
						src={streetLayer}
						border={displayStreet}
						value={"streetLayer"}
						name={"Nền bản đồ"}
					/>
					<FigureCol6Item
						src={statelliteLayer}
						border={displayStatellite}
						value={"statelliteLayer"}
						name={"Nền vệ tinh"}
					/>
				</div>
				<hr />
				<div className="content-title">Loại bản đồ</div>
				<div className="row-block">
					<FigureCol6Item
						src={layerQHPK}
						border={displayQHPK}
						value={"layerQHPK"}
						name={"Quy hoạch phân khu SDĐ"}
					/>
					<FigureCol6Item
						src={layerKHSDD}
						border={displayKHSDD}
						value={"layerKHSDD"}
						name={"Kế hoạch sử dụng đất"}
					/>
					<FigureCol6Item
						src={layerQHSDD}
						border={displayQHSDD}
						value={"layerQHSDD"}
						name={"Quy hoạch sử dụng đất"}
					/>
					<FigureCol6Item
						src={layerBDG}
						border={displayBDG}
						value={"layerBDG"}
						name={"Bản đồ giấy"}
					/>
				</div>
			</div>
		</div>
	);
}

export default TableLayersControl;
