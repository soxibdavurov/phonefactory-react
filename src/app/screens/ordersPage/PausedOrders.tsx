import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Messages } from "../../../lib/config";
import { Order, OrderUpdateInput } from "../../../lib/types/order";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../stores/slices/useGlobals";
import OrderService from "../../services/OrdersService";
import OrderCardList from "./OrderCard";
import { useTranslation } from "react-i18next";

const pausedOrdersRetriever = createSelector(
    retrievePausedOrders,
    (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
    setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
    const { setValue } = props;
    const { t } = useTranslation();
    const { authMember, setOrderBuilder } = useGlobals();
    const { pausedOrders } = useSelector(pausedOrdersRetriever);

    const updateStatus = async (orderId: string, orderStatus: OrderStatus, question: string) => {
        try {
            if (!authMember) throw new Error(Messages.error2);
            if (!window.confirm(question)) return;
            const input: OrderUpdateInput = { orderId, orderStatus };
            const order = new OrderService();
            await order.updateOrder(input);
            if (orderStatus === OrderStatus.PROCESS) setValue("2");
            setOrderBuilder(new Date());
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <TabPanel value={"1"}>
            <div className="order-panel">
            <OrderCardList
                orders={pausedOrders}
                emptyText={t("orders.emptyPay")}
                actions={(order: Order) => (
                    <>
                        <Button
                            variant="outlined"
                            className="cancel-button"
                            onClick={() => updateStatus(order._id, OrderStatus.DELETE, String(t("orders.cancelAsk")))}
                        >
                            {t("orders.cancel")}
                        </Button>
                        <Button
                            variant="contained"
                            className="pay-button"
                            onClick={() => updateStatus(order._id, OrderStatus.PROCESS, String(t("orders.payAsk")))}
                        >
                            {t("orders.pay")}
                        </Button>
                    </>
                )}
            />
            </div>
        </TabPanel>
    );
}
