import React from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/slices/authSlice';

const Container = styled.div`
  padding:24px;
`;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = (location.state as any)?.from?.pathname || '/account/me';

  async function handleHostedSignIn(){
    try {
      await Auth.federatedSignIn();
    } catch (err) {
      console.error('Hosted UI sign-in failed', err);
      alert('Sign-in failed');
    }
  }

  async function handleLocalMockSignIn(){
    // Quick local dev sign-in: create a fake session and set auth in store
    const fakeUser = { sub: 'local-user-1', email: 'dev@example.com' };
    const fakeToken = 'local-mock-token';
    dispatch(setAuth({ user: fakeUser, token: fakeToken }));
    navigate(from, { replace: true });
  }

  return (
    <Container>
      <h1>Login</h1>
      <p>Use Hosted UI or local mock for development.</p>
      <div style={{display:'flex', gap:12}}>
        <button onClick={handleHostedSignIn}>Sign in with Cognito Hosted UI</button>
        <button onClick={handleLocalMockSignIn}>Mock Sign-in (local)</button>
      </div>
    </Container>
  );
}
