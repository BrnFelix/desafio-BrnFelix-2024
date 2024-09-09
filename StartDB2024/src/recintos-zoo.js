class RecintosZoo {

    // Construtor que vai inicializar os recintos e as espécies válidas
    constructor() {
      // Definindo os recintos com bioma, tamanho e animais existentes
      this.recinto = [
        { numero: 1, biomas: 'savana', tamanhoTotal: 10, animaisExistentes: [{ especie: 'macaco', tamanhoDoAnimal: 1, quantidade: 3 }] }, 
        { numero: 2, biomas: 'floresta', tamanhoTotal: 5, animaisExistentes: [] }, 
        { numero: 3, biomas: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ especie: 'gazela', tamanhoDoAnimal: 2, quantidade: 1 }] }, 
        { numero: 4, biomas: 'rio', tamanhoTotal: 8, animaisExistentes: [] }, 
        { numero: 5, biomas: 'savana', tamanhoTotal: 9, animaisExistentes: [{ especie: 'leao', tamanhoDoAnimal: 3, quantidade: 1 }] } 
      ];
  
      // Espécies válidas com seus tamanhos e biomas aceitos
      this.especiesValidas = {
        leao: { tamanhoDoAnimal: 3, biomas: ['savana'] }, 
        leopardo: { tamanhoDoAnimal: 2, biomas: ['savana'] }, 
        crocodilo: { tamanhoDoAnimal: 3, biomas: ['rio'] }, 
        macaco: { tamanhoDoAnimal: 1, biomas: ['savana', 'floresta'] }, 
        gazela: { tamanhoDoAnimal: 2, biomas: ['savana'] }, 
        hipopotamo: { tamanhoDoAnimal: 4, biomas: ['savana', 'rio'] } 
      };
    }
  
    // Validando se o animal e quantidade são válidos
    validarEntrada(animal, quantidade) {
      
       // Verificando se a espécie é válida
      if (!this.especiesValidas[animal.toLowerCase()]) {
        return { erro: "Animal inválido" }; 
        
      }
      //Verificando se a quantidade é válida
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: "Quantidade inválida" }; 
      }
      return null; // Retorna null se as entradas forem válidas
    }
  
    // Analisa quais recintos são viáveis para o animal e quantidade fornecidos
    analisaRecintos(animal, quantidade) {

      // Valida as entradas de animal e quantidade
      const erro = this.validarEntrada(animal, quantidade);
      if (erro) {
        return erro; 

      }
  
      // Pega as informações da espécie como tamanho e biomas
      const especieInfo = this.especiesValidas[animal.toLowerCase()];
      const tamanhoNecessario = especieInfo.tamanhoDoAnimal * quantidade; // Calcula o espaço necessário com base na quantidade de animais
  
      // Filtra os recintos viáveis
      const recintosViaveis = this.recinto
        .filter((recinto) => {
          const biomaValido = especieInfo.biomas.includes(recinto.biomas); // Verifica se o bioma do recinto é válido para a espécie
  
          // Calcula o espaço ocupado pelos animais existentes no recinto
          let espacoOcupado = recinto.animaisExistentes.reduce(
            (acc, animalExistente) => acc + animalExistente.tamanhoDoAnimal * animalExistente.quantidade,
            0
          );
  
          // Regras para convivência entre carnívoros e outras espécies
          if (recinto.animaisExistentes.length > 0) {
            const animalExistente = recinto.animaisExistentes[0].especie.toLowerCase();
  
            // Carnívoros só podem conviver com a própria espécie
            if (['leao', 'leopardo', 'crocodilo'].includes(animalExistente) && animalExistente !== animal.toLowerCase()) {
              return false;
            }
  
            // Hipopótamo só pode dividir recinto com outras espécies no bioma "savana e rio"
            if (animal.toLowerCase() === 'hipopotamo' && recinto.biomas !== 'savana e rio') {
              return false;
            }
          }
  
          // Se houver mais de uma espécie, adicionar espaço extra
          if (recinto.animaisExistentes.length > 0) {
            espacoOcupado += 1; // Adiciona 1 de espaço extra se houver mais de uma espécie
          }
  
          const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado; // Calcula o espaço disponível
          return biomaValido && espacoDisponivel >= tamanhoNecessario; // Retorna true se o bioma for válido e houver espaço suficiente
        })
        
        .map((recinto) => {
          // Para cada recinto viável, calcula e formata a string de saída
          const espacoOcupado = recinto.animaisExistentes.reduce(
            (acc, animalExistente) => acc + animalExistente.tamanhoDoAnimal * animalExistente.quantidade,
            0
          );
          const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
          return `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel} total: ${recinto.tamanhoTotal})`;
        });
  
      // Se nenhum recinto for viável, retorna erro
      if (recintosViaveis.length === 0) {
        return { erro: 'Não há recinto viável' };
      }
  
      // Retorna a lista de recintos viáveis, ordenada pelo número do recinto
      return { recintosViaveis: recintosViaveis.sort() };
    }
  }
  
  export { RecintosZoo as RecintosZoo };
  