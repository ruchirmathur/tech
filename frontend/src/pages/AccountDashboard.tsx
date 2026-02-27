import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetBalanceQuery } from '../store/services/api';
import styled from 'styled-components';

const Container = styled.div`padding:24px;`;

export default function AccountDashboard(){
  const { accountId } = useParams();
  const id = accountId || 'me';
  const { data, error, isLoading } = useGetBalanceQuery(id);

  return (
    <Container>
      <h1>Account Dashboard</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div style={{color:'red'}}>Error loading balance</div>}
      {data && (
        <div>
          <div>Account: {data.accountId}</div>
          <div>Balance: {(data.balance/100).toFixed(2)} {data.currency}</div>
          <div><Link to={`/account/${id}/transactions`}>View Transactions</Link></div>
        </div>
      )}
    </Container>
  );
}
