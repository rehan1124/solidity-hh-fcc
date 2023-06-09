const ethers = require("ethers");
const dotenv = require("dotenv");
const fs = require("fs-extra");

dotenv.config();

async function main() {
  console.log("--- Starting deployment ---");

  // Provider and Wallet
  const provider = new ethers.JsonRpcProvider(process.env.GANACHE_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Read ABI
  const abi = fs.readFileSync(
    "./scripts/ethers-simple-storage_SimpleStorage_sol_SimpleStorage.abi",
    "utf-8"
  );
  // Read Binary
  const binary = fs.readFileSync(
    "./scripts/ethers-simple-storage_SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  // Object used to deploy contracts
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Please wait...");

  const contract = await contractFactory.deploy();
  const deploymentReceipt = await contract.deploymentTransaction().wait(1);

  // console.log("Here is the deployment transaction: ");
  // console.log(contract.deploymentTransaction);

  console.log("Here is the transaction receipt: ");
  console.log(deploymentReceipt);

  console.log("--- Deployment completed! ---");

  // --- Methods from contract ---
  console.log(
    "--- Let's do some TESTING. Read and store favorite numbers from/to contract deployed. ---"
  );
  const fvNumber = await contract.retrieve();
  console.log(`Current favorite number: ${fvNumber}`);

  const storeResponse = await contract.store(7);
  const storeResponseReceipt = await storeResponse.wait(1);
  console.log("Store response receipt:");
  console.log(storeResponseReceipt);
  const fvNumberUpdated = await contract.retrieve();
  console.log(`New favorite number after updating: ${fvNumberUpdated}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
