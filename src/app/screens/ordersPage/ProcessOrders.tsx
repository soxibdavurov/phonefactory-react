import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Messages } from "../../../lib/config";
import { Order, OrderUpdateInput } from "../../../lib/types/order";
import { useGlobals } from "../../stores/slices/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrdersService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderCardList from "./OrderCard";
import { useTranslation } from "react-i18next";

const processOrdersRetriever = createSelector(
    retrieveProcessOrders,
    (processOrders) => ({ processOrders })
);

interface ProcessOrdersProps {
    setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
    const { setValue } = props;
    const { t } = useTranslation();
    const { processOrders } = useSelector(processOrdersRetriever);
    const { authMember, setOrderBuilder } = useGlobals();

    const finishOrder = async (order: Order) => {
        try {
            if (!authMember) throw new Error(Messages.error2);
            if (!window.confirm(String(t("orders.receivedAsk")))) return;
            const input: OrderUpdateInput = {
                orderId: order._id,
                orderStatus: OrderStatus.FINISH,
            };
            const service = new OrderService();
            await service.updateOrder(input);
            setValue("3");
            setOrderBuilder(new Date());
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <TabPanel value={"2"}>
            <div className="order-panel">
            <OrderCardList
                orders={processOrders}
                emptyText={t("orders.emptyProgress")}
                actions={(order) => (
                    <Button
                        variant="contained"
                        className="verify-button"
                        onClick={() => finishOrder(order)}
                    >
                        {t("orders.received")}
                    </Button>
                )}
            />
            </div>
        </TabPanel>
    );
}
