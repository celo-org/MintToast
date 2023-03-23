import { BigInt } from "@graphprotocol/graph-ts";
import {
    Badge,
    CollectionCreated,
    Initialized,
    RoleAdminChanged,
    RoleGranted,
    RoleRevoked,
    TransferBatch,
    TransferSingle,
    URI,
} from "../generated/Badge/Badge";
import { Serie, User, Item, SeriesBalance } from "../generated/schema";

export function handleCollectionCreated(event: CollectionCreated): void {
    /**
     * collectionId - Id of the serie.
     */
    let collectionId = event.params.collectionId;

    let series = new Serie(collectionId.toString());
    series.currentSupply = new BigInt(0);
    series.creationTimestamp = event.block.timestamp;
    series.totalSupply = event.params.supplyCollection;
    series.toaster = event.params.creator;

    /**
     * Fetching the uri for the serie from the contract
     */
    let contract = Badge.bind(event.address);
    series.uri = contract.uri(collectionId);

    series.save();
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleTransferSingle(event: TransferSingle): void {
    /**
     * If `from` is zero address then it is a mint.
     */
    if (
        event.params.from.toHexString() ==
        "0x0000000000000000000000000000000000000000"
    ) {
        let collection = Serie.load(event.params.id.toString());
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
            item.serie = collection.id;
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
        }
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
    /**
     * If the uri of the serie is changed then change it in the graph
     */
    let series = Serie.load(event.params.id.toString());
    if (series) {
        series.uri = `ipfs://${event.params.value}`;
    }
}
