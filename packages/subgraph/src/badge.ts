import { BigInt } from "@graphprotocol/graph-ts";
import {
    Badge,
    SeriesCreated,
    TransferSingle,
    URI,
} from "../generated/Badge/Badge";
import { Serie, Item, User } from "../generated/schema";

export function handleSeriesCreated(event: SeriesCreated): void {
    let collectionId = event.params.collectionId;
    let series = new Serie(collectionId.toString());
    series.currentSupply = new BigInt(0);
    series.creationTimestamp = event.block.timestamp;
    series.totalSupply = event.params.supplyCollection;
    series.toaster = event.params.creator;

    let contract = Badge.bind(event.address);
    series.uri = contract.uri(collectionId);

    let serie = contract.series(collectionId);
    series.mintStart = serie.getMintStart();
    series.mintEnd = serie.getMintEnd();

    series.save();
}

export function handleTransferSingle(event: TransferSingle): void {
    let collection = Serie.load(event.params.id.toString());
    if (collection) {
        let contract = Badge.bind(event.address);
        let currentSupply = contract
            .currentSupply(event.params.id)
            .minus(new BigInt(1));
        collection.currentSupply = currentSupply;
        collection.save();

        let item = new Item(event.transaction.hash.toHexString());
        item.serie = collection.id;
        item.owner = event.params.to.toHexString();
        item.timestamp = event.block.timestamp;
        item.idInSeries = currentSupply;
        item.save();
        let user = User.load(event.params.to.toHexString());
        if (!user) {
            let user = new User(event.params.to.toHexString());
            user.save();
        }
    }
}

export function handleURI(event: URI): void {
    let series = Serie.load(event.params.id.toString());
    if (series) {
        series.uri = `ipfs://${event.params.value}`;
    }
}
