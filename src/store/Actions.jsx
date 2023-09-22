import {
	SET_CONTROL_OPACITY,
	SET_DATA,
	SET_DATA_BDG,
	SET_DATA_KHSDD,
	SET_DATA_QHPK,
	SET_DATA_QHSDD,
	SET_DATA_GEOJSON,
	SET_DATA_GEOJSON_CNSDD,
	SET_DATA_GEOJSON_DCCB,
	SET_DATA_GEOJSON_DCCB_Of_BDG,
	SET_DATA_GEOJSON_QHCT,
	SET_DATA_GEOJSON_RANH_Of_BDG,
	SET_DISPLAY_BDG,
	SET_DISPLAY_CNSDD,
	SET_DISPLAY_DATA_INFORMATION,
	SET_DISPLAY_DCCB_Of_BDG,
	SET_DISPLAY_FULL_MAP_BDG,
	SET_DISPLAY_KHSDD,
	SET_DISPLAY_QHPK,
	SET_DISPLAY_QHSDD,
	SET_DISPLAY_SEARCH,
	SET_DISPLAY_STATELLITE,
	SET_DISPLAY_STREET,
	SET_DISPLAY_TABLE_LAYERS,
	SET_FILE_COORDS,
	SET_IS_LOADING,
	SET_DISPLAY_QHCT,
	SET_DISPLAY_DCCB,
	SET_DATA_DCCB_Of_BDG,
	SET_DATA_DCCB,
	SET_DATA_QHCT,
	SET_DATA_CNSDD,
} from "./Constants";
//-----------------------Set Data---------------------------//
export const setData = (payload) => ({
	type: SET_DATA,
	payload,
});
export const setDisplayDataInformation = (payload) => ({
	type: SET_DISPLAY_DATA_INFORMATION,
	payload,
});
export const setDataGeoJson = (payload) => ({
	type: SET_DATA_GEOJSON,
	payload,
});
export const setIsLoading = (payload) => ({
	type: SET_IS_LOADING,
	payload,
});
export const setControlOpacity = (payload) => ({
	type: SET_CONTROL_OPACITY,
	payload,
});
export const setDisplayTableLayers = (payload) => ({
	type: SET_DISPLAY_TABLE_LAYERS,
	payload,
});
export const setDisplayStreet = (payload) => ({
	type: SET_DISPLAY_STREET,
	payload,
});
export const setDisplayStatellite = (payload) => ({
	type: SET_DISPLAY_STATELLITE,
	payload,
});
export const setDisplaySearch = (payload) => ({
	type: SET_DISPLAY_SEARCH,
	payload,
});
export const setFileCoords = (payload) => ({
	type: SET_FILE_COORDS,
	payload,
});
//CNSDD:-------------------------
export const setDataGeoJsonCNSDD = (payload) => ({
	type: SET_DATA_GEOJSON_CNSDD,
	payload,
});
export const setDataCNSDD = (payload) => ({
	type: SET_DATA_CNSDD,
	payload,
});
export const setDisplayCNSDD = (payload) => ({
	type: SET_DISPLAY_CNSDD,
	payload,
});
//QHPK:-------------------------------------------
export const setDataQHPK = (payload) => ({
	type: SET_DATA_QHPK,
	payload,
});
export const setDisplayQHPK = (payload) => ({
	type: SET_DISPLAY_QHPK,
	payload,
});
//QHSDD:-------------------------------------------
export const setDataQHSDD = (payload) => ({
	type: SET_DATA_QHSDD,
	payload,
});
export const setDisplayQHSDD = (payload) => ({
	type: SET_DISPLAY_QHSDD,
	payload,
});
//QHPK:-------------------------------------------
export const setDataKHSDD = (payload) => ({
	type: SET_DATA_KHSDD,
	payload,
});
export const setDisplayKHSDD = (payload) => ({
	type: SET_DISPLAY_KHSDD,
	payload,
});
//QHPK:-------------------------------------------
export const setDataBDG = (payload) => ({
	type: SET_DATA_BDG,
	payload,
});
export const setDisplayBDG = (payload) => ({
	type: SET_DISPLAY_BDG,
	payload,
});
//QHCT:-----------------------------------------
export const setDataGeoJsonQHCT = (payload) => ({
	type: SET_DATA_GEOJSON_QHCT,
	payload,
});
export const setDataQHCT = (payload) => ({
	type: SET_DATA_QHCT,
	payload,
});
export const setDisplayQHCT = (payload) => ({
	type: SET_DISPLAY_QHCT,
	payload,
});
//DCCB:-------------------------------------------
export const setDataGeoJsonDCCB = (payload) => ({
	type: SET_DATA_GEOJSON_DCCB,
	payload,
});
export const setDataDCCB = (payload) => ({
	type: SET_DATA_DCCB,
	payload,
});
export const setDisplayDCCB = (payload) => ({
	type: SET_DISPLAY_DCCB,
	payload,
});
//DCCB of BDG:-------------------------------------------
export const setDataGeoJsonDCCBofBDG = (payload) => ({
	type: SET_DATA_GEOJSON_DCCB_Of_BDG,
	payload,
});
export const setDataDCCBofBDG = (payload) => ({
	type: SET_DATA_DCCB_Of_BDG,
	payload,
});
export const setDisplayDCCBofBDG = (payload) => ({
	type: SET_DISPLAY_DCCB_Of_BDG,
	payload,
});
//Ranh of BDG:-------------------------------------------
export const setDataGeoJsonRanhOfBDG = (payload) => ({
	type: SET_DATA_GEOJSON_RANH_Of_BDG,
	payload,
});
export const setDisplayFullMapBDG = (payload) => ({
	type: SET_DISPLAY_FULL_MAP_BDG,
	payload,
});
