class RecintosZoo {
  constructor() {
    this.recintos = [
      {numero: 1, biomas: ["savana"], tamanhoTotal: 10, animaisExistentes: [{ especie: "macaco", quantidade: 3 }],},
      {numero: 2, biomas: ["floresta"], tamanhoTotal: 5, animaisExistentes: [],},
      {numero: 3, biomas: ["savana", "rio"], tamanhoTotal: 7, animaisExistentes: [{ especie: "gazela", quantidade: 1 }],},
      { numero: 4, biomas: ["rio"], tamanhoTotal: 8, animaisExistentes: [] },
      {numero: 5, biomas: ["savana"], tamanhoTotal: 9, animaisExistentes: [{ especie: "leao", quantidade: 1 }],},
    ];

    this.especiesValidas = {
      leao: { eCarnivoro: true, tamanhoOcupado: 3, biomas: ["savana"] },
      leopardo: { eCarnivoro: true, tamanhoOcupado: 2, biomas: ["savana"] },
      crocodilo: { eCarnivoro: true, tamanhoOcupado: 3, biomas: ["rio"] },
      macaco: {
        eCarnivoro: false,
        tamanhoOcupado: 1,
        biomas: ["savana", "floresta"],
      },
      gazela: { eCarnivoro: false, tamanhoOcupado: 2, biomas: ["savana"] },
      hipopotamo: {
        eCarnivoro: false,
        tamanhoOcupado: 4,
        biomas: ["savana", "rio"],
      },
    };
  }

  validarEntrada(animal, quantidade) {
    if (!this.especiesValidas[animal.toLowerCase()]) {
      return {
        erro: "Animal inválido",
      };
    }
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return {
        erro: "Quantidade inválida",
      };
    }
    return null;
  }

  analisaRecintos(animal, quantidade) {
    const erro = this.validarEntrada(animal, quantidade);
    if (erro) {
      return erro;
    }

    const animalSanitizado = animal.toLowerCase();
    const especie = this.especiesValidas[animalSanitizado];
    const tamanhoNecessario = especie.tamanhoOcupado * quantidade;

    let recintosViaveis = [];
    this.recintos
      .filter((recinto) =>
        recinto.biomas.some((bioma) => especie.biomas.includes(bioma))
      )
      .forEach((recinto) => {
        let especieDiferenteNoRecinto = false;
        let temAnimalCarnivoro = false;
        let espacoDisponivel = recinto.tamanhoTotal;

        recinto.animaisExistentes.forEach(({ especie, quantidade }) => {
          if (especie !== animalSanitizado) {
            especieDiferenteNoRecinto = true;
          }

          const especieAvaliada = this.especiesValidas[especie];
          if (especieAvaliada.eCarnivoro) {
            temAnimalCarnivoro = true;
          }

          espacoDisponivel -= especieAvaliada.tamanhoOcupado * quantidade;
        });

        if (especieDiferenteNoRecinto) {
          espacoDisponivel -= 1;
        }

        if (tamanhoNecessario > espacoDisponivel) {
          return;
        }

        if (
          animalSanitizado === "hipopotamo" &&
          especieDiferenteNoRecinto &&
          (!recinto.biomas.includes("savana") ||
            !recinto.biomas.includes("rio"))
        ) {
          return;
        }

        if (
          animalSanitizado === "macaco" &&
          quantidade < 1 &&
          recinto.animaisExistentes.length < 1
        ) {
          return;
        }

        if (
          (especie.eCarnivoro || temAnimalCarnivoro) &&
          especieDiferenteNoRecinto
        ) {
          return;
        }

        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${
            espacoDisponivel - tamanhoNecessario
          } total: ${recinto.tamanhoTotal})`
        );
      });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }
}


export { RecintosZoo as RecintosZoo };
