const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const mnemonicPhrase =
  "work life hamster prepare visa license thought stuff never hawk kite notice";

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl:
    "https://sepolia.infura.io/v3/610528eb0f3c442eafe65d3a87530da1",
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting ", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({ gas: "1000000", from: accounts[0] });

  console.log(
    "contract deployed to sepoliaETH test network: ",
    result.options.address
  );
};

deploy();
