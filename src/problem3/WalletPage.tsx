// Problem 3: Messy React
import React, { useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // add blockchain type string into WalletBalance to prevent the duplicate code
}
interface FormattedWalletBalance extends WalletBalance {
  //FormattedWalletBalance extends all WalletBalance attributes
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const formattedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        return balance.amount > 0; // filter the balance which has amount greater than 0
      })
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(), // format the balance
      }))
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain); // sort by priority
      });
  }, [balances]);

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          // If using index as the key, React may not be able to identify the correct element in some case.
          // For example: adding, deleting or rearranging element in the list
          // This leads to performance errors
          key={`${balance.currency}-${index}`} // make unique key => Minimize errors and increase render speed.
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
