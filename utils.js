import { Keyring, decodeAddress } from "@polkadot/keyring";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { PEAQ_MNEMONIC, networks } from "./constants.js";
import { u8aConcat, u8aToHex, u8aToString, u8aToU8a } from "@polkadot/util";
import { blake2AsHex } from "@polkadot/util-crypto";

let peaqKeyPair = "";
const peaqMnemonic = PEAQ_MNEMONIC;

export const generateKeyPair = (mnemonic) => {
  const keyring = new Keyring({ type: "sr25519" });
  const pair = keyring.addFromUri(mnemonic);
  return pair;
};

export const getPeaqKeyPair = () => {
  if (peaqKeyPair) return peaqKeyPair;
  const keyPair = new Keyring({ type: "sr25519" }).addFromUri(peaqMnemonic);
  peaqKeyPair = keyPair;
  return keyPair;
};

export const getNetworkApi = async (network) => {
  try {
    // if (global[network.name]) return global[network.name];
    const api = new ApiPromise({
      provider: new WsProvider(network.ws),
    });
    await api.isReadyOrError;
    global[`${network.name}`] = api;
    return api;
  } catch (error) {
    console.error("getNetworkApi error", error);
    throw error;
  }
};

export const makePalletQuery = async (
  palletName,
  storeName,
  args,
  ) => {
    try {
      const api = await getNetworkApi(networks.PEAQ);
      const data = await api.query[palletName][storeName](...args);
      api.disconnect();
      return data;
    } catch (error) {
      console.error(`Error ${makePalletQuery.name} - `, error);
      return error;
    }
};

export const createStorageKeys = (args) => {
  //console.log("args", args);
  // decode address to byte array
  const keysByteArray = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i].type === 0) {
      const decoded_address = decodeAddress(args[i].value, false, 42);
      keysByteArray.push(decoded_address);
    }
    if (args[i].type === 1) {
      const hash_name = u8aToU8a(args[i].value);
      keysByteArray.push(hash_name);
    }
  }
  const key = u8aConcat(...keysByteArray);
  // encode the key using blake2b
  const hashed_key = blake2AsHex(key, 256);
  console.log("hashed_key", hashed_key);
  return { hashed_key };
};
