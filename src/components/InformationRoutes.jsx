import { useEffect } from "react";
import InformationOfCNSDD from "./InformationOfCNSDD";
import { actions, useStore } from "../store";
import InformationLayers from "./InformationLayers";
import InformationOfQHCT from "./InformationOfQHCT";
import InformationOfDCCB from "./InformationOfDCCB";
function InformationRoutes() {
	const [state, dispatch] = useStore();
	const { data, displayCNSDD, displayQHCT, displayDCCB } = state;
	useEffect(() => {
		dispatch(actions.setDataQHPK(JSON.parse(data.QHPK)));
	}, [data]);
	return (
		<div className="div-info">
			{displayCNSDD ? (
				<InformationOfCNSDD />
			) : (
				<>
					{displayQHCT ? (
						<InformationOfQHCT />
					) : (
						<>{displayDCCB ? <InformationOfDCCB /> : <InformationLayers />}</>
					)}
				</>
			)}
		</div>
	);
}

export default InformationRoutes;
