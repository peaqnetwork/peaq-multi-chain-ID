import { cryptoWaitReady } from "@polkadot/util-crypto";
import { networks } from "./constants.js";
import { createStorageKeys, generateKeyPair, getNetworkApi } from "./utils.js";
import { u8aToString } from "@polkadot/util";

const myseed = "panic pretty surge torch reunion uncle execute snack silver praise math midnight";

const chainsInfo = [
    {
        type: "binance",
        address: 'bnb1kgtjr4md5h66yf4zd07ql6j42zwywlg7txuqrx'
    },
    {
        type: "solana",
        address: '5CnhLnL4ou193YJYGaUrKergD9BUazJzMbVfeymyKV9a'
    },
    {
        type: "cosmos",
        address: '1dmvq9kzgjf0yjjkldsyfh0rt9kl5tluwhf78ck'
    }
]

const main = async () => {
    try {

    const chainsMapping = [];
    await cryptoWaitReady();
    
    const pair = generateKeyPair(myseed);
    
    const api = await getNetworkApi(networks.PEAQ);

    const storageExtrinsics = await Promise.all(chainsInfo.map(async (chainInfo) => {
        const { hashed_key } = createStorageKeys(
            [{
                value: pair.address,
                type: 0,
            },
            {
                value: chainInfo.type,
                type: 1,
            }]
        )
        const checkifExist = await api.query.peaqStorage.itemStore(hashed_key);
        const parsedValue = u8aToString(checkifExist);
        if (parsedValue || parsedValue?.isStorageFallback) {
            console.log(`Chain ${chainInfo.type} already exist for this address ${pair.address}`);
            chainsMapping.push({
                chain: chainInfo.type,
                address: parsedValue
            });
            return null;
        }

        const extrinsic = api.tx.peaqStorage.addItem(chainInfo.type, chainInfo.address);
        return extrinsic;
    }));
    console.log('chainsMapping', chainsMapping);
    const filteredStorageExtrinsics = storageExtrinsics.filter((extrinsic) => extrinsic !== null);
    if (!filteredStorageExtrinsics.length) return;
    const batchAllExtrinsic = api.tx.utility.batchAll(filteredStorageExtrinsics);
    await batchAllExtrinsic.signAndSend(pair, { nonce: -1 }, (result) => {

        const { status, events, dispatchError } = result;
        // log error
        if (status.isFinalized) {
            console.log('Finalized block hash', result.status.asFinalized.toHex());
        }

        if (status.isInBlock) {
            console.log('In block', result.status.asInBlock.toHex());
        }

        if (dispatchError) {
            if (dispatchError.isModule) {
              // for module errors, we have the section indexed, lookup
              const decoded = api.registry.findMetaError(dispatchError.asModule);
              const { docs, name, section } = decoded;
      
              console.log(`${section}.${name}: ${docs.join(' ')}`);
            } else {
              // Other, CannotLookup, BadOrigin, no extra info
              console.log(dispatchError.toString());
            }
          }
        
    });

    const batchAllExtrinsicHash = batchAllExtrinsic.toHex();
    console.log('batchAllExtrinsicHash', batchAllExtrinsicHash);

    console.log("---------Network call complete!----------");
    } catch (error) {
        console.log('error', error);
    }
};

main();