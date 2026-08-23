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
    sub: "La mujer misteriosa que aparece en los caminos nocturnos",
    tag: "Mito · Tradición oral",
    chips: ["Mujer misteriosa", "Aparece de noche", "Ríos y quebradas", "Extravía caminantes"],
    origen: "Figura de la tradición oral salvadoreña vinculada con la mitología de los pueblos nahuas o pipiles. Su historia aparece en distintas versiones y fue retomada por Miguel Ángel Espino en \"Mitología de Cuscatlán\".",
    img: "../assets/media/leyenda/siguanaba.png",
    relato: `La Siguanaba es una de las figuras más conocidas de la tradición oral salvadoreña. Su historia aparece en diferentes versiones, algunas relacionadas con la antigua tradición nahua-pipil y con el personaje de Sihuehuet. Por eso, no existe un único relato que pueda considerarse la versión definitiva de la historia.

    Según una de las versiones más difundidas, Sihuehuet era una mujer relacionada con el mundo de los dioses y con el Lucero de la Mañana. Después de cometer faltas que provocaron la ira de los dioses, recibió un castigo que la condenó a vagar por la tierra. Desde entonces quedó convertida en la figura sobrenatural que los salvadoreños conocen como la Siguanaba.

    La tradición cuenta que suele aparecer durante la noche en caminos solitarios, cerca de ríos, quebradas y otros lugares apartados. A la distancia puede parecer una mujer hermosa, de larga cabellera, que se encuentra bañándose o realizando alguna tarea junto al agua. Su apariencia atrae especialmente a los hombres que pasan solos por esos lugares.

    Cuando el hombre se acerca, la apariencia de la mujer cambia y descubre su verdadero aspecto. Una de las características más conocidas de la Siguanaba es su rostro semejante al de una yegua, acompañado de una apariencia aterradora. El encuentro provoca miedo y desconcierto en quien la observa.

    En muchas versiones, la Siguanaba hace que su víctima pierda el rumbo y se aleje del camino, pudiendo terminar cerca de barrancos o lugares peligrosos. Por eso, además del elemento sobrenatural, la historia funciona como una advertencia contra andar solo de noche y contra ciertos comportamientos considerados inapropiados por la comunidad.

    Aunque existen diferentes versiones sobre su origen y sobre las razones de su castigo, la imagen de una mujer misteriosa que atrae a los caminantes y finalmente revela un rostro monstruoso se ha mantenido como uno de los elementos más reconocibles de esta tradición salvadoreña.`
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
    sub: "El niño eterno de la tradición salvadoreña",
    tag: "Mito · Tradición oral",
    chips: ["Niño eterno", "Pies al revés", "Sombrero de palma", "Travesuras"],
    origen: "Personaje de la tradición oral salvadoreña relacionado con Sihuehuet y la mitología nahua-pipil. Es reconocido por el Ministerio de Cultura como uno de los personajes mitológicos más representativos del país.",
    img: "../assets/media/leyenda/cipitio.jpg",
    relato: `El Cipitío es uno de los personajes más conocidos de la tradición oral salvadoreña. En las versiones que lo relacionan con la historia de Sihuehuet, es presentado como su hijo, condenado a permanecer eternamente con la apariencia de un niño. Su historia está vinculada al mismo universo mítico en el que aparece la Siguanaba.

    La tradición lo describe como un niño pequeño, de cuerpo rechoncho y apariencia particular. Uno de sus rasgos más conocidos son sus pies orientados hacia atrás, característica que permite que sus huellas confundan a quien intenta seguirlo. También suele representarse con un gran sombrero hecho de palma o de material vegetal.

    A diferencia de otras figuras consideradas peligrosas, el Cipitío suele aparecer como un personaje travieso y juguetón. Se cuenta que frecuenta los campos, ríos, quebradas y zonas rurales, donde puede esconderse entre la vegetación, lanzar pequeñas piedras o hacer bromas a quienes encuentra.

    Otra de las características tradicionales del personaje es su gusto por la ceniza. En algunas versiones se cuenta que visita los lugares donde se cocina y se revuelca o juega entre las cenizas, dejando pequeñas huellas que delatan su presencia.

    También existen relatos en los que se acerca a muchachas jóvenes y trata de llamar su atención mediante silbidos o pequeñas travesuras. Sin embargo, generalmente no se le presenta como una criatura que busca causar un daño grave.

    Con el paso del tiempo, el Cipitío se convirtió en una figura querida dentro del imaginario salvadoreño. Su aspecto peculiar, sus travesuras y su relación con la tradición oral lo han convertido en uno de los personajes más representativos de los mitos y relatos populares de El Salvador.`
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
    sub: "Los perros misteriosos de los caminos nocturnos",
    tag: "Mito · Tradición oral",
    chips: ["Cadejo blanco", "Cadejo negro", "Perro sobrenatural", "Caminos nocturnos"],
    origen: "Figura de la tradición oral salvadoreña y centroamericana. En El Salvador se conocen principalmente las versiones del Cadejo Blanco y el Cadejo Negro, asociadas con los caminos y las noches.",
    img: "../assets/media/leyenda/cadejo.png",
    relato: `El Cadejo es una de las criaturas más conocidas del folclore salvadoreño y centroamericano. La tradición habla principalmente de dos figuras: un Cadejo Blanco y un Cadejo Negro. Aunque existen diferentes versiones sobre su origen y sus características, ambos están relacionados con las personas que recorren los caminos durante la noche.

    El Cadejo suele describirse como un perro de gran tamaño, con abundante pelo y una apariencia sobrenatural. Sus ojos pueden brillar en la oscuridad y su presencia suele anunciarse antes de que la persona consiga verlo claramente.

    Según la tradición popular, el Cadejo Blanco cumple una función protectora. Puede acompañar silenciosamente a los viajeros que regresan a sus hogares durante la noche, permaneciendo cerca de ellos hasta que llegan a un lugar seguro.

    El Cadejo Negro, en cambio, suele representar una presencia amenazante. Algunas versiones cuentan que se aparece ante personas que transitan de noche o que llevan una conducta considerada negativa, provocándoles miedo o persiguiéndolas por los caminos.

    No todas las versiones coinciden en que ambos sean hermanos ni en que exista una batalla permanente entre ellos. Esos detalles pertenecen a determinadas narraciones y no deben presentarse como características universales de la tradición.

    La fuerza de la leyenda está precisamente en esa dualidad: dos criaturas semejantes que representan protección y peligro. Durante generaciones, el Cadejo ha formado parte de las historias que se contaban para advertir a las personas sobre los peligros de caminar solas durante la noche.`
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
    sub: "El lamento de una mujer que vaga junto al agua",
    tag: "Leyenda · Tradición popular",
    chips: ["Mujer de blanco", "Llanto nocturno", "Ríos y aguas", "Alma en pena"],
    origen: "Leyenda ampliamente difundida en México, Centroamérica y otras regiones de Latinoamérica. En El Salvador forma parte de la tradición popular y presenta diversas versiones locales.",
    img: "../assets/media/leyenda/llorona.png",
    relato: `La Llorona es una leyenda ampliamente difundida por diferentes países de Latinoamérica y también forma parte de la tradición oral salvadoreña. Por esta razón, no existe una única versión salvadoreña de su historia ni un solo lugar del país que pueda considerarse su origen.

    La versión más conocida habla de una mujer que, después de una tragedia relacionada con sus hijos, quedó condenada a vagar durante la noche. Desde entonces recorre lugares cercanos al agua mientras busca o lamenta la pérdida de sus hijos.

    Su presencia suele anunciarse mediante un llanto profundo y prolongado. En los relatos populares, el sonido puede escucharse cerca de ríos, quebradas, lagunas y otros lugares donde el agua corre durante la noche.

    En algunas versiones salvadoreñas se cuenta que la aparición viste de blanco, lleva el cabello suelto y puede verse caminando cerca de las orillas. Otras narraciones se concentran principalmente en su llanto y ni siquiera describen claramente su rostro.

    La historia ha funcionado durante generaciones como una advertencia, especialmente para los niños y jóvenes, para que no se acerquen solos a los ríos o lugares peligrosos durante la noche.

    Aunque la historia cambia de una región a otra, su elemento central permanece: una mujer asociada con una tragedia familiar que vaga durante la noche y cuyo lamento se convierte en la señal más reconocible de su presencia.`
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
    sub: "La mujer que revela su verdadero rostro en la carretera",
    tag: "Leyenda urbana · Santa Ana",
    chips: ["Carretera nocturna", "Mujer misteriosa", "Apariencia esquelética", "Aventón"],
    origen: "Mito o leyenda urbana salvadoreña difundida especialmente desde la década de 1980 y asociada con la carretera entre Santa Ana y Chalchuapa.",
    img: "../assets/media/leyenda/descarnada.png",
    relato: `La Descarnada pertenece a una generación más reciente de relatos de miedo salvadoreños. A diferencia de los personajes vinculados con la mitología indígena, esta historia se desarrolló como una leyenda urbana y se hizo conocida especialmente en el occidente del país.

    Según el relato popular, durante la noche una mujer joven y de apariencia atractiva podía aparecer a la orilla de la carretera que comunica Santa Ana con Chalchuapa. La mujer hacía señales a los conductores que viajaban solos y les pedía que la llevaran a algún lugar cercano.

    El conductor que aceptaba darle aventón podía comenzar a conversar con ella durante el trayecto. En algunas versiones, la mujer se mostraba especialmente cercana o provocadora con el hombre, quien terminaba sintiéndose atraído por ella.

    Entonces ocurría la transformación. Cuando el conductor intentaba acercarse demasiado, la apariencia de la mujer comenzaba a cambiar: su piel parecía desprenderse y debajo de ella aparecía un cuerpo descarnado, dejando al descubierto huesos y músculos.

    El encuentro terminaba provocando un enorme susto en la persona que la había recogido. Algunas versiones cuentan que la víctima quedaba paralizada por el miedo o sufría consecuencias físicas y emocionales después del encuentro.

    La Descarnada se diferencia de la Siguanaba porque pertenece a un contexto más moderno y urbano: una carretera, un automóvil y una mujer que pide aventón. Su historia funciona como una advertencia sobre los peligros de detenerse ante desconocidos durante la noche y, al mismo tiempo, como un relato de terror propio de la tradición oral contemporánea de El Salvador.`
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
    sub: "El pequeño ser de las historias populares",
    tag: "Tradición · Personaje folclórico",
    chips: ["Ser pequeño", "Travesuras", "Aparición nocturna", "Tradición rural"],
    origen: "Personaje presente en distintas tradiciones populares de El Salvador y de otros países de Centroamérica. Sus características varían según la región y la familia que transmite el relato.",
    img: "../assets/media/leyenda/duende.png",
    relato: `El Duende es un personaje presente en numerosas tradiciones populares de El Salvador. A diferencia de personajes como la Siguanaba o el Cipitío, no existe una única historia salvadoreña que establezca de manera definitiva su origen, apariencia o comportamiento.

    En los relatos familiares puede aparecer como un ser pequeño que habita cerca de casas, campos, bosques o caminos. Su aspecto también cambia según quien cuenta la historia: algunas personas lo describen como un hombre pequeño con sombrero, mientras que otras simplemente hablan de una criatura misteriosa que aparece durante la noche.

    Sus acciones suelen estar relacionadas con las travesuras. Puede esconder objetos, mover cosas de lugar, producir ruidos o llamar la atención de las personas que se encuentran cerca de su supuesto escondite.

    En algunas variantes centroamericanas, el Duende también aparece relacionado con jóvenes o mujeres y con historias de enamoramiento. Sin embargo, estas características no son iguales en todas las versiones y por eso no deben presentarse como una regla de la tradición salvadoreña.

    Su importancia dentro del folclore no depende de una sola historia, sino de la manera en que generaciones de familias han utilizado la figura del Duende para explicar sucesos extraños y alimentar las historias de misterio.

    Por ello, es más apropiado entenderlo como un personaje de tradición popular que como una leyenda salvadoreña con una única versión establecida.`
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
      sub: "La carreta espectral que recorre los caminos",
      tag: "Leyenda · Caminos",
      chips: ["Carreta fantasma", "Ruido nocturno", "Caminos rurales", "Aparición espectral"],
      origen: "Tradición oral salvadoreña relacionada con la conocida Carreta Chillona, una aparición nocturna que forma parte del imaginario popular del país.",
      img: "../assets/media/leyenda/carreta-bruja.png",
      relato: `La Carreta Bruja, también relacionada en la tradición popular con la Carreta Chillona, es una de las apariciones nocturnas más conocidas de El Salvador. Su historia se desarrolla principalmente en caminos rurales, calles solitarias y lugares donde durante la noche cualquier sonido puede parecer provenir de una presencia sobrenatural.

      La aparición se describe como una carreta que avanza por sí sola, sin que nadie parezca conducirla o tirar de ella. Lo más característico no siempre es su aspecto, sino el sonido que anuncia su llegada: el chirrido de las ruedas, el crujido de la madera y, en algunas versiones, el ruido de cadenas que se arrastran por el suelo.

      Los relatos cambian según la región. Algunas versiones hablan de huesos, calaveras o restos humanos dentro de la carreta, mientras que otras se concentran únicamente en la carreta vacía que atraviesa los caminos durante la noche.

      También existen historias en las que la aparición está relacionada con castigos y advertencias contra las malas acciones. Sin embargo, no todas las versiones coinciden en que la carreta recoja almas ni en que tenga un origen directamente relacionado con el diablo.

      La tradición funciona principalmente como una historia de advertencia para quienes salen de noche o recorren caminos solitarios. Escuchar el ruido de una carreta cuando no debería haber ninguna cerca se convierte, dentro del relato, en una señal de que algo sobrenatural está pasando.

      Por su presencia constante en el imaginario popular salvadoreño, la Carreta Chillona o Carreta Bruja continúa siendo una de las figuras más reconocibles de las historias de miedo que se cuentan durante la noche.`
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
      sub: "La criatura misteriosa de las aguas y la lluvia",
      tag: "Mito · Izalco",
      chips: ["Ser híbrido", "Izalco", "Ríos y quebradas", "Anuncia la lluvia"],
      origen: "Relato de tradición oral asociado principalmente con Izalco, Sonsonate, y relacionado con la tradición nahua-pipil de la región. Fue recopilado en estudios etnográficos sobre los pipiles de Izalco.",
      img: "../assets/media/leyenda/cuyancua.png",
      relato: `La Cuyancúa, también conocida como Cuyancuat en algunas transcripciones, es un ser de la tradición oral asociado especialmente con Izalco, en el departamento de Sonsonate. Su historia forma parte de los relatos vinculados con las antiguas tradiciones nahuas de la región.

        La criatura suele describirse como un ser híbrido: la parte inferior de su cuerpo tiene forma semejante a la de una serpiente, mientras que la parte superior presenta características relacionadas con un cerdo. Su aspecto extraño es uno de los elementos que han hecho que la historia permanezca en la memoria de los habitantes de la zona.

        Más que por verla, la Cuyancúa es conocida por los sonidos que se le atribuyen. La tradición cuenta que puede escucharse cerca de ríos y quebradas, especialmente durante la noche, produciendo un ruido o chillido que causa temor entre quienes se encuentran cerca.

        El relato también la relaciona con las aguas y con la llegada de la lluvia. En algunas versiones, escuchar a la Cuyancúa puede ser una señal de que se aproxima un temporal.

        Su relación con el agua es importante dentro del relato, pues la criatura no es simplemente un monstruo que aparece al azar. Está vinculada con los ríos, las quebradas y los fenómenos naturales que forman parte de la vida de las comunidades.

        La Cuyancúa representa así una parte particular de la tradición mítica de Izalco: una criatura sobrenatural relacionada con el agua, los sonidos de la noche y la llegada de las lluvias, cuya historia ha sobrevivido gracias a la transmisión oral.`
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
        sub: "El misterioso guardián del Lago de Coatepeque",
        tag: "Leyenda · Lago de Coatepeque",
        chips: ["Lago de Coatepeque", "Hombre transformado", "Itzqueyé", "Espíritu del lago"],
        origen: "Leyenda popular asociada con el Lago de Coatepeque, en Santa Ana. La tradición relaciona al personaje con Itzqueyé, figura asociada al agua dulce.",
        img: "../../assets/media/leyenda/tabudo.jpg",
        relato: `En el Lago de Coatepeque existe una de las leyendas más conocidas de El Salvador: la historia de El Tabudo. A diferencia de la imagen de un monstruo volcánico que algunas versiones modernas han difundido, el relato tradicional está directamente relacionado con el lago y con un hombre que vivía en sus alrededores.

    Según la leyenda, aquel hombre era una persona adinerada que poseía una hermosa propiedad junto al lago. Un día salió a navegar en una canoa y, mientras recorría las aguas, una corriente misteriosa lo arrastró hacia una zona de la que no pudo regresar.

    La tradición cuenta que aquella corriente lo llevó hasta los dominios de Itzqueyé, asociada en el relato con las aguas dulces. Después de aquel encuentro, el hombre desapareció y durante un tiempo nadie supo qué había ocurrido con él.

    Meses después, según la leyenda, volvió a aparecer transformado. Las personas que lo reconocieron observaron que su cuerpo había cambiado y que sus rodillas eran extraordinariamente grandes. Debido a esa característica recibió el sobrenombre de El Tabudo.

    A partir de entonces, la figura quedó vinculada al Lago de Coatepeque. Algunas versiones lo presentan como una criatura misteriosa relacionada con las aguas, mientras que otras lo consideran un espíritu protector que continúa vigilando el lugar.

    La leyenda de El Tabudo está estrechamente ligada a la identidad cultural del Lago de Coatepeque. Su historia combina el misterio de las aguas profundas con la antigua creencia en seres sobrenaturales relacionados con la naturaleza.`
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
        sub: "La figura gigante que se convirtió en símbolo de Jocoro",
        tag: "Tradición · Morazán",
        chips: ["Figura gigante", "Jocoro", "Fiestas patronales", "Tradición local"],
        origen: "Tradición festiva de Jocoro, Morazán. Su historia popular se relaciona con un supuesto hallazgo de restos humanos de gran tamaño ocurrido en 1908 y con la posterior creación de la figura festiva.",
        img: "../assets/media/leyenda/gigante-jocoro.png",
        relato: `En Jocoro, departamento de Morazán, existe una tradición que se diferencia de muchas de las historias de miedo del folclore salvadoreño. Se trata de la Giganta de Jocoro, una enorme figura que participa en las celebraciones y que con el paso del tiempo se convirtió en uno de los símbolos culturales más reconocibles del municipio.

    La historia popular de la Giganta está relacionada con un supuesto hallazgo ocurrido en 1908, cuando se habrían encontrado en las minas de Jocoro restos que algunas personas interpretaron como pertenecientes a un ser humano de gran tamaño. Aunque aquel hallazgo no constituye una prueba de que hayan existido gigantes, sí alimentó la imaginación y las historias de la comunidad.

    La tradición también se ha relacionado con relatos indígenas sobre gigantes y con las antiguas historias de la región oriental. Estas asociaciones forman parte del imaginario local, pero no deben presentarse como una demostración histórica de que los gigantes existieron realmente.

    Décadas después, la figura que actualmente conocemos como la Gigantona fue incorporada a las celebraciones de Jocoro. Su presencia se convirtió en parte de las fiestas patronales, acompañada por música, baile y personajes tradicionales.

    Con el paso del tiempo, la Giganta dejó de ser solamente un personaje de una historia y pasó a convertirse en una expresión viva de la identidad cultural de Jocoro.

    Actualmente representa una tradición festiva que reúne a la comunidad y mantiene vivo un relato local que combina memoria, imaginación, celebración y orgullo por las raíces de Morazán.`
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
        sub: "El ser salvaje de las montañas",
        tag: "Mito · Tradición centroamericana",
        chips: ["Ser salvaje", "Montañas", "Cubierto de pelo", "Huella misteriosa"],
        origen: "Personaje de relatos míticos y populares presentes en diferentes regiones de Centroamérica, incluida la tradición salvadoreña. Sus características varían según la región.",
        img: "../assets/media/leyenda/sisimite.png",
        relato: `El Sisimite es una figura presente en diferentes tradiciones de Centroamérica. En los relatos que circulan en El Salvador aparece como un ser salvaje relacionado con las montañas, los bosques y los lugares alejados de las comunidades.

    Suele describirse como una criatura de apariencia humana, pero de gran tamaño y cubierta de abundante pelo. Algunas versiones también le atribuyen los pies orientados hacia atrás, una característica que comparte con otros personajes de las tradiciones mesoamericanas y centroamericanas.

    Los relatos cuentan que habita en lugares montañosos y difíciles de alcanzar, lejos de los caminos más transitados. Su presencia suele asociarse con sonidos extraños, huellas misteriosas y encuentros inesperados en zonas boscosas.

    En algunas versiones se le presenta como una criatura peligrosa que puede perseguir o llevarse a personas que se internan demasiado en la montaña. Otras narraciones lo describen simplemente como un ser salvaje que evita el contacto con los humanos.

    Es importante señalar que el Sisimite no es una figura exclusivamente salvadoreña. Su presencia en distintos países de Centroamérica demuestra que forma parte de un conjunto de relatos regionales que comparten características y que han adoptado variantes locales.

    Dentro de la tradición oral, la historia también funciona como advertencia para no internarse sin precaución en montañas y lugares desconocidos. Así, el Sisimite representa el misterio de aquellos espacios naturales que, para las comunidades tradicionales, podían esconder seres desconocidos.`
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
        sub: "La misteriosa figura que aparece en los caminos",
        tag: "Leyenda · Tradición religiosa",
        chips: ["Aparición nocturna", "Caballo oscuro", "Caminos solitarios", "Oración"],
        origen: "Figura de la tradición oral salvadoreña relacionada con la devoción popular al Justo Juez y con relatos de apariciones nocturnas.",
        img: "../assets/media/leyenda/juez-noche.png",
        relato: `El Justo Juez de la Noche es una figura de la tradición oral salvadoreña relacionada con la religiosidad popular. Su nombre está vinculado con la imagen del Justo Juez presente en las oraciones y creencias católicas, pero el relato popular lo transforma en una misteriosa aparición nocturna.

    Según las historias transmitidas en diferentes comunidades, puede aparecer en caminos solitarios durante la noche, especialmente cuando una persona viaja sola. Algunas versiones lo describen como un jinete vestido de oscuro que avanza silenciosamente sobre un caballo.

    Su apariencia no es completamente igual en todos los relatos. Algunas personas lo describen con un rostro poco visible, mientras que otras resaltan principalmente su vestimenta oscura y la presencia del caballo.

    La aparición suele provocar miedo y una sensación de amenaza. Dentro de la tradición popular, la oración ocupa un lugar importante, pues se considera una forma de protección frente a las apariciones y otros peligros sobrenaturales.

    El relato también posee una dimensión moral. Como ocurre con muchas historias tradicionales, la aparición puede funcionar como una advertencia para quienes llevan una conducta considerada incorrecta o para quienes se aventuran por caminos solitarios durante la noche.

    El Justo Juez de la Noche forma así parte de ese conjunto de relatos salvadoreños en los que la fe religiosa, el miedo nocturno y las creencias populares se mezclan para crear una figura misteriosa que continúa formando parte del imaginario cultural.`
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
        sub: "El sacerdote que vaga como alma en pena",
        tag: "Leyenda · Tradición religiosa",
        chips: ["Sacerdote sin cabeza", "Sotana oscura", "Iglesias", "Aparición nocturna"],
        origen: "Leyenda popular salvadoreña y centroamericana. En El Salvador existen distintas versiones transmitidas oralmente, generalmente relacionadas con iglesias y caminos durante la noche.",
        img: "../assets/media/leyenda/padre-cabeza.png",
        relato: `El Padre sin Cabeza es una de las leyendas de aparecidos más conocidas de El Salvador. La historia presenta a un sacerdote que, después de morir en circunstancias relacionadas con una falta grave o un pecado, queda condenado a vagar como alma en pena.

    Existen diferentes versiones sobre la razón de su castigo. Algunas cuentan que fue un sacerdote que murió sin poder confesar un pecado relacionado con una relación amorosa. Otras versiones hablan de un sacerdote que murió violentamente durante tiempos de conflicto. Por ello, no existe un único origen histórico comprobado para el personaje.

    La aparición suele describirse como un hombre alto vestido con una sotana oscura, pero sin cabeza. En algunas versiones lleva un rosario en la mano y camina en silencio por las calles durante la noche.

    Una característica muy conocida del relato es su relación con las iglesias. Se cuenta que puede salir de ellas durante las noches, incluso atravesando puertas cerradas, y que algunas veces desaparece cerca de los campanarios.

    Las personas que aseguran haberlo encontrado describen una sensación de frío intenso y miedo paralizante. La figura no necesariamente persigue a quienes la encuentran; muchas versiones simplemente cuentan que pasa en silencio y continúa su camino.

    La leyenda refleja la influencia de la religión católica en la tradición popular salvadoreña y utiliza la figura de un sacerdote condenado a vagar para transmitir una advertencia moral sobre el pecado, la culpa y las consecuencias de las malas acciones.`
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
        sub: "El pequeño personaje del sombrero enorme",
        tag: "Leyenda · Tradición centroamericana",
        chips: ["Sombrero grande", "Caballos", "Crines trenzadas", "Aparición nocturna"],
        origen: "Personaje de tradición popular compartido por diferentes países de Centroamérica. En El Salvador existen versiones relacionadas principalmente con los caminos, los caballos y las zonas rurales.",
        img: "../assets/media/leyenda/sombreron.png",
        relato: `El Sombrerón es un personaje presente en distintas tradiciones de Centroamérica, por lo que no puede considerarse una figura exclusivamente salvadoreña. Su historia ha adquirido diferentes características según la región donde se cuenta.

    En las versiones populares suele aparecer como un hombre pequeño o una figura misteriosa que lleva un sombrero muy grande. Su presencia se relaciona principalmente con la noche y con lugares donde existen caballos y otros animales.

    Una de las características más conocidas del personaje es su relación con las crines de los caballos. Se cuenta que algunos animales amanecen con el pelo trenzado o lleno de nudos difíciles de explicar, y que estas marcas son atribuidas al Sombrerón.

    En algunas variantes también se dice que el personaje puede seguir a las personas o aparecerse en los caminos durante la noche. Sin embargo, no todas las versiones coinciden en su comportamiento ni en su apariencia.

    La historia se ha transmitido principalmente como relato de misterio y como explicación sobrenatural de sucesos extraños relacionados con los animales.

    En El Salvador, su presencia forma parte de un conjunto más amplio de personajes populares que han llegado desde tradiciones compartidas de la región y que, con el tiempo, han adquirido características propias dentro de las comunidades que los cuentan.`
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
          sub: "El personaje que asusta a los niños desobedientes",
          tag: "Tradición oral · Hogar",
          chips: ["Advertencia infantil", "Aparece de noche", "Tradición familiar", "Sin forma definida"],
          origen: "Personaje de tradición oral utilizado por familias de El Salvador y de otros países hispanos para advertir a los niños y fomentar el buen comportamiento.",
          img: "../assets/media/leyenda/el-cuco.png",
          relato: `El Cuco es diferente de personajes como la Siguanaba, el Cipitío o el Cadejo. No posee una única historia de origen ni una apariencia establecida. Es principalmente un personaje de tradición oral utilizado por madres, padres, abuelos y otros familiares para advertir a los niños.

      La frase "te va a llevar el Cuco" ha formado parte de muchas conversaciones familiares y sirve para representar una amenaza misteriosa que puede aparecer cuando un niño no obedece, no quiere dormir o se comporta mal.

      Su apariencia cambia según quien cuenta la historia. Para algunas personas es una criatura pequeña; para otras puede ser una sombra, un hombre misterioso o simplemente una presencia que se encuentra escondida en algún lugar de la casa.

      La falta de una forma fija es precisamente una de sus características más importantes. El Cuco puede convertirse en aquello que la imaginación del niño considera más aterrador.

      Su función no consiste necesariamente en aparecer físicamente, sino en provocar la imaginación y el temor suficiente para que el niño obedezca. Por eso forma parte de las llamadas historias de advertencia o personajes de tradición oral.

      En El Salvador, como en otros lugares de Latinoamérica, esta figura ha sobrevivido principalmente dentro de las familias. Aunque no tenga una historia única ni un origen geográfico determinado, el Cuco representa una parte importante de la manera en que generaciones de salvadoreños transmitieron consejos y reglas a través de relatos de miedo.`
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
   SISTEMA DE NARRACIÓN Y VOZ
   Reproduce archivos .mp3 pre-grabados por leyenda, ubicados en
   assets/audio/leyendas/{id}-{lang}.mp3 (ej: siguanaba-es.mp3).
   Esto funciona EXACTAMENTE igual en Windows, macOS y Linux, porque
   un archivo de audio no depende de nada instalado en el sistema
   del usuario (a diferencia de la Web Speech API).

   Si el mp3 de una leyenda todavía no existe (mientras los vas
   generando y subiendo poco a poco), cae automáticamente de vuelta
   a la voz del navegador (speechSynthesis) como respaldo, para que
   nada se rompa mientras completas el catálogo de audios.
   ============================================================ */

