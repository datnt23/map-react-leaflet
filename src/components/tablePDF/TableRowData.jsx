import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import RobotoFont from "../../fonts/Roboto/Roboto-Regular.ttf";
Font.register({
	family: "Roboto",
	src: RobotoFont,
});
function TableRowData({ data }) {
	const styles = StyleSheet.create({
		row: {
			flexDirection: "row",
			borderBottomColor: "#000000",
			borderBottomWidth: 1,
			alignItems: "center",
			fontSize: 13,
			height: 20,
			fontFamily: "Roboto",
		},
		stt: {
			width: "10%",
			borderRightColor: "#000000",
			borderRightWidth: 1,
			textAlign: "center",
			paddingRight: 8,
		},
		func: {
			width: "60%",
			textAlign: "left",
			borderRightColor: "#000000",
			borderRightWidth: 1,
			paddingLeft: 8,
		},
		dt: {
			width: "30%",
			textAlign: "left",
			paddingLeft: 8,
			paddingRight: 8,
		},
	});
	return (
		<>
			{JSON.parse(data.QHPK).map((obj, index) => (
				<View style={styles.row} key={index}>
					<Text style={styles.stt}>{index + 1}</Text>
					<Text style={styles.func}>{obj.properties.chucnang}</Text>
					<Text style={styles.dt}>
						Khoảng {parseFloat(obj.properties.dientich).toFixed(2)} m²
					</Text>
				</View>
			))}
		</>
	);
}

export default TableRowData;
