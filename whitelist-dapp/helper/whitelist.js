import { Contract } from "ethers";
import getProvider from "./provider";
import { WHITELIST_CONTRACT_ADDRESS, abi } from "../constants";

export const getNumberOfWhitelisted = async (
  web3ModalRef,
  setNumberOfWhitelisted
) => {
  try {
    const provider = await getProvider(web3ModalRef);

    const whitelistContract = new Contract(
      WHITELIST_CONTRACT_ADDRESS,
      abi,
      provider
    );
    const _numOfWhitelistedAddresses =
      whitelistContract.numWhitelistedAddresses();

    setNumberOfWhitelisted(_numOfWhitelistedAddresses);
  } catch (error) {
    console.log(error);
  }
};

export const checkIfAddressInWhitelist = async (
  web3ModalRef,
  setJoinedWhitelist
) => {
  try {
    const signer = await getProvider(web3ModalRef, true);

    const whitelistContract = new Contract(
      WHITELIST_CONTRACT_ADDRESS,
      abi,
      signer
    );

    const address = await signer.getAddress();

    const _joinedWhitelist = await whitelistContract.whitelistedAddresses(
      address
    );

    setJoinedWhitelist(_joinedWhitelist);
  } catch (error) {
    console.log(error);
  }
};

export const addAddressToWhitelist = async (
  web3ModalRef,
  setLoading,
  setJoinedWhitelist,
  setNumberOfWhitelisted
) => {
  try {
    const signer = await getProvider(web3ModalRef, true);

    const whitelistContract = new Contract(
      WHITELIST_CONTRACT_ADDRESS,
      abi,
      signer
    );

    const transaction = await whitelistContract.addAddressToWhitelist();
    setLoading(true);
    await transaction.wait();
    setLoading(false);

    await getNumberOfWhitelisted(web3ModalRef, setNumberOfWhitelisted);
    setJoinedWhitelist(true);
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async (web3ModalRef, setWalletConnected, setNumberOfWhitelisted) => {
  try {
    await getProvider(web3ModalRef, true);
    setWalletConnected(true);

    checkIfAddressInWhitelist();
    getNumberOfWhitelisted(web3ModalRef, setNumberOfWhitelisted);
  } catch (error) {
    console.log(error);
  }
};