const AUDIO_BASE_PATH = "../assets/audio/leyendas";

let narrationAudioEl = null;
let narrationQueue = [];
let narrationQueueIndex = 0;
let narrationKeepAliveTimer = null;
let voicesReadyPromise = null;

function getAudioSrc(leyendaId, isEn) {
  const lang = isEn ? "en" : "es";
  return `${AUDIO_BASE_PATH}/${leyendaId}-${lang}.mp3`;
}

// Comprueba si el mp3 existe en el servidor antes de intentar
// reproducirlo (evita un <audio> roto si aún no lo has subido).
function audioFileExists(src) {
  return fetch(src, { method: "HEAD" })
    .then(res => res.ok)
    .catch(() => false);
}

function setNarrateBtnState(state) {
  const btn = document.getElementById("leyendaNarrateBtn");
  if (!btn) return;
  btn.classList.remove("speaking", "loading");
  if (state === "speaking") btn.classList.add("speaking");
  if (state === "loading") btn.classList.add("loading");
}

function stopNarration() {
  if (narrationAudioEl) {
    narrationAudioEl.pause();
    narrationAudioEl.currentTime = 0;
    narrationAudioEl = null;
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (narrationKeepAliveTimer) {
    clearInterval(narrationKeepAliveTimer);
    narrationKeepAliveTimer = null;
  }
  narrationQueue = [];
  narrationQueueIndex = 0;
  setNarrateBtnState("idle");
  ttsUtterance = null;
  // La narración (mp3 pre-grabado o voz del navegador) no es un <audio>
  // del DOM ni dispara los eventos que escucha script.js, así que
  // retomamos la música de fondo explícitamente acá.
  window.SRDuckBgMusic?.resume();
}

function isNarrating() {
  return !!narrationAudioEl || (("speechSynthesis" in window) && window.speechSynthesis.speaking) || narrationQueue.length > 0;
}

/* ---------- Reproducción de mp3 pre-grabado (modo principal) ---------- */

function playPreRecordedAudio(src) {
  return new Promise((resolve, reject) => {
    narrationAudioEl = new Audio(src);
    narrationAudioEl.addEventListener("ended", () => {
      narrationAudioEl = null;
      window.SRDuckBgMusic?.resume();
      resolve();
    });
    narrationAudioEl.addEventListener("error", () => {
      narrationAudioEl = null;
      window.SRDuckBgMusic?.resume();
      reject(new Error("No se pudo reproducir el audio."));
    });
    window.SRDuckBgMusic?.pause();
    narrationAudioEl.play().catch(reject);
  });
}

/* ---------- Respaldo con voz del navegador (solo si falta el mp3) ---------- */

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

function waitForVoices(timeoutMs = 3000) {
  if (voicesReadyPromise) return voicesReadyPromise;

  voicesReadyPromise = new Promise((resolve) => {
    const existing = window.speechSynthesis.getVoices();
    if (existing.length > 0) {
      resolve(existing);
      return;
    }
    let resolved = false;
    const finish = (voices) => {
      if (resolved) return;
      resolved = true;
      resolve(voices);
    };
    window.speechSynthesis.onvoiceschanged = () => finish(window.speechSynthesis.getVoices());
    setTimeout(() => finish(window.speechSynthesis.getVoices()), timeoutMs);
  });

  return voicesReadyPromise;
}

function pickBestVoice(voices, isEn) {
  const wantedPrefixes = isEn ? ["en-gb", "en-us", "en"] : ["es-es", "es-419", "es-us", "es"];
  for (const prefix of wantedPrefixes) {
    const exact = voices.find(v => v.lang && v.lang.toLowerCase() === prefix);
    if (exact) return exact;
  }
  return voices.find(v => v.lang && v.lang.toLowerCase().startsWith(isEn ? "en" : "es")) || null;
}

function speakNextChunk(voice, langTag) {
  if (narrationQueueIndex >= narrationQueue.length) {
    stopNarration();
    return;
  }
  const chunkText = narrationQueue[narrationQueueIndex];
  narrationQueueIndex++;

  ttsUtterance = new SpeechSynthesisUtterance(chunkText);
  ttsUtterance.lang = voice ? voice.lang : langTag;
  ttsUtterance.rate = 0.95;
  ttsUtterance.pitch = 1;
  if (voice) ttsUtterance.voice = voice;

  ttsUtterance.onend = () => speakNextChunk(voice, langTag);
  ttsUtterance.onerror = () => speakNextChunk(voice, langTag);

  window.speechSynthesis.speak(ttsUtterance);
  setNarrateBtnState("speaking");
}

async function playBrowserVoiceFallback(l, isEn) {
  if (!("speechSynthesis" in window)) {
    alert(
      isEn
        ? "This legend's audio isn't uploaded yet, and your browser doesn't support voice narration either."
        : "El audio de esta leyenda todavía no está disponible, y tu navegador tampoco soporta narración por voz."
    );
    setNarrateBtnState("idle");
    return;
  }

  const voices = await waitForVoices();
  const voice = pickBestVoice(voices, isEn);

  if (!voice) {
    setNarrateBtnState("idle");
    alert(
      isEn
        ? "This legend's audio isn't uploaded yet, and no English voice was found on your system either."
        : "El audio de esta leyenda todavía no está disponible, y tampoco se encontró una voz en español en tu sistema."
    );
    return;
  }

  narrationQueue = getNarrationChunks(l);
  narrationQueueIndex = 0;

  window.SRDuckBgMusic?.pause();

  if (narrationKeepAliveTimer) clearInterval(narrationKeepAliveTimer);
  narrationKeepAliveTimer = setInterval(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 12000);

  speakNextChunk(voice, isEn ? "en-GB" : "es-ES");
}

/* ---------- Punto de entrada ---------- */

async function toggleNarration() {
  if (currentLeyendaIndex < 0) return;

  if (isNarrating()) {
    stopNarration();
    return;
  }

  const l = LEYENDAS_DATA[currentLeyendaIndex];
  const langKey = getCurrentLang();
  const isEn = (langKey === 'en');

  setNarrateBtnState("loading");

  const src = getAudioSrc(l.id, isEn);
  const exists = await audioFileExists(src);

  // El usuario pudo cerrar el modal mientras comprobábamos el archivo
  if (currentLeyendaIndex < 0) {
    setNarrateBtnState("idle");
    return;
  }

  if (exists) {
    try {
      setNarrateBtnState("speaking");
      await playPreRecordedAudio(src);
      setNarrateBtnState("idle");
    } catch (err) {
      console.error("Error reproduciendo audio pre-grabado:", err);
      // Si falla la reproducción por algún motivo, intentamos con la voz del navegador
      await playBrowserVoiceFallback(l, isEn);
    }
  } else {
    await playBrowserVoiceFallback(l, isEn);
  }
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