import { Address } from "wagmi";

export interface IPFSDataProps {
  name?: string;
  description?: string;
  totalToastSupply?: number;
  websiteLink?: string;
  communityName?: string;
  createdBy?: string;
  imageHash?: string;
  startDate?: string;
  endDate?: string;
  email?: string;
  tokenId?: string;
  formattedEndDate?: string;
  formattedStartDate?: string;
}

export interface NameResolution {
  // Address of resolution
  address: Address;
  // Name of entity that created the resolution. For example, 'Kaala' might
  // create a resolution on SocialConnect.
  issuerName?: string;
  // The resolve method might perform some normalization on the ID passed in.
  // This is the result of that normalization.
  name?: string;
  thumbnailPath?: string;
}

export interface NameResolutionError {
  error: Error;
}

export interface NameResolutionResults {
  resolutions: NameResolution[];
  errors: NameResolutionError[];
}

export interface NameResolver {
  resolve(id: string): Promise<NameResolutionResults>;
}
