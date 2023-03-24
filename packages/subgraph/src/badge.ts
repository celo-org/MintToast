import { BigInt } from "@graphprotocol/graph-ts";
import {
    Badge,
    CollectionCreated,
    TransferSingle,
    URI,
} from "../generated/Badge/Badge";
import { Event, User, Item } from "../generated/schema";

export function handleCollectionCreated(event: CollectionCreated): void {
    let collectionId = event.params.collectionId;
    let events = new Event(collectionId.toString());
    events.currentSupply = new BigInt(0);
    events.creationTimestamp = event.block.timestamp;
    events.totalSupply = event.params.supplyCollection;
    events.toaster = event.params.creator;

    let contract = Badge.bind(event.address);
    events.uri = contract.uri(collectionId);

    events.save();
}

export function handleTransferSingle(event: TransferSingle): void {
    // if (
    //     event.params.from.toHexString() ==
    //     "0x0000000000000000000000000000000000000000"
    // ) {
    // log.debug("{}, {}", [
    //     event.params.from.toHexString(),
    //     event.params.to.toHexString(),
    // ]);

    let collection = Event.load(event.params.id.toString());
    if (collection) {
        let contract = Badge.bind(event.address);
        collection.currentSupply = contract
            .currentSupply(event.params.id)
            .minus(new BigInt(1));
        collection.save();

        let item = new Item(
            contract
                .currentSupply(event.params.id)
                .minus(new BigInt(1))
                .toString()
        );
        item.event = collection.id;
        item.owner = event.params.to.toHexString();
        item.timestamp = event.block.timestamp;
        item.save();
        let user = User.load(event.params.to.toString());
        if (user) {
            user.collection.push(item.id);
            user.save();
        } else {
            let user = new User(event.params.to.toHexString());
            user.save();
        }
        // }
    }
    // else if (event.params.to == new Address(0)) {
    //     //TODO
    // } else {
    //     let sender = User.load(event.params.from.toString());
    //     if (sender) {
    //         let itemIndex = sender.collection.indexOf(
    //             event.params.id.toString()
    //         );
    //         sender.collection[itemIndex] =
    //             sender.collection[sender.collection.length];
    //         sender.collection.pop();
    //         sender.save();
    //     }
    //     let receiver = User.load(event.params.to.toString());
    //     if (receiver) {
    //         receiver.collection.push(event.params.id.toString());
    //         receiver.save();
    //     } else {
    //         let user = new User(event.params.to.toString());
    //         user.collection.push(event.params.id.toString());
    //         user.save();
    //     }
    // }
}

export function handleURI(event: URI): void {
    let series = Event.load(event.params.id.toString());
    if (series) {
        series.uri = `ipfs://${event.params.value}`;
    }
}
