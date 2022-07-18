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
5. 0xd1800C1Df4e798954b992a1b8C8fB7C02c3957D6

Transactions:

| Tx Hash                                                            | From                                       | To  | Action            | Notes             |
| ------------------------------------------------------------------ | ------------------------------------------ | --- | ----------------- | ----------------- |
| 0x7eb51f7ddc79fa915e20d0659bafa6f4ebb16c2b841f2ae2f479c2ae39dc3ec3 | 0x5214990E840dEB4581760606a9970a0186AAa7F3 |     | run deployment.ts | Contract Creation |
|0xcc52d22e7b26d98e09acfa9da0eb7b8de1b0aec5f8ac0402f6975d064a36d766|0x5214990E840dEB4581760606a9970a0186AAa7F3|0x5e3c9631202a082499AC979D1E6B39B2cd4E5E46|run giveVotingRights.ts|Giving voting rights|
|0xf59320222f1feb6172e150834817388a43bd67dc6ab7f7ca325fe4fb777b907e|0x5214990E840dEB4581760606a9970a0186AAa7F3|0x5e3c9631202a082499AC979D1E6B39B2cd4E5E46|run giveVotingRights.ts|Giving voting rights|
|0x40662d409cddb2be7cfbe3bedb6b44cad1cb467286a05bae1031c7aa92c57dc1|0x5214990E840dEB4581760606a9970a0186AAa7F3|0x5e3c9631202a082499AC979D1E6B39B2cd4E5E46|run giveVotingRights.ts|Giving voting rights|
|0xdd4e26416610b66a1654845b1763d8508aacc5e72e3f742fa86094137c6b6d3a|0x6e39c86191d1d2581a24198b06a3f6dace03af91|0x5e3c9631202a082499AC979D1E6B39B2cd4E5E46|run castVote.ts|Vote on proposal|
|0x8dcf69d4d5342a9d529344161f241c1a6d37164672297d0d9d5753e3d9f633e5|0x5214990e840deb4581760606a9970a0186aaa7f3|0x5e3c9631202a082499AC979D1E6B39B2cd4E5E46|run castVote.ts|Vote on proposal|
|0xd244b01165751fc962f2a25d0d231a60d7b2b1d8e95326314506a2cb727bad21|0x97c44088Bb74583A03E0d21E9e56cdae60a306B0|0x5e3c9631202a082499AC979D1E6B39B2cd4E5E46|run delegate.ts|Delegate vote| 
|0x25f90feeca1ebee8853259215c64e86320606d0d41b7ac6bad3440892ca78a57|0xcd6b97e773fd588ddf9462dd7e4f9869e120acff|0x5e3c9631202a082499ac979d1e6b39b2cd4e5e46|run castVote.ts|Vote on proposal|
|0xef94ab5cf24b9f3785ec4b0dfeb1eacd1a6ba94e98292c613caeb0c0242119cc|0x5214990E840dEB4581760606a9970a0186AAa7F3|0x5e3c9631202a082499ac979d1e6b39b2cd4e5e46|run giveVotingRights.ts|Giving voting rights|
|0x42f3f9377dae2205430b20e0cf91c96f2d5f0a61d9fa63f465efcfe75a613e31|0xd1800c1df4e798954b992a1b8c8fb7c02c3957d6|0x5e3c9631202a082499ac979d1e6b39b2cd4e5e46|run castVote.ts|Vote on proposal|

Running scripts:

1. **Deployment**:

   *yarn ts-node scripts/Ballot/deployment.ts Ramen Pizza Burger Tacos Ražnjići*
   
   Console log:
   ```
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
   Contract deployed at 0x5e3c9631202a082499AC979D1E6B39B2cd4E5E46
   ```
   
2. **Query proposals**:

   *yarn ts-node scripts/Ballot/queryProposals.ts 0x5e3c9631202a082499AC979D1E6B39B2cd4E5E46*
   

3. **Give voting rights**:

   *yarn ts-node scripts/Ballot/giveVotingRights.ts "contract address" "voter address"*
   
   Console log:
   ```
   Wallet balance 0.03614196201637045
   Attaching ballot contract interface to address *"contract address"*
   Giving right to vote to *"voter address"*
   Awaiting confirmations
   Transaction completed. Hash: 0xcc52d22e7b26d98e09acfa9da0eb7b8de1b0aec5f8ac0402f6975d064a36d766
   ```
   
4. **Delegate vote**:

   *yarn ts-node scripts/Ballot/delegate.ts "contract address" "delegate address"*
   
   Console log:
   ```
   Wallet balance 0.05
   Attaching ballot contract interface to address 0x5e3c9631202a082499AC979D1E6B39B2cd4E5E46
   Awaiting confirmations
   About to delegate "voter address"'s vote to "delegate address" for contract "contract address"
   Transaction completed. Hash: 0xd244b01165751fc962f2a25d0d231a60d7b2b1d8e95326314506a2cb727bad21
   ```
   
5. **Cast vote**:

   *yarn ts-node scripts/Ballot/castVote.ts "contract address" "proposal number"*
   
   Console log:
   ```
   Wallet balance 0.03592300551520268
   Attaching ballot contract interface to address *"contract address"* *"proposal number"*
   Awaiting confirmations
   Transaction completed. Hash: 0x8dcf69d4d5342a9d529344161f241c1a6d37164672297d0d9d5753e3d9f633e5
   ```
   
6. **Query voting result**:

   *yarn ts-node scripts/Ballot/queryResult.ts "contract address"*
   
   Console log:
   ```
   Wallet balance 0.6843752091622013
   Attaching ballot contract interface to address 0x5e3c9631202a082499AC979D1E6B39B2cd4E5E46
   The winning proposal is Pizza
   ```

