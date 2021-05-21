import { observer } from "mobx-react";
import { useCallback, useState } from "react";
import { Button, Input, message, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import TextArea from "antd/lib/input/TextArea";
import useInput from "../../../hooks/useInput";
import analyzerStore from "../../../@store/analyzerStore";
import useExchageClac from "../../../hooks/useExchangeCalc";
import styled from "@emotion/styled";
import { SM_SIZE } from "../../../config";
const { Option } = Select;

const LedgerModalComponent = styled(Modal)`
  h3:first-of-type {
    margin-bottom: 0.5rem;
  }
  h3:nth-of-type(n + 2) {
    margin: 1rem 0 0.5rem 0;
  }
  .type_selector {
    width: 40%;
  }
  .payment {
    &_usd {
      width: 30%;
    }
    &_krw {
      width: 40%;
    }
    &_memo {
      width: 70%;
    }
    &_btn {
      margin-top: 1rem;
      width: 30%;
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    .type_selector {
      width: 60%;
    }
    .payment {
      &_usd {
        width: 40%;
      }
      &_krw {
        width: 50%;
      }
      &_btn {
        width: 50%;
      }
    }
  }
`;

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
        payment: useExchageClac(payment, currentExchage),
        memo,
      };
      analyzerStore.addPaymentList(form);
      setMemo("");
      setPayment("");
    }, [currentExchage, memo, payment, select, setMemo, setPayment]);

    return (
      <LedgerModalComponent
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
      </LedgerModalComponent>
    );
  }
);

export default LedgerModal;
