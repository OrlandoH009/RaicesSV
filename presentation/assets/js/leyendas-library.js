/* ============================================================
  Salvadorean Roots — leyendas-library.js
   Biblioteca de 16 leyendas y mitos de El Salvador
   Portadas -> modal con la leyenda narrada como un relato completo,
   lectura de imagen y narración de voz
   ============================================================ */

const LEYENDAS_DATA = [
  {
    id: "siguanaba",
    tituloKey: "ley.data.siguanaba.title",
    subKey: "ley.data.siguanaba.sub",
    tagKey: "ley.data.siguanaba.tag",
    chipsKeys: ["ley.data.siguanaba.chip1", "ley.data.siguanaba.chip2", "ley.data.siguanaba.chip3", "ley.data.siguanaba.chip4"],
    origenKey: "ley.data.siguanaba.origin",
    relatoKey: "ley.data.siguanaba.relato",
    titulo: "La Siguanaba",
    sub: "El espíritu que extravía a los infieles",
    tag: "Espíritu · Ríos",
    chips: ["Espíritu femenino", "Aparece de noche", "Ríos y quebradas", "Enloquece a hombres"],
    origen: "Tradición náhuat-pipil, extendida por todo El Salvador. Recogida por Miguel Ángel Espino en \"Mitología de Cuscatlán\".",
    img: "../assets/media/leyenda/siguanaba.png",
    relato: `Cuentan los abuelos que hace muchísimo tiempo, cuando los dioses todavía caminaban cerca de los hombres, vivía una mujer llamada Sihuehuet, cuyo nombre en náhuat significa "mujer hermosa". Era, en efecto, la más bella de su pueblo: piel dorada, cabellera negra y larga como la noche, y una risa que hacía voltear a cualquiera. Estaba casada, pero su corazón inquieto la llevó a enamorarse del Lucero de la Mañana, un dios que bajaba del cielo para verla junto al río.

Cuando Tlaloc, el poderoso dios de las aguas y de las lluvias, descubrió la traición, no perdonó. La maldijo para siempre: le arrebató su nombre y su belleza verdadera, y la condenó a vagar eternamente por ríos, quebradas y caminos oscuros, convertida ahora en la Siguanaba, que quiere decir "mujer horrible". Desde entonces solo puede mostrar su hermosura como un engaño, una trampa que tiende a los hombres que, como ella hizo, traicionan a quien los ama.

Así, cualquier noche, un hombre que camina solo por un paraje solitario —de vuelta de una cantina, escapando de su casa para ver a otra mujer, o simplemente por no hacer caso a los consejos de los mayores— puede toparse con ella. Aparece bañándose en el río o lavando ropa con un guacal de oro, y lo llama con dulzura, con una voz que promete todo lo que ese hombre ha estado buscando en otros brazos. Él la sigue, hipnotizado, internándose cada vez más en el monte, sin darse cuenta de que se aleja del camino de regreso.

Y entonces, cuando ya está bien lejos de cualquier ayuda, ella voltea el rostro. Donde había una sonrisa, ahora hay una calavera; donde había ojos brillantes, hay cuencas vacías, o el hocico alargado y los dientes de una yegua. El grito del hombre se pierde en la noche mientras la Siguanaba ríe y desaparece, dejándolo perdido, temblando, muchas veces con fiebre durante días, y para siempre marcado por el miedo.

Los viejos del pueblo dicen que hay formas de librarse de ella si uno la encuentra: morder con fuerza el filo de un machete, rezar en voz alta sin detenerse, cruzar unas tijeras o llevar agujas de coser en la bolsa, o gritar tres veces el nombre de la propia madre —porque dicen que eso le recuerda su propia traición y la hace huir. Algunos aseguran que si el hombre logra mirarle el rostro antes de que ella se lo muestre, queda libre para siempre de su maldición. Pero la lección de fondo, la que toda madre le repite a su hijo antes de dejarlo salir de noche, es siempre la misma: cuídate de seguir a la belleza que aparece sola en la oscuridad, porque detrás de ella puede estar esperándote la Siguanaba.`
  },
  {
    id: "cipitio",
    tituloKey: "ley.data.cipitio.title",
    subKey: "ley.data.cipitio.sub",
    tagKey: "ley.data.cipitio.tag",
    chipsKeys: ["ley.data.cipitio.chip1", "ley.data.cipitio.chip2", "ley.data.cipitio.chip3", "ley.data.cipitio.chip4"],
    origenKey: "ley.data.cipitio.origin",
    relatoKey: "ley.data.cipitio.relato",
    titulo: "El Cipitío",
    sub: "El niño eterno que nunca crece",
    tag: "Espíritu · Bosques",
    chips: ["Niño eterno", "Pies al revés", "Hijo de la Siguanaba", "Enamora doncellas"],
    origen: "Mitología pipil-náhuat de todo el país; se le vincula con el mito de la Siguanaba como su hijo maldito.",
    img: "../assets/media/leyenda/cipitio.jpg",
    relato: `Antes de convertirse en la Siguanaba, Sihuehuet tuvo un hijo con un dios: un niño de mejillas redondas y ombligo saltón al que llamaron Cipitío. Pero cuando ella se marchó siguiendo sus amoríos prohibidos, abandonó también a su pequeño, dejándolo solo en el monte. Los dioses, furiosos con la madre, decidieron castigar también al hijo, aunque él no tuviera culpa alguna: lo condenaron a quedarse para siempre con el cuerpo de un niño de unos diez años, sin poder crecer jamás, vagando eternamente entre los ríos y los cañaverales donde alguna vez vivió con ella.

Desde entonces, el Cipitío es un espíritu pequeño, moreno, de panza redonda como un pequeño Buda, que usa un sombrero de petate tan grande que casi le tapa la cara. Lo más curioso es que sus pies están volteados al revés: los dedos apuntan hacia atrás, de modo que cualquiera que intente seguir sus huellas en la tierra terminará caminando exactamente en la dirección contraria a la que él realmente fue.

A diferencia de su madre, el Cipitío no busca hacer daño. Es juguetón, curioso y, sobre todo, enamoradizo: le encanta aparecerse cerca de los ríos donde las muchachas jóvenes van a lavar ropa, especialmente si son bonitas y de ojos claros. Se esconde entre los matorrales y les lanza piedritas pequeñas para llamar su atención, o les silba desde lejos, aunque nunca se deja ver del todo. Cuando una joven se enoja o se asusta, él se ríe entre dientes y desaparece corriendo, dejando solo el eco de sus pasos.

Otra de sus travesuras favoritas es meterse en las cocinas de las casas rurales durante la noche para revolcarse en la ceniza tibia de los fogones apagados, dejando huellas pequeñas y desordenadas por todo el piso a la mañana siguiente. Las abuelas, al encontrar esas marcas, sonríen y dicen sin sorpresa: "otra vez vino el Cipitío a jugar con la ceniza."

Con el tiempo, el Cipitío se ha convertido en uno de los personajes más queridos del folclore salvadoreño, no como una amenaza sino como un recordatorio tierno y un poco travieso: el de un niño que nunca tuvo la oportunidad de crecer, condenado por un error que no cometió, y que a pesar de todo sigue buscando, entre risas y travesuras, un poco de cariño y compañía en los ríos donde una vez vivió junto a su madre.`
  },
  {
    id: "cadejo",
    tituloKey: "ley.data.cadejo.title",
    subKey: "ley.data.cadejo.sub",
    tagKey: "ley.data.cadejo.tag",
    chipsKeys: ["ley.data.cadejo.chip1", "ley.data.cadejo.chip2", "ley.data.cadejo.chip3", "ley.data.cadejo.chip4"],
    origenKey: "ley.data.cadejo.origin",
    relatoKey: "ley.data.cadejo.relato",
    titulo: "El Cadejo",
    sub: "El guardián de dos caras: blanco y negro",
    tag: "Criatura · Caminos",
    chips: ["Cadejo blanco", "Cadejo negro", "Ojos brillantes", "Lucha eterna"],
    origen: "Difundida en toda Centroamérica; en El Salvador se cuenta especialmente en caminos rurales y veredas nocturnas.",
    img: "../assets/media/leyenda/cadejo.png",
    relato: `Se cuenta que hace generaciones, en algún cañaveral o vereda olvidada, nacieron dos hermanos con forma de perro grande, de pelaje largo y enredado, pero con un destino completamente distinto el uno del otro. Uno de ellos creció bueno y protector: se convirtió en el Cadejo blanco, guardián de los caminantes nocturnos que van de vuelta a casa con el corazón limpio. El otro se entregó a la oscuridad, y se transformó en el Cadejo negro, una bestia que ronda los caminos buscando a quienes salen de noche con malas intenciones —a robar, a engañar a su esposa, o a hacer daño a alguien.

Quien camina solo por un sendero rural después de cierta hora puede sentir, de pronto, un olor a incienso y flores frescas mezclándose con el aire de la noche: es señal de que el Cadejo blanco camina cerca, silencioso, cuidando sus pasos desde la sombra de los árboles, con sus ojos azules brillando apenas entre la maleza. Su presencia trae calma, y muchos aseguran haber llegado sanos y salvos a casa gracias a que él los acompañó sin que se dieran cuenta.

Pero si en cambio el aire se llena de un olor pesado, como a azufre quemado, y se escucha un ruido de cadenas o el golpe seco de pezuñas contra la tierra, hay que empezar a rezar: es el Cadejo negro que se acerca, con sus ojos rojos encendidos como brasas, buscando a alguien a quien asustar hasta la locura, o algo peor.

La leyenda cuenta que, de vez en cuando, los dos hermanos se encuentran en la oscuridad y libran una batalla feroz, una lucha eterna entre el bien y el mal que ninguno de los dos puede ganar del todo. Quien tiene la desgracia de escuchar esa pelea —gruñidos, cadenas arrastrándose, aullidos que parecen desgarrar la noche— debe quedarse quieto, sin moverse, y esperar en silencio a que termine. Meterse en medio de esa batalla, aunque sea sin querer, puede significar quedar atrapado entre las dos fuerzas: y de ahí, aseguran los que cuentan la historia, pocos salen con la cabeza en su sitio.

Por eso, en los pueblos donde esta historia se transmite de generación en generación, los padres advierten a sus hijos que eviten salir solos de noche, y sobre todo que eviten hacerlo con malas intenciones, porque nunca se sabe cuál de los dos hermanos anda cerca esa noche, esperando para acompañar... o para castigar.`
  },
  {
    id: "llorona",
    tituloKey: "ley.data.llorona.title",
    subKey: "ley.data.llorona.sub",
    tagKey: "ley.data.llorona.tag",
    chipsKeys: ["ley.data.llorona.chip1", "ley.data.llorona.chip2", "ley.data.llorona.chip3", "ley.data.llorona.chip4"],
    origenKey: "ley.data.llorona.origin",
    relatoKey: "ley.data.llorona.relato",
    titulo: "La Llorona",
    sub: "El lamento eterno de una madre",
    tag: "Espíritu · Aguas",
    chips: ["Llanto eterno", "Ríos y lagunas", "Medianoche", "Busca a sus hijos"],
    origen: "Presente en toda Latinoamérica; la versión salvadoreña se asocia con el Río Lempa y el Lago de Coatepeque.",
    img: "../assets/media/leyenda/llorona.png",
    relato: `Dicen que hace muchos años vivía, cerca del Río Lempa, una mujer joven y bella que se enamoró perdidamente de un hombre que nunca le correspondió del todo. Tuvieron hijos juntos, pero él la abandonó, dejándola sola con la vergüenza y el dolor de una promesa rota. Cuentan que, cegada por la desesperación y la locura de sentirse traicionada, una noche llevó a sus propios hijos hasta la orilla del río y los ahogó en sus aguas oscuras, para arrepentirse al instante siguiente, cuando ya era demasiado tarde.

Desde ese momento, su alma no encontró descanso. Fue condenada a vagar eternamente por ríos y lagunas, buscando entre la niebla a los hijos que ella misma se llevó, lanzando al viento un llanto desgarrador que se puede escuchar hasta hoy en las noches más silenciosas: "¡Ay, mis hijos! ¡Ay, mis hijos!", un lamento que parece venir de todas partes y de ninguna a la vez, que eriza la piel y detiene el corazón de quien lo escucha.

En El Salvador se le ha visto —o mejor dicho, se le ha escuchado— especialmente cerca del Río Lempa, del Lago de Coatepeque y del Río Grande de San Miguel, siempre después de la medianoche, siempre vestida de blanco, con el cabello suelto y mojado cayéndole sobre un rostro que algunos describen hermoso todavía, y que otros aseguran que es un rostro deforme, marcado para siempre por el dolor y el arrepentimiento eterno.

Los que dicen haberla visto de cerca cuentan que camina despacio por la orilla del agua, mirando hacia la corriente, como si aún esperara encontrar a sus hijos flotando entre las piedras. Si alguien se acerca demasiado, ella voltea de golpe, y quien la mira a los ojos queda paralizado de terror, incapaz de moverse durante largos minutos, mientras su llanto retumba cada vez más cerca.

Por generaciones, esta ha sido una de las advertencias más poderosas para los niños salvadoreños: no acercarse solos a los ríos de noche, no jugar cerca del agua después de cierta hora, porque ahí, entre la neblina y el sonido de la corriente, puede estar esperando la Llorona, cargando para siempre el peso de una tragedia que ella misma provocó y que ahora no puede deshacer.`
  },
  {
    id: "descarnada",
    tituloKey: "ley.data.descarnada.title",
    subKey: "ley.data.descarnada.sub",
    tagKey: "ley.data.descarnada.tag",
    chipsKeys: ["ley.data.descarnada.chip1", "ley.data.descarnada.chip2", "ley.data.descarnada.chip3", "ley.data.descarnada.chip4"],
    origenKey: "ley.data.descarnada.origin",
    relatoKey: "ley.data.descarnada.relato",
    titulo: "La Descarnada",
    sub: "La muerte que camina entre los vivos",
    tag: "Presagio · Pueblos",
    chips: ["Esqueleto viviente", "Calles nocturnas", "Presagio de muerte", "Camina entre humanos"],
    origen: "Frecuente en los pueblos del interior del país, sobre todo en zonas con cementerios y caminos rurales solitarios.",
    img: "../assets/media/leyenda/descarnada.png",
    relato: `En los pueblos más antiguos del interior de El Salvador, donde las calles todavía son de tierra y el cementerio queda apenas a las afueras, se cuenta la historia de una figura que no persigue, no grita, ni asusta con intención: simplemente camina. Le llaman la Descarnada, y quien la ve sabe, sin que nadie se lo tenga que explicar, que la muerte anda cerca.

Se le describe como una mujer altísima y delgada hasta los huesos, cubierta apenas por una sábana blanca deshilachada o un vestido raído que el viento nocturno mueve de un lado a otro. Cuando la tela se agita, se alcanzan a ver, entre los pliegues, los huesos desnudos de su cuerpo, como si no le quedara ni un gramo de carne. Camina despacio, sin prisa, por las calles solitarias de los pueblos, por los caminos que bordean los cementerios, o por los senderos rurales que casi nadie transita después de cierta hora.

A diferencia de otras figuras del folclore salvadoreño, la Descarnada no busca engañar a nadie, ni seducir, ni hacer travesuras. No corre detrás de quien la ve, no habla, no amenaza. Solamente sigue su camino, con un sonido seco y hueco de huesos entrechocando a cada paso, como si caminara con el esqueleto suelto bajo la tela raída. Y esa indiferencia, esa calma inquietante, es quizás lo más aterrador de todo: uno sabe que ella no viene por ti directamente, pero verla significa que la muerte, de alguna forma, ha puesto su mirada sobre tu casa, tu familia o tú mismo.

Numerosas personas en distintos pueblos del país aseguran haberla visto, casi siempre de madrugada, caminando lentamente por calles empedradas o por veredas que llevan al panteón local. Algunos dicen haberla encontrado de frente en una esquina oscura, quedándose paralizados mientras ella pasaba de largo sin siquiera voltear a verlos, dejando tras de sí un frío que tardaba horas en desaparecer del cuerpo.

La creencia popular asegura que quien se topa con la Descarnada, o alguien de su familia cercana, no tardará en enfrentar una muerte próxima. Por eso, en las noches donde se rumora que ha sido vista rondando, los pueblos enteros se quedan más callados de lo normal, con las puertas bien cerradas, mientras los mayores recuerdan a los más jóvenes que la muerte, en El Salvador, no siempre llega de improviso: a veces, antes, se deja ver caminando entre los vivos.`
  },
  {
    id: "duende",
    tituloKey: "ley.data.duende.title",
    subKey: "ley.data.duende.sub",
    tagKey: "ley.data.duende.tag",
    chipsKeys: ["ley.data.duende.chip1", "ley.data.duende.chip2", "ley.data.duende.chip3", "ley.data.duende.chip4"],
    origenKey: "ley.data.duende.origin",
    relatoKey: "ley.data.duende.relato",
    titulo: "El Duende",
    sub: "El pequeño guardián de los bosques",
    tag: "Criatura · Bosques",
    chips: ["Guardián del bosque", "Toca música", "Sombrero grande", "Travieso pero inofensivo"],
    origen: "Zonas rurales y boscosas de todo el país; muy popular en cantones alejados de los cascos urbanos.",
    img: "../assets/media/leyenda/duende.png",
    relato: `En los cantones más alejados, donde el bosque todavía es espeso y las quebradas corren escondidas entre la maleza, los campesinos hablan de un pequeño ser que vive entre los árboles desde tiempos que nadie recuerda con exactitud: el Duende. No mide más de sesenta centímetros de alto, pero tiene la cara arrugada de un anciano sabio o, según quien lo cuente, el rostro travieso de un niño eterno. Viste ropa colorida y luce siempre un sombrero de paja tan grande que parece flotar solo sobre sus hombros diminutos.

A diferencia de otras criaturas del folclore salvadoreño que inspiran verdadero terror, el Duende no es maligno por naturaleza. Es curioso, juguetón y, sobre todo, un maestro del engaño inofensivo: le encanta esconder las herramientas de trabajo de los campesinos justo cuando más las necesitan, cambiar de lugar los objetos de la casa durante la noche, o asustar sin motivo a las gallinas y a los animales domésticos, solo para divertirse con el alboroto que provoca.

Su fama más grande, sin embargo, viene de la música. Por las noches, quien se adentra en el monte puede escuchar el sonido lejano de una marimba, una guitarra o una flauta tocando melodías que nadie reconoce, melodías que parecen venir de todas direcciones a la vez. Es el Duende, tocando para sí mismo entre los árboles. Algunos, atraídos por esa música misteriosa, se han internado en el bosque siguiendo el sonido, solo para descubrir, horas después, que estaban completamente perdidos: el Duende también puede imitar voces humanas, llamando por su nombre a quienes busca confundir, guiándolos cada vez más lejos del camino de regreso.

Existe además una variante muy conocida de esta leyenda, quizás la más repetida entre las familias rurales: se dice que el Duende se enamora perdidamente de las niñas pequeñas de ojos claros y trenzas largas. Cuando esto sucede, comienza a aparecerse por las noches cerca de la casa de la niña, jalándole suavemente las trenzas mientras duerme, escondiéndole sus juguetes favoritos, o siguiéndola de manera brought insistente cuando camina sola. Por generaciones, muchas madres y abuelas optaron por cortarle el cabello a sus hijas pequeñas específicamente para alejar al Duende y evitar que se encariñara demasiado con ellas.

Con el paso del tiempo, esta leyenda ha cumplido, sin proponérselo, una función que va más allá del simple susto: el miedo a toparse con el Duende ha hecho que generaciones de niños y adultos eviten adentrarse innecesariamente en los bosques y quebradas más profundos, ayudando —de manera indirecta pero real— a proteger estos ecosistemas de la deforestación y el abandono.`
  },
  {
    id: "carreta-bruja",
    tituloKey: "ley.data.carreta_bruja.title",
    subKey: "ley.data.carreta_bruja.sub",
    tagKey: "ley.data.carreta_bruja.tag",
    chipsKeys: ["ley.data.carreta_bruja.chip1", "ley.data.carreta_bruja.chip2", "ley.data.carreta_bruja.chip3", "ley.data.carreta_bruja.chip4"],
    origenKey: "ley.data.carreta_bruja.origin",
    relatoKey: "ley.data.carreta_bruja.relato",
    titulo: "La Carreta Bruja",
    sub: "El carruaje sin bueyes que recoge almas",
    tag: "Presagio · Caminos rurales",
    chips: ["Carreta fantasma", "Ruido de cadenas", "Recoge almas", "Viernes de noche"],
    origen: "Tradición oral de zonas rurales, especialmente relatada en pueblos del oriente y centro del país.",
    img: "../assets/media/leyenda/carreta-bruja.png",
    relato: `Hace ya muchos años, cuentan los más viejos del pueblo, vivía un hombre que se había entregado en cuerpo y alma al diablo, cambiando su vida por riquezas y poder. Una noche, cegado por la maldad que llevaba dentro, intentó obligar a sus propios bueyes a entrar por la fuerza a la iglesia del pueblo, con intenciones oscuras que nadie se atrevió jamás a repetir en voz alta. Pero los bueyes, sintiendo el mal que los rodeaba, se resistieron con todas sus fuerzas: reventaron las coyundas que los ataban a la carreta y escaparon despavoridos hacia el monte, dejando al hombre maldito y a su carreta solos, en medio de la noche.

Desde entonces, dicen que esa misma carreta rueda sola por los caminos rurales, sin ningún animal que la jale, advancing lentamente entre chirridos de madera vieja y el tintineo metálico de cadenas oxidadas. En la punta de sus trinquetes cuelgan calaveras que se balancean con cada movimiento, y quienes se atreven a mirar dentro de ella aseguran haber visto los cuerpos de personas que ya no reconocían, apilados en un silencio que da más miedo que cualquier grito.

Detrás de la carreta, cuentan algunos testigos, avanzan seres extraños con cabeza de zacate seco, como espantapájaros vivientes, siguiendo el mismo camino sin apartarse jamás de su ruta fija. Nadie sabe bien a dónde se dirigen, pero todos coinciden en algo: hay que apartarse del camino y quedarse muy quieto cuando se escucha acercarse el sonido inconfundible de sus ruedas de madera contra la tierra.

Uno de los relatos más recordados es el de un hombre que, volviendo tarde a su casa, sintió que algo se aproximaba en la oscuridad. Al voltear, vio la carreta desvencijada avanzando hacia él lentamente, sin bueyes, cargada de calaveras y de aquellos seres de zacate que la seguían de cerca. El miedo lo paralizó por completo; no recuerda cómo llegó esa noche a su casa, solo que pasó los siguientes tres días con una fiebre altísima, y que desde entonces nunca más se dejó sorprender por la noche, mucho menos si era viernes.

Porque según cuenta la tradición, es precisamente los viernes de noche cuando la Carreta Bruja sale con más fuerza a recorrer los caminos, recogiendo —dicen algunos— las almas de quienes han llevado una vida de maldad, mientras que otros aseguran que simplemente arrastra su condena eterna, sin un destino claro, como recordatorio permanente de lo que puede pasar cuando alguien decide entregarse al mal.`
  },
  {
    id: "cuyancua",
    tituloKey: "ley.data.cuyancua.title",
    subKey: "ley.data.cuyancua.sub",
    tagKey: "ley.data.cuyancua.tag",
    chipsKeys: ["ley.data.cuyancua.chip1", "ley.data.cuyancua.chip2", "ley.data.cuyancua.chip3", "ley.data.cuyancua.chip4"],
    origenKey: "ley.data.cuyancua.origin",
    relatoKey: "ley.data.cuyancua.relato",
    titulo: "La Cuyancúa",
    sub: "La bestia mitad serpiente, mitad cerdo",
    tag: "Criatura · Sonsonate",
    chips: ["Mitad culebra", "Mitad cerdo", "Anuncia temporales", "Cañales de Izalco"],
    origen: "Zona de Izalco, departamento de Sonsonate; documentada por Leonhard Schultze-Jena en sus estudios sobre los pipiles de Izalco.",
    img: "../assets/media/leyenda/cuyancua.png",
    relato: `En los extensos cañaverales que rodean Izalco, en el departamento de Sonsonate, los pobladores más antiguos hablan con respeto y algo de temor de una criatura que pocos han visto de cerca, pero que muchos aseguran haber escuchado: la Cuyancúa. Es descrita como un ser híbrido y perturbador, con el cuerpo de una serpiente enroscada en su parte trasera, y la cabeza, las patas y el gruñido de un cerdo en su parte delantera. Su tamaño, dicen quienes la han visto de lejos entre la maleza, es similar al de una vaca pequeña, lo suficientemente grande como para hacer temblar los cañales a su paso.

Lo que más ha alimentado esta leyenda a través de los años no es tanto su apariencia, sino el sonido que emite: un chillido agudo y penetrante, muy parecido al de un cerdo asustado, que se escucha especialmente en horas de la madrugada o justo antes de que se aproxime un temporal fuerte. Algunos ancianos de la zona explican que ese chillido lo produce cuando se le eriza todo el pelaje del lomo, como si presintiera la tormenta antes que nadie más en el pueblo.

Los lugareños de los cañales de San Ramón, cerca de Izalco, cuentan que no se trata de una sola Cuyancúa, sino de varias, que emergen de tanto en tanto de entre los surcos de caña recién cortada, especialmente en las noches húmedas que anteceden a las lluvias más fuertes de la temporada. El propio investigador alemán Leonhard Schultze-Jena, que estudió a fondo la mitología de los pipiles de Izalco a inicios del siglo veinte, recogió y confirmó por escrito la existencia de este mito entre los pobladores de la región, dándole un lugar permanente dentro del folclore salvadoreño.

Además de anunciar tormentas, a la Cuyancúa se le atribuye cierto dominio sobre los ríos y quebradas cercanas a los cañaverales, como si fuera una guardiana silenciosa de esas aguas. Por eso, cuando los agricultores escuchan su chillido característico resonando entre los cañales al anochecer, saben que es momento de asegurar bien sus casas, guardar los animales y prepararse: la lluvia, casi siempre, no tarda en llegar después de que la Cuyancúa se ha dejado escuchar.`
  },
  {
    id: "tabudo",
    tituloKey: "ley.data.tabudo.title",
    subKey: "ley.data.tabudo.sub",
    tagKey: "ley.data.tabudo.tag",
    chipsKeys: ["ley.data.tabudo.chip1", "ley.data.tabudo.chip2", "ley.data.tabudo.chip3", "ley.data.tabudo.chip4"],
    origenKey: "ley.data.tabudo.origin",
    relatoKey: "ley.data.tabudo.relato",
    titulo: "El Tabudo",
    sub: "El lagarto gigante de los volcanes",
    tag: "Criatura · Volcanes",
    chips: ["Lagarto enorme", "Vive en volcanes activos", "Guardián del fuego", "Itzqueye"],
    origen: "Asociado a las zonas volcánicas del país; vinculado en algunas versiones con Itzqueye, diosa pipil del agua dulce.",
    img: "../../assets/media/leyenda/tabudo.jpg",
    relato: `En las faldas de los volcanes activos de El Salvador, donde el vapor de azufre sube entre las rocas y el suelo a veces retumba con un calor que viene de muy adentro, se cuenta la existencia de una criatura tan antigua como las propias montañas de fuego: el Tabudo, un lagarto de proporciones descomunales que, según la tradición, habita en las entrañas mismas de los volcanes, custodiando los pasajes que llevan hacia el fuego interior de la tierra.

Nadie ha podido describir con exactitud su tamaño real, porque casi nadie que se ha acercado demasiado ha regresado para contarlo con detalle. Se dice que su piel es tan oscura y áspera como la roca volcánica, y que se mueve despacio entre las cuevas y pozas de aguas termales que rodean los cráteres, como si el calor no le afectara en absoluto, como si él mismo fuera parte del volcán.

Uno de los relatos más conocidos sobre el Tabudo habla de un hombre que, por curiosidad o por descuido, se acercó demasiado a una de las pozas volcánicas cercanas a un cráter activo. De pronto, sin ninguna advertencia, una corriente subacuática sorpresiva y misteriosa lo arrastró hacia el fondo, llevándolo —según cuenta la leyenda— directamente hasta los dominios de Itzqueye, la diosa pipil del agua dulce, guardiana de esas aguas ocultas bajo la montaña. El hombre desapareció por completo, y nadie volvió a saber de él.

Algunas versiones de la historia relacionan directamente al Tabudo con Itzqueye, sugiriendo que el lagarto gigante es en realidad su guardián personal, encargado de proteger sus dominios acuáticos escondidos entre el fuego del volcán, castigando con la desaparición a quien se atreve a curiosear demasiado cerca de sus aguas sagradas.

Por generaciones, esta leyenda ha servido como una advertencia práctica y muy necesaria: los volcanes de El Salvador son hermosos, pero también peligrosos, llenos de pozas ocultas, corrientes traicioneras y terreno inestable. El miedo a toparse con el Tabudo ha mantenido a muchas personas alejadas de zonas volcánicas realmente riesgosas, recordándoles que algunas cosas, en las profundidades de la montaña, es mejor no ir a buscarlas.`
  },
  {
    id: "giganta-jocoro",
    tituloKey: "ley.data.giganta_jocoro.title",
    subKey: "ley.data.giganta_jocoro.sub",
    tagKey: "ley.data.giganta_jocoro.tag",
    chipsKeys: ["ley.data.giganta_jocoro.chip1", "ley.data.giganta_jocoro.chip2", "ley.data.giganta_jocoro.chip3", "ley.data.giganta_jocoro.chip4"],
    origenKey: "ley.data.giganta_jocoro.origin",
    relatoKey: "ley.data.giganta_jocoro.relato",
    titulo: "La Giganta de Jocoro",
    sub: "El icono gigante de las fiestas patronales",
    tag: "Tradición · Morazán",
    chips: ["Figura gigante", "Fiestas patronales", "Tradición Lenca", "Icono de Jocoro"],
    origen: "Municipio de Jocoro, departamento de Morazán; vinculada a la tradición Lenca y a los megalitos de Corinto.",
    img: "../assets/media/leyenda/gigante-jocoro.png",
    relato: `En el municipio de Jocoro, en el departamento de Morazán, se cuenta una historia distinta a la mayoría de las leyendas salvadoreñas: no habla de un espíritu vengativo ni de una criatura temida en la oscuridad, sino de una figura gigante que, lejos de asustar, se ha convertido en el orgullo más grande de todo el pueblo. Le llaman la Giganta de Jocoro, y cada año, durante las fiestas patronales, sale a recorrer las calles acompañada de toda su familia gigante y de una alegre corte de personajes enmascarados que bailan a su alrededor.

El origen de esta tradición se remonta a las creencias ancestrales del pueblo Lenca, que habitó gran parte del oriente de El Salvador desde tiempos muy antiguos. Según esa cosmovisión, existieron efectivamente gigantes en el territorio, seres de gran tamaño y fuerza sobrehumana que, según cuentan algunos, fueron los verdaderos autores de la formación y la decoración de los enormes megalitos que todavía hoy se pueden encontrar en Corinto, también en el departamento de Morazán, como testimonio de piedra de un pasado que se resiste a desaparecer del todo.

Con el paso de los siglos, esa creencia ancestral se transformó poco a poco en una celebración comunitaria: la Giganta dejó de ser solo un recuerdo mitológico para convertirse en un personaje central de las fiestas patronales de Jocoro, con su propia familia de gigantes y su comitiva de acompañantes enmascarados, todos ellos construidos con gran cuidado por artesanos locales que mantienen viva esta tradición año tras año.

Hoy, ver desfilar a la Giganta de Jocoro por las calles del pueblo es, para muchos morazánicos, un motivo de identidad tan fuerte como puede serlo la Siguanaba o el Cipitío para el resto del país. Niños y adultos se agolpan en las aceras para verla pasar, celebrando no un miedo ancestral, sino un vínculo directo con sus raíces Lencas, recordando que en algún momento de la historia, en esa misma tierra oriental, se habló en serio de la existencia de gigantes.`
  },
  {
    id: "sisimite",
    tituloKey: "ley.data.sisimite.title",
    subKey: "ley.data.sisimite.sub",
    tagKey: "ley.data.sisimite.tag",
    chipsKeys: ["ley.data.sisimite.chip1", "ley.data.sisimite.chip2", "ley.data.sisimite.chip3", "ley.data.sisimite.chip4"],
    origenKey: "ley.data.sisimite.origin",
    relatoKey: "ley.data.sisimite.relato",
    titulo: "El Sisimite",
    sub: "El hombre salvaje de los cerros",
    tag: "Criatura · Montañas",
    chips: ["Cubierto de pelo", "Pies al revés", "Vive en cuevas", "Rapta viajeros"],
    origen: "Zonas montañosas y boscosas de El Salvador y otros países centroamericanos; comparte raíces con relatos mesoamericanos del hombre salvaje.",
    img: "../assets/media/leyenda/sisimite.png",
    relato: `En los cerros más apartados de El Salvador, donde la neblina cubre las cuevas y los senderos apenas son visibles entre la vegetación cerrada, se habla desde hace generaciones de un ser que habita en lo más profundo de la montaña: el Sisimite, un humanoide gigantesco, cubierto de pies a cabeza por un pelaje espeso y enmarañado, que vive completamente aislado de los pueblos, en cuevas que muy pocos se atreven a buscar.

Al igual que el Cipitío, el Sisimite tiene una particularidad que lo hace todavía más temido: sus pies están colocados al revés, con los dedos apuntando hacia atrás. Esto significa que cualquier cazador o viajero que se pierda en la montaña y trate de seguir sus huellas para encontrar el camino de regreso, terminará caminando exactamente en la dirección opuesta a la que el Sisimite realmente tomó, adentrándose todavía más en terreno desconocido en lugar de salir de él.

Los relatos más antiguos hablan de su fuerza sobrehumana, capaz de arrancar árboles de raíz y mover rocas enormes como si no pesaran nada. Se dice que ronda los senderos más solitarios durante la noche, y que ha llegado a raptar a viajeros descuidados —sobre todo mujeres jóvenes que se aventuran solas por la montaña— llevándoselos a sus cuevas profundas, de las cuales muy pocos, según cuenta la tradición oral, han logrado escapar con vida para contarlo.

Su presencia se siente antes de verlo: un silencio extraño se apodera del bosque, los pájaros dejan de cantar de golpe, y un olor fuerte a tierra húmeda y animal salvaje se cuela entre los árboles. Quienes aseguran haberlo visto de lejos describen una silueta enorme, encorvada, moviéndose entre las sombras con una agilidad que no debería ser posible para un ser de ese tamaño.

Esta leyenda, compartida con matices similares en otros países de Centroamérica, ha cumplido durante generaciones una función muy práctica: mantener alejadas a las personas, especialmente a las mujeres y los niños, de las zonas montañosas más remotas y peligrosas del país, donde los verdaderos riesgos —despeñaderos, animales salvajes, y la posibilidad real de perderse sin remedio— son tan grandes como los que se le atribuyen al propio Sisimite.`
  },
  {
    id: "justo-juez",
    tituloKey: "ley.data.justo_juez.title",
    subKey: "ley.data.justo_juez.sub",
    tagKey: "ley.data.justo_juez.tag",
    chipsKeys: ["ley.data.justo_juez.chip1", "ley.data.justo_juez.chip2", "ley.data.justo_juez.chip3", "ley.data.justo_juez.chip4"],
    origenKey: "ley.data.justo_juez.origin",
    relatoKey: "ley.data.justo_juez.relato",
    titulo: "El Justo Juez de la Noche",
    sub: "El jinete que juzga a los pecadores",
    tag: "Presagio · Caminos",
    chips: ["Jinete nocturno", "Reza el Justo Juez", "Persigue infieles", "Oración protectora"],
    origen: "Tradición oral extendida en pueblos rurales; se relaciona con la oración popular católica conocida como \"el Justo Juez\".",
    img: "../assets/media/leyenda/juez-noche.png",
    relato: `En los caminos rurales de El Salvador, donde la fe católica se mezcla con el miedo ancestral a la oscuridad, se cuenta la historia de un jinete que aparece únicamente ante quienes llevan sobre su conciencia el peso de una vida deshonesta: hombres infieles, borrachos que maltratan a su familia, o personas que han hecho daño sin arrepentimiento. Le llaman el Justo Juez de la Noche, y su sola aparición se siente como una sentencia silenciosa que cae sobre quien la merece.

Nadie describe con claridad su rostro, oculto siempre bajo la sombra de un sombrero o entre la oscuridad de la noche cerrada. Monta un caballo negro que no hace ruido al galopar, como si sus cascos apenas rozaran el suelo, y avanza por los caminos solitarios sin decir una sola palabra, sin necesidad de gritar ni amenazar: su presencia por sí sola basta para desatar el pánico.

Quienes lo han encontrado en su camino cuentan que, apenas se acerca, los caballos propios se agitan nerviosos, relinchando sin motivo aparente, mientras los perros del vecindario aúllan al unísono como si percibieran algo que los humanos apenas alcanzan a sentir: una opresión pesada en el pecho, un frío que sube desde los pies, la certeza absoluta de que ese jinete sabe exactamente quién es uno y qué ha hecho mal en la vida.

La tradición asegura que existe una única forma de librarse de su presencia: rezar en voz alta, con fe verdadera, la oración popular conocida como "el Justo Juez", una plegaria transmitida de generación en generación precisamente para estos momentos de peligro nocturno. Se dice que en cuanto las primeras palabras de la oración salen de la boca del viajero asustado, el jinete se detiene, observa un instante más, y luego se aleja despacio hacia la oscuridad de donde vino, sin insistir, como si su única misión hubiera sido recordarle a esa persona que la noche también puede traer justicia.

Más que un simple espanto, esta figura cumple una función moral muy clara dentro de la tradición salvadoreña: recuerda a quien anda por caminos oscuros —literal y metafóricamente— que una vida de vicios, infidelidades y maltratos tiene consecuencias, y que la fe, representada en esa oración protectora, sigue siendo el refugio más seguro frente al miedo de la noche.`
  },
  {
    id: "padre-sin-cabeza",
    tituloKey: "ley.data.padre_sin_cabeza.title",
    subKey: "ley.data.padre_sin_cabeza.sub",
    tagKey: "ley.data.padre_sin_cabeza.tag",
    chipsKeys: ["ley.data.padre_sin_cabeza.chip1", "ley.data.padre_sin_cabeza.chip2", "ley.data.padre_sin_cabeza.chip3", "ley.data.padre_sin_cabeza.chip4"],
    origenKey: "ley.data.padre_sin_cabeza.origin",
    relatoKey: "ley.data.padre_sin_cabeza.relato",
    titulo: "El Padre sin Cabeza",
    sub: "El sacerdote que vaga sin descanso",
    tag: "Espíritu · Pueblos coloniales",
    chips: ["Sacerdote decapitado", "Monta un caballo negro", "Cascos coloniales", "Penitencia eterna"],
    origen: "Pueblos con fuerte herencia colonial, como Suchitoto y otros cascos históricos del país.",
    img: "../assets/media/leyenda/padre-cabeza.png",
    relato: `En los pueblos con más historia colonial de El Salvador, como Suchitoto, donde las calles todavía conservan sus adoquines de piedra y las iglesias centenarias dominan la plaza principal, se cuenta la historia de un sacerdote que, hace siglos, cometió una falta tan grave que ni la muerte pudo darle descanso. Le conocen como el Padre sin Cabeza, y su condena es vagar eternamente, montado sobre un caballo negro que galopa sin hacer ningún ruido, por las mismas calles que una vez recorrió con vida.

Nadie en el pueblo sabe con certeza qué fue exactamente lo que hizo aquel sacerdote para merecer semejante castigo: algunos hablan de un pecado imperdonable cometido dentro de la propia iglesia, otros de una traición a su fe o a alguien que confiaba en él. Lo que todos coinciden en contar es el castigo: perdió su cabeza para siempre, y desde entonces recorre las calles empedradas sin ella, vestido con su sotana oscura, mientras el caballo avanza silencioso bajo la luz de la luna.

Su aparición trae consigo un frío intenso e inexplicable que se siente en el aire incluso en las noches más calurosas del verano salvadoreño. Los pocos que aseguran haberlo visto describen la silueta inconfundible de un jinete sin cabeza recorriendo la plaza principal o las callejuelas cercanas a la iglesia justo después de la medianoche, sin detenerse jamás, sin mirar a nadie, cumpliendo un recorrido que parece repetirse noche tras noche desde hace generaciones.

Existen distintas versiones sobre el propósito de su eterno peregrinar: algunos cuentan que busca desesperadamente una confesión que nunca pudo hacer en vida, otros aseguran que simplemente cumple su penitencia en silencio, sin posibilidad alguna de comunicarse con los vivos que se cruzan en su camino, condenado a repetir el mismo trayecto sin final.

Esta leyenda refleja algo muy propio de los pueblos coloniales salvadoreños: el peso enorme que tuvo la Iglesia en la vida cotidiana durante siglos, y sirve como un recordatorio simbólico muy directo: ninguna falta, ni siquiera la cometida por una autoridad religiosa respetada, queda sin consecuencia, aunque esa consecuencia tenga que perseguir a su culpable durante toda la eternidad.`
  },
  {
    id: "sombreron",
    tituloKey: "ley.data.sombreron.title",
    subKey: "ley.data.sombreron.sub",
    tagKey: "ley.data.sombreron.tag",
    chipsKeys: ["ley.data.sombreron.chip1", "ley.data.sombreron.chip2", "ley.data.sombreron.chip3", "ley.data.sombreron.chip4"],
    origenKey: "ley.data.sombreron.origin",
    relatoKey: "ley.data.sombreron.relato",
    titulo: "El Sombrerón",
    sub: "El pequeño jinete de sombrero enorme",
    tag: "Criatura · Caminos nocturnos",
    chips: ["Sombrero descomunal", "Trenza los caballos", "Ronda las calles", "Asusta animales"],
    origen: "Leyenda compartida con otros países de Centroamérica, adaptada en la tradición oral salvadoreña de pueblos y caseríos.",
    img: "../assets/media/leyenda/sombreron.png",
    relato: `En los caseríos y pueblos pequeños de El Salvador, donde todavía hay corrales con caballos y las calles se quedan completamente a oscuras después de cierta hora, se cuenta la historia de un hombre pequeño y silencioso, vestido enteramente de negro, cuyo sombrero de ala tan ancha le cubre casi todo el rostro, dejando ver apenas la sombra de sus ojos. Le llaman el Sombrerón, y su presencia se asocia siempre con la noche y, sobre todo, con los caballos.

Los dueños de fincas y corrales cuentan que, de vez en cuando, amanecen sus caballos con las crines completamente trenzadas, en nudos tan complicados y perfectos que parecen imposibles de hacer con prisa o en la oscuridad. Nadie ha visto directamente al Sombrerón haciendo este trabajo minucioso durante la noche, pero todos en el pueblo saben perfectamente a quién atribuirle esas trenzas imposibles de deshacer al día siguiente.

Más inquietante todavía resulta lo que cuentan los viajeros nocturnos que caminan solos por las calles del caserío: aseguran sentir, de pronto, unos pasos detrás de ellos, siempre a la misma distancia, sin acercarse ni alejarse. Al voltear, encuentran la figura silenciosa del Sombrerón, siguiéndolos de cerca sin decir una palabra, sin hacer ademán de atacar, únicamente observando desde la sombra de su enorme sombrero. Esa persecución silenciosa, sin motivo aparente ni final claro, es quizás lo que más terror provoca entre quienes se topan con él.

Aunque comparte similitudes con leyendas parecidas de otros países centroamericanos, en El Salvador el Sombrerón se ha adaptado a la vida rural y ganadera de los pueblos pequeños, convirtiéndose en la explicación popular perfecta para esos nudos extraños en las crines de los caballos y para el comportamiento nervioso que a veces muestran los animales de las fincas sin ninguna razón visible.

Con el tiempo, esta figura ha servido también como una advertencia más para no caminar solo por las calles oscuras del caserío después de cierta hora: porque nunca se sabe si esos pasos silenciosos que uno cree escuchar detrás son solo el eco de los propios, o si en realidad el Sombrerón ha decidido seguirte esa noche, con su sombrero enorme y su silencio inquietante, hasta la puerta misma de tu casa.`
  },
  {
    id: "cuco-de-los-suenos",
    tituloKey: "ley.data.cuco_de_los_suenos.title",
    subKey: "ley.data.cuco_de_los_suenos.sub",
    tagKey: "ley.data.cuco_de_los_suenos.tag",
    chipsKeys: ["ley.data.cuco_de_los_suenos.chip1", "ley.data.cuco_de_los_suenos.chip2", "ley.data.cuco_de_los_suenos.chip3", "ley.data.cuco_de_los_suenos.chip4"],
    origenKey: "ley.data.cuco_de_los_suenos.origin",
    relatoKey: "ley.data.cuco_de_los_suenos.relato",
    titulo: "El Cuco de los Sueños",
    sub: "El ser que se lleva a los niños desobedientes",
    tag: "Advertencia · Hogar",
    chips: ["Figura sin forma fija", "Aparece de noche", "Vigila a los niños", "Tradición oral familiar"],
    origen: "Tradición doméstica transmitida de madres y abuelas a los niños en todo El Salvador, sin un origen geográfico único.",
    img: "../assets/media/leyenda/el-cuco.png",
    relato: `A diferencia de otras leyendas que se cuentan alrededor de un río, un volcán o un pueblo específico, el Cuco no tiene un lugar fijo donde vive, ni una historia de origen clara como la Siguanaba o el Cipitío. Vive, en realidad, en la imaginación de cada familia salvadoreña, y cada abuela, cada madre, lo describe un poco distinto según lo que ella misma escuchó de niña.

Para algunos es una sombra alargada que se estira por las paredes del cuarto justo cuando se apaga la luz. Para otros, es un anciano encorvado que ronda las casas de noche, mirando por las ventanas para ver qué niño sigue despierto pasada su hora de dormir. Hay quienes lo imaginan sin forma definida en absoluto, como una presencia que simplemente se siente, un frío repentino en la habitación, un crujido en el techo justo cuando el niño ha decidido no obedecer a sus padres.

Lo único que se mantiene igual en cada versión de la historia es su propósito: el Cuco existe para que los niños se porten bien, se duerman a la hora que les corresponde, y no le hagan travesuras a sus padres. "Pórtate bien o te lleva el Cuco" es una frase que casi cualquier salvadoreño escuchó de pequeño, susurrada justo antes de apagar la luz, con esa mezcla exacta de cariño y advertencia que solo una madre o una abuela saben transmitir.

A diferencia de figuras como la Siguanaba o el Cadejo, que castigan comportamientos de adultos —la infidelidad, la mala vida, los vicios—, el Cuco cumple una función exclusivamente dentro del hogar: es el guardián invisible del buen comportamiento infantil, el recordatorio nocturno de que hay reglas que cumplir y horarios que respetar, incluso cuando los padres ya no están repitiéndolo en voz alta.

Aunque ha perdido fuerza frente a otras historias más elaboradas del folclore salvadoreño, el Cuco sigue vivo en el anecdotario familiar de muchísimas casas del país. Todavía hoy, en noches donde un niño se resiste a dormir, alguna abuela sonríe con complicidad y repite la misma advertencia que ella escuchó de pequeña: que ahí afuera, en la oscuridad del cuarto, el Cuco anda esperando a los que no se portan bien.`
  }
];

