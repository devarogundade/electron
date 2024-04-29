use dep::std;
use dep::ecrecover;

mod server;

#[export]
unconstrained fn has_binance_sbt(address: Field) -> bool {
    server::has_sbt(address)
}

// Define the main function for the circuit.
fn main(
    pub_key: [u8; 64],
    signature: [u8; 64],
    hashed_message: pub [u8; 32]
) {
    // Convert pub_key to secp256k1 key
    let key = ecrecover::secp256k1::PubKey::from_unified(pub_key);

    // Check if the address is part of the merkle tree
    let address = key.to_eth_address();

    // Get has binance sbt
    let has_sbt = has_binance_sbt(address);

    assert(has_sbt);

    // Recover address from the signed message
    let computed_address = key.ecrecover(signature, hashed_message);

    // Check if the address was the signer
    assert(address == computed_address);
}
