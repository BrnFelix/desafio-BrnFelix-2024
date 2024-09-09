// encontrarRecinto.js

import { RecintosZoo } from './recintos-zoo.js';

const zoo = new RecintosZoo();

// Teste para MACACO, 2
console.log(zoo.encontrarRecinto('MACACO', 2));

 //Teste para BICHO PAPÃO, 1 (animal inválido)
console.log(zoo.encontrarRecinto('BICHO PAPÃO', 1));

// Teste para LEAO, 1
console.log(zoo.encontrarRecinto('LEAO', 1));

// Teste para HIPOPOTAMO, 2
//console.log(zoo.encontrarRecinto('HIPOPOTAMO', 2));
