import { Checkbox, Radio } from "antd";
import { FC, LegacyRef } from "react";
import { useCallback } from "react";
import {
  check_age_list,
  check_acm_list,
  check_party_list,
  check_purpose_list,
  RED_COLOR,
  MD_SIZE,
  SM_SIZE,
  GRAY_COLOR,
} from "../../config";
import { checkListStore } from "../../@store/store";
import { observer } from "mobx-react";
import styled from "@emotion/styled";

interface CheckListFormProps {
  formRef: LegacyRef<HTMLDivElement> | null;
}

const CheckList = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 75%;
  left: 50%;
  width: 70%;
  height: 370px;
  overflow: auto;
  transform-style: preserve-3d;
  perspective: 300px;
  visibility: hidden;
  animation: flip 0.4s 0.8s forwards;
  box-shadow: 10px 10px 30px ${GRAY_COLOR};
  .listForm {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1.5rem;
    h3 {
      transition: 0.3;
      background-image: linear-gradient(transparent calc(100% - 3px), ${RED_COLOR} 5px);
      background-repeat: no-repeat;
      background-size: 0% 100%;
      span {
        margin-left: 5px;
        color: ${RED_COLOR};
        font-size: 0.9rem;
      }
    }
  }
  .checkBox {
    margin: 1rem 0 2rem 0;
    label {
      margin: 0.5rem 1rem 0.5rem 0;
    }
  }
  @media only screen and (max-width: ${MD_SIZE}) {
    height: 230px;
    width: 90%;
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    width: 95%;
    .listForm {
      font-size: 0.8rem;
    }
  }
`;

const CheckListForm: FC<CheckListFormProps> = observer(({ formRef }) => {
  const onChangeInfo = useCallback((e) => {
    checkListStore.changeInfo(e.target.value, e.target.name);
  }, []);

  const onChangePurposeBox = useCallback((e) => {
    checkListStore.changeTaste(e, "purpose");
  }, []);

  const onChangeAcmBox = useCallback((checkedValues) => {
    checkListStore.changeTaste(checkedValues, "acm");
  }, []);

  return (
    <CheckList>
      <div className="listForm" ref={formRef}>
        {/* Gender */}
        <h3>
          1. What is your gender?<span>* {!checkListStore.gender && "Please select one"}</span>
        </h3>
        <Radio.Group name="gender" className="checkBox" onChange={onChangeInfo}>
          <Radio value="Man">Gentleman</Radio>
          <Radio value="Lady">Lady</Radio>
        </Radio.Group>
        {/* Age */}
        <h3>
          2. What is your age?<span>* {!checkListStore.age && "Please select one"}</span>
        </h3>
        <Radio.Group name="age" className="checkBox" onChange={onChangeInfo}>
          {check_age_list.map((list, i) => (
            <Radio key={i} value={list}>
              {list}
            </Radio>
          ))}
        </Radio.Group>
        {/* Party */}
        <h3>
          3. What is type of your party?
          <span>* {!checkListStore.party && "Please select one"}</span>
        </h3>
        <Radio.Group name="party" className="checkBox" onChange={onChangeInfo}>
          {check_party_list.map((list, i) => (
            <Radio key={i} value={list}>
              {list}
            </Radio>
          ))}
        </Radio.Group>
        {/* Purpose */}
        <h3>4. What is your purpose to visit Seoul? </h3>
        <Checkbox.Group
          className="checkBox"
          options={check_purpose_list}
          onChange={onChangePurposeBox}
        />
        {/* Accommondation */}
        <h3>5. When you choose accommodation, What would you pay attention?</h3>
        <Checkbox.Group
          className="checkBox"
          name="hi"
          options={check_acm_list}
          onChange={onChangeAcmBox}
        />
      </div>
    </CheckList>
  );
});

export default CheckListForm;
