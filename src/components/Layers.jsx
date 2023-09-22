import { TileLayer } from "react-leaflet";
import { useStore } from "../store";

function Layers() {
	const [state, dispatch] = useStore();
	const {
		data,
		displayQHPK,
		displayQHSDD,
		displayKHSDD,
		displayBDG,
		controlOpacity,
		displayDCCBofBDG,
		dataDCCBofBDG,
		displayFullMapBDG,
	} = state;
	const layers = [
		{
			check: displayQHPK,
			name: "PKSDD",
			url: "https://sqhkt-qlqh.tphcm.gov.vn/api/tiles/thuduc_qhpksdd/{z}/{x}/{y}",
		},
		{
			check: displayQHSDD,
			name: "QHSDD",
			url: "https://sqhkt-qlqh.tphcm.gov.vn/api/tiles/thuduc_qhsdd/{z}/{x}/{y}",
		},
		{
			check: displayKHSDD,
			name: "KHSDD",
			url: "https://sqhkt-qlqh.tphcm.gov.vn/api/tiles/thuduc_khsdd/{z}/{x}/{y}",
		},
		{
			check: displayBDG,
			name: "BDG",
			url: "https://sqhkt-qlqh.tphcm.gov.vn/api/tiles_ranhqhpk/762_763_769/{z}/{x}/{y}",
		},
	];
	return (
		<>
			{layers.map(
				(layer, index) =>
					layer.check &&
					(layer.name === "BDG" ? (
						<>
							<TileLayer
								key={index}
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url={layer.url}
								opacity={controlOpacity}
							/>
							{displayDCCBofBDG ? (
								<>
									{displayFullMapBDG ? (
										<TileLayer
											attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
											url={`https://sqhkt-qlqh.tphcm.gov.vn/api/tiles/dccb_full/${dataDCCBofBDG.MaDCCBRanh}/{z}/{x}/{y}`}
										/>
									) : (
										<TileLayer
											attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
											url={`https://sqhkt-qlqh.tphcm.gov.vn/api/tiles/dccb_crop/${dataDCCBofBDG.MaDCCBRanh}/{z}/{x}/{y}`}
										/>
									)}
								</>
							) : (
								<>
									{displayFullMapBDG ? (
										<TileLayer
											attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
											url={`https://sqhkt-qlqh.tphcm.gov.vn/api/tiles/qhpk_full/${data.MaQHPKRanh}/{z}/{x}/{y}`}
										/>
									) : (
										<TileLayer
											attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
											url={`https://sqhkt-qlqh.tphcm.gov.vn/api/tiles/qhpk_crop/${data.MaQHPKRanh}/{z}/{x}/{y}`}
										/>
									)}
								</>
							)}
						</>
					) : (
						<TileLayer
							key={index}
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url={layer.url}
							opacity={controlOpacity}
						/>
					))
			)}
		</>
	);
}

export default Layers;