let currentLeyendaIndex = -1;
let ttsUtterance = null;

// Obtiene el idioma guardado ('es' o 'en')
function getCurrentLang() {
  const lang = localStorage.getItem('sr_lang') || localStorage.getItem('i18nextLng') || 'es';
  return (lang.startsWith('en') || lang === 'us') ? 'en' : 'es';
}

// Función auxiliar para obtener traducción dinámicamente desde el sistema SRi18n
function getTextTranslation(key, fallbackText) {
  const lang = getCurrentLang();

  // Soporte para tu librería SRi18n (i18n.js)
  if (window.SRi18n && typeof window.SRi18n.t === 'function') {
    const translation = window.SRi18n.t(key, lang);
    // t() devuelve la propia key si no encuentra traducción; en ese caso usamos el fallback
    if (translation && translation !== key) return translation;
  }

  return fallbackText;
}

function crearPortadaHTML(l, index) {
  const imgHtml = l.img
    ? `<img src="${l.img}" alt="${l.titulo}" onload="this.classList.add('loaded')">`
    : `<div class="leyenda-book__placeholder">📖</div>`;
  
  return `
    <button class="leyenda-book" data-index="${index}" aria-label="Abrir ${l.titulo}">
      <div class="leyenda-book__cover">
        ${imgHtml}
        <div class="leyenda-book__grad"></div>
        <div class="leyenda-book__spine"></div>
        <div class="leyenda-book__num">${index + 1}</div>
        <div class="leyenda-book__footer">
          <div class="leyenda-book__title" data-i18n="${l.tituloKey}">${getTextTranslation(l.tituloKey, l.titulo)}</div>
          <div class="leyenda-book__tag" data-i18n="${l.tagKey}">${getTextTranslation(l.tagKey, l.tag)}</div>
        </div>
      </div>
    </button>
  `;
}

