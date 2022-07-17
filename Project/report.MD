## Group 7 Project Report

Sun Jul 17

Discord IDs/Names: @s6thgehr (Thomas Gehrmann) @libertine (Morgan Weaver) @sdav (Solène Daviaud) @3fOhorky (Stjepan Hrvoje Horvat)

Here we present the results of running our scripts with several proposals, and the functionality of our scripts verifiable by blockchain transactions.

All scripts are thoroughly tested--please see tests.

Proposals:

1. Ramen
2. Pizza
3. Burger
4. Tacos
5. Ražnjići

Voters Appointed:

1. 0x5214990E840dEB4581760606a9970a0186AAa7F3 (Chairperson)
2. 0x97c44088Bb74583A03E0d21E9e56cdae60a306B0
3. 0x6E39C86191D1D2581a24198b06a3f6dacE03aF91
4. 0xcd6B97E773fD588Ddf9462dD7e4f9869e120acFf
5.

Transactions:

| Tx Hash                                                            | From                                       | To  | Action            | Notes             |
| ------------------------------------------------------------------ | ------------------------------------------ | --- | ----------------- | ----------------- |
| 0x7eb51f7ddc79fa915e20d0659bafa6f4ebb16c2b841f2ae2f479c2ae39dc3ec3 | 0x5214990E840dEB4581760606a9970a0186AAa7F3 |     | run deployment.ts | Contract Creation |
|0xcc52d22e7b26d98e09acfa9da0eb7b8de1b0aec5f8ac0402f6975d064a36d766|0x5214990E840dEB4581760606a9970a0186AAa7F3|0x97c44088Bb74583A03E0d21E9e56cdae60a306B0|run giveVotingRights.ts|Giving voting rights|
|0xcc52d22e7b26d98e09acfa9da0eb7b8de1b0aec5f8ac0402f6975d064a36d766|0x5214990E840dEB4581760606a9970a0186AAa7F3|0x6E39C86191D1D2581a24198b06a3f6dacE03aF91|run giveVotingRights.ts|Giving voting rights|
|0xcc52d22e7b26d98e09acfa9da0eb7b8de1b0aec5f8ac0402f6975d064a36d766|0x5214990E840dEB4581760606a9970a0186AAa7F3|0xcd6B97E773fD588Ddf9462dD7e4f9869e120acFf|run giveVotingRights.ts|Giving voting rights|
|                                                                    |                                            |     |                   |                   |

Running scripts:

1. **Deployment**:

   *yarn ts-node scripts/Ballot/deployment.ts Ramen Pizza Burger Tacos Ražnjići*
   
   ```Console log:
   Wallet balance 0.03790467202459643
   Deploying Ballot contract
   Proposals:
   Proposal N. 1: Ramen
   Proposal N. 2: Pizza
   Proposal N. 3: Burger
   Proposal N. 4: Tacos
   Proposal N. 5: Ražnjići
   Awaiting confirmations
   Completed
   Contract deployed at 0x5e3c9631202a082499AC979D1E6B39B2cd4E5E46```

2. **Give voting rights**:

   *yarn ts-node scripts/Ballot/giveVotingRights.ts <contract address> <voter address>*
   
   ```Console log:
   Wallet balance 0.03614196201637045
   Attaching ballot contract interface to address 0x5e3c9631202a082499AC979D1E6B39B2cd4E5E46
   Giving right to vote to 0x97c44088Bb74583A03E0d21E9e56cdae60a306B0
   Awaiting confirmations
   Transaction completed. Hash: 0xcc52d22e7b26d98e09acfa9da0eb7b8de1b0aec5f8ac0402f6975d064a36d766```

