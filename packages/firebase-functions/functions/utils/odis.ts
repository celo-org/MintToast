import { OdisUtils } from "@celo/identity";
import { IdentifierPrefix } from "@celo/identity/lib/odis/identifier";
import {
  AuthSigner,
  AuthenticationMethod,
  OdisContextName,
} from "@celo/identity/lib/odis/query";
import { Wallet, ethers } from "ethers";
import * as ACCOUNTS_CONTRACT from "../data/abis/Accounts.json";
import * as FA_CONTRACT from "../data/abis/FederatedAttestations.json";
import * as ODIS_PAYMENTS_CONTRACT from "../data/abis/OdisPayments.json";
import * as STABLE_TOKEN_CONTRACT from "../data/abis/StableToken.json";

import {
  ACCOUNTS_PROXY_ADDRESS,
  ALFAJORES_CUSD_ADDRESS,
  DEK_PRIVATE_KEY,
  FA_PROXY_ADDRESS,
  ODIS_PAYMENTS_PROXY_ADDRESS,
} from "../data/constant";
import { getProvider } from "./web3";

export const serviceContext = OdisUtils.Query.getServiceContext(
  OdisContextName.ALFAJORES
);

const NOW_TIMESTAMP = Math.floor(new Date().getTime() / 1000);

export const ONE_CENT_CUSD = ethers.utils.parseEther("0.01");

export const authSigner: AuthSigner = {
  authenticationMethod: AuthenticationMethod.ENCRYPTION_KEY,
  rawKey: DEK_PRIVATE_KEY as string,
};

const provider = getProvider();
console.log("provider", provider);
export const issuer = new Wallet(
  process.env.ISSUER_PRIVATE_KEY as string,
  provider
);

export const federatedAttestationsContract = new ethers.Contract(
  FA_PROXY_ADDRESS,
  FA_CONTRACT.abi,
  issuer
);
export const odisPaymentsContract = new ethers.Contract(
  ODIS_PAYMENTS_PROXY_ADDRESS,
  ODIS_PAYMENTS_CONTRACT.abi,
  issuer
);

export const accountsContract = new ethers.Contract(
  ACCOUNTS_PROXY_ADDRESS,
  (ACCOUNTS_CONTRACT as any).abi,
  issuer
);

export const stableTokenContract = new ethers.Contract(
  ALFAJORES_CUSD_ADDRESS,
  STABLE_TOKEN_CONTRACT.abi,
  issuer
);

export async function checkAndTopUpODISQuota() {
  console.log("issuer?.address", issuer?.address);
  console.log("authSigner", authSigner);
  const { remainingQuota } = await OdisUtils.Quota.getPnpQuotaStatus(
    issuer?.address,
    authSigner,
    serviceContext
  );
  console.log("Remaining Quota", remainingQuota);

  if (remainingQuota < 1) {
    const currentAllowance = await stableTokenContract.allowance(
      issuer.address,
      odisPaymentsContract.address
    );
    console.log("current allowance:", currentAllowance.toString());
    let enoughAllowance = false;

    if (ONE_CENT_CUSD.gt(currentAllowance)) {
      const tx = await stableTokenContract.increaseAllowance(
        odisPaymentsContract.address,
        ONE_CENT_CUSD.mul(100)
      );
      const approvalTxReceipt = await tx.wait();
      // const approvalTxReceipt =
      console.log("approval status", approvalTxReceipt.status);
      enoughAllowance = approvalTxReceipt.status;
    } else {
      enoughAllowance = true;
    }

    // increase quota
    if (!enoughAllowance) {
      const tx = await odisPaymentsContract.payInCUSD(
        issuer.address,
        ONE_CENT_CUSD.mul(10)
      );
      const odisPayment = await tx.wait();

      console.log("odis payment tx status:", odisPayment.status);
      console.log("odis payment tx hash:", odisPayment.transactionHash);
    } else {
      throw new Error("Not enough allowance");
    }
  }
}

export async function getIdentifier(twitterHandle: string) {
  console.log(
    "🚀 ~ file: odis.ts:114 ~ getIdentifier ~ twitterHandle:",
    twitterHandle
  );
  console.log("issuer.address", issuer.address);
  console.log("serviceContext", serviceContext);
  try {
    console.log("Fetching quota");
    await checkAndTopUpODISQuota();
    const { obfuscatedIdentifier } =
      await OdisUtils.Identifier.getObfuscatedIdentifier(
        twitterHandle,
        IdentifierPrefix.TWITTER,
        issuer.address,
        authSigner,
        serviceContext
      );
    console.log(
      "🚀 ~ file: odis.ts:118 ~ getIdentifier ~ obfuscatedIdentifier:",
      obfuscatedIdentifier
    );

    return obfuscatedIdentifier;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export const registerIdentifier = async (
  twitterHandle: string,
  address: string
) => {
  try {
    const identifier = await getIdentifier(twitterHandle);
    console.log(
      "🚀 ~ file: register.ts:12 ~ registerIdentifier ~ identifier:",
      identifier
    );

    const tx = await federatedAttestationsContract.registerAttestationAsIssuer(
      identifier,
      address,
      NOW_TIMESTAMP
    );
    console.log("🚀 ~ file: register.ts:22 ~ registerIdentifier ~ tx:", tx);

    const receipt = await tx.wait();
    console.log(
      "🚀 ~ file: register.ts:25 ~ registerIdentifier ~ receipt:",
      receipt
    );
    return receipt;
  } catch (error) {
    return error;
  }
};
