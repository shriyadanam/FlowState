import { Pie } from "@ant-design/charts"
import React from "react"
import { Wrapper } from "./styles"

export default function NetworkAvailibilityDonut({ pieChartData }) {
  const total = pieChartData.reduce((sum, category) => sum + category.total, 0)
  const config = {
    appendPadding: 10,
    data: pieChartData,
    angleField: "total",
    colorField: "name",
    radius: 1,
    innerRadius: 0.5,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{total}",
      style: {
        textAlign: "center",
        fontSize: 14,
        color: "white"
      }
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "white"
        },
        formatter: function formatter() {
          return `total\n${total}`
        }
      }
    }
  }
  
  return (
    <Wrapper>
      <Pie {...config} />
    </Wrapper>
  )
}