import { ResponsivePie } from "@nivo/pie";
import { observer } from "mobx-react";
import { mainStore } from "../../../@store/store";
import MainPageWrapper from "../MainPageWrapper";
import PaymentList from "./PaymentList";

const data = [
  {
    id: "Airfare",
    label: "Airfare",
    value: mainStore.chartValue.airfare,
    color: "hsl(77, 70%, 50%)",
  },
  {
    id: "Total",
    label: "Total",
    value: mainStore.chartValue.total,
    color: "hsl(27, 70%, 70%)",
  },
  {
    id: "Stay",
    label: "Stay",
    value: mainStore.chartValue.stay,
    color: "hsl(164, 70%, 50%)",
  },
  {
    id: "Food",
    label: "Food",
    value: mainStore.chartValue.food,
    color: "hsl(42, 70%, 50%)",
  },
  {
    id: "Attractions",
    label: "Attractions",
    value: mainStore.chartValue.attractions,
    color: "hsl(135, 70%, 50%)",
  },
  {
    id: "Shopping",
    label: "Shopping",
    value: mainStore.chartValue.shopping,
    color: "hsl(213, 70%, 50%)",
  },
];

const AnalyzerContent = observer(() => {
  return (
    <MainPageWrapper>
      <PaymentList />
      <ResponsivePie
        data={data}
        margin={{ top: 80, right: 80, bottom: 150, left: 80 }}
        innerRadius={0.01}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </MainPageWrapper>
  );
});

export default AnalyzerContent;
