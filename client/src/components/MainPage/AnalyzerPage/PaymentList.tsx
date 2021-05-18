import { FC } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Divider, Input } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useInput from "../../../hooks/useInput";
import analyzerStore from "../../../@store/analyzerStore";
import { observer } from "mobx-react";
import useExchageClac from "../../../hooks/useExchangeCalc";
import LedgerModal from "./LedgerModal";

const PaymentList: FC = observer(() => {
  const [currentExchage, setCurrentExchage] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [budget, onChangeBudget] = useInput(null);
  const [isbudgetChange, setIsbudgetChage] = useState(false);

  let originalTotal = analyzerStore.originalTotal;

  const onClickDeleteBtn = useCallback((e) => {
    const data = e.currentTarget.dataset;
    analyzerStore.deletePaymentList(data.id, data.type, data.payment);
  }, []);

  const onChangeIsbudgetChange = useCallback(() => {
    if (isbudgetChange) {
      analyzerStore.setTotal(useExchageClac(budget, currentExchage));
    }
    setIsbudgetChage((prev) => !prev);
  }, [budget, currentExchage, isbudgetChange]);

  useEffect(() => {
    axios
      .get(
        `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_EXCHANGE_KEY}&symbols=KRW&format=1`
      )
      .then((res) => setCurrentExchage(Object.values(res.data.rates)[0] as number));
  }, []);

  return (
    <>
      <div className="analyzer_budget">
        <h2>
          Total your budget :{" "}
          {isbudgetChange ? (
            <Input
              onChange={onChangeBudget}
              value={budget}
              placeholder="USD"
              className="analyzer_budget_input"
              type="number"
              onPressEnter={onChangeIsbudgetChange}
            />
          ) : (
            originalTotal
          )}{" "}
          KRW
        </h2>
        <div className="analyzer_budget_btns">
          <a onClick={onChangeIsbudgetChange}>Budget Change</a>
          <a onClick={() => setIsModalVisible(true)}>Keep Ledger</a>
        </div>
      </div>
      {analyzerStore?.paymentList?.map((v, i) => {
        return (
          <ul className="analyzer_list" key={i}>
            <li className="sm_visible">
              <span>Rest : {((originalTotal as number) -= v.payment)} KRW </span>
              <a
                data-id={i}
                data-type={v.type}
                data-payment={v.payment}
                style={{ marginLeft: "0.5rem" }}
                className="delete_btn sm_visible"
                onClick={onClickDeleteBtn}
              >
                <DeleteOutlined />
              </a>
            </li>
            <li>
              {v.date} <Divider type="vertical" /> {v.type}
              <Divider type="vertical" /> {v.payment} KRW <Divider type="vertical" />
              <div className="memo_list">{v.memo}</div>
            </li>
            <li className="rest_list">
              <span>Rest : {((originalTotal as number) -= v.payment)} KRW</span>
              <a
                data-id={i}
                data-type={v.type}
                data-payment={v.payment}
                className="delete_btn"
                onClick={onClickDeleteBtn}
              >
                <DeleteOutlined />
              </a>
            </li>
          </ul>
        );
      })}
      <LedgerModal
        currentExchage={currentExchage}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
});

export default PaymentList;
