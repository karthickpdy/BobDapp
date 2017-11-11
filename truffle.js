module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    live: {
      host: process.env.ETHEREUM_RPC_URL, // Connect to geth on the specified
      port: 8545,
      from: "be8715d3858c837fd08c51f3d0fac8a451225694", // default address to use for any transaction Truffle makes during migrations
      network_id: 15,
      gas: 4700000 // Gas limit used for deploys
    }    
  }
};
