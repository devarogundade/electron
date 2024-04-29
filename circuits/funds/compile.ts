import sindri from 'sindri';

// Compile the circuit in the `funds` directory.
const circuit = await sindri.createCircuit('funds');

// Log out the circuit object as JSON.
console.log(JSON.stringify(circuit, null, 2));