import { FC } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Divider, Input } from "antd";
// import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import useInput from "@hooks/useInput";
import analyzerStore from "@store/analyzerStore";
import { observer } from "mobx-react";
import useExchageClac from "@hooks/useExchangeCalc";
import LedgerModal from "../LedgerModal";
import { Budget, PaymentLists } from "./styles";

// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// axios.defaults.baseURL = "http://api.exchangeratesapi.io";
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";

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
    // axios
    //   .get(
    //     `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_EXCHANGE_KEY}&symbols=KRW&format=1`
    //   )
    //   .then((res) => setCurrentExchage(Object.values(res.data.rates)[0] as number));
    setCurrentExchage(1300);
  }, []);

  return (
    <>
      <Budget>
        <h2 className="budget_title">
          Total your budget :{" "}
          {isbudgetChange ? (
            <Input
              onChange={onChangeBudget}
              value={budget}
              placeholder="USD"
              className="budget_title_input"
              type="number"
              onPressEnter={onChangeIsbudgetChange}
            />
          ) : (
            originalTotal
          )}{" "}
          KRW
        </h2>
        <div className="budget_btns">
          <a className="btn-underLine" onClick={onChangeIsbudgetChange}>
            Budget Change
          </a>
          <a className="btn-underLine" onClick={() => setIsModalVisible(true)}>
            Keep Ledger
          </a>
        </div>
      </Budget>
      {analyzerStore?.paymentList?.map((v, i) => {
        return (
          <PaymentLists key={i}>
            <li className="sm_visible">
              <span>Rest : {((originalTotal as number) -= v.payment)} KRW </span>
              <a
                data-id={i}
                data-type={v.type}
                data-payment={v.payment}
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
              <span>Rest : {originalTotal as number} KRW</span>
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
          </PaymentLists>
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
