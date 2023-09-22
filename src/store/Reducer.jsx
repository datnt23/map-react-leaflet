import {
	SET_CONTROL_OPACITY,
	SET_DATA,
	SET_DATA_BDG,
	SET_DATA_CNSDD,
	SET_DATA_DCCB,
	SET_DATA_DCCB_Of_BDG,
	SET_DATA_GEOJSON,
	SET_DATA_GEOJSON_CNSDD,
	SET_DATA_GEOJSON_DCCB,
	SET_DATA_GEOJSON_DCCB_Of_BDG,
	SET_DATA_GEOJSON_QHCT,
	SET_DATA_GEOJSON_RANH_Of_BDG,
	SET_DATA_KHSDD,
	SET_DATA_QHCT,
	SET_DATA_QHPK,
	SET_DATA_QHSDD,
	SET_DISPLAY_BDG,
	SET_DISPLAY_CNSDD,
	SET_DISPLAY_DATA_INFORMATION,
	SET_DISPLAY_DCCB,
	SET_DISPLAY_DCCB_Of_BDG,
	SET_DISPLAY_FULL_MAP_BDG,
	SET_DISPLAY_KHSDD,
	SET_DISPLAY_QHCT,
	SET_DISPLAY_QHPK,
	SET_DISPLAY_QHSDD,
	SET_DISPLAY_SEARCH,
	SET_DISPLAY_STATELLITE,
	SET_DISPLAY_STREET,
	SET_DISPLAY_TABLE_LAYERS,
	SET_FILE_COORDS,
	SET_IS_LOADING,
} from "./Constants";
const initState = {
	//Data:---------------------------------------------------
	center: { lat: 10.829829938889858, lng: 106.76179012254107 },
	data: {},
	displayDataInformation: false,
	isLoading: false,
	controlOpacity: 1,
	displayTableLayers: false,
	displayStreet: true,
	displayStatellite: false,
	dataGeoJson: [],
	displaySearch: false,
	fileCoords: [],
	//CNSDD:
	displayCNSDD: false,
	dataGeoJsonCNSDD: [],
	dataCNSDD: {},
	//QHPK:
	dataQHPK: [],
	displayQHPK: true,
	//QHSDD:
	dataQHSDD: [],
	displayQHSDD: false,
	//BDG:
	dataBDG: [],
	displayBDG: false,
	//KHSDD:
	dataKHSDD: [],
	displayKHSDD: false,
	//QHCT:
	dataGeoJsonQHCT: [],
	dataQHCT: {},
	displayQHCT: false,
	//DCCB:
	dataGeoJsonDCCB: [],
	dataDCCB: {},
	displayDCCB: false,
	//DCCB of BDG:
	dataGeoJsonDCCBofBDG: [],
	dataDCCBofBDG: {},
	displayDCCBofBDG: false,
	//Ranh of BDG:
	dataGeoJsonRanhOfBDG: [],
	displayFullMapBDG: false,
};
function Reducer(state, action) {
	switch (action.type) {
		//Data:----------------------------
		case SET_DATA:
			return {
				...state,
				data: action.payload,
			};
		case SET_DISPLAY_DATA_INFORMATION:
			return {
				...state,
				displayDataInformation: action.payload,
			};
		case SET_IS_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		case SET_CONTROL_OPACITY:
			return {
				...state,
				controlOpacity: action.payload,
			};
		case SET_DISPLAY_TABLE_LAYERS:
			return {
				...state,
				displayTableLayers: action.payload,
			};
		case SET_DISPLAY_STREET:
			return {
				...state,
				displayStatellite: false,
				displayStreet: action.payload,
			};
		case SET_DISPLAY_STATELLITE:
			return {
				...state,
				displayStreet: false,
				displayStatellite: action.payload,
			};
		case SET_DATA_GEOJSON:
			return {
				...state,
				dataGeoJson: action.payload,
			};
		case SET_DISPLAY_SEARCH:
			return {
				...state,
				displaySearch: action.payload,
			};
		case SET_FILE_COORDS:
			return {
				...state,
				fileCoords: action.payload,
			};
		//CNSDD:-----------------
		case SET_DATA_GEOJSON_CNSDD:
			return {
				...state,
				dataGeoJsonCNSDD: action.payload,
			};
		case SET_DATA_CNSDD:
			return {
				...state,
				dataCNSDD: action.payload,
			};
		case SET_DISPLAY_CNSDD:
			return {
				...state,
				displayCNSDD: action.payload,
			};
		//QHPK:---------------------------------
		case SET_DATA_QHPK:
			return {
				...state,
				dataQHSDD: [],
				dataKHSDD: [],
				dataQHPK: action.payload,
			};
		case SET_DISPLAY_QHPK:
			return {
				...state,
				dataGeoJsonDCCBofBDG: [],
				dataGeoJsonRanhOfBDG: [],
				displayBDG: false,
				displayQHSDD: false,
				displayKHSDD: false,
				displayQHPK: action.payload,
			};
		//BDG:---------------------------------
		case SET_DATA_BDG:
			return {
				...state,
				dataQHPK: [],
				dataQHSDD: [],
				dataKHSDD: [],
				dataBDG: action.payload,
			};
		case SET_DISPLAY_BDG:
			return {
				...state,
				displayQHPK: false,
				displayQHSDD: false,
				displayKHSDD: false,
				displayBDG: action.payload,
			};
		//QHSDD:---------------------------------
		case SET_DATA_QHSDD:
			return {
				...state,
				dataQHPK: [],
				dataKHSDD: [],
				dataQHSDD: action.payload,
			};
		case SET_DISPLAY_QHSDD:
			return {
				...state,
				dataGeoJsonDCCBofBDG: [],
				dataGeoJsonRanhOfBDG: [],
				displayQHPK: false,
				displayBDG: false,
				displayKHSDD: false,
				displayQHSDD: action.payload,
			};
		//QHSDD:---------------------------------
		case SET_DATA_KHSDD:
			return {
				...state,
				dataQHPK: [],
				dataQHSDD: [],
				dataKHSDD: action.payload,
			};
		case SET_DISPLAY_KHSDD:
			return {
				...state,
				dataGeoJsonDCCBofBDG: [],
				dataGeoJsonRanhOfBDG: [],
				displayQHPK: false,
				displayQHSDD: false,
				displayBDG: false,
				displayKHSDD: action.payload,
			};
		//QHCT:---------------------------------
		case SET_DATA_GEOJSON_QHCT:
			return {
				...state,
				dataGeoJsonQHCT: action.payload,
			};
		case SET_DATA_QHCT:
			return {
				...state,
				dataQHCT: action.payload,
			};
		case SET_DISPLAY_QHCT:
			return {
				...state,
				displayQHCT: action.payload,
			};
		//DCCB:---------------------------------
		case SET_DATA_GEOJSON_DCCB:
			return {
				...state,
				dataGeoJsonDCCB: action.payload,
			};
		case SET_DATA_DCCB:
			return {
				...state,
				dataDCCB: action.payload,
			};
		case SET_DISPLAY_DCCB:
			return {
				...state,
				displayDCCB: action.payload,
			};
		//DCCB of BDG:---------------------------------
		case SET_DATA_GEOJSON_DCCB_Of_BDG:
			return {
				...state,
				dataGeoJsonDCCBofBDG: action.payload,
			};
		case SET_DATA_DCCB_Of_BDG:
			return {
				...state,
				dataDCCBofBDG: action.payload,
			};
		case SET_DISPLAY_DCCB_Of_BDG:
			return {
				...state,
				dataGeoJsonRanhOfBDG: [],
				dataGeoJsonDCCBofBDG: [],
				dataDCCBofBDG: {},
				displayDCCBofBDG: action.payload,
			};
		//DCCB of BDG:---------------------------------
		case SET_DATA_GEOJSON_RANH_Of_BDG:
			return {
				...state,
				dataGeoJsonRanhOfBDG: action.payload,
			};
		case SET_DISPLAY_FULL_MAP_BDG:
			return {
				...state,
				displayFullMapBDG: action.payload,
			};
		default:
			throw new Error("Invalid Actions!");
	}
}
export { initState };
export default Reducer;
