import { onRequest } from "firebase-functions/v2/https";
import createToastQRHandler from "./api/create-toast-qr";
import createToastSecretHandler from "./api/create-toast-secret";
import getAllEventUUIDHandler from "./api/get-all-event-uuid";
import getEventIdHandler from "./api/get-event-id";
import getOwnerHandler from "./api/get-owner";
import getSecretDataHandler from "./api/get-secret-data";
import getUserCollectionHandler from "./api/get-user-collection";
import mintHandler from "./api/mint";

import admin from "firebase-admin";

admin.initializeApp();

const cors = { cors: ["flutter.com"] };

export const mint = onRequest({ ...cors, timeoutSeconds: 120 }, mintHandler);
export const createToastQR = onRequest(
  { ...cors, timeoutSeconds: 120 },
  createToastQRHandler
);
export const createToastSecret = onRequest(
  { ...cors, timeoutSeconds: 120 },
  createToastSecretHandler
);

export const getAllEventUUID = onRequest(cors, getAllEventUUIDHandler);
export const getEventId = onRequest(cors, getEventIdHandler);
export const getOwner = onRequest(cors, getOwnerHandler);
export const getSecretData = onRequest(cors, getSecretDataHandler);
export const getUserCollection = onRequest(cors, getUserCollectionHandler);
