import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import TableHeader from "./TableHeader";
import TableRowData from "./TableRowData";
function ItemTable({ data }) {
	const styles = StyleSheet.create({
		tableContainer: {
			flexDirection: "row",
			flexWrap: "wrap",
			marginTop: 24,
			borderWidth: 1,
			borderColor: "#000000",
		},
	});
	return (
		<View style={styles.tableContainer} break>
			<TableHeader />
			<TableRowData data={data} />
		</View>
	);
}

export default ItemTable;
