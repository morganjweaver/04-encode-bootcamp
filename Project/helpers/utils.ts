import { ethers } from "ethers";

// Helper functions

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

function getSigner(providerName: string = "goerli"): ethers.Wallet {
    const wallet =
      process.env.MNEMONIC && process.env.MNEMONIC.length > 0
        ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
        : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
    
        console.log(`Using address ${wallet.address}`);
  
    const provider = ethers.providers.getDefaultProvider(providerName);
    
    return wallet.connect(provider);
}

  export { EXPOSED_KEY, getSigner };
