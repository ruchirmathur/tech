import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTransactionsQuery } from '../store/services/api';
import styled from 'styled-components';

const Container = styled.div`padding:24px;`;

export default function Transactions(){
  const { accountId } = useParams();
  const id = accountId || 'me';
  const [nextToken, setNextToken] = useState<string | undefined>(undefined);
  const { data, error, isLoading } = useGetTransactionsQuery({ accountId: id, limit: 25, nextToken });

  return (
    <Container>
      <h1>Transactions</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div style={{color:'red'}}>Error loading transactions</div>}
      {data && (
        <div>
          <ul>
            {data.items.map((t: any) => (
              <li key={t.transactionId}>{t.createdAt} - {(t.amount/100).toFixed(2)} - {t.type}</li>
            ))}
          </ul>
          {data.nextToken && <button onClick={() => setNextToken(data.nextToken)}>Load more</button>}
        </div>
      )}
    </Container>
  );
}
