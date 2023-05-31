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

export const mint = onRequest(mintHandler);
export const createToastQR = onRequest(createToastQRHandler);
export const createToastSecret = onRequest(createToastSecretHandler);

export const getAllEventUUID = onRequest(getAllEventUUIDHandler);
export const getEventId = onRequest(getEventIdHandler);
export const getOwner = onRequest(getOwnerHandler);
export const getSecretData = onRequest(getSecretDataHandler);
export const getUserCollection = onRequest(getUserCollectionHandler);
