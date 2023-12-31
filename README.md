<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" />
  </a>
  <h3>
    Particle wallet-adapter Example
  </h3>
</div>

⚡️ Example for native [Particle Auth](https://docs.particle.network/developers/auth-service) integration within Solana's `wallet-adapter`. In this specific example, various buttons and data retrieval tasks have been added to showcase functionality within [Particle Auth](https://docs.particle.network/developers/auth-service).

Built using **`wallet-adapter`**, **TypeScript**, **`solana-web3.js`**, and **Particle Auth**.

## 🔑 Particle Auth
Particle Auth, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc.

👉 Try the demo: https://web-demo.particle.network

👉 Learn more about Particle Network: https://particle.network

![Particle Auth Example](https://i.imgur.com/JYZff64.png)

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/TABASCOatw/particle-wallet-adapter-example.git
```

### Install dependencies
```
yarn install
```
OR
```
npm install
```

### Set environment variables
This project requires a number of keys from Particle Network to be defined in `.env`. The following should be defined:
- `REACT_APP_APP_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `REACT_APP_PROJECT_ID`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_CLIENT_KEY`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).

### Start the project
```
npm run start
```
OR
```
yarn start
```

##
> Originally featured in "[Adding Social Login to Solana DApps](https://twitter.com/TABASCOweb3/status/1709900102494777414)"
> > This project is derived from wallet-adapter's [create-react-app-starter](https://github.com/solana-labs/wallet-adapter/tree/master/packages/starter/create-react-app-starter)