class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ especie: "MACACO", quantidade: 3 }] },
            { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: [{ especie: "GAZELA", quantidade: 1 }] },
            { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ especie: "LEAO", quantidade: 1 }] },
        ];

        this.animais = [
            { especie: "LEAO", tamanho: 3, biomas: ["savana"] },
            { especie: "LEOPARDO", tamanho: 2, biomas: ["savana"] },
            { especie: "CROCODILO", tamanho: 3, biomas: ["rio"] },
            { especie: "MACACO", tamanho: 1, biomas: ["savana", "floresta"] },
            { especie: "GAZELA", tamanho: 2, biomas: ["savana"] },
            { especie: "HIPOPOTAMO", tamanho: 4, biomas: ["savana", "rio"] },
        ];
    }

    // Método principal para analisar recintos viáveis
    analisaRecintos(animal, quantidade) {
        // Validação da espécie
        const especie = this.animais.find(a => a.especie === animal);
        if (!especie) {
            return { erro: "Animal inválido" };
        }

        // Validação da quantidade
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        // Lista para armazenar recintos viáveis
        let recintosViaveis = [];

        // Iteração sobre os recintos
        this.recintos.forEach(recinto => {
            const biomaAdequado = especie.biomas.includes(recinto.bioma);
            const espacoOcupado = recinto.animaisExistentes.reduce((acc, curr) => acc + this.getTamanhoAnimal(curr.especie) * curr.quantidade, 0);
            let espacoNecessario = especie.tamanho * quantidade;

            // Regra de convivência e espaço adicional se houver mais de uma espécie
            const especiesNoRecinto = recinto.animaisExistentes.map(a => a.especie);
            const contemCarnivoro = especiesNoRecinto.some(e => this.isCarnivoro(e));
            const novoEhCarnivoro = this.isCarnivoro(animal);
            
            if (recinto.animaisExistentes.length > 0) {
                if (novoEhCarnivoro && contemCarnivoro && !especiesNoRecinto.includes(animal)) {
                    // Carnívoros não podem conviver com outras espécies
                    return;
                }
                if (!novoEhCarnivoro && recinto.animaisExistentes.length > 0) {
                    espacoNecessario += 1; // Espaço extra se já houver uma espécie
                }
            }

            // Regras para hipopótamos
            if (animal === "HIPOPOTAMO" && recinto.bioma !== "savana e rio") {
                return;
            }

            // Regra para macacos
            if (animal === "MACACO" && recinto.animaisExistentes.length === 0) {
                return;
            }

            const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;

            if (biomaAdequado && espacoDisponivel >= espacoNecessario) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanhoTotal})`);
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }

    // Método para verificar se o animal é carnívoro
    isCarnivoro(animal) {
        return ["LEAO", "LEOPARDO", "CROCODILO"].includes(animal);
    }

    // Método para obter o tamanho do animal
    getTamanhoAnimal(animal) {
        const especie = this.animais.find(a => a.especie === animal);
        return especie ? especie.tamanho : 0;
    }
}

// Exemplo de chamada:
const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos('MACACO', 2));
console.log(zoo.analisaRecintos('UNICORNIO', 1));
console.log(zoo.analisaRecintos('LEAO', 1));
