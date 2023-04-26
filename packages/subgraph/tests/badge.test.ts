import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { TransferSingle } from "../generated/Badge/Badge";
import {
    describe,
    test,
    assert,
    beforeAll,
    newMockEvent,
} from "matchstick-as/assembly/index";
import { handleTransferSingle } from "../src/badge";
import { Serie } from "../generated/schema";

function createTransferSingleEvent(
    operator: Address,
    from: Address,
    to: Address,
    id: i32,
    value: i32
): TransferSingle {
    let mockEvent = newMockEvent();

    let newTransferSingle = new TransferSingle(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
        mockEvent.receipt
    );

    newTransferSingle.parameters = new Array();

    let operatorParam = new ethereum.EventParam(
        "operator",
        ethereum.Value.fromAddress(operator)
    );

    let fromParam = new ethereum.EventParam(
        "from",
        ethereum.Value.fromAddress(from)
    );

    let toParam = new ethereum.EventParam("to", ethereum.Value.fromAddress(to));

    let idParam = new ethereum.EventParam("id", ethereum.Value.fromI32(id));
    let valueParam = new ethereum.EventParam(
        "value",
        ethereum.Value.fromI32(value)
    );

    newTransferSingle.parameters.push(operatorParam);
    newTransferSingle.parameters.push(fromParam);
    newTransferSingle.parameters.push(toParam);
    newTransferSingle.parameters.push(idParam);
    newTransferSingle.parameters.push(valueParam);

    return newTransferSingle;
}

describe("MintToast Tests", () => {
    beforeAll(() => {
        let serie = new Serie("7");
        serie.creationTimestamp = BigInt.fromString("100000000000");
        serie.totalSupply = BigInt.fromString("100");
        serie.mintStart = BigInt.fromString("100000000001");
        serie.mintEnd = BigInt.fromString("100000000010");
        serie.currentSupply = BigInt.fromString("0");
        serie.toaster = Address.fromString(
            "0x0fb8b800ca3086f5c78db451cf88cb7e4f399b5c"
        );
        serie.uri = "ipfs://QmPkQxZTvZxiXZLnNsaAqBMWN1EXZi97gZrpBULDxXCC9g";
        serie.save();
    });

    test("Can handle TransferSingle event", () => {
        let newTransferSingle = createTransferSingleEvent(
            Address.fromString("0x0fb8b800ca3086f5c78db451cf88cb7e4f399b5c"),
            Address.fromString("0x0000000000000000000000000000000000000000"),
            Address.fromString("0xe1061b397cc3c381e95a411967e3f053a7c50e70"),
            7,
            1
        );

        handleTransferSingle(newTransferSingle);

        assert.fieldEquals("Serie", "7", "currentSupply", "1");
    });
});