function renderLibrary() {
  const grid = document.getElementById("leyendaGrid");
  if (!grid) return;
  grid.innerHTML = LEYENDAS_DATA.map((l, i) => crearPortadaHTML(l, i)).join("");
  grid.querySelectorAll(".leyenda-book").forEach(btn => {
    btn.addEventListener("click", () => openLeyendaModal(parseInt(btn.dataset.index, 10)));
  });
}

function buildModalBody(l) {
  // Traducimos dinámicamente todos los campos con sus claves i18n
  const tituloTrad = getTextTranslation(l.tituloKey, l.titulo);
  const subTrad = getTextTranslation(l.subKey, l.sub);
  const relatoTrad = getTextTranslation(l.relatoKey, l.relato);

  const chips = l.chips.map((c, i) => {
    const chipKey = l.chipsKeys[i];
    const chipText = getTextTranslation(chipKey, c);
    return `<span class="leyenda-modal__chip" data-i18n="${chipKey}">${chipText}</span>`;
  }).join("");

  const parrafos = relatoTrad
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${p}</p>`)
    .join("");

  const mediaHtml = l.img
    ? `<img src="${l.img}" alt="${tituloTrad}" onload="this.classList.add('loaded')">`
    : `<div class="leyenda-modal__media-placeholder">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>
         <small data-i18n="ley.modal.image_placeholder">${getTextTranslation("ley.modal.image_placeholder", "Espacio para imagen<br>de esta leyenda")}</small>
       </div>`;

  return `
    <div class="leyenda-modal__media">
      ${mediaHtml}
      <div class="leyenda-modal__media-grad"></div>
    </div>
    <div class="leyenda-modal__content" id="leyendaModalScroll">
      <div class="leyenda-modal__chips">${chips}</div>
      <h2 data-i18n="${l.tituloKey}">${tituloTrad}</h2>
      <p class="leyenda-modal__sub" data-i18n="${l.subKey}">${subTrad}</p>
      <div class="leyenda-modal__relato">${parrafos}</div>
    </div>
  `;
}

function openLeyendaModal(index) {
  const l = LEYENDAS_DATA[index];
  if (!l) return;
  currentLeyendaIndex = index;

  const overlay = document.getElementById("leyendaModalOverlay");
  const modal = document.getElementById("leyendaModal");

  // 1. Inyectamos la estructura modal con textos ya traducidos
  modal.innerHTML = buildModalBody(l);

  // 2. Inyectamos el texto de origen de la leyenda
  const originTextEl = document.getElementById("leyendaModalOriginText");
  if (originTextEl) {
    originTextEl.setAttribute("data-i18n", l.origenKey);
    originTextEl.textContent = getTextTranslation(l.origenKey, l.origen);
  }

  const originBox = document.getElementById("leyendaModalOrigin");
  if (originBox) originBox.classList.remove("show");
  if (overlay) overlay.classList.add("open");
  document.body.classList.add("modal-lock");

  // 3. Forzar refresco global si utilizas una función centralizadora (e.g. updatePageLanguage / i18next)
  if (typeof updatePageLanguage === 'function') {
    updatePageLanguage(getCurrentLang());
  } else if (typeof i18next !== 'undefined' && typeof jqueryI18next !== 'undefined') {
    window.jQuery('#leyendaModal').localize();
  }

  stopNarration();
}

function closeLeyendaModal() {
  const overlay = document.getElementById("leyendaModalOverlay");
  if (overlay) overlay.classList.remove("open");
  document.body.classList.remove("modal-lock");
  stopNarration();
  const originBox = document.getElementById("leyendaModalOrigin");
  if (originBox) originBox.classList.remove("show");
}

function toggleOrigin() {
  const originBox = document.getElementById("leyendaModalOrigin");
  if (originBox) originBox.classList.toggle("show");
}

/* ============================================================
   SISTEMA DE NARRACIÓN Y VOZ (TTS)
   ============================================================ */
function getNarrationChunks(l) {
  const titulo = getTextTranslation(l.tituloKey, l.titulo);
  const sub = getTextTranslation(l.subKey, l.sub);
  const relato = getTextTranslation(l.relatoKey, l.relato);

  const fullText = `${titulo}. ${sub}. ${relato.replace(/<[^>]*>/g, '').replace(/\n+/g, " ")}`;
  const rawSentences = fullText.match(/[^.!?]+[.!?]+["')\]]*|\s*[^.!?]+$/g) || [fullText];

  const chunks = [];
  let current = "";
  rawSentences.forEach(sentence => {
    const trimmed = sentence.trim();
    if (!trimmed) return;
    if ((current + " " + trimmed).trim().length > 180 && current) {
      chunks.push(current.trim());
      current = trimmed;
    } else {
      current = (current + " " + trimmed).trim();
    }
  });
  if (current) chunks.push(current.trim());
  return chunks;
}

let narrationQueue = [];
let narrationQueueIndex = 0;
let narrationKeepAliveTimer = null;

function stopNarration() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (narrationKeepAliveTimer) {
    clearInterval(narrationKeepAliveTimer);
    narrationKeepAliveTimer = null;
  }
  narrationQueue = [];
  narrationQueueIndex = 0;
  const btn = document.getElementById("leyendaNarrateBtn");
  if (btn) btn.classList.remove("speaking");
  ttsUtterance = null;
}

function speakNextChunk() {
  const btn = document.getElementById("leyendaNarrateBtn");

  if (narrationQueueIndex >= narrationQueue.length) {
    stopNarration();
    return;
  }

  const chunkText = narrationQueue[narrationQueueIndex];
  narrationQueueIndex++;

  const langKey = getCurrentLang();
  const isEn = (langKey === 'en');

  ttsUtterance = new SpeechSynthesisUtterance(chunkText);
  ttsUtterance.lang = isEn ? "en-GB" : "es-ES";
  ttsUtterance.rate = 0.95;
  ttsUtterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const targetVoice = voices.find(v => v.lang && v.lang.toLowerCase() === "en-gb")
  || voices.find(v => v.lang && v.lang.toLowerCase().startsWith(isEn ? "en" : "es"));
  if (targetVoice) ttsUtterance.voice = targetVoice;

  ttsUtterance.onend = () => speakNextChunk();
  ttsUtterance.onerror = () => speakNextChunk();

  window.speechSynthesis.speak(ttsUtterance);
  if (btn) btn.classList.add("speaking");
}

function toggleNarration() {
  if (currentLeyendaIndex < 0) return;

  if (!("speechSynthesis" in window)) {
    alert("Tu navegador no soporta la narración por voz.");
    return;
  }

  if (window.speechSynthesis.speaking || narrationQueue.length) {
    stopNarration();
    return;
  }

  const l = LEYENDAS_DATA[currentLeyendaIndex];
  narrationQueue = getNarrationChunks(l);
  narrationQueueIndex = 0;

  if (narrationKeepAliveTimer) clearInterval(narrationKeepAliveTimer);
  narrationKeepAliveTimer = setInterval(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 12000);

  speakNextChunk();
}

document.addEventListener("DOMContentLoaded", () => {
  renderLibrary();

  document.querySelectorAll(".leyenda-flip").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });
  });

  const overlay = document.getElementById("leyendaModalOverlay");
  const closeBtn = document.getElementById("leyendaCloseBtn");
  const narrateBtn = document.getElementById("leyendaNarrateBtn");

  if (closeBtn) closeBtn.addEventListener("click", closeLeyendaModal);
  if (narrateBtn) narrateBtn.addEventListener("click", toggleNarration);

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeLeyendaModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLeyendaModal();
  });

  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => {};
  }

  // Re-traduce el modal si el idioma cambia mientras está abierto
  document.addEventListener("langchange", () => {
    if (currentLeyendaIndex >= 0) {
      const modal = document.getElementById("leyendaModal");
      const l = LEYENDAS_DATA[currentLeyendaIndex];
      if (modal && l) {
        modal.innerHTML = buildModalBody(l);
        const originTextEl = document.getElementById("leyendaModalOriginText");
        if (originTextEl) {
          originTextEl.setAttribute("data-i18n", l.origenKey);
          originTextEl.textContent = getTextTranslation(l.origenKey, l.origen);
        }
      }
    }
    // También re-traduce las portadas de la biblioteca (títulos/tags)
    renderLibrary();
  });
});