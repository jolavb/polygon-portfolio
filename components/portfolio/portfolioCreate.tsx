import { TextField, IconButton } from "@mui/material";
import { IPortfolio } from "@/contexts/portfoliosContext";
import { useState } from "react";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";

interface PortfolioCreateComponentProps {
  handleCreatePortfolio: (p: IPortfolio) => void;
}

const PortfolioCreateComponent: React.FC<PortfolioCreateComponentProps> = ({
  handleCreatePortfolio,
}): React.ReactNode => {
  const [portfolioName, setPortfolioName] = useState<string>("");

  const router = useRouter();

  const updatePortfolioName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPortfolioName(event.target.value);
  };

  const valdateAndCreatePortfolio = () => {
    if (portfolioName) {
      let newPortfolio = {
        id: Math.random().toString(),
        name: portfolioName,
        tickers: [],
      };
      handleCreatePortfolio(newPortfolio);
      setPortfolioName("");
      router.push(`/portfolios/${newPortfolio.id}`);
    }
  };

  return (
    <>
      <TextField
        label="Create Portfolio"
        value={portfolioName}
        onChange={updatePortfolioName}
        id="standard-basic"
        variant="outlined"
      />
      <IconButton onClick={valdateAndCreatePortfolio}>
        <AddIcon />
      </IconButton>
    </>
  );
};

export default PortfolioCreateComponent;
