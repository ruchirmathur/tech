import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Bar = styled.div`
  display:flex;
  align-items:center;
  padding:12px 24px;
  background:#0f172a;
  color:#fff;
`;

const Nav = styled.nav`
  display:flex;
  gap:12px;
`;

export default function NavBar(){
  return (
    <Bar>
      <div style={{fontWeight:600, marginRight:16}}>bdfasnas</div>
      <Nav>
        <Link to="/account/me" style={{color:'#fff'}}>Account</Link>
        <Link to="/account/me/transactions" style={{color:'#fff'}}>Transactions</Link>
        <Link to="/profile" style={{color:'#fff'}}>Profile</Link>
      </Nav>
    </Bar>
  );
}
