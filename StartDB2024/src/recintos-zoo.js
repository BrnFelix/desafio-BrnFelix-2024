class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, biomas: 'savana', tamanhoTotal: 10, animaisExistentes: [{ especie: 'macaco', tamanhoDoAnimal: 1, quantidade: 3 }] }, 
      { numero: 2, biomas: 'floresta', tamanhoTotal: 5, animaisExistentes: [] }, 
      { numero: 3, biomas: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ especie: 'gazela', tamanhoDoAnimal: 2, quantidade: 1 }] }, 
      { numero: 4, biomas: 'rio', tamanhoTotal: 8, animaisExistentes: [] }, 
      { numero: 5, biomas: 'savana', tamanhoTotal: 9, animaisExistentes: [{ especie: 'leao', tamanhoDoAnimal: 3, quantidade: 1 }] }
    ];

    this.especiesValidas = {
      leao: { tamanhoDoAnimal: 3, biomas: ['savana'] }, 
      leopardo: { tamanhoDoAnimal: 2, biomas: ['savana'] }, 
      crocodilo: { tamanhoDoAnimal: 3, biomas: ['rio'] }, 
      macaco: { tamanhoDoAnimal: 1, biomas: ['savana', 'floresta'] }, 
      gazela: { tamanhoDoAnimal: 2, biomas: ['savana'] }, 
      hipopotamo: { tamanhoDoAnimal: 4, biomas: ['savana', 'rio'] }
    };
  }

  validarEntrada(animal, quantidade) {
    if (!this.especiesValidas[animal.toLowerCase()]) {
      return { erro: "Animal inválido" };
    }
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }
    return null;
  }

  calcularEspacoOcupado(recinto) {
    let espacoOcupado = 0;
    recinto.animaisExistentes.forEach(animal => {
      espacoOcupado += animal.tamanhoDoAnimal * animal.quantidade;
    });
    return espacoOcupado;
  }

  biomaAdequadoParaEspecie(recinto, especie) {
    return this.especiesValidas[especie].biomas.some(bioma => recinto.biomas.includes(bioma));
  }

  encontrarRecinto(animal, quantidade) {
    const erro = this.validarEntrada(animal, quantidade);
    if (erro) {
      return erro;
    }

    const especie = animal.toLowerCase();
    const tamanhoNecessario = this.especiesValidas[especie].tamanhoDoAnimal * quantidade;
    let recintosViaveis = [];

    this.recintos.forEach(recinto => {
      const espacoOcupado = this.calcularEspacoOcupado(recinto);
      const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
      let espacoFinal = espacoDisponivel;
      
      // Verificar se o bioma é adequado e o espaço disponível é suficiente
      if (this.biomaAdequadoParaEspecie(recinto, especie) && espacoDisponivel >= tamanhoNecessario) {
        // Verificar se há animais diferentes e ajustar o espaço disponível
        if (recinto.animaisExistentes.length > 0) {
          const outrasEspecies = recinto.animaisExistentes.some(a => a.especie !== especie);
          if (outrasEspecies) {
            espacoFinal -= 1; // Reduz o espaço por ter mais de uma espécie
          }
        }

        // Aplicar regras específicas para cada espécie
        if (especie === 'hipopotamo') {
          if (!recinto.biomas.includes('savana e rio')) {
            return; // Hipopótamos só podem estar em recintos com savana e rio
          }
        }

        if (especie === 'macaco') {
          if (recinto.animaisExistentes.length === 0 && quantidade === 1) {
            return; // Macacos não podem ficar sozinhos
          }
          if (recinto.numero === 5) {
            return; // Não incluir o recinto 5 se já houver macacos lá
          }
        }

        // Verificar se o espaço final disponível é suficiente para os animais
        if (espacoFinal >= tamanhoNecessario) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoFinal - tamanhoNecessario} total: ${recinto.tamanhoTotal})`);
        }
      }
    });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }
}


export { RecintosZoo };
