import { Typography, IconButton } from "@mui/material";
import { ITicker } from "@/contexts/portfoliosContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ITickerProps {
  ticker: ITicker;
  handleReturn: () => void;
}

export function TickerDetails({ ticker, handleReturn }: ITickerProps) {
  const dataSets = {
    labels: ticker.aggregates?.map((t) =>
      moment(t.timestamp).format("MM-DD-YY")
    ),
    datasets: [
      {
        label: "Ticker Historical Closes",
        data: ticker.aggregates?.map((t) => t.price),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${ticker.name} Price History`,
      },
    },
  };

  return (
    <>
      <Typography>{ticker.name}</Typography>
      <Line data={dataSets} options={options} />
      <IconButton onClick={handleReturn}>
        <ArrowBackIcon />
      </IconButton>
    </>
  );
}
