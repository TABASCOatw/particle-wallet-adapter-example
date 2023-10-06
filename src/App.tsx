import React, { FC, ReactNode, useEffect, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
  useConnection,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { ParticleAdapter } from '@solana/wallet-adapter-wallets';
import {
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { Button, notification } from 'antd';

import './App.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import { ParticleNetwork } from '@particle-network/auth';

// Global Buffer setup
global.Buffer = global.Buffer || require('buffer').Buffer;

const particle = new ParticleNetwork({
  projectId: process.env.REACT_APP_PROJECT_ID!,
  clientKey: process.env.REACT_APP_CLIENT_KEY!,
  appId: process.env.REACT_APP_APP_ID!,
  chainName: 'solana',
  chainId: 101,
});

const App: FC = () => (
  <Context>
    <Content />
  </Context>
);

export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = useMemo(() => process.env.REACT_APP_RPC_URL!, []);
  const wallets = useMemo(() => [new ParticleAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: FC = () => {
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (publicKey) {
      notification.success({
        message: 'Login Successful',
        description: `User data: ${JSON.stringify(particle.auth.userInfo())}`,
      });
    }
  }, [publicKey]);

  const dummySignature = async () => {
    if (!publicKey || !signTransaction) return;

    const { blockhash } = await connection.getRecentBlockhash();
    const transaction = new Transaction({ feePayer: publicKey, recentBlockhash: blockhash })
      .add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports: 0,
        }),
      );

    const signedTransaction = await signTransaction(transaction);
    notification.success({
      message: 'Signature Successful',
      description: `Transaction Signature: ${JSON.stringify(signedTransaction)}`,
    });
  };

  const checkBalance = async () => {
    if (!publicKey) return;

    const balance = await connection.getBalance(publicKey);
    notification.success({
      message: 'Account Balance',
      description: `Balance: ${balance / LAMPORTS_PER_SOL} SOL`,
    });
  };

  return (
    <div className="App">
      <div className="button-container">
        <WalletMultiButton />
        {publicKey && (
          <>
            <Button className="button-spacing" onClick={dummySignature}>
              Dummy Signature (solana-web3.js)
            </Button>
            <Button className="button-spacing" onClick={checkBalance}>
              Check Balance (solana-web3.js)
            </Button>
          </>
        )}
      </div>
    </div>
  );
};