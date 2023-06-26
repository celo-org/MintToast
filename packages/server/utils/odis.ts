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
  const { remainingQuota } = await OdisUtils.Quota.getPnpQuotaStatus(
    issuer?.address,
    authSigner,
    serviceContext
  );

  if (remainingQuota < 1) {
    const currentAllowance = await stableTokenContract.allowance(
      issuer.address,
      odisPaymentsContract.address
    );
    let enoughAllowance = false;

    if (ONE_CENT_CUSD.mul(10).lt(currentAllowance)) {
      const tx = await stableTokenContract.increaseAllowance(
        odisPaymentsContract.address,
        ONE_CENT_CUSD.mul(100)
      );
      const approvalTxReceipt = await tx.wait();
      if (approvalTxReceipt.statu == 1) {
        enoughAllowance = true;
      }
    } else {
      enoughAllowance = true;
    }

    // increase quota
    if (enoughAllowance) {
      const tx = await odisPaymentsContract.payInCUSD(
        issuer.address,
        ONE_CENT_CUSD.mul(10)
      );
      await tx.wait();
    } else {
      throw new Error("Not enough allowance");
    }
  }
}

export async function getIdentifier(twitterHandle: string) {
  try {
    await checkAndTopUpODISQuota();
    const { obfuscatedIdentifier } =
      await OdisUtils.Identifier.getObfuscatedIdentifier(
        twitterHandle,
        IdentifierPrefix.TWITTER,
        issuer.address,
        authSigner,
        serviceContext
      );

    return obfuscatedIdentifier;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const registerIdentifier = async (
  twitterHandle: string,
  address: string
) => {
  const accounts = await getAccountsFromTwitterHandle(twitterHandle);
  if (accounts.length) {
    throw new Error("Identifier already registered");
  }
  const identifier = await getIdentifier(twitterHandle);
  const tx = await federatedAttestationsContract.registerAttestationAsIssuer(
    identifier,
    address,
    NOW_TIMESTAMP
  );

  const receipt = await tx.wait();
  return receipt;
};

export const getAccountsFromTwitterHandle = async (twitterHandle: string) => {
  const obfuscatedIdentifier = await getIdentifier(twitterHandle);
  const attestations = await federatedAttestationsContract.lookupAttestations(
    obfuscatedIdentifier,
    [issuer.address]
  );
  return attestations.accounts;
};

export const checkIfIdentifierIsRegisteredAlreadyUnderIssuer = async (
  twitterHandle: string
) => {
  const accounts = await getAccountsFromTwitterHandle(twitterHandle);
  return accounts.length;
};

export const revokeIdentifier = async (
  twitterHandle: string,
  address: string
) => {
  const identifier = await getIdentifier(twitterHandle);

  const tx = await federatedAttestationsContract.revokeAttestation(
    identifier,
    issuer.address,
    address
  );

  const receipt = await tx.wait();
  return receipt;
};
