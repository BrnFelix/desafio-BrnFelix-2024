🦓 🐆 🐊 # Projeto Zoológico - Atribuição de Recintos Confortáveis para Animais 🦁 🐯 🐻 

Este projeto proposto pela DB Company consiste em resolver um desafio de lógica que designa recintos confortáveis para novos animais em um zoológico. Ele leva em consideração regras específicas de biomas, convivência e conforto dos animais.


![alt text](zoo.jpeg)

# Objetivos

O objetivo deste projeto é organizar e distribuir os animais recém-chegados no zoológico em recintos adequados. Para isso, o programa verifica alguns critérios como a compatibilidade de biomas, no qual cada recinto deve oferecer condições adequadas para o bioma do animal (ex: savana, floresta, etc); convivência entre espécies: Carnívoros e presas, por exemplo, não podem conviver no mesmo recinto e  conforto dos animais: A capacidade do recinto e a quantidade de recursos disponíveis devem ser suficientes para garantir o bem-estar dos animais.

# ANIMAIS

 O zoológico só está habilitado a tratar dos animais abaixo.
 A tabela mostra o espaço que cada indivíduo ocupa e em quais biomas se adapta.

  | espécie    | tamanho | bioma                |
  |------------|---------|----------------------|
  | LEAO       |   3     |  savana              |
  | LEOPARDO   |   2     |  savana              |
  | CROCODILO  |   3     |  rio                 |
  | MACACO     |   1     |  savana ou floresta  |
  | GAZELA     |   2     |  savana              |
  | HIPOPOTAMO |   4     |  savana ou rio       |


# REGRAS PARA ENCONTRAR UM RECINTO

1) Um animal se sente confortável se está num bioma adequado e com espaço suficiente para cada indivíduo
2) Animais carnívoros devem habitar somente com a própria espécie
3) Animais já presentes no recinto devem continuar confortáveis com a inclusão do(s) novo(s)
4) Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
5) Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
6) Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado
7) Não é possível separar os lotes de animais nem trocar os animais que já existem de recinto (eles são muito apegados!).
Por exemplo, se chegar um lote de 12 macacos, não é possível colocar 6 em 2 recintos.

# TESTES PARA VERIFICAR O CÓDIGO

Este projeto inclui testes automatizados usando Jest para garantir a correta atribuição de recintos no zoológico. Os testes cobrem cenários como rejeição de animais e quantidades inválidas, verificação de recintos indisponíveis, e a correta identificação de recintos viáveis para diferentes espécies e quantidades de animais.

  
# Experiência ao Desenvolver o Código

Confesso que para mim particulamente senti certa dificuldade ao desenvolver a parte referente às regras de recintos próprios para cada espécie, visto que algumas eram específicas, exigindo assim uma lógica um pouco refinada, porém no final consegui resolver com a sensação de dever cumprido, já que o papel de um desenvolvedor é exatamente esse: resolver problemas do mundo real. 
