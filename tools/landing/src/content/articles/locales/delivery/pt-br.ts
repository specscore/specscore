import type { DeliveryCopy } from '../../delivery.ts';
export const copy: DeliveryCopy = {
  title: 'Seu projeto está especificado. O que você vai terminar nesta semana?',
  description: 'Transforme uma especificação em compromisso semanal: escolha um resultado para o usuário, reserve tempo e examine evidências antes de decidir.',
  promoTitle: 'Defina o sucesso. Depois abra espaço para ele.',
  promoBody: 'O SpecScore define quando seu projeto está pronto. Um compromisso semanal ajuda a escolher o próximo passo. Una os dois com uma breve revisão de evidências.',
  readArticle: 'Escolha seu próximo resultado concluído', explore: 'Conheça o CommittedMe (em inglês)', breadcrumb: 'Artigos',
  relatedTitle: 'Torne o resultado verificável', relatedLink: 'Como escrever critérios de aceitação verificáveis',
  intro: 'Uma especificação pode estar completa enquanto o projeto não sai do lugar. Os requisitos estão claros, o agente tem um plano e a lista de tarefas cresce. Talvez falte uma decisão menor: qual resultado útil você terminará nesta semana e o que deixará de fazer para abrir espaço? Esta revisão pode ser feita com um colega, um mentor ou um caderno.',
  sections: [
    { title: 'Escolha um resultado para o usuário, não um monte de tarefas', paragraphs: [
      'Comece com um critério de aceitação e transforme-o em uma demonstração curta. Numa importação CSV, “implementar o parser” descreve trabalho. “O usuário importa um arquivo válido, vê os registros e recebe um erro útil para uma linha inválida” descreve algo verificável. Mantenha o caso de erro: retirá-lo para cumprir uma data muda a promessa.',
      'O SpecScore organiza requisitos e critérios de aceitação em arquivos que sua equipe e seus agentes podem ler. Use essas referências na nota semanal. A especificação continua definindo o comportamento correto; a nota seleciona uma parte viável. Não é preciso duplicar a especificação nem adotar outro sistema de gestão.'
    ] },
    { title: 'Planeje com base no seu calendário real', paragraphs: [
      'Anote os períodos de trabalho focado realmente disponíveis, incluindo revisão e integração. Duas noites não são cinco dias úteis. Reserve tempo para testar a jornada completa e lidar com um imprevisto. Se o resultado não couber, escolha uma jornada coerente menor antes de começar.',
      'Liste dependências fora do seu controle. “Aguardando acesso à produção” precisa de um responsável e de um prazo para decisão. Se o acesso ainda faltar na quarta-feira, decida se uma demonstração local será útil. Descreva o resultado com precisão: uma demo local não comprova prontidão para produção. Não redefina o sucesso discretamente na sexta.'
    ] },
    { title: 'Delimite o trabalho dos agentes; mantenha a decisão', paragraphs: [
      'Um agente pode gerar várias implementações enquanto você ainda decide qual problema importa. Mais subtarefas concluídas podem deixar o objetivo original intocado. Dê a cada tarefa um critério específico, um escopo permitido e as evidências que ela deve retornar. Uma pessoa continua responsável por aceitar toda a jornada do usuário.',
      'Quando surgir uma ideia, registre-a sem iniciá-la automaticamente. Pergunte qual compromisso ela substituiria. Você pode experimentar manter apenas um resultado aguardando sua revisão final. Isso é um teste de foco, não uma regra universal de produtividade; ajuste se as evidências mostrarem que está atrasando trabalho útil.'
    ] },
    { title: 'Examine a evidência antes da narrativa', paragraphs: [
      'Na revisão, abra primeiro o resultado concreto: a importação funcionando, o teste de entrada inválida ou a documentação publicada. Percorra os mesmos passos de um usuário e compare com o critério escolhido. Quantidade de commits, horas trabalhadas e resumos confiantes de agentes são contexto, não evidência de aceitação.',
      'Separe o que foi implementado, o que foi testado e o que pode ser usado no ambiente previsto. Peça ao revisor que encontre uma forma de o resultado falhar. Compartilhe só o necessário: um exemplo sintético ou uma demonstração sem dados sensíveis costuma bastar. Prestar contas não exige dados de clientes, segredos nem um repositório privado.'
    ] },
    { title: 'Um compromisso não cumprido exige outra decisão', paragraphs: [
      'Se a demonstração falhar, escreva a menor explicação útil: dependência desconhecida, escopo excessivo, tempo interrompido ou hipótese incorreta. Não transforme um erro de estimativa em julgamento do seu caráter. Escolha uma resposta concreta: reduzir a próxima entrega, resolver a dependência, mudar a abordagem ou encerrar o projeto deliberadamente.',
      'Não empurre o mesmo compromisso inalterado para a semana seguinte por hábito. Combine o próximo resultado observável e a data da revisão. Após alguns ciclos, compare suas estimativas com o que de fato terminou. O registro serve para melhorar decisões, não para proteger uma sequência de acertos.'
    ] }
  ],
  reviewTitle: 'Copie esta revisão semanal em cinco linhas',
  reviewLines: ['Resultado: o que o usuário poderá fazer até a revisão?', 'Evidência: qual critério e demonstração vão comprovar isso?', 'Tempo: quando vou construir, testar e revisar?', 'Limite: o que estou adiando e qual dependência exige uma decisão?', 'Revisão: quem verá o resultado, quando e qual decisão vem depois?'],
  ctaTitle: 'Dê às suas decisões uma revisão humana',
  ctaBody: 'Use esta nota com alguém que pergunte o que aconteceu e ajude a analisar a próxima escolha. O CommittedMe tem foco em mentoria humana e acompanhamento de compromissos. Sua página para desenvolvedores e fundadores apresenta essa abordagem. Mantenha a especificação no repositório e leve um objetivo que possa discutir sem expor trabalho confidencial.',
  mentorBody: "Você já ensina desenvolvimento no YouTube, TikTok, Instagram ou em um blog? Explicar escolhas e testes pode revelar suas próprias suposições. As perguntas dos outros podem ajudar você a continuar aprendendo enquanto eles progridem. Se esse diálogo interessa, leia sobre se tornar mentor.",
  mentorLink: "Leia sobre ser mentor (em inglês)",
  disclosure: 'O CommittedMe é outro produto do nosso ecossistema. Este artigo descreve uma prática de revisão; não implica uma integração com o SpecScore.'
};
