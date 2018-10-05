const brain      = require('brain.js');
const trainData  = require('./src/training-data');
const serializer = require('./src/serializer');
const net        = new brain.NeuralNetwork();

net.train(serializer.serialize(trainData));

const output_1 = net.run(serializer.encode('Nothing is not ok')); 
const output_2 = net.run(serializer.encode('I am happy')); 

console.log(output_1);
console.log(output_2);