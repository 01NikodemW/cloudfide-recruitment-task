"use client";

import TransactionChart from "@/components/TransactionChart/TransactionChart";
import { PageWrapper } from "./page.styles";

export default function Home() {
  console.log("test");
  return (
    <div>
      <main>
        <PageWrapper>
          <TransactionChart />
        </PageWrapper>
      </main>
    </div>
  );
}
