# solidity-hh-fcc

Solidity Hardhat

##### Note: We will be using Solidity compiler version 0.8.16 throughout the project.

- Clone project and run below command to install all packages.

```
npm install
```

- Run below command to install solc at global level. This will add solcjs cli tool.

```
npm install -g solc@0.8.16
```

- Run command to check solc version install. Sample output attached.

```
solcjs --version

0.8.16+commit.07a7930e.Emscripten.clang
```

- cd to folder where .sol files are located and compile any of them. The command will generate binary as well as abi of the contract.

```
cd ethers-simple-storage
solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
```
