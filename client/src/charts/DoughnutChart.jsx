import { Doughnut } from "react-chartjs-2";

const DoughnutChart = () => {
  const labels = ["one", "two", "three", "four"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Current Status",
        data: [6, 3, 1],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
        ],
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
