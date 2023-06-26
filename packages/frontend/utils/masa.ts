import { Masa, NetworkName } from "@masa-finance/masa-sdk";
import { Signer } from "ethers";
import { Address } from "wagmi";
import { NameResolutionResults, NameResolver } from "./props";

export class ResolveMasa implements NameResolver {
  masa: Masa;

  constructor({
    signer,
    networkName,
    masa,
  }: {
    signer: Signer;
    networkName: NetworkName;
    masa?: Masa;
  }) {
    console.log("signer", signer);
    this.masa = masa
      ? masa
      : new Masa({
          networkName,
          signer,
        });
  }

  async resolve(id: string): Promise<NameResolutionResults> {
    const result: NameResolutionResults = {
      resolutions: [],
      errors: [],
    };

    try {
      const extension =
        await this.masa.contracts.instances.SoulNameContract.extension();

      if (!id.endsWith(extension)) {
        return result;
      }

      const name = id.replace(".celo", "");

      const address = await this.masa.soulName.resolve(name);
      if (address) {
        result.resolutions.push({
          address: address as Address,
          name,
        });
      }
    } catch (error) {
      result.errors.push({
        error: error as Error,
      });
    }

    return result;
  }
}
