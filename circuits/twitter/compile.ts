import sindri from 'sindri';

// Compile the circuit in the `twitter` directory.
const circuit = await sindri.createCircuit('twitter');

// Log out the circuit object as JSON.
console.log(JSON.stringify(circuit, null, 2));