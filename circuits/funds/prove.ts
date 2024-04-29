import sindri from 'sindri';

// Generate a proof for the `latest` tag of the `funds` circuit.
// The `funds` circuit name is specified in the `name` field of `./funds/sindri.json`.
const circuitIdentifier = 'funds:latest';

const pub_key = [
    131, 24, 83, 91, 84, 16, 93, 74, 122, 174, 96,
    192, 143, 196, 95, 150, 135, 24, 27, 79, 223, 198,
    37, 189, 26, 117, 63, 167, 57, 127, 237, 117, 53,
    71, 241, 28, 168, 105, 102, 70, 242, 243, 172, 176,
    142, 49, 1, 106, 250, 194, 62, 99, 12, 93, 17,
    245, 159, 97, 254, 245, 123, 13, 42, 165
];

const signature = [
    1, 83, 82, 167, 184, 77, 226, 104, 5, 27, 151,
    91, 202, 127, 17, 183, 75, 31, 190, 253, 159, 116,
    155, 13, 24, 178, 40, 165, 129, 90, 103, 204, 42,
    164, 230, 62, 73, 181, 169, 61, 251, 221, 128, 221,
    14, 19, 179, 25, 107, 132, 10, 188, 149, 0, 197,
    52, 151, 239, 244, 103, 215, 224, 56, 242
];

const hashed_message = [
    3, 57, 199, 96, 145, 58, 183, 241,
    206, 140, 36, 34, 165, 163, 17, 210,
    97, 254, 154, 79, 91, 223, 149, 18,
    3, 210, 111, 56, 246, 219, 19, 104
];

const proofInput = JSON.stringify({ pub_key, signature, hashed_message });

const proof = await sindri.proveCircuit(circuitIdentifier, proofInput);

// Log out the proof object as JSON.
console.log(JSON.stringify(proof, null, 2));