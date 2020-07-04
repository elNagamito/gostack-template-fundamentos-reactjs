import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface ListTransactions {
  transactions: Transaction[];
  balance: Balance;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<ListTransactions | null>(
    null,
  );
  // const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    api.get(`transactions`).then(response => {
      setTransactions(response.data);
    });
  }, []);

  return (
    <>
      <Header />
      {transactions && (
        <Container>
          <CardContainer>
            <Card>
              <header>
                <p>Entradas</p>
                <img src={income} alt="Income" />
              </header>
              <h1 data-testid="balance-income">
                {formatValue(transactions.balance.income)}
              </h1>
            </Card>
            <Card>
              <header>
                <p>Saídas</p>
                <img src={outcome} alt="Outcome" />
              </header>
              <h1 data-testid="balance-outcome">
                {formatValue(transactions.balance.outcome)}
              </h1>
            </Card>
            <Card total>
              <header>
                <p>Total</p>
                <img src={total} alt="Total" />
              </header>
              <h1 data-testid="balance-total">
                {formatValue(transactions.balance.total)}
              </h1>
            </Card>
          </CardContainer>

          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Data</th>
                </tr>
              </thead>

              <tbody>
                {transactions.transactions.map(transaction => {
                  let value = formatValue(transaction.value);
                  const formattedDate = new Date(transaction.created_at);
                  if (transaction.type === 'outcome') {
                    value = `- ${value}`;
                  }
                  return (
                    <tr>
                      <td className="title">{transaction.title}</td>
                      <td className={transaction.type}>{value}</td>
                      <td>{transaction.category.title}</td>
                      <td>{formattedDate.toLocaleDateString('pt-BR')}</td>
                    </tr>
                  );
                })}
                {/* <tr>
                  <td className="title">Computer</td>
                  <td className="income">R$ 5.000,00</td>
                  <td>Sell</td>
                  <td>20/04/2020</td>
                </tr>
                <tr>
                  <td className="title">Website Hosting</td>
                  <td className="outcome">- R$ 1.000,00</td>
                  <td>Hosting</td>
                  <td>19/04/2020</td>
                </tr> */}
              </tbody>
            </table>
          </TableContainer>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
