/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, memo } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Divider, Input, message, Select } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useInput from "../../../hooks/useInput";
import { mainStore } from "../../../@store/store";
import { observer } from "mobx-react";

const { Option } = Select;

const PaymentList: FC = observer(() => {
  const [memo, onChangeMemo, setMemo] = useInput("");
  const [currentExchage, setCurrentExchage] = useState<number>(0);
  const [payment, onChangePayment, setPayment] = useInput(null);
  const [select, setSelect] = useState("");

  const onChangeSelect = useCallback((value: string) => {
    setSelect(value);
  }, []);

  const exchangeCalc = useCallback(() => {
    return (
      Math.floor(payment * currentExchage)
        .toString()
        .slice(0, -1) + 0
    );
  }, [currentExchage, payment]);

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
      payment: exchangeCalc(),
      memo,
    };
    if (localStorage.getItem("payment_list")) {
      const prevStorage = JSON.parse(localStorage.getItem("payment_list")!);
      prevStorage.push(form);
      localStorage.setItem("payment_list", JSON.stringify(prevStorage));
      mainStore.addPaymentList(prevStorage);
    } else {
      localStorage.setItem("payment_list", JSON.stringify([form]));
      mainStore.addPaymentList([form]);
    }
    setMemo("");
    setPayment("");
  }, [exchangeCalc, memo, select, setMemo, setPayment]);

  const onClickDeleteBtn = useCallback((e) => {
    const id = e.currentTarget.dataset.id;
    mainStore.deletePaymentList(id);
    localStorage.setItem("payment_list", JSON.stringify(mainStore.paymentList));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_EXCHANGE_KEY}&symbols=KRW&format=1`
      )
      .then((res) => setCurrentExchage(Object.values(res.data.rates)[0] as number));
    if (localStorage.getItem("payment_list")) {
      mainStore.addPaymentList(JSON.parse(localStorage.getItem("payment_list")!));
    }
  }, []);

  return (
    <>
      <div className="analyzer_budget">
        <h2>Total your budget : 403000 KRW</h2>
        <Button>Budget Change</Button>
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
        <Input className="payment_krw" disabled value={exchangeCalc()} prefix="₩" suffix="KRW" />
        <Button onClick={onSubmit}>ADD</Button>
      </div>
      {mainStore.paymentList?.map((v, i) => {
        return (
          <ul className="analyzer_list" key={i}>
            <li>
              {v.date} <Divider type="vertical" /> {v.type} <Divider type="vertical" /> {v.payment}{" "}
              KRW <Divider type="vertical" />
              {v.memo}
            </li>
            <div>
              <span>Rest budget : 32493 KRW</span>
              <a data-id={i} className="delete_btn" onClick={onClickDeleteBtn}>
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
