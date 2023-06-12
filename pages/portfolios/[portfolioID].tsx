import PortfolioComponent from "@/components/portfolio/portfolio";
import Error from "next/error";

import { useRouter } from "next/router";
import { usePortfolios } from "@/contexts/portfoliosContext";

export default function Portfolio() {
  const {
    portfolios,
    deletePortfolio,
    addTickerToPortfolio,
    removeTickerFromPortfolio,
  } = usePortfolios();

  const router = useRouter();
  const portfolioID = router.query.portfolioID;
  const portfolio = portfolios.find((p) => p.id == portfolioID);

  return (
    <>
      {portfolio ? (
        <PortfolioComponent
          handleAddTickerToPortfolio={addTickerToPortfolio}
          handleRemoveTickerFromPortfolio={removeTickerFromPortfolio}
          handleDeletePortfolio={deletePortfolio}
          portfolio={portfolio}
        />
      ) : (
        <Error statusCode={404} />
      )}
    </>
  );
}
