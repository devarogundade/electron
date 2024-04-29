import sindri from 'sindri';

// Compile the circuit in the `sbt` directory.
const circuit = await sindri.createCircuit('sbt');

// Log out the circuit object as JSON.
console.log(JSON.stringify(circuit, null, 2));