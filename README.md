# CertNet
## Decentralized System for Certificate Verification

#### Contributors
* [Sumaid Syed](https://github.com/Sumaid)
* [Rohan Chacko](https://github.com/RohanChacko)
* [Meher Shashwat Nigam](https://github.com/ShashwatNigam99)
* [Adhithya Arun](https://github.com/adhithyaarun)
* [AadilMehdi Sanchawala](https://github.com/aadilmehdis)

## Use case diagram
![usecase](./documents/usecase.png)


## Setup

### Steps to set up local development environment

You can either set up local development environment or deploy on a test network like Rinkeby.

### Setting local database

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

### Setting local blockchain

1. Install node v8.11.2 (You can use nvm to manage different node versions)
2. Install dependencies

   ```bash
   npm install
   ```

3. We need to install CLI version of Ganache.

   ```bash
   npm install ganache-cli
   ```

   > Ganache provides us our personal local blockchain network which we can use to develop our blockchain application. It also gives temporary test accounts with fake ethereum which we can use to run our apps. We need to start the RPC server before running our application.

4. To start the RPC server run the command

   ```bash
   npm run ganache &
   ```

5. Deploy the smart contract to the local blockchain.

   ```bash
   npm run contract-deploy
   ```

> The above 2 steps need to be run everytime you are running the project.


### Running Client Application

1. Go to ./client/
2. Install prerequisites

   ```bash
   npm install
   ```

3. Run the react app

   ```bash
   npm start
   ```

4. App should be running on http://localhost:3000/
5. Go to authentication section from navigation, log in with google account.
6. You can log in as org or student, first log in as student with some google account.
7. Log in as org with different google account, you should be able to see list of certified students
   in generate certificate page.
8. Generate certificate page is only available for orgs. For org, view list of certificates will show list of all the certificates org has issued, for students, it will show list of all the certificates assigned to the student.
9. For both org and student, profile page will show details like name, email id, pic, etc.
10. Both profile page & certificate display page are public URLs, anyone with the URL should be able to access them without being part of the network.

## Ganache UI

1. Download [Ganache](https://www.trufflesuite.com/ganache)
2. Deploy contracts, now when a certificate is generated, you should be able to see blocks and transactions in the Ganache application.

## Deploying Smart Contract on test network (Not required for development)

The contract can be deployed in any test networks. We are using Rinkeby test network with help of truffle.

1. First of all we need to have a metamask account. When we create an account in metamask a _mnemonic_ is given to us. [You can read how to get a mnemonic here.](https://support.dex.top/hc/en-us/articles/360004125614-How-to-Create-Mnemonic-Phrase-with-MetaMask-)

1. After that create a project in [Infura](https://infura.io). This will help us to use rinkeby network through infura.

1. You will get an endpoint like this `https://rinkeby.infura.io/yourapikey`.

1. Create a `.env` file in root directory and paste the previously genrated mnemonic and the endpoint URL in that.

1. Now you can deploy the smart contract using a single command:

   ```BASH
   npm run deploy
   ```

1. You will get a contract address of newly generated contract. Save this for further uses.

## Testing app

To test the app run the command `truffle test`. RPC server should be running to run the tests.

### Running tests

```bash
npm run test
```

### Now we can start the server

```bash
npm start
```

## Useful reads

- [Some instructions and commands for debugging in Truffle Console](./instructions/COMMANDS.md)
