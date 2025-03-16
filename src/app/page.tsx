import { Metadata } from "next";
import HomePage from "./(public)/home/page";

export const metadata: Metadata = {
  title: "Exchange Currency",
  keywords: ["exchange currency", "currency conversion"],
  robots: "index, follow",
  description: "",
};
const Page = () => {
  return (
    <>
      <HomePage />
    </>
  );
};

export default Page;
