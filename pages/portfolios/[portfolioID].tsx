import PortfolioComponent from "@/components/portfolio/portfolio";
import Error from "next/error";

import { useRouter } from "next/router";
import usePortfolios from "@/contexts/portfoliosContext";

const Portfolio: React.FC = (): React.ReactNode => {
  const {
    portfolios,
    deletePortfolio,
    addTickerToPortfolio,
    removeTickerFromPortfolio,
  } = usePortfolios();

  const router = useRouter();
  const portfolioID = router.query.portfolioID;
  const portfolioToLoad = portfolios[portfolioID as string];

  const handleDeletePortfolio = (id: string) => {
    const remainingPortfolioKeys = Object.keys(portfolios).filter(
      (pid) => pid !== id
    );

    if (remainingPortfolioKeys.length > 0) {
      router
        .push(`/portfolios/${remainingPortfolioKeys.at(-1)}`)
        .then(() => deletePortfolio(id));
    } else {
      router.push("/").then(() => deletePortfolio(id));
    }
  };

  return (
    <>
      {portfolioToLoad ? (
        <PortfolioComponent
          handleAddTickerToPortfolio={addTickerToPortfolio}
          handleRemoveTickerFromPortfolio={removeTickerFromPortfolio}
          handleDeletePortfolio={handleDeletePortfolio}
          portfolio={portfolioToLoad}
        />
      ) : (
        <Error statusCode={404} />
      )}
    </>
  );
};

export default Portfolio;
