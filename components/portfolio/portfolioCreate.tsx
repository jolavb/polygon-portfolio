import { Grid, TextField, Button } from "@mui/material";
import { IPortfolio } from "@/contexts/portfoliosContext";
import { useState } from "react";

interface PortfolioCreateComponentProps {
  handleCreatePortfolio: (p: IPortfolio) => void;
}

export const PortfolioCreateComponent: React.FC<
  PortfolioCreateComponentProps
> = ({ handleCreatePortfolio }) => {
  const [portfolioName, setPortfolioName] = useState<string>("");

  const updatePortfolioName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPortfolioName(event.target.value);
  };

  const valdateAndCreatePortfolio = () => {
    if (portfolioName !== "") {
      handleCreatePortfolio({
        id: Math.random().toString(),
        name: portfolioName,
        tickers: [],
      });
      setPortfolioName("");
    }
  };

  return (
    <>
      <TextField
        value={portfolioName}
        onChange={updatePortfolioName}
        id="outlined-basic"
        variant="outlined"
      />
      <Button onClick={valdateAndCreatePortfolio}>Create Porfolio</Button>
    </>
  );
};
