/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Divider, Input, message, Select } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useInput from "../../../hooks/useInput";
import analyzerStore from "../../../@store/analyzerStore";
import { observer } from "mobx-react";
const { Option } = Select;

const PaymentList: FC = observer(() => {
  const [memo, onChangeMemo, setMemo] = useInput("");
  const [currentExchage, setCurrentExchage] = useState<number>(0);
  const [payment, onChangePayment, setPayment] = useInput(null);
  const [budget, onChangeBudget] = useInput(null);
  const [isbudgetChange, setIsbudgetChage] = useState(false);
  const [select, setSelect] = useState("");
  let originalTotal = analyzerStore.originalTotal;
  const onChangeSelect = useCallback((value: string) => {
    setSelect(value);
  }, []);

  const exchangeCalc = useCallback(
    (data) => {
      return Number(
        Math.floor(data * currentExchage)
          .toString()
          .slice(0, -1) + 0
      );
    },
    [currentExchage]
  );

  const onSubmit = useCallback(() => {
    if (!payment || !select) {
      message.error("Please fill contents up");
      return;
    }
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    let form = {
      date: year + "/" + month + "/" + day,
      type: select,
      payment: exchangeCalc(payment),
      memo,
    };
    analyzerStore.addPaymentList(form);
    setMemo("");
    setPayment("");
  }, [exchangeCalc, memo, payment, select, setMemo, setPayment]);

  const onClickDeleteBtn = useCallback((e) => {
    const data = e.currentTarget.dataset;
    analyzerStore.deletePaymentList(data.id, data.type, data.payment);
  }, []);

  const onChangeIsbudgetChange = useCallback(() => {
    if (isbudgetChange) {
      analyzerStore.setTotal(exchangeCalc(budget));
    }
    setIsbudgetChage((prev) => !prev);
  }, [budget, exchangeCalc, isbudgetChange]);

  useEffect(() => {
    axios
      .get(
        `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_EXCHANGE_KEY}&symbols=KRW&format=1`
      )
      .then((res) => setCurrentExchage(Object.values(res.data.rates)[0] as number));
  }, []);

  useEffect(() => {
    analyzerStore.setPaymentList(
      JSON.parse(localStorage.getItem("payment_list")!),
      JSON.parse(localStorage.getItem("original_total")!)
    );
    return () => {
      localStorage.setItem("payment_list", JSON.stringify(analyzerStore.paymentList));
    };
  }, []);

  return (
    <>
      <div className="analyzer_budget">
        <h2>Total your budget : {originalTotal} KRW</h2>
        {isbudgetChange && (
          <Input
            onChange={onChangeBudget}
            value={budget}
            placeholder="USD"
            className="analyzer_budget_input"
            type="number"
          />
        )}
        <Button className="analyzer_budget_btn" onClick={onChangeIsbudgetChange}>
          Budget Change
        </Button>
      </div>
      <div className="analyzer_input">
        <Select className="type_selector" onChange={onChangeSelect} defaultValue="Payment type">
          <Option value="Airfare ✈">Airfare</Option>
          <Option value="Transport 🚝">Transport</Option>
          <Option value="Stay 🛌">Stay</Option>
          <Option value="Food 🍝">Food</Option>
          <Option value="Attractions 🎢">Attractions</Option>
          <Option value="Shopping 🥼">Shopping</Option>
        </Select>
        <Input onChange={onChangeMemo} value={memo} placeholder="memo about payment simply" />
        <Input
          className="payment_usd"
          type="number"
          onChange={onChangePayment}
          value={payment}
          prefix="$"
          suffix="USD"
        />
        <Input
          className="payment_krw"
          disabled
          value={exchangeCalc(payment)}
          prefix="₩"
          suffix="KRW"
        />
        <Button onClick={onSubmit}>ADD</Button>
      </div>
      {analyzerStore?.paymentList?.map((v, i) => {
        return (
          <ul className="analyzer_list" key={i}>
            <li>
              {v.date} <Divider type="vertical" /> {v.type}
              <Divider type="vertical" /> {v.payment} KRW <Divider type="vertical" />
              {v.memo}
            </li>
            <div>
              <span>Rest budget : {((originalTotal as number) -= v.payment)} KRW</span>
              <a
                data-id={i}
                data-type={v.type}
                data-payment={v.payment}
                className="delete_btn"
                onClick={onClickDeleteBtn}
              >
                <DeleteOutlined />
              </a>
            </div>
          </ul>
        );
      })}
    </>
  );
});

export default PaymentList;
