import {
	Document,
	StyleSheet,
	Page,
	Text,
	Font,
	Image,
} from "@react-pdf/renderer";
import RobotoFont from "../fonts/Roboto/Roboto-Regular.ttf";
import RobotoFontBold from "../fonts/Roboto/Roboto-Bold.ttf";
import image from "../img/Image.jpg";
import ItemTable from "./tablePDF/ItemTable";
Font.register({
	family: "Roboto",
	src: RobotoFont,
});
Font.register({
	family: "Roboto-Bold",
	src: RobotoFontBold,
});
function PDFFile({ data }) {
	const thongTinChung = JSON.parse(data.ThongTinChung);
	const dccb = JSON.parse(data.DCCB);
	const styles = StyleSheet.create({
		body: {
			paddingTop: 40,
			paddingBottom: 40,
			paddingHorizontal: 30,
		},
		header: {
			fontSize: 23,
			marginBottom: 20,
			textAlign: "center",
			fontFamily: "Roboto-Bold",
		},
		heading: {
			fontSize: 14,
			textAlign: "justify",
			fontFamily: "Roboto-Bold",
		},
		text: {
			paddingTop: 2,
			paddingLeft: 3,
			fontSize: 13,
			textAlign: "justify",
			fontFamily: "Roboto",
		},
		page: {
			flexDirection: "column",
			backgroundColor: "#E4E4E4",
		},
		pageNumber: {
			position: "absolute",
			fontSize: 12,
			bottom: 30,
			left: 0,
			right: 0,
			textAlign: "center",
			color: "grey",
		},
	});
	const handleSoQD = (qhpk) => {
		let so;
		qhpk.forEach((a) => {
			so = a.soqd;
		});
		return so;
	};
	const handleNgayDuyet = (qhpk) => {
		let ngay;
		qhpk.forEach((a) => {
			ngay = a.ngayduyet;
		});
		return ngay;
	};
	const handleTenDoAn = (qhpk) => {
		let ten;
		qhpk.forEach((a) => {
			ten = a.tendoan;
		});
		return ten;
	};
	const handleTenDCCB = (dccb) => {
		let ten;
		dccb.forEach((a) => {
			ten = a.properties.tendccb;
		});
		return ten;
	};
	const handleSoQDDCCB = (qhpk) => {
		let so;
		qhpk.forEach((a) => {
			so = a.properties.soqd;
		});
		return so;
	};
	const handleNgayDuyetDCCB = (qhpk) => {
		let ngay;
		qhpk.forEach((a) => {
			ngay = a.properties.ngayduyet;
		});
		return ngay;
	};
	return (
		<Document>
			<Page size="A4" style={styles.body}>
				<Text
					style={{
						margin: 4,
						fontSize: 14,
						textAlign: "justify",
						fontFamily: "Roboto",
					}}
				>
					ỦY BAN NHÂN DÂN TP. THỦ ĐỨC
				</Text>
				<Text style={styles.header}>THÔNG TIN QUY HOẠCH</Text>
				<Text style={styles.heading}>I. Thông tin chung</Text>
				<Text style={styles.text}>+ Số thửa: {thongTinChung.sothua}</Text>
				<Text style={styles.text}>+ Số tờ: {thongTinChung.soto}</Text>
				<Text style={styles.text}>
					+ Diện tích: {parseFloat(thongTinChung.dientich)}m²
				</Text>
				<Text style={styles.text}>
					+ Thời gian cấp:{" "}
					{new Date().getHours() + ":" + new Date().getMinutes()}{" "}
					{new Date().toLocaleDateString("en-GB")}
				</Text>
				<Text
					style={{
						paddingTop: 2,
						paddingLeft: 20,
						fontSize: 13,
						textAlign: "justify",
						fontFamily: "Roboto",
					}}
				>
					- Đồ án "
					<Text
						style={{
							fontSize: 13,
							textAlign: "justify",
							fontFamily: "Roboto-Bold",
						}}
					>
						{handleTenDoAn(thongTinChung.dsttdoan)}
					</Text>
					" đã được UBND Thành phố Hồ Chí Minh phê duyệt tại Quyết định số{" "}
					{handleSoQD(thongTinChung.dsttdoan)} ngày{" "}
					{handleNgayDuyet(thongTinChung.dsttdoan)}
				</Text>
				{!dccb.length ? null : (
					<Text
						style={{
							paddingTop: 2,
							paddingLeft: 20,
							fontSize: 13,
							textAlign: "justify",
							fontFamily: "Roboto",
						}}
					>
						- Đồ án "
						<Text
							style={{
								fontSize: 13,
								textAlign: "justify",
								fontFamily: "Roboto-Bold",
							}}
						>
							{handleTenDCCB(dccb)}
						</Text>
						" đã được UBND Thành phố Hồ Chí Minh phê duyệt tại Quyết định số{" "}
						{handleSoQDDCCB(dccb)} ngày {handleNgayDuyetDCCB(dccb)}
					</Text>
				)}
				<Text style={styles.heading}>II. Thông tin quy hoạch sử dụng đất</Text>
				<Image
					src={image}
					style={{
						marginLeft: "auto",
						marginRight: "auto",
						width: "400px",
						height: "400px",
					}}
				/>
				<ItemTable data={data} />
				<Text
					style={{
						paddingTop: 4,
						paddingLeft: 3,
						fontSize: 13,
						textAlign: "justify",
						fontFamily: "Roboto",
						color: "#ff3d51",
					}}
				>
					Lưu ý: Kết quả tra cứu chỉ có giá trị tham khảo thông tin về chức năng
					sử dụng đất. Trong trường hợp cần cung cấp thông tin quy hoạch chi
					tiết hơn, đề nghị ông/bà liên hệ Ủy ban nhân dân TP. THỦ ĐỨC.
				</Text>
				<Text
					style={styles.pageNumber}
					render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`}
					fixed
				/>
			</Page>
		</Document>
	);
}

export default PDFFile;
