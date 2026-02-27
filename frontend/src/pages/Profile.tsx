import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';

const Container = styled.div`padding:24px;`;

export default function Profile(){
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function load(){
      try{
        const u = await Auth.currentAuthenticatedUser();
        setUser(u);
      }catch(err){
        // not signed in
      }
    }
    load();
  }, []);

  async function handleEnableMFA(){
    try{
      // Example: enable TOTP MFA via Amplify (flow simplified)
      const u = await Auth.currentAuthenticatedUser();
      const secret = await Auth.setupTOTP(u);
      alert('TOTP secret: ' + secret);
    }catch(err){
      console.error(err);
      alert('Error setting up MFA');
    }
  }

  return (
    <Container>
      <h1>Profile & MFA</h1>
      {user ? (
        <div>
          <div>Email: {user.attributes?.email || 'N/A'}</div>
          <div>Sub: {user.attributes?.sub || 'N/A'}</div>
          <button onClick={handleEnableMFA}>Setup TOTP (example)</button>
        </div>
      ) : (
        <div>Please sign in to manage your profile.</div>
      )}
    </Container>
  );
}
