import { Metadata } from "next";
import FancyFormComponent from "./(public)/FancyForm";

export const metadata: Metadata = {
  title: "Exchange Currency",
  keywords: ["exchange currency", "currency conversion"],
  robots: "index, follow",
  description: "",
};
const Page = () => {
  return (
    <>
      <FancyFormComponent />
    </>
  );
};

export default Page;
