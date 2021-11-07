import { observer } from "mobx-react";
import { useCallback, useState } from "react";
import { Button, Input, message, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import useInput from "@hooks/useInput";
import analyzerStore from "@store/analyzerStore";
import useExchageClac from "@hooks/useExchangeCalc";
import { LedgerModalWrapper } from "./styles";
const { Option } = Select;

interface AnalyzerContentProps {
  setIsModalVisible: (data: boolean) => void;
  isModalVisible: boolean;
  currentExchage: number;
}

const LedgerModal = observer(
  ({ currentExchage, isModalVisible, setIsModalVisible }: AnalyzerContentProps) => {
    const [memo, onChangeMemo, setMemo] = useInput("");
    const [payment, onChangePayment, setPayment] = useInput(null);
    const [select, setSelect] = useState("");
    const onChangeSelect = useCallback((value: string) => {
      setSelect(value);
    }, []);

    const onSubmit = useCallback(() => {
      //입력을 안한 부분이 있다면 요청을 취소합니다.
      if (!payment || !select) {
        message.error("Please fill contents up");
        return;
      }
      // 날짜를 위한 데이터를 만듭니다.
      const date = new Date();
      const year = date.getFullYear();
      const month = ("0" + (1 + date.getMonth())).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      let form = {
        date: year + "/" + month + "/" + day,
        type: select,
        // 환율정보를 제공하는 API를 이용하여 USD 를 KRW로 변환합니다.
        payment: useExchageClac(payment, currentExchage),
        memo,
      };
      // 데이터를 store에 전달합니다.
      analyzerStore.addPaymentList(form);
      setMemo("");
      setPayment("");
    }, [currentExchage, memo, payment, select, setMemo, setPayment]);

    return (
      <LedgerModalWrapper
        title="Ledger"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={false}
        className="analyzer_input"
      >
        <h3>Payment Type</h3>
        <Select className="type_selector" onChange={onChangeSelect} defaultValue="Payment type">
          <Option value="Airfare ✈">Airfare</Option>
          <Option value="Transport 🚝">Transport</Option>
          <Option value="Stay 🛌">Stay</Option>
          <Option value="Food 🍝">Food</Option>
          <Option value="Attractions 🎢">Attractions</Option>
          <Option value="Shopping 🥼">Shopping</Option>
        </Select>
        <h3>Mount</h3>
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
          value={useExchageClac(payment, currentExchage)}
          prefix="₩"
          suffix="KRW"
        />
        <h3>Memo</h3>
        <TextArea onChange={onChangeMemo} value={memo} placeholder="memo about payment simply" />
        <Button className="payment_btn" onClick={onSubmit}>
          ADD 📌
        </Button>
      </LedgerModalWrapper>
    );
  }
);

export default LedgerModal;
