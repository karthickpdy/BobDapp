module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    staging: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0x04136750a3df9f3cd19e06f60af25f596c74aa0c", // default address to use for any transaction Truffle makes during migrations
      network_id: 15,
      gas: 4700000 // Gas limit used for deploys
    },
    live: {
      host: process.env.NODE_CONFIG_TRUFFLE_CONFIG_ETHEREUM_RPC_URL, // Connect to geth on the specified
      port: 8545,
      from: "be8715d3858c837fd08c51f3d0fac8a451225694", // default address to use for any transaction Truffle makes during migrations
      network_id: 15,
      gas: 4700000 // Gas limit used for deploys
    }
  }
};
