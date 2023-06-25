import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import admin from "firebase-admin";
import serviceAccount from "./mint-toast-firebase-adminsdk-934y9-315a63f865.json";
import checkSecretHandler from "./src/api/check-secret";
import createToastQRHandler from "./src/api/create-toast-qr";
import createToastSecretHandler from "./src/api/create-toast-secret";
import getAccountsFromTwitter from "./src/api/get-account-from-twitter";
import getAllEventUUIDHandler from "./src/api/get-all-event-uuid";
import getEventIdHandler from "./src/api/get-event-id";
import getOwnerHandler from "./src/api/get-owner";
import getSecretDataHandler from "./src/api/get-secret-data";
import getUserCollectionHandler from "./src/api/get-user-collection";
import mintHandler from "./src/api/mint";
import registerTwitterHandler from "./src/api/register-twitter";
import revokeTwitterHandler from "./src/api/revoke-twitter";

dotenv.config({ path: ".env" });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

const app: Express = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.post("/api/mint", mintHandler);
app.post("/api/create-toast-qr", createToastQRHandler);
app.post("/api/create-toast-secret", createToastSecretHandler);

app.get("/api/get-all-event-uuid", getAllEventUUIDHandler);
app.post("/api/get-event-id", getEventIdHandler);
app.post("/api/get-owner", getOwnerHandler);
app.post("/api/get-secret-data", getSecretDataHandler);
app.post("/api/get-user-collection", getUserCollectionHandler);

app.post("/api/check-secret", checkSecretHandler);
app.post("/api/register-twitter", registerTwitterHandler);
app.post("/api/revoke-twitter", revokeTwitterHandler);
app.post("/api/get-accounts-from-twitter", getAccountsFromTwitter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
