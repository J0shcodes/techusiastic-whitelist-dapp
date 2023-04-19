import { providers } from "ethers";

const getProvider = async (web3ModalRef, needSigner = false) => {
  const provider = await web3ModalRef.current.connect();
  console.log(provider)
  const web3Provider = new providers.Web3Provider(provider);

  const { chainId } = await web3Provider.getNetwork();
  if(chainId !== 5) {
    window.alert("Change network to Rinkeby");
    throw new Error("Change network to Rinkeby");
  }

  if(needSigner) {
    const signer = web3Provider.getSigner();
    return signer;
  }

  return web3Provider
};

export default getProvider;
