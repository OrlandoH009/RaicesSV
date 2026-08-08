/* ============================================================
  Salvadorean Roots — historia-data.js
   Datos de la línea de tiempo histórica de El Salvador (ES / EN)
   ============================================================ */

const HISTORIA_EVENTOS_ES = [

  {
    id: "pipiles",
    era: "prehispanica",
    eraLabel: "Época Prehispánica",
    title: "Cuscatlán y los pueblos originarios",
    date: "Antes de 1524",
    img: "../assets/media/historia/tazumal2.jpg",
    text: [
      "Mucho antes de la llegada de los españoles, el territorio que hoy conocemos como El Salvador estaba habitado por diversos pueblos originarios y contaba con sociedades agrícolas organizadas. En la zona central y occidental tuvo una presencia importante la población de habla náhuat conocida como pipil, mientras que en otras regiones habitaban pueblos como los lencas y los chortís.",
      "Los pipiles desarrollaron comunidades agrícolas y redes de intercambio. Cultivaban principalmente maíz, frijol, cacao y algodón, y mantenían relaciones comerciales con otros pueblos de Mesoamérica. El territorio de Cuscatlán comprendía varias comunidades y centros de población, por lo que no debe entenderse únicamente como una ciudad ubicada exactamente en el lugar de la actual Antiguo Cuscatlán.",
      "La región también conserva importantes vestigios arqueológicos de distintas épocas y culturas. Sitios como Tazumal, San Andrés y Casa Blanca muestran la continuidad y diversidad de las sociedades que habitaron el territorio salvadoreño antes de la conquista española."
    ],
    location: {
      lat: 13.6736,
      lng: -89.2472,
      zoom: 10,
      caption: "Zona aproximada del antiguo territorio de Cuscatlán, en el centro y occidente de El Salvador."
    }
  },

  {
    id: "conquista",
    era: "colonia",
    eraLabel: "Conquista y Colonia",
    title: "La conquista de Cuscatlán",
    date: "1524 – 1528",
    img: "../assets/media/historia/conquista.png",
    text: [
      "En 1524, Pedro de Alvarado dirigió una expedición española desde Guatemala hacia el territorio de Cuscatlán. Los españoles encontraron resistencia por parte de las poblaciones indígenas, especialmente en la región occidental, y el avance no significó una conquista inmediata.",
      "Después de las primeras incursiones, los españoles realizaron nuevas campañas para consolidar su dominio. En 1528, Diego de Alvarado estableció una nueva población de San Salvador, consolidando la presencia colonial española en el territorio.",
      "La conquista produjo profundas transformaciones políticas, económicas y sociales. Los pueblos originarios perdieron autonomía y fueron incorporados progresivamente al sistema colonial. Además, las enfermedades introducidas por los europeos provocaron graves epidemias y una fuerte disminución de la población indígena."
    ],
    location: {
      lat: 13.4948,
      lng: -89.5378,
      zoom: 11,
      caption: "Zona occidental de El Salvador, donde tuvieron lugar enfrentamientos durante las primeras campañas de conquista."
    }
  },

  {
    id: "anil",
    era: "colonia",
    eraLabel: "Época Colonial",
    title: "La economía del añil",
    date: "Siglos XVI – XIX",
    img: "../assets/media/historia/eco-anil.png",
    text: [
      "Durante la época colonial, el añil se convirtió en uno de los principales productos de exportación del territorio salvadoreño. De esta planta se obtenía un tinte azul muy apreciado por la industria textil europea, lo que convirtió a la provincia de San Salvador en una importante productora dentro de la región centroamericana.",
      "La producción se desarrolló principalmente mediante haciendas y obrajes de añil y dependió en gran medida del trabajo de las poblaciones indígenas y de otros grupos sometidos a las estructuras económicas coloniales. El comercio del añil permitió la acumulación de riqueza entre determinados sectores de propietarios y comerciantes.",
      "La economía colonial también produjo profundas transformaciones sociales y culturales. La población indígena, española, africana y mestiza participó de distintas maneras en la formación de la sociedad salvadoreña, mientras el idioma castellano y el catolicismo adquirieron una posición dominante dentro del sistema colonial."
    ],
    location: {
      lat: 13.7942,
      lng: -88.8965,
      zoom: 10,
      caption: "Regiones del territorio salvadoreño vinculadas históricamente con la producción de añil."
    }
  },

  {
    id: "independencia",
    era: "independencia",
    eraLabel: "Independencia",
    title: "La independencia de Centroamérica",
    date: "1821 – 1841",
    img: "../assets/media/historia/acta-independe.jpg",
    text: [
      "El 15 de septiembre de 1821 se proclamó en Guatemala la independencia de las provincias de Centroamérica respecto de España. La noticia llegó posteriormente a San Salvador y a las demás provincias, iniciándose un período de importantes cambios políticos.",
      "Después de la independencia, las provincias centroamericanas fueron incorporadas temporalmente al Imperio Mexicano de Agustín de Iturbide. Tras su caída, en 1823 se formaron las Provincias Unidas del Centro de América, posteriormente conocidas como República Federal de Centroamérica.",
      "Las tensiones políticas entre los distintos estados y entre liberales y conservadores provocaron la disolución de la Federación. El Salvador se declaró soberano e independiente en 1841, consolidando su separación política de la antigua federación centroamericana."
    ],
    location: {
      lat: 13.6989,
      lng: -89.1914,
      zoom: 12,
      caption: "San Salvador, uno de los principales centros políticos del proceso de independencia."
    }
  },

  {
    id: "republica-cafe",
    era: "cafetalera",
    eraLabel: "República Cafetalera",
    title: "El auge del café",
    date: "Siglo XIX",
    img: "../assets/media/historia/auge-cafe.png",
    text: [
      "Durante el siglo XIX, el cultivo del café comenzó a expandirse en El Salvador mientras la producción de añil perdía importancia. El cultivo fue fomentado durante la administración de Eugenio Aguilar y posteriormente recibió un fuerte impulso durante el gobierno de Gerardo Barrios.",
      "El crecimiento de la producción cafetalera estuvo acompañado por importantes cambios en la propiedad de la tierra. En 1881 y 1882 se aprobaron disposiciones que afectaron las tierras comunales y ejidales; en 1882 se decretó su abolición, facilitando su venta a particulares y provocando una transformación profunda en la tenencia de la tierra.",
      "La expansión del café convirtió al cultivo en uno de los principales pilares de la economía salvadoreña y contribuyó a la formación de una élite económica vinculada a la producción y exportación del grano. La concentración de la tierra también profundizó las desigualdades sociales del país."
    ],
    location: {
      lat: 13.9833,
      lng: -89.5597,
      zoom: 10,
      caption: "Regiones de las tierras altas salvadoreñas donde se desarrolló ampliamente la producción cafetalera."
    }
  },

  {
    id: "14-familias",
    era: "cafetalera",
    eraLabel: "República Cafetalera",
    title: "Las élites cafetaleras",
    date: "Finales del siglo XIX – primeras décadas del XX",
    img: "../assets/media/historia/oligarquia.png",
    text: [
      "Durante el auge de la economía cafetalera se consolidó una poderosa élite económica vinculada a la propiedad de tierras, la producción y exportación del café y otras actividades comerciales y financieras. Con el tiempo, estas familias adquirieron una influencia considerable en la vida económica y política del país.",
      "La expresión popular 'las 14 familias' se utilizó posteriormente para representar a un pequeño grupo de familias consideradas parte de la élite económica salvadoreña. Sin embargo, no debe interpretarse como una lista oficial ni como una cifra histórica exacta de las familias que concentraban toda la riqueza del país.",
      "La expansión de las grandes propiedades cafetaleras coexistió con una población campesina que dependía en gran medida del trabajo agrícola. Esta desigual distribución de la tierra y de la riqueza contribuyó a las tensiones sociales que marcaron las primeras décadas del siglo XX."
    ],
    location: {
      lat: 13.6769,
      lng: -89.2896,
      zoom: 12,
      caption: "Zona de antiguas propiedades cafetaleras de Santa Tecla y Antiguo Cuscatlán."
    }
  },

  {
    id: "matanza-1932",
    era: "dictaduras",
    eraLabel: "Dictaduras Militares",
    title: "El levantamiento y La Matanza de 1932",
    date: "Enero de 1932",
    img: "../assets/media/Tazumal.webp",
    text: [
      "La crisis económica provocada por la Gran Depresión afectó gravemente a los trabajadores agrícolas y a las comunidades indígenas. El 22 de enero de 1932 comenzó un levantamiento campesino e indígena en varios municipios del occidente del país, en un contexto de fuerte conflictividad social y política.",
      "El gobierno del general Maximiliano Hernández Martínez respondió con una represión militar de gran magnitud. Miles de personas fueron asesinadas en los días y semanas posteriores. Las estimaciones sobre el número de víctimas varían considerablemente, por lo que no existe una cifra única aceptada por todos los historiadores.",
      "La represión tuvo consecuencias profundas para las comunidades indígenas del occidente. El miedo a nuevas persecuciones contribuyó a que muchas personas ocultaran aspectos de su identidad cultural, incluyendo el uso público de la lengua náhuat y determinadas formas de vestimenta tradicional."
    ],
    location: {
      lat: 13.7167,
      lng: -89.6833,
      zoom: 10,
      caption: "Zona occidental de El Salvador, especialmente Izalco, Nahuizalco y municipios cercanos, escenario principal de los acontecimientos de 1932."
    }
  },

  {
    id: "dictadura-martinez",
    era: "dictaduras",
    eraLabel: "Dictaduras Militares",
    title: "El régimen de Hernández Martínez",
    date: "1931 – 1944",
    img: "../assets/media/historia/palacio-nacional.jpg",
    text: [
      "Maximiliano Hernández Martínez llegó al poder tras el golpe de Estado de 1931 que derrocó al presidente Arturo Araujo. Durante su prolongado gobierno estableció un régimen autoritario caracterizado por la concentración del poder, la censura y la represión de la oposición.",
      "Su gobierno mantuvo una estrecha relación con los sectores económicos dominantes y desarrolló políticas destinadas a estabilizar la economía después de la crisis mundial. Al mismo tiempo, la represión política se convirtió en una característica central del régimen, especialmente después de los acontecimientos de 1932.",
      "En 1944, una amplia movilización social conocida como la 'Huelga de Brazos Caídos' presionó al gobierno y contribuyó a la renuncia de Hernández Martínez. Su salida no significó el fin inmediato de la influencia militar en la política salvadoreña."
    ],
    location: {
      lat: 13.6989,
      lng: -89.1914,
      zoom: 12,
      caption: "San Salvador, centro político del régimen de Hernández Martínez."
    }
  },

  {
    id: "gobiernos-militares",
    era: "dictaduras",
    eraLabel: "Dictaduras Militares",
    title: "El predominio militar",
    date: "1944 – 1979",
    img: "../assets/media/MUNA.webp",
    text: [
      "Después de la caída de Hernández Martínez, los militares continuaron teniendo una influencia decisiva sobre la política salvadoreña. Durante las décadas siguientes, distintos gobiernos estuvieron dirigidos por oficiales de las Fuerzas Armadas o fuertemente condicionados por el poder militar.",
      "Durante las décadas de 1950 y 1960 se produjeron procesos de modernización económica e industrialización, pero persistieron importantes desigualdades en la distribución de la tierra y en el acceso a oportunidades económicas y políticas.",
      "Durante la década de 1970 aumentaron la conflictividad social, la represión política y las denuncias de fraude electoral. La crisis política y social favoreció el crecimiento de organizaciones populares y de grupos armados que posteriormente formarían parte del conflicto civil."
    ],
    location: {
      lat: 13.6989,
      lng: -89.1914,
      zoom: 11,
      caption: "San Salvador, principal centro político durante el período de predominio militar."
    }
  },

  {
    id: "golpe-1979",
    era: "guerra",
    eraLabel: "Guerra Civil",
    title: "El golpe de Estado de 1979",
    date: "15 de octubre de 1979",
    img: "../assets/media/Centro Historico.jpg",
    text: [
      "El 15 de octubre de 1979, un grupo de oficiales de las Fuerzas Armadas derrocó al presidente Carlos Humberto Romero. El golpe dio paso a una Junta Revolucionaria de Gobierno que prometió reformas políticas y sociales.",
      "La violencia política, sin embargo, continuó. Grupos paramilitares y fuerzas de seguridad fueron señalados por graves violaciones de derechos humanos, mientras diferentes organizaciones de izquierda fortalecían su estructura armada y política.",
      "El golpe no logró resolver la crisis nacional. Por el contrario, la polarización política y la violencia aumentaron y el país avanzó hacia un conflicto armado abierto."
    ],
    location: {
      lat: 13.6989,
      lng: -89.1914,
      zoom: 12,
      caption: "San Salvador, centro político donde se desarrollaron los acontecimientos relacionados con el golpe de Estado de 1979."
    }
  },

  {
    id: "inicio-guerra",
    era: "guerra",
    eraLabel: "Guerra Civil",
    title: "La guerra civil",
    date: "1980 – 1992",
    img: "../assets/media/Suchitoto.webp",
    text: [
      "En octubre de 1980 se formó el Frente Farabundo Martí para la Liberación Nacional (FMLN), una coalición de cinco organizaciones guerrilleras de izquierda. Durante los años siguientes, el conflicto enfrentó al gobierno salvadoreño y sus fuerzas armadas contra el FMLN.",
      "El conflicto estuvo relacionado con décadas de desigualdad social, concentración de la tierra, exclusión política y represión. Además, adquirió una dimensión internacional en el contexto de la Guerra Fría: Estados Unidos brindó un amplio respaldo al gobierno salvadoreño, mientras la insurgencia recibió apoyo externo de distintos actores.",
      "La guerra provocó graves violaciones de derechos humanos, masacres, desapariciones y desplazamientos masivos de población. Departamentos como Chalatenango y Morazán se convirtieron en importantes escenarios del conflicto."
    ],
    location: {
      lat: 14.0333,
      lng: -88.9333,
      zoom: 9,
      caption: "Chalatenango y Morazán, dos de las regiones más afectadas por el conflicto armado."
    }
  },

  {
    id: "romero",
    era: "guerra",
    eraLabel: "Guerra Civil",
    title: "El asesinato de Óscar Romero",
    date: "24 de marzo de 1980",
    img: "../assets/media/iglesia-rosario.jpg",
    text: [
      "El arzobispo de San Salvador, Óscar Arnulfo Romero, se convirtió en una de las principales voces públicas contra la violencia y la represión. Desde sus homilías denunció asesinatos, desapariciones y abusos cometidos contra la población salvadoreña.",
      "El 24 de marzo de 1980 fue asesinado mientras celebraba misa en la capilla del Hospital de la Divina Providencia, en San Salvador. El lugar se convirtió posteriormente en uno de los principales sitios de memoria relacionados con su vida y martirio.",
      "Su asesinato tuvo una enorme repercusión nacional e internacional y convirtió a Romero en un símbolo de la defensa de los derechos humanos y de las víctimas del conflicto. En 2018 fue canonizado por la Iglesia católica como san Óscar Romero."
    ],
    location: {
      lat: 13.6989,
      lng: -89.2242,
      zoom: 13,
      caption: "Capilla del Hospital de la Divina Providencia, en San Salvador, lugar donde fue asesinado Óscar Romero."
    }
  },

  {
    id: "jesuitas-uca",
    era: "guerra",
    eraLabel: "Guerra Civil",
    title: "La masacre de la UCA",
    date: "16 de noviembre de 1989",
    img: "../assets/media/MUNA.webp",
    text: [
      "En noviembre de 1989, el FMLN lanzó una gran ofensiva militar en distintas zonas del país. En la madrugada del 16 de noviembre, miembros de las Fuerzas Armadas ingresaron al campus de la Universidad Centroamericana José Simeón Cañas (UCA) y asesinaron a seis sacerdotes jesuitas y a dos mujeres.",
      "Entre las víctimas se encontraba Ignacio Ellacuría, rector de la UCA, junto con Ignacio Martín-Baró, Segundo Montes, Amando López, Joaquín López y López y Juan Ramón Moreno. También fueron asesinadas Julia Elba Ramos y su hija Celina Marisela Ramos.",
      "La masacre provocó una fuerte condena nacional e internacional y se convirtió en uno de los hechos más emblemáticos de las violaciones de derechos humanos cometidas durante la guerra civil."
    ],
    location: {
      lat: 13.6800,
      lng: -89.2350,
      zoom: 13,
      caption: "Campus de la Universidad Centroamericana José Simeón Cañas (UCA), en San Salvador."
    }
  },

  {
    id: "acuerdos-paz",
    era: "guerra",
    eraLabel: "Guerra Civil",
    title: "Los Acuerdos de Paz de Chapultepec",
    date: "16 de enero de 1992",
    img: "../assets/media/casablanca.jpg",
    text: [
      "El 16 de enero de 1992, el Gobierno de El Salvador y el FMLN firmaron en el Castillo de Chapultepec, en Ciudad de México, los acuerdos que pusieron fin al conflicto armado.",
      "La guerra dejó aproximadamente 75,000 personas fallecidas, miles de desaparecidos y alrededor de un millón de personas desplazadas dentro y fuera del país. Sus consecuencias sociales, económicas y familiares marcaron profundamente a varias generaciones de salvadoreños.",
      "Los acuerdos establecieron importantes reformas políticas e institucionales, entre ellas la creación de la Policía Nacional Civil, cambios en la Fuerza Armada, reformas al sistema judicial y electoral y la incorporación del FMLN a la vida política como partido legal."
    ],
    location: {
      lat: 19.4204,
      lng: -99.1822,
      zoom: 14,
      caption: "Castillo de Chapultepec, Ciudad de México, lugar donde se firmaron los Acuerdos de Paz."
    }
  },

  {
    id: "posguerra",
    era: "actual",
    eraLabel: "El Salvador Actual",
    title: "La posguerra y la democracia",
    date: "1992 – 2019",
    img: "../assets/media/MUNA.webp",
    text: [
      "Después de los Acuerdos de Paz, El Salvador inició un proceso de reconstrucción institucional y consolidación democrática. Durante las décadas siguientes se produjo la alternancia en el poder entre ARENA y el FMLN y se realizaron elecciones competitivas.",
      "La etapa de posguerra también estuvo marcada por importantes problemas sociales, entre ellos la migración, la dependencia de las remesas, la desigualdad y el crecimiento de la violencia relacionada con estructuras criminales y pandillas.",
      "A pesar de estos desafíos, durante este período se fortalecieron instituciones creadas o reformadas después de los Acuerdos de Paz y se desarrollaron nuevas expresiones culturales, sociales y políticas dentro de la sociedad salvadoreña."
    ],
    location: {
      lat: 13.6989,
      lng: -89.1914,
      zoom: 11,
      caption: "San Salvador, centro político e institucional de la etapa de posguerra."
    }
  },

  {
    id: "hoy",
    era: "actual",
    eraLabel: "El Salvador Actual",
    title: "Un nuevo capítulo",
    date: "2019 – actualidad",
    img: "../assets/media/Catedral.jpg",
    text: [
      "En 2019, Nayib Bukele asumió la presidencia de El Salvador, iniciando una nueva etapa política en la que Nuevas Ideas pasó a convertirse en la principal fuerza electoral del país. En 2021, El Salvador aprobó la Ley Bitcoin, convirtiéndose en el primer país del mundo en adoptar Bitcoin como moneda de curso legal junto al dólar estadounidense.",
      "La Ley Bitcoin fue reformada en 2025. A partir de esas reformas, la aceptación de Bitcoin por parte del sector privado pasó a ser voluntaria y se redujo la participación obligatoria del Estado en su utilización. Por ello, la situación actual debe diferenciarse de la legislación original de 2021.",
      "Desde marzo de 2022, el país mantiene un régimen de excepción implementado como respuesta a la violencia de las pandillas. La medida ha coincidido con una fuerte reducción de los homicidios, pero organizaciones nacionales e internacionales de derechos humanos han denunciado detenciones arbitrarias, violaciones al debido proceso, malos tratos y otras vulneraciones de derechos. El período actual continúa siendo objeto de debate nacional e internacional."
    ],
    location: {
      lat: 13.6989,
      lng: -89.1914,
      zoom: 12,
      caption: "San Salvador, centro político y administrativo de El Salvador en la actualidad."
    }
  }
];

