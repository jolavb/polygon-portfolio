import { Grid, TextField, Button } from "@mui/material";
import { IPortfolio } from "@/contexts/portfoliosContext";
import { useState } from "react";

interface PortfolioCreateComponentProps {
  createPortfolio: (p: IPortfolio) => void;
}

export const PortfolioCreateComponent: React.FC<
  PortfolioCreateComponentProps
> = ({ createPortfolio }) => {
  const [portfolioName, setPortfolioName] = useState<string>("");
  const updatePortfolioName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPortfolioName(event.target.value);
  };

  const handleCreatePortfolio = () => {
    if (portfolioName !== "") {
      createPortfolio({
        id: Date.now().toLocaleString(),
        name: portfolioName,
        tickers: [],
      });
      setPortfolioName("");
    }
  };

  return (
    <Grid
      sx={{
        width: "100%",
        height: "50px",
        border: "1px dashed grey",
      }}
    >
      <TextField
        value={portfolioName}
        onChange={updatePortfolioName}
        id="outlined-basic"
        variant="outlined"
      />
      <Button onClick={handleCreatePortfolio}>Create Porfolio</Button>
    </Grid>
  );
};
