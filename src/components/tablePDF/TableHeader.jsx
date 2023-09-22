import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import RobotoFontBold from "../../fonts/Roboto/Roboto-Bold.ttf";
Font.register({
	family: "Roboto-Bold",
	src: RobotoFontBold,
});
function TableHeader() {
	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			borderBottomColor: "#000000",
			borderBottomWidth: 1,
			alignItems: "center",
			height: 20,
			textAlign: "center",
			fontFamily: "Roboto-Bold",
			fontSize: 14,
			flexGrow: 1,
		},
		stt: {
			width: "10%",
			borderRightColor: "#000000",
			borderRightWidth: 1,
		},
		func: {
			width: "60%",
			borderRightColor: "#000000",
			borderRightWidth: 1,
		},
		dt: {
			width: "30%",
		},
	});
	return (
		<View style={styles.container}>
			<Text style={styles.stt}>STT</Text>
			<Text style={styles.func}>Chức năng</Text>
			<Text style={styles.dt}>Diện tích (m²)</Text>
		</View>
	);
}

export default TableHeader;