const HISTORIA_EVENTOS_EN = [

  {
    id: "pipiles",
    era: "prehispanica",
    eraLabel: "Pre-Hispanic Era",
    title: "Cuscatlán and the Native Peoples",
    date: "Before 1524",
    img: "../assets/media/historia/tazumal2.jpg",
    text: [
      "Long before the Spanish arrived, the territory we now know as El Salvador was inhabited by various native peoples with organized agricultural societies. In the central and western region, the Náhuat-speaking population known as the Pipil had a significant presence, while other regions were home to peoples such as the Lenca and the Ch'orti'.",
      "The Pipil developed farming communities and trade networks. They mainly grew corn, beans, cacao, and cotton, and maintained trade relationships with other Mesoamerican peoples. The territory of Cuscatlán encompassed several communities and population centers, so it should not be understood solely as a city located exactly where present-day Antiguo Cuscatlán stands.",
      "The region also preserves important archaeological remains from different eras and cultures. Sites such as Tazumal, San Andrés, and Casa Blanca show the continuity and diversity of the societies that inhabited Salvadoran territory before the Spanish conquest."
    ],
    location: {
      lat: 13.6736,
      lng: -89.2472,
      zoom: 10,
      caption: "Approximate area of the ancient territory of Cuscatlán, in central and western El Salvador."
    }
  },

  {
    id: "conquista",
    era: "colonia",
    eraLabel: "Conquest and Colony",
    title: "The Conquest of Cuscatlán",
    date: "1524 – 1528",
    img: "../assets/media/historia/conquista.png",
    text: [
      "In 1524, Pedro de Alvarado led a Spanish expedition from Guatemala into the territory of Cuscatlán. The Spanish met resistance from indigenous populations, especially in the western region, and the advance did not amount to an immediate conquest.",
      "After the initial incursions, the Spanish carried out new campaigns to consolidate their control. In 1528, Diego de Alvarado established a new settlement of San Salvador, consolidating the Spanish colonial presence in the territory.",
      "The conquest brought about profound political, economic, and social transformations. Native peoples lost their autonomy and were progressively absorbed into the colonial system. In addition, diseases introduced by Europeans caused severe epidemics and a sharp decline in the indigenous population."
    ],
    location: {
      lat: 13.4948,
      lng: -89.5378,
      zoom: 11,
      caption: "Western El Salvador, where clashes took place during the early conquest campaigns."
    }
  },

  {
    id: "anil",
    era: "colonia",
    eraLabel: "Colonial Era",
    title: "The Indigo Economy",
    date: "16th – 19th Centuries",
    img: "../assets/media/historia/eco-anil.png",
    text: [
      "During the colonial era, indigo became one of the main export products of Salvadoran territory. This plant yielded a blue dye highly prized by the European textile industry, which turned the province of San Salvador into a major producer within the Central American region.",
      "Production developed mainly through indigo haciendas and workshops (obrajes) and relied heavily on the labor of indigenous populations and other groups subjected to the colonial economic structures. The indigo trade allowed certain sectors of landowners and merchants to accumulate wealth.",
      "The colonial economy also produced profound social and cultural transformations. Indigenous, Spanish, African, and mestizo populations took part in different ways in shaping Salvadoran society, while the Spanish language and Catholicism became dominant within the colonial system."
    ],
    location: {
      lat: 13.7942,
      lng: -88.8965,
      zoom: 10,
      caption: "Regions of Salvadoran territory historically linked to indigo production."
    }
  },

  {
    id: "independencia",
    era: "independencia",
    eraLabel: "Independence",
    title: "The Independence of Central America",
    date: "1821 – 1841",
    img: "../assets/media/historia/acta-independe.jpg",
    text: [
      "On September 15, 1821, the independence of the Central American provinces from Spain was proclaimed in Guatemala. The news later reached San Salvador and the other provinces, marking the start of a period of major political change.",
      "After independence, the Central American provinces were temporarily annexed to Agustín de Iturbide's Mexican Empire. After its fall, the United Provinces of Central America were formed in 1823, later known as the Federal Republic of Central America.",
      "Political tensions between the different states, and between liberals and conservatives, led to the dissolution of the Federation. El Salvador declared itself sovereign and independent in 1841, consolidating its political separation from the former Central American federation."
    ],
    location: {
      lat: 13.6989,
      lng: -89.1914,
      zoom: 12,
      caption: "San Salvador, one of the main political centers of the independence process."
    }
  },

  {
    id: "republica-cafe",
    era: "cafetalera",
    eraLabel: "Coffee Republic",
    title: "The Coffee Boom",
    date: "19th Century",
    img: "../assets/media/historia/auge-cafe.png",
    text: [
      "During the 19th century, coffee cultivation began to expand in El Salvador as indigo production lost importance. Coffee growing was encouraged during Eugenio Aguilar's administration and later received a strong push under Gerardo Barrios's government.",
      "The growth of coffee production came with major changes in land ownership. Laws passed in 1881 and 1882 affected communal and ejido lands; in 1882 their abolition was decreed, making it easier to sell them to private owners and causing a profound shift in land tenure.",
      "The expansion of coffee turned the crop into one of the main pillars of the Salvadoran economy and contributed to the formation of an economic elite tied to the production and export of the bean. The concentration of land also deepened the country's social inequalities."
    ],
    location: {
      lat: 13.9833,
      lng: -89.5597,
      zoom: 10,
      caption: "Highland regions of El Salvador where coffee production developed extensively."
    }
  },

  {
    id: "14-familias",
    era: "cafetalera",
    eraLabel: "Coffee Republic",
    title: "The Coffee Elites",
    date: "Late 19th – early 20th century",
    img: "../assets/media/historia/oligarquia.png",
    text: [
      "During the coffee economy's boom, a powerful economic elite consolidated around land ownership, coffee production and export, and other commercial and financial activities. Over time, these families gained considerable influence over the country's economic and political life.",
      "The popular expression 'the 14 families' was later used to represent a small group of families seen as part of the Salvadoran economic elite. However, it should not be read as an official list or as an exact historical count of the families that held all of the country's wealth.",
      "The expansion of large coffee estates coexisted with a peasant population that depended heavily on agricultural labor. This unequal distribution of land and wealth contributed to the social tensions that marked the early decades of the 20th century."
    ],
    location: {
      lat: 13.6769,
      lng: -89.2896,
      zoom: 12,
      caption: "Area of former coffee estates in Santa Tecla and Antiguo Cuscatlán."
    }
  },

  {
    id: "matanza-1932",
    era: "dictaduras",
    eraLabel: "Military Dictatorships",
    title: "The 1932 Uprising and Massacre (La Matanza)",
    date: "January 1932",
    img: "../assets/media/Tazumal.webp",
    text: [
      "The economic crisis caused by the Great Depression severely affected agricultural workers and indigenous communities. On January 22, 1932, a peasant and indigenous uprising began in several municipalities in the western part of the country, amid intense social and political conflict.",
      "The government of General Maximiliano Hernández Martínez responded with military repression on a massive scale. Thousands of people were killed in the days and weeks that followed. Estimates of the number of victims vary considerably, so there is no single figure accepted by all historians.",
      "The repression had deep consequences for the indigenous communities of the west. Fear of further persecution led many people to conceal aspects of their cultural identity, including the public use of the Náhuat language and certain forms of traditional dress."
    ],
    location: {
      lat: 13.7167,
      lng: -89.6833,
      zoom: 10,
      caption: "Western El Salvador, especially Izalco, Nahuizalco, and nearby municipalities, the main setting of the 1932 events."
    }
  },

  {
    id: "dictadura-martinez",
    era: "dictaduras",
    eraLabel: "Military Dictatorships",
    title: "The Hernández Martínez Regime",
    date: "1931 – 1944",
    img: "../assets/media/historia/palacio-nacional.jpg",
    text: [
      "Maximiliano Hernández Martínez came to power after the 1931 coup that overthrew President Arturo Araujo. During his long rule he established an authoritarian regime marked by the concentration of power, censorship, and repression of the opposition.",
      "His government maintained a close relationship with dominant economic sectors and developed policies aimed at stabilizing the economy after the global crisis. At the same time, political repression became a defining feature of the regime, especially after the events of 1932.",
      "In 1944, a broad social mobilization known as the 'Strike of Fallen Arms' pressured the government and contributed to Hernández Martínez's resignation. His departure did not mean an immediate end to military influence in Salvadoran politics."
    ],
    location: {
      lat: 13.6989,
      lng: -89.1914,
      zoom: 12,
      caption: "San Salvador, the political center of the Hernández Martínez regime."
    }
  },

  {
    id: "gobiernos-militares",
    era: "dictaduras",
    eraLabel: "Military Dictatorships",
    title: "Military Dominance",
    date: "1944 – 1979",
    img: "../assets/media/MUNA.webp",
    text: [
      "After Hernández Martínez's fall, the military continued to hold decisive influence over Salvadoran politics. Over the following decades, various governments were led by Armed Forces officers or were heavily shaped by military power.",
      "During the 1950s and 1960s, processes of economic modernization and industrialization took place, but significant inequalities persisted in land distribution and in access to economic and political opportunities.",
      "During the 1970s, social conflict, political repression, and allegations of electoral fraud increased. The political and social crisis fueled the growth of popular organizations and armed groups that would later become part of the civil conflict."
    ],
    location: {
      lat: 13.6989,
      lng: -89.1914,
      zoom: 11,
      caption: "San Salvador, the main political center during the period of military dominance."
    }
  },

  {
    id: "golpe-1979",
    era: "guerra",
    eraLabel: "Civil War",
    title: "The 1979 Coup",
    date: "October 15, 1979",
    img: "../assets/media/Centro Historico.jpg",
    text: [
      "On October 15, 1979, a group of Armed Forces officers overthrew President Carlos Humberto Romero. The coup gave way to a Revolutionary Government Junta that promised political and social reforms.",
      "Political violence, however, continued. Paramilitary groups and security forces were accused of serious human rights violations, while various leftist organizations strengthened their armed and political structures.",
      "The coup failed to resolve the national crisis. On the contrary, political polarization and violence increased, and the country moved toward open armed conflict."
    ],
    location: {
      lat: 13.6989,
      lng: -89.1914,
      zoom: 12,
      caption: "San Salvador, the political center where the events related to the 1979 coup unfolded."
    }
  },

  {
    id: "inicio-guerra",
    era: "guerra",
    eraLabel: "Civil War",
    title: "The Civil War",
    date: "1980 – 1992",
    img: "../assets/media/Suchitoto.webp",
    text: [
      "In October 1980, the Farabundo Martí National Liberation Front (FMLN) was formed, a coalition of five leftist guerrilla organizations. In the years that followed, the conflict pitted the Salvadoran government and its armed forces against the FMLN.",
      "The conflict was rooted in decades of social inequality, land concentration, political exclusion, and repression. It also took on an international dimension in the context of the Cold War: the United States gave broad support to the Salvadoran government, while the insurgency received outside support from various actors.",
      "The war caused serious human rights violations, massacres, disappearances, and mass displacement of the population. Departments such as Chalatenango and Morazán became major theaters of the conflict."
    ],
    location: {
      lat: 14.0333,
      lng: -88.9333,
      zoom: 9,
      caption: "Chalatenango and Morazán, two of the regions most affected by the armed conflict."
    }
  },

  {
    id: "romero",
    era: "guerra",
    eraLabel: "Civil War",
    title: "The Assassination of Óscar Romero",
    date: "March 24, 1980",
    img: "../assets/media/iglesia-rosario.jpg",
    text: [
      "The Archbishop of San Salvador, Óscar Arnulfo Romero, became one of the leading public voices against violence and repression. In his homilies he denounced killings, disappearances, and abuses committed against the Salvadoran population.",
      "On March 24, 1980, he was assassinated while celebrating mass in the chapel of the Divine Providence Hospital in San Salvador. The site later became one of the main memorial locations linked to his life and martyrdom.",
      "His assassination had enormous national and international repercussions and turned Romero into a symbol of the defense of human rights and of the conflict's victims. In 2018 he was canonized by the Catholic Church as Saint Óscar Romero."
    ],
    location: {
      lat: 13.6989,
      lng: -89.2242,
      zoom: 13,
      caption: "Chapel of the Divine Providence Hospital in San Salvador, where Óscar Romero was assassinated."
    }
  },

  {
    id: "jesuitas-uca",
    era: "guerra",
    eraLabel: "Civil War",
    title: "The UCA Massacre",
    date: "November 16, 1989",
    img: "../assets/media/MUNA.webp",
    text: [
      "In November 1989, the FMLN launched a major military offensive across different areas of the country. In the early hours of November 16, members of the Armed Forces entered the campus of the José Simeón Cañas Central American University (UCA) and murdered six Jesuit priests and two women.",
      "Among the victims was Ignacio Ellacuría, rector of the UCA, along with Ignacio Martín-Baró, Segundo Montes, Amando López, Joaquín López y López, and Juan Ramón Moreno. Julia Elba Ramos and her daughter Celina Marisela Ramos were also killed.",
      "The massacre drew strong national and international condemnation and became one of the most emblematic human rights violations committed during the civil war."
    ],
    location: {
      lat: 13.6800,
      lng: -89.2350,
      zoom: 13,
      caption: "Campus of the José Simeón Cañas Central American University (UCA), in San Salvador."
    }
  },

  {
    id: "acuerdos-paz",
    era: "guerra",
    eraLabel: "Civil War",
    title: "The Chapultepec Peace Accords",
    date: "January 16, 1992",
    img: "../assets/media/casablanca.jpg",
    text: [
      "On January 16, 1992, the Government of El Salvador and the FMLN signed the accords that ended the armed conflict at Chapultepec Castle in Mexico City.",
      "The war left approximately 75,000 people dead, thousands missing, and around a million people displaced within and outside the country. Its social, economic, and family consequences deeply marked several generations of Salvadorans.",
      "The accords established major political and institutional reforms, including the creation of the National Civil Police, changes to the Armed Forces, reforms to the judicial and electoral systems, and the incorporation of the FMLN into political life as a legal party."
    ],
    location: {
      lat: 19.4204,
      lng: -99.1822,
      zoom: 14,
      caption: "Chapultepec Castle, Mexico City, where the Peace Accords were signed."
    }
  },

  {
    id: "posguerra",
    era: "actual",
    eraLabel: "El Salvador Today",
    title: "The Postwar Period and Democracy",
    date: "1992 – 2019",
    img: "../assets/media/MUNA.webp",
    text: [
      "After the Peace Accords, El Salvador began a process of institutional reconstruction and democratic consolidation. Over the following decades, power alternated between ARENA and the FMLN, and competitive elections were held.",
      "The postwar period was also marked by major social problems, including migration, dependence on remittances, inequality, and the growth of violence linked to criminal structures and gangs.",
      "Despite these challenges, institutions created or reformed after the Peace Accords were strengthened during this period, and new cultural, social, and political expressions developed within Salvadoran society."
    ],
    location: {
      lat: 13.6989,
      lng: -89.1914,
      zoom: 11,
      caption: "San Salvador, the political and institutional center of the postwar period."
    }
  },

  {
    id: "hoy",
    era: "actual",
    eraLabel: "El Salvador Today",
    title: "A New Chapter",
    date: "2019 – present",
    img: "../assets/media/Catedral.jpg",
    text: [
      "In 2019, Nayib Bukele took office as President of El Salvador, opening a new political era in which Nuevas Ideas became the country's leading electoral force. In 2021, El Salvador passed the Bitcoin Law, becoming the first country in the world to adopt Bitcoin as legal tender alongside the US dollar.",
      "The Bitcoin Law was reformed in 2025. Following those reforms, acceptance of Bitcoin by the private sector became voluntary, and the State's mandatory role in its use was reduced. Because of this, the current situation should be distinguished from the original 2021 legislation.",
      "Since March 2022, the country has maintained a state of exception implemented in response to gang violence. The measure has coincided with a sharp reduction in homicides, but national and international human rights organizations have reported arbitrary detentions, due-process violations, mistreatment, and other rights abuses. The current period remains a subject of national and international debate."
    ],
    location: {
      lat: 13.6989,
      lng: -89.1914,
      zoom: 12,
      caption: "San Salvador, the political and administrative center of El Salvador today."
    }
  }
];

// Selecciona el set de eventos según el idioma activo. Si i18n.js aún no
// cargó (poco probable dado el orden de <script>), cae a español por defecto.
function getHistoriaEventos() {
  const lang = (window.SRi18n && window.SRi18n.getLang()) || 'es';
  return lang === 'en' ? HISTORIA_EVENTOS_EN : HISTORIA_EVENTOS_ES;
}