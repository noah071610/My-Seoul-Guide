import { Checkbox, Radio } from "antd";
import { FC, LegacyRef } from "react";
import { useCallback } from "react";
import { check_age_list, check_acm_list, check_party_list, check_purpose_list } from "../../config";
import { checkListStore } from "../../@store/store";
import { observer } from "mobx-react";

interface CheckListFormProps {
  formRef: LegacyRef<HTMLDivElement> | null;
}

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
    <div className="checkList">
      <div className="checkList_form" ref={formRef}>
        {/* Gender */}
        <h3>
          1. What is your gender?<span>* {!checkListStore.gender && "Please select one"}</span>
        </h3>
        <Radio.Group name="gender" className="checkList_Box" onChange={onChangeInfo}>
          <Radio value="Man">Gentleman</Radio>
          <Radio value="Lady">Lady</Radio>
        </Radio.Group>
        {/* Age */}
        <h3>
          2. What is your age?<span>* {!checkListStore.age && "Please select one"}</span>
        </h3>
        <Radio.Group name="age" className="checkList_Box" onChange={onChangeInfo}>
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
        <Radio.Group name="party" className="checkList_Box" onChange={onChangeInfo}>
          {check_party_list.map((list, i) => (
            <Radio key={i} value={list}>
              {list}
            </Radio>
          ))}
        </Radio.Group>
        {/* Purpose */}
        <h3>4. What is your purpose to visit Seoul? </h3>
        <Checkbox.Group
          className="checkList_Box"
          options={check_purpose_list}
          onChange={onChangePurposeBox}
        />

        {/* Accommondation */}
        <h3>5. When you choose accommodation, What would you pay attention?</h3>
        <Checkbox.Group
          className="checkList_Box"
          name="hi"
          options={check_acm_list}
          onChange={onChangeAcmBox}
        />
      </div>
    </div>
  );
});

export default CheckListForm;
