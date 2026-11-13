import type { DeliveryCopy } from '../../delivery.ts';
export const copy: DeliveryCopy = {
  title: 'Tu proyecto ya tiene especificaciones. ¿Qué terminarás esta semana?',
  description: 'Convierte una especificación en un compromiso semanal: elige un resultado para el usuario, reserva tiempo y revisa pruebas antes de decidir.',
  promoTitle: 'Define el éxito. Luego hazle sitio.',
  promoBody: 'SpecScore define cuándo está terminado tu proyecto. Un compromiso semanal te ayuda a elegir el siguiente paso. Une ambas cosas con una breve revisión de pruebas.',
  readArticle: 'Elige tu próximo resultado terminado', explore: 'Conoce CommittedMe (en inglés)', breadcrumb: 'Artículos',
  relatedTitle: 'Haz que el resultado se pueda comprobar', relatedLink: 'Cómo escribir criterios de aceptación verificables',
  intro: 'Una especificación puede estar completa mientras el proyecto sigue parado. Los requisitos están claros, el agente tiene un plan y la lista de pendientes crece. Quizá falte una decisión más pequeña: ¿qué resultado útil terminarás esta semana y qué dejarás de hacer para conseguirlo? Esta revisión se puede hacer con un colega, un mentor o un cuaderno.',
  sections: [
    { title: 'Elige un resultado para el usuario, no una lista de tareas', paragraphs: [
      'Parte de un criterio de aceptación y conviértelo en una demostración breve. Para importar CSV, «implementar el analizador» describe trabajo. «El usuario importa un archivo válido, ve los registros y recibe un error útil si una fila no es válida» describe algo comprobable. Mantén el caso de error: quitarlo para cumplir una fecha cambia lo prometido.',
      'SpecScore organiza requisitos y criterios de aceptación en archivos que pueden leer tu equipo y tus agentes. Incluye esas referencias en la nota semanal. La especificación sigue definiendo el comportamiento correcto; la nota elige una parte manejable. No necesitas copiar la especificación ni añadir otro sistema de gestión.'
    ] },
    { title: 'Planifica según tu calendario real', paragraphs: [
      'Anota los bloques de trabajo concentrado que de verdad tienes, incluidos revisión e integración. Dos tardes no son cinco días laborables. Reserva tiempo para probar el recorrido completo y resolver un imprevisto. Si no cabe, elige un recorrido coherente más pequeño antes de empezar.',
      'Enumera las dependencias que no controlas. «Esperando acceso a producción» necesita un responsable y un momento de decisión. Si el miércoles sigue faltando acceso, decide si sirve una demostración local. Identifica el resultado con precisión: una demo local no demuestra que esté listo para producción. No redefinas el éxito a escondidas el viernes.'
    ] },
    { title: 'Acota el trabajo de los agentes; conserva la decisión', paragraphs: [
      'Un agente puede generar varias implementaciones mientras tú aún decides qué problema importa. Terminar más subtareas puede dejar intacto el objetivo original. Asigna a cada tarea un criterio concreto, un alcance permitido y las pruebas que debe devolver. Una persona debe aceptar el recorrido completo del usuario.',
      'Cuando aparezca una idea nueva, anótala sin ponerla en marcha automáticamente. Pregunta qué compromiso sustituiría. Puedes probar a tener un solo resultado pendiente de tu revisión final. Es un experimento de enfoque, no una regla universal de productividad; ajústalo si las pruebas muestran que frena trabajo útil.'
    ] },
    { title: 'Revisa las pruebas antes que el relato', paragraphs: [
      'Abre primero el resultado real: la importación funcionando, la prueba con datos erróneos o la documentación publicada. Recorre los mismos pasos que un usuario y compara el resultado con el criterio elegido. Los commits, las horas y los resúmenes seguros del agente aportan contexto, no pruebas de aceptación.',
      'Distingue lo implementado, lo probado y lo que un usuario puede utilizar en el entorno previsto. Pide al revisor que busque una forma de hacer fallar el resultado. Comparte solo lo necesario: suele bastar un ejemplo sintético o una demo anonimizada. Rendir cuentas no exige compartir datos de clientes, secretos ni un repositorio privado.'
    ] },
    { title: 'Un compromiso incumplido necesita otra decisión', paragraphs: [
      'Si falla la demostración, escribe la explicación útil más breve: dependencia desconocida, alcance excesivo, tiempo interrumpido o suposición incorrecta. No conviertas un error de estimación en un juicio sobre tu carácter. Elige una respuesta concreta: reducir la siguiente entrega, resolver la dependencia, cambiar de enfoque o detener el proyecto deliberadamente.',
      'No traslades el mismo compromiso a la semana siguiente por costumbre. Acuerda el próximo resultado observable y la fecha de revisión. Tras varios ciclos, compara estimaciones y resultados terminados. El registro sirve para decidir mejor, no para proteger una racha.'
    ] }
  ],
  reviewTitle: 'Copia esta revisión semanal de cinco líneas',
  reviewLines: ['Resultado: ¿qué podrá hacer el usuario en la fecha de revisión?', 'Pruebas: ¿qué criterio y demostración lo comprobarán?', 'Tiempo: ¿cuándo lo construiré, probaré y revisaré?', 'Límite: ¿qué pospongo y qué dependencia exige una decisión?', 'Revisión: ¿quién verá el resultado, cuándo y qué se decidirá después?'],
  ctaTitle: 'Somete tus decisiones a una revisión humana',
  ctaBody: 'Usa esta nota con alguien que pregunte qué ocurrió y te ayude a examinar la siguiente decisión. CommittedMe se centra en mentoría humana y rendición de cuentas. Su página para desarrolladores y fundadores presenta ese enfoque. Conserva la especificación en tu repositorio y lleva un objetivo que puedas comentar sin revelar trabajo confidencial.',
  mentorBody: "¿Ya enseñas a desarrolladores en YouTube, TikTok, Instagram o un blog? Explicar decisiones y pruebas a otra persona puede revelar tus propias suposiciones; sus preguntas pueden ayudarte a seguir aprendiendo mientras progresa. Si te interesa ese diálogo, lee cómo ser mentor.",
  mentorLink: "Lee cómo ser mentor (en inglés)",
  disclosure: 'CommittedMe es otro producto de nuestro ecosistema. El artículo describe una práctica de revisión; no implica una integración con SpecScore.'
};
