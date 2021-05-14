import { ResponsivePie } from "@nivo/pie";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { analyzerStore } from "../../../@store/store";
import MainPageWrapper from "../MainPageWrapper";
import PaymentList from "./PaymentList";

const AnalyzerContent = observer(() => {
  const data = [
    {
      id: "Airfare",
      label: "Airfare",
      value: analyzerStore.chartValue.airfare,
      color: "hsl(314, 56%, 77%)",
    },
    {
      id: "Total",
      label: "Total",
      value: analyzerStore.chartValue.total,
      color: "hsl(77, 70%, 50%)",
    },
    {
      id: "Transport",
      label: "Transport",
      value: analyzerStore.chartValue.transport,
      color: "hsl(77, 70%, 50%)",
    },
    {
      id: "Stay",
      label: "Stay",
      value: analyzerStore.chartValue.stay,
      color: "hsl(164, 70%, 50%)",
    },
    {
      id: "Food",
      label: "Food",
      value: analyzerStore.chartValue.food,
      color: "hsl(42, 70%, 50%)",
    },
    {
      id: "Shopping",
      label: "Shopping",
      value: analyzerStore.chartValue.shopping,
      color: "hsl(213, 70%, 50%)",
    },
    {
      id: "Attractions",
      label: "Attractions",
      value: analyzerStore.chartValue.attractions,
      color: "hsl(155, 40%, 77%)",
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("chartValue")) {
      analyzerStore.setChart(JSON.parse(localStorage.getItem("chartValue")!));
    }
  }, []);

  return (
    <MainPageWrapper>
      <PaymentList />
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.01}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "Attractions",
            },
            id: "dots",
          },
          {
            match: {
              id: "Airfare",
            },
            id: "lines",
          },
        ]}
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
