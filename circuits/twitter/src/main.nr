use dep::std;
use dep::ecrecover;

mod server;

#[export]
unconstrained fn get_followers_count(username: Field) -> u64 {
    server::followers(username)
}

global min_followers_count: u64 = 100; // 100 followers

// Define the main function for the circuit.
fn main(
    username: Field,
    pub_key: [u8; 64],
    signature: [u8; 64],
    hashed_message: pub [u8; 32]
) {
    // Convert pub_key to secp256k1 key
    let key = ecrecover::secp256k1::PubKey::from_unified(pub_key);

    // Check if the address is part of the merkle tree
    let address = key.to_eth_address();

    // Get followers count
    let followers_count = get_followers_count(username);
    
    // Check the followers_count is sufficient
    assert(followers_count >= min_followers_count);

    // Recover address from the signed message
    let computed_address = key.ecrecover(signature, hashed_message);

    // Check if the address was the signer
    assert(address == computed_address);
}
