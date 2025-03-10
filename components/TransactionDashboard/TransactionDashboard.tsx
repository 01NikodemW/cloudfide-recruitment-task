"use client";

import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useCallback, useState } from "react";
import TransactionChart from "../TransactionChart/TransactionChart";
import {
  DashboardContainer,
  StyledFormControl,
} from "./TransactionDashboard.styles";

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "ADAUSDT"] as const;

const TransactionDashboardDashboard = () => {
  const [symbol, setSymbol] = useState<string>(SYMBOLS[0]);

  const handleSymbolChange = useCallback(
    (event: SelectChangeEvent) => {
      setSymbol(event.target.value);
    },
    [setSymbol]
  );

  return (
    <DashboardContainer>
      <Box>
        <StyledFormControl fullWidth>
          <InputLabel>Symbol</InputLabel>
          <Select
            value={symbol}
            label="Symbol"
            onChange={handleSymbolChange}
            data-cy="symbol-select"
          >
            {SYMBOLS.map((symbol) => (
              <MenuItem key={symbol} value={symbol}>
                {symbol}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </Box>
      <TransactionChart symbol={symbol} />
    </DashboardContainer>
  );
};

export default TransactionDashboardDashboard;
