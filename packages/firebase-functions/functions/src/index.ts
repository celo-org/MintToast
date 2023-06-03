import * as cors from "cors";
import { onRequest } from "firebase-functions/v2/https";
import createToastQRHandler from "./api/create-toast-qr";
import createToastSecretHandler from "./api/create-toast-secret";
import getAllEventUUIDHandler from "./api/get-all-event-uuid";
import getEventIdHandler from "./api/get-event-id";
import getOwnerHandler from "./api/get-owner";
import getSecretDataHandler from "./api/get-secret-data";
import getUserCollectionHandler from "./api/get-user-collection";
import mintHandler from "./api/mint";

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
