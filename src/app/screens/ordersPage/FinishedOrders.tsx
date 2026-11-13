import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import OrderCardList from "./OrderCard";
import { useTranslation } from "react-i18next";

const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
    const { finishedOrders } = useSelector(finishedOrdersRetriever);
    const { t } = useTranslation();

    return (
        <TabPanel value={"3"}>
            <div className="order-panel">
            <OrderCardList
                orders={finishedOrders}
                emptyText={t("orders.emptyFinished")}
            />
            </div>
        </TabPanel>
    );
}
