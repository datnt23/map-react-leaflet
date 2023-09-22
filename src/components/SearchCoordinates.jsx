import { useRef } from "react";
import { actions, useStore } from "../store";
import iconClose from "/src/img/close-icon-button.png";
function SearchCoordinates() {
	const [state, dispatch] = useStore();
	const inputRef = useRef(null);
	const handleToggleDisplaySearch = () => {
		dispatch(actions.setDisplaySearch(false));
	};

	const handleUploadFile = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = () => {
			let fileCoords = reader.result.split("\n").map((arr) => {
				return arr.split(" ").map(Number);
			});
			dispatch(actions.setFileCoords(fileCoords));
		};
		reader.onerror = () => {
			console.log(reader.error);
		};
	};
	return (
		<div className="div-info">
			<div className="div-header-info">
				<h3 className="text-center-info">Tìm Kiếm</h3>
				<button className="btn-close-info" onClick={handleToggleDisplaySearch}>
					<img src={iconClose} width={20} height={20} />
				</button>
			</div>
			<div className="div-box-info">
				<div className="section">
					<div className="row">
						<button
							className="col-btn"
							onClick={() => inputRef.current.click()}
						>
							Upload file
						</button>
						<input
							type={"file"}
							ref={inputRef}
							onChange={handleUploadFile}
							style={{ display: "none" }}
							accept={".txt"}
						/>
						<button className="col-btn">Tìm kiếm</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchCoordinates;
