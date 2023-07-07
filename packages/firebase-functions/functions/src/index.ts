import * as cors from "cors";
import { onRequest } from "firebase-functions/v2/https";
import checkSecretHandler from "./api/check-secret";
import checkWhitelistHandler from "./api/check-whitelist";
import createToastQRHandler from "./api/create-toast-qr";
import createToastSecretHandler from "./api/create-toast-secret";
import getAccountsFromTwitter from "./api/get-account-from-twitter";
import getAllEventUUIDHandler from "./api/get-all-event-uuid";
import getEventIdHandler from "./api/get-event-id";
import getOwnerHandler from "./api/get-owner";
import getSecretDataHandler from "./api/get-secret-data";
import getTwitterFromAddressHandle from "./api/get-twitter-from-address";
import getUserCollectionHandler from "./api/get-user-collection";
import mintHandler from "./api/mint";
import registerTwitterHandler from "./api/register-twitter";
import revokeTwitterHandler from "./api/revoke-twitter";

const corsHandler = cors({ origin: true });

import admin from "firebase-admin";

admin.initializeApp();

export const mint = onRequest({ timeoutSeconds: 120 }, (req, res) =>
  corsHandler(req, res, () => mintHandler(req, res))
);
export const createToastQR = onRequest({ timeoutSeconds: 120 }, (req, res) =>
  corsHandler(req, res, () => createToastQRHandler(req, res))
);
export const createToastSecret = onRequest(
  { timeoutSeconds: 120 },
  (req, res) => corsHandler(req, res, () => createToastSecretHandler(req, res))
);

export const getAllEventUUID = onRequest((req, res) =>
  corsHandler(req, res, () => getAllEventUUIDHandler(req, res))
);
export const getEventId = onRequest((req, res) =>
  corsHandler(req, res, () => getEventIdHandler(req, res))
);
export const getOwner = onRequest((req, res) =>
  corsHandler(req, res, () => getOwnerHandler(req, res))
);
export const getSecretData = onRequest((req, res) =>
  corsHandler(req, res, () => getSecretDataHandler(req, res))
);
export const getUserCollection = onRequest((req, res) =>
  corsHandler(req, res, () => getUserCollectionHandler(req, res))
);

export const checkWhitelist = onRequest((req, res) =>
  corsHandler(req, res, () => checkWhitelistHandler(req, res))
);

export const registerTwitter = onRequest(
  { timeoutSeconds: 300, cors: true },
  (req, res) => registerTwitterHandler(req, res)
);

export const revokeTwitter = onRequest({ timeoutSeconds: 300 }, (req, res) =>
  corsHandler(req, res, () => revokeTwitterHandler(req, res))
);

export const getAccountsFromTwitterHandle = onRequest((req, res) =>
  corsHandler(req, res, () => getAccountsFromTwitter(req, res))
);

export const getTwitterFromAddress = onRequest((req, res) =>
  corsHandler(req, res, () => getTwitterFromAddressHandle(req, res))
);

export const checkSecret = onRequest((req, res) =>
  corsHandler(req, res, () => checkSecretHandler(req, res))
);
