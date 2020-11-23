## Installation & Setup

### Setting up local dev environment

You can either set up local development environment or deploy on a test network like Rinkeby. We set it up locally for ease of deployment.

### Setting up local database

Install [MongoDB](https://docs.mongodb.com/manual/installation/)

> Run MongoDB server as a background process

1. Open mongo in terminal using command `mongo`

2. Then change the db using command

   ```bash
   use certification
   ```

3. Then set DB user and password with the following command

   ```javascript
   db.createUser({
     user: "newuser",
     pwd: "1234",
     roles: [{ role: "dbOwner", db: "certification" }]
   });
   ```

4. Replace the username and password in  `.env` file with what you set above.

### Setting local blockchain network

1. Install node v8.11.2 (You can use nvm to manage different node versions or download from [here](https://nodejs.org/download/release/v8.11.2/))

2. Install dependencies for blockchain network. Installing CLI version of Ganache.

    ```bash
    npm install
    npm install ganache-cli
    ```

   > Ganache provides us our personal local blockchain network which we can use to develop our blockchain application. It also gives temporary test accounts with fake ether which we can use to run our apps.

3. Install dependencies for web application

    ```bash
    cd client/
    npm install
    ```

### Ganache UI

1. Download [Ganache](https://www.trufflesuite.com/ganache)
2. Start an Ethereum Project
3. Change the network settings to listen on port 8545 (that's where our RPC server is running)
4. Set the gas price to 20 wei from the default value to allow successful transactions
5. Deploy the contract by importing [truffle.js](https://github.com/Sumaid/certnet/blob/main/truffle.js) config file. When a certificate is generated, you should be able to see blocks and transactions in the Ganache UI app


### Deploying Smart Contract on test network

The contract can be deployed in any test network. This should be done for future market deployment.

1. Create a metamask account. When we create an account in metamask a _mnemonic_ is given to us. [You can read how to get a mnemonic here.](https://support.dex.top/hc/en-us/articles/360004125614-How-to-Create-Mnemonic-Phrase-with-MetaMask-)

2. After that create a project in [Infura](https://infura.io). This will help us to use rinkeby network through infura.

3. You will get an endpoint like this `https://rinkeby.infura.io/<your-api-key>`.

4. Create a `.env` file in root directory and paste the previously generated mnemonic and the endpoint URL in that.

5. Now you can deploy the smart contract using a single command:

   ```BASH
   npm run deploy
   ```

6. You will get a contract address of newly generated contract. Save this for further uses.
