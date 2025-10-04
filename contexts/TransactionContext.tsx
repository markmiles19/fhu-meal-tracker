import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type Transaction = {
  id: string;
  amount: number;
  description: string;
  tag: string;
};

type Section = {
  date: string;
  data: Transaction[];
};

type TransactionContextType = {
  sections: Section[];
  totalSpent: number;
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [sections, setSections] = useState<Section[]>([
    {
      date: '2025-09-29',
      data: [
        { id: '0929-1', amount: 6.45, description: 'Iced latte', tag: 'Starbucks' },
        { id: '0929-2', amount: 12.00, description: 'Chicken Sandwich Combo', tag: 'CFA' },
      ],
    },
  ]);

  const totalSpent = useMemo(
    () => sections.reduce((sum, section) => (
      sum + section.data.reduce((acc, t) => acc + t.amount, 0)
    ), 0),
    [sections]
  );

  const value = useMemo(() => ({ sections, totalSpent, setSections }), [sections, totalSpent]);

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) throw new Error('useTransactions must be used within TransactionProvider');
  return context;
};