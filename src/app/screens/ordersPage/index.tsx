import TabContext from "@mui/lab/TabContext";
import { Box } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrdersService";
import { useGlobals } from "../../stores/slices/useGlobals";
import { useHistory } from "react-router-dom";
import "../../../css/order.css";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import { retrieveFinishedOrders, retrievePausedOrders, retrieveProcessOrders } from "./selector";
import { useTranslation } from "react-i18next";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

const roleLabel = (type: string | undefined, t: (key: string) => string) => {
  if (type === MemberType.MOBILESHOP) return t("orders.shop");
  if (type === MemberType.USER) return t("orders.customer");
  return type || "";
};

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } = actionDispatch(useDispatch());
  const { authMember, orderBuilder } = useGlobals();
  const history = useHistory();
  const { t } = useTranslation();
  const [value, setValue] = useState("1");
  const [orderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });
  const pausedOrders = useSelector(retrievePausedOrders);
  const processOrders = useSelector(retrieveProcessOrders);
  const finishedOrders = useSelector(retrieveFinishedOrders);

  useEffect(() => {
    if (!authMember) history.replace("/");
  }, [authMember, history]);

  useEffect(() => {
    if (!authMember) return;
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder, authMember]);

  const handleChange = (_e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) return null;

  const count = (list: Order[] | null) => (list?.length ? ` (${list.length})` : "");

  return (
    <div className="order-page">
      <div className="order-wrap">
        <header className="order-head">
          <h1>{t("orders.title")}</h1>
          <p>{t("orders.lead")}</p>
        </header>

        <div className="order-layout">
          <section className="order-main">
            <TabContext value={value}>
              <Box className="order-nav-frame">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Order status"
                  variant="scrollable"
                  scrollButtons="auto"
                  className="order-tabs"
                >
                  <Tab label={`${t("orders.toPay")}${count(pausedOrders)}`} value="1" />
                  <Tab label={`${t("orders.progress")}${count(processOrders)}`} value="2" />
                  <Tab label={`${t("orders.finished")}${count(finishedOrders)}`} value="3" />
                </Tabs>
              </Box>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </TabContext>
          </section>

          <aside className="order-side">
            <div className="order-profile">
              <img
                src={
                  authMember.memberImage
                    ? `${serverApi}/${authMember.memberImage}`
                    : "/icons/default-user.svg"
                }
                alt=""
                className="order-avatar"
              />
              <div>
                <p className="order-profile-name">{authMember.memberNick}</p>
                <p className="order-profile-role">{roleLabel(authMember.memberType, t)}</p>
                <p className="order-profile-address">
                  {authMember.memberAddress || t("orders.noAddress")}
                </p>
              </div>
            </div>
            <div className="order-steps">
              <h2>{t("orders.how")}</h2>
              <ol>
                <li><strong>{t("orders.toPay")}.</strong> {t("orders.stepPay")}</li>
                <li><strong>{t("orders.progress")}.</strong> {t("orders.stepProgress")}</li>
                <li><strong>{t("orders.finished")}.</strong> {t("orders.stepFinished")}</li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
