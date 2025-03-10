"use client";

import { PageWrapper } from "./page.styles";
import TransactionDashboardDashboard from "@/components/TransactionDashboard/TransactionDashboard";

export default function Home() {
  return (
    <div>
      <main>
        <PageWrapper>
          <TransactionDashboardDashboard />
        </PageWrapper>
      </main>
    </div>
  );
}
