const Alexa = require('ask-sdk-core');
const https = require('https');

const NGROK_URL_HOST = 'startle-latter-landmark.ngrok-free.dev';
const NGROK_URL_PATH = '/chat-proxy';

// Debe mantenerse EXACTAMENTE igual a RAICES_LANDMARKS_INFO en
// presentation/assets/js/chatbot.js para que ambos canales (web y Alexa)
// respondan con la misma información y los mismos nombres de lugares.
const RAICES_LANDMARKS_INFO = `SITIOS CULTURALES: Tazumal (Chalchuapa, Santa Ana), Joya de Cerén (San Juan Opico, La Libertad), Salvador del Mundo (San Salvador), Suchitoto (Cuscatlán), Catedral Metropolitana (San Salvador), MUNA (San Salvador), Ruinas de San Andrés (Ciudad Arce, La Libertad), El Boquerón (Volcán de San Salvador), Casa Blanca (Chalchuapa, Santa Ana), Palacio Nacional (Centro Histórico, San Salvador), Teatro Nacional (Centro Histórico, San Salvador).
GASTRONOMÍA: Pupusodromo El Triángulo (Olocuilta, La Paz), Semitas de Cojutepeque (Cuscatlán), Mercado Central (Centro Histórico, San Salvador), Nahuizalco — Mercado Nocturno (Sonsonate), Día Nacional de la Pupusa (Olocuilta, La Paz).
EVENTOS Y FESTIVIDADES: Plaza las Américas (San Salvador), Panchimalco (San Salvador), Festival de Suchitoto (Cuscatlán), Catedral de Santa Ana (Santa Ana), Fiestas Agostinas (San Salvador), Día de los Farolitos (Ahuachapán), Fiestas Julias (Santa Ana), Fiestas Patronales de San Vicente (San Vicente), Festival de las Flores y Palmas (La Libertad), Gran Carnaval de San Miguel (San Miguel), Fiestas de los Historiantes (Cuisnahuat, Sonsonate), Festival del Jocote Corona (Santa Ana), Día de la Calabiuza (Cuscatlán), Día de la Cruz (San Salvador), Festival del Maíz (Chalatenango), Tradición del Bálsamo (Jayaque, La Libertad), Fiestas Patronales de La Unión (La Unión), Festival de los Farolitos en Ataco (Ahuachapán), Festival de la Panela (Cuscatlán), Fiestas del Rey Guajactial (Sonsonate), Festival del Cangrejo (La Paz), Romería de Esquipulas (Chalatenango), Festival del Barro (Cabañas), Fiestas del Arroz (San Vicente), Festival de las Juventudes (El Mozote, Morazán), Feria del Marisco (Usulután), Primicia de la Cosecha (La Unión), Carnaval de la Panela (Verapaz, San Vicente), Fiestas Patronales de Cojutepeque (Cuscatlán), Festival del Añil (Cuscatlán), Fiestas Patronales de Gotera (Morazán), Festival del Chicharrón (La Libertad), Día de la Independencia (Plaza Cívica, San Salvador), Bolas de Fuego de Nejapa (Nejapa, San Salvador), Feria de la Hamaca (San Sebastián, San Vicente).
HISTORIA: Casa de la Cultura de Izalco (Izalco, Sonsonate), Iglesia El Rosario (San Salvador), Museo Militar (San Jacinto, San Salvador), Sitio Arqueológico Cihuatán (Aguilares, San Salvador).
LEYENDAS: Lago de Coatepeque (Santa Ana), Bosque El Imposible (Ahuachapán), Puerta del Diablo (Los Planes de Renderos, Panchimalco), Laguna de Alegría (Usulután).`.trim();

// Misma lógica que getCurrentDateInfo() en chatbot.js: le da al modelo la
// fecha real para que no ofrezca festividades que ya pasaron este año.
function obtenerInfoFecha(idioma) {
    const now = new Date();
    const locale = idioma === 'en' ? 'en-US' : 'es-SV';
    const formatted = now.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return { formatted, year: now.getFullYear() };
}

// Equivalente a getSystemPrompt() en chatbot.js.
function obtenerSystemPromptLibre(idioma) {
    const { formatted: hoyStr, year } = obtenerInfoFecha(idioma);
    if (idioma === 'en') {
        return `You are "Pupusita", assistant for Salvadorean Roots. ALWAYS respond in English. Only talk about culture, history, gastronomy, tourism, and legends of El Salvador (Current date: ${hoyStr}).
CRITICAL RESPONSE RULES:
1. Ultra direct and minimalist: Respond in telegraphic style. Forbidden to use introductions. Go straight to the data in the very first word.
2. Maximum length: Strict limit of 1 to 2 short sentences (max 25 words total).
3. Formatting: Bold **the main topic** the first time you mention it.
4. Coverage: Valid questions about Salvadorean territory, presidents, and current local news. Do not respond about other countries.
5. Exact names: If you cite places from the verified list, write them EXACTLY the same way.
${RAICES_LANDMARKS_INFO}
6. Filter: If greeted, say only: "Hello, I am Pupusita. What info are you looking for?". If unrelated to El Salvador, respond ONLY: "I don't have answers for topics unrelated to the site."
7. Language: ALWAYS respond in the same language the user writes to you.
8. Dates: Today is ${hoyStr}. If asked about festivals, fairs, or patron saint celebrations "coming up" or "soon", only mention ones whose date is on or after today in the ${year} calendar; if one already happened this year, say so and mention it happens again next year instead of presenting it as upcoming.`;
    }
    return `Eres "Pupusita", asistente de Salvadorean Roots. Responde SIEMPRE en español. Solo hablas sobre cultura, historia, gastronomía, turismo y leyendas de El Salvador (Fecha actual: ${hoyStr}).
REGLAS CRÍTICAS DE RESPUESTA:
1. Ultra directo y minimalista: Responde con estilo telegráfico. Prohibido usar introducciones. Ve directo al dato en la primera palabra.
2. Extensión máxima: Límite estricto de 1 a 2 frases cortas (máximo 25 palabras en total).
3. Formato: Resalta en **negrita** el tema principal la primera vez que lo nombres.
4. Cobertura: Válidas preguntas sobre territorio salvadoreño, presidentes y noticias locales actuales. No respondas sobre otros países.
5. Nombres exactos: Si citas lugares de la lista verificada, escríbelos EXACTAMENTE igual.
${RAICES_LANDMARKS_INFO}
6. Filtro: Si te saludan, di solo: "Hola, soy Pupusita. ¿Qué dato buscas?". Si es ajeno a El Salvador, responde ÚNICAMENTE: "No tengo respuesta a temas no relacionados al sitio."
7. Idioma: Responde SIEMPRE en el mismo idioma en el que el usuario te escriba.
8. Fechas: Hoy es ${hoyStr}. Si te preguntan por festivales, ferias o fiestas patronales "próximas" o "que se acercan", menciona solo las que caen en o después de hoy dentro del calendario ${year}; si una ya pasó este año, acláralo y di que se celebra de nuevo el próximo año en vez de presentarla como próxima.`;
}

// Equivalente a getPlannerSystemPrompt() en chatbot.js: incluye desglose de
// transporte/comida, totales de grupo y por persona, y soporte de modificación.
function obtenerSystemPromptPlanificador(idioma) {
    const { formatted: hoyStr, year } = obtenerInfoFecha(idioma);
    if (idioma === 'en') {
        return `You are "Pupusita" in "Trip Planner" mode. ALWAYS respond in English. Create detailed, realistic itineraries in El Salvador using dollars ($ USD), based on the group size given by the user. Today's date is ${hoyStr}.
CRITICAL PLAN RULES:
1. Strict format: Zero paragraphs, zero introductory texts. Respond DIRECTLY with the numbered list.
2. Detail level: 3 to 4 concrete activities/stops, each with a one-line description of what to do there and its cost (TOTAL for the whole group, based on the number of people given).
3. Costs breakdown: After the activities, include separate itemized lines for **Transporte** (estimated for the whole group, considering distance from the starting point and group size) and **Comida** (estimated per meal for the whole group). If food is already covered inside an activity, do not duplicate it in this line.
4. Totals: End with **Total del grupo** (sum of everything) and **Total por persona** (group total divided by the number of people).
5. Exact names: Use EXACTLY the names from this list if included:
${RAICES_LANDMARKS_INFO}
6. Closure: No farewells or recommendations. End immediately right after the per-person total.
7. Language: ALWAYS respond in the same language the user writes to you.
8. Modifications: If the user asks to modify a previously generated plan, keep the same format and rules above, apply ONLY the requested change, and keep the rest of the plan consistent (people count, budget, location) unless the change says otherwise.
9. Dates: Only include a seasonal festival/fair/patron-saint event in the plan if it is realistically happening on or around today (${hoyStr}, ${year}) or the trip is explicitly planned around it; do not suggest an event that already passed this year as if it were happening now.
10. Voice output: This will be read aloud by a voice assistant, so keep each activity to one short spoken sentence and avoid symbols that don't read well out loud.`;
    }
    return `Eres "Pupusita" en modo "Planificador de salidas". Responde SIEMPRE en español. Crea itinerarios detallados y realistas en El Salvador usando dólares ($ USD), basados en la cantidad de personas indicada por el usuario. La fecha de hoy es ${hoyStr}.
REGLAS CRÍTICAS DEL PLAN:
1. Formato estricto: Cero párrafos, cero textos introductorios. Responde DIRECTAMENTE con la lista numerada.
2. Nivel de detalle: De 3 a 4 actividades/paradas concretas, cada una con una línea describiendo qué hacer ahí y su costo (TOTAL para todo el grupo, según el número de personas indicado).
3. Desglose de costos: Después de las actividades, incluye líneas separadas para **Transporte** (estimado para todo el grupo, considerando la distancia desde el punto de partida y el número de personas) y **Comida** (estimado por comida para todo el grupo). Si la comida ya está incluida en una actividad, no la dupliques en esta línea.
4. Totales: Termina con **Total del grupo** (suma de todo) y **Total por persona** (total del grupo dividido entre el número de personas).
5. Nombres exactos: Usa EXACTAMENTE los nombres de esta lista si los incluyes:
${RAICES_LANDMARKS_INFO}
6. Cierre: Sin despedidas ni recomendaciones. Termina inmediatamente tras el total por persona.
7. Idioma: Responde SIEMPRE en el mismo idioma en el que el usuario te escriba.
8. Modificaciones: Si el usuario pide modificar un plan ya generado, mantén el mismo formato y reglas anteriores, aplica SOLO el cambio pedido y conserva el resto del plan consistente (número de personas, presupuesto, ubicación) salvo que el cambio indique lo contrario.
9. Fechas: Solo incluye una festividad, feria o fiesta patronal de temporada en el plan si realmente ocurre en o cerca de hoy (${hoyStr}, ${year}) o si la salida se está planificando explícitamente alrededor de ella; no sugieras como vigente un evento que ya pasó este año.
10. Salida por voz: Esto lo leerá en voz alta un asistente de voz, así que deja cada actividad en una sola frase corta y evita símbolos que no se lean bien en voz alta.`;
}

async function preguntarAPupusita(systemPrompt, messages) {
    try {
        const bodyData = JSON.stringify({
            system: systemPrompt,
            messages: messages
        });
        const options = {
            hostname: NGROK_URL_HOST,
            path: NGROK_URL_PATH,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(bodyData)
            }
        }
        const data = await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let responseBody = '';
                res.on('data', (chunk) => {
                    responseBody += chunk;
                });
                res.on('end', () => {
                    resolve(responseBody);
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.write(bodyData);
            req.end();
        });
        return data || 'No pude generar esta respuesta esta vez';
    } catch(e) {
        console.log('Error llamando al chatbot', e);
        return('No pude conectarme con el chatbot en este momento, verifica si el servidor esta encendido');
    }
}

function limpiarVoz(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '$1');
}

function obtenerIdioma(handlerInput) {
    const locale = Alexa.getLocale(handlerInput.requestEnvelope);
    return locale && locale.startsWith('en') ? 'en' : 'es';
}

// Arma el mismo prompt de usuario que basePrompt en generatePlan() de chatbot.js,
// a partir de los datos recolectados paso a paso por voz.
function construirPromptPlan(idioma, datosPlan) {
    const { actividad, ubicacion, personas, presupuesto, tiempo, detalles } = datosPlan;
    if (idioma === 'en') {
        return `Plan a trip with these preferences:
- Starting Location: ${ubicacion}
- Number of people: ${personas}
- Desired Activity: ${actividad}
- Total Budget (for the whole group): ${presupuesto}
- Time Available: ${tiempo}${detalles ? `\n- Specific Preferences: ${detalles}` : ''}
Provide a concrete, detailed and realistic plan inside El Salvador for this group size.`;
    }
    return `Planifícame una salida con estas preferencias:
- Punto de inicio/Ciudad origen: ${ubicacion}
- Número de personas: ${personas}
- Actividad deseada: ${actividad}
- Presupuesto total (para todo el grupo): ${presupuesto}
- Tiempo disponible: ${tiempo}${detalles ? `\n- Preferencias específicas: ${detalles}` : ''}
Dame un plan concreto, detallado y realista dentro de El Salvador para este número de personas.`;
}

// Equivalente al branch isModification de generatePlan() en chatbot.js.
function construirPromptModificacion(idioma, datosPlan, ultimoPlan, modificacion) {
    const preferenciasOriginales = construirPromptPlan(idioma, datosPlan);
    if (idioma === 'en') {
        return `Here is the previously generated plan:\n${ultimoPlan}\n\nOriginal preferences:\n${preferenciasOriginales}\n\nRequested change: ${modificacion}\n\nReturn the FULL updated plan (same format), applying only the requested change.`;
    }
    return `Este es el plan generado anteriormente:\n${ultimoPlan}\n\nPreferencias originales:\n${preferenciasOriginales}\n\nCambio solicitado: ${modificacion}\n\nDevuelve el plan COMPLETO actualizado (mismo formato), aplicando solo el cambio solicitado.`;
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const idioma = obtenerIdioma(handlerInput);
        const speakOutput = idioma === 'en'
            ? 'Welcome to Salvadorean Roots! I am Pupusita, your cultural guide to El Salvador. Would you like to use free mode, or plan your trip?'
            : '¡Bienvenido a Salvadorean Roots! Soy Pupusita, tu guía cultural de El Salvador. ¿Quieres hacer una consulta libre, o planificar tu viaje?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ModoLibreIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'ModoLibreIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'FreeModeIntent');
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.modo = 'libre';
        attributes.paso = null;
        attributes.datosPlan = {};
        handlerInput.attributesManager.setSessionAttributes(attributes);

        const idioma = obtenerIdioma(handlerInput);
        const speakOutput = idioma === 'en'
            ? 'Perfect, we are in free mode. What would you like to know about Salvadorean culture?'
            : 'Perfecto, estamos en modo libre. ¿Qué quieres saber sobre la cultura salvadoreña?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ConsultaLibreIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConsultaLibreIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'FreeQueryIntent');
    },
    async handle(handlerInput) {
        const idioma = obtenerIdioma(handlerInput);
        const consulta = Alexa.getSlotValue(handlerInput.requestEnvelope, 'consulta');

        if (!consulta) {
            const speakOutput = idioma === 'en'
                ? "I didn't catch your question. What would you like to know?"
                : 'No alcancé a escuchar tu pregunta. ¿Sobre qué quieres saber?';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }

        const reply = await preguntarAPupusita(obtenerSystemPromptLibre(idioma), [{ role: 'user', content: consulta }]);
        const replyLimpio = limpiarVoz(reply);

        const cierreGenerico = idioma === 'en'
            ? 'Anything else? You can say "yes" to choose, "free mode" to keep asking, "plan" to build a trip, or "no" to finish.'
            : '¿Quieres algo más? Puedes decir sí para elegir, modo libre para preguntarme algo, planificar para armar un viaje, o no para terminar.';

        return handlerInput.responseBuilder
            .speak(`${replyLimpio} ${cierreGenerico}`)
            .reprompt(cierreGenerico)
            .getResponse();
    }
};

const ModoPlanificadorIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'ModoPlanificadorIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlannerModeIntent');
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.modo = 'planificador';
        attributes.paso = 'actividad';
        attributes.datosPlan = {};
        handlerInput.attributesManager.setSessionAttributes(attributes);

        const idioma = obtenerIdioma(handlerInput);
        const speakOutput = idioma === 'en'
            ? 'How exciting, let\'s build your perfect trip through El Salvador! First tell me what kind of experience you are looking for: gastronomy, history and sites, events and festivals, legends, or a bit of everything. For example, you can say "let\'s say gastronomy".'
            : '¡Qué emoción, vamos a armar tu viaje perfecto por El Salvador! Primero cuéntame qué tipo de experiencia buscas: puede ser gastronomía, historia y sitios culturales, eventos y fiestas, leyendas, o un poco de todo. Por ejemplo, puedes decir "digamos gastronomía".';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Nuevo handler: equivalente a startModifyFlow() en chatbot.js. Solo tiene
// sentido si ya existe un plan generado (attributes.ultimoPlan).
const ModificarPlanIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'ModificarPlanIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'ModifyPlanIntent');
    },
    handle(handlerInput) {
        const idioma = obtenerIdioma(handlerInput);
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        if (!attributes.ultimoPlan) {
            const speakOutput = idioma === 'en'
                ? 'You don\'t have a plan yet to modify. Say "plan" and I\'ll help you build one first.'
                : 'Todavía no tienes un plan generado para modificar. Di "planificar" y primero armamos uno.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }

        attributes.modo = 'planificador';
        attributes.paso = 'modificar';
        handlerInput.attributesManager.setSessionAttributes(attributes);

        const speakOutput = idioma === 'en'
            ? 'Tell me what you\'d like to change about the plan, for example swapping an activity, adjusting the budget, or the number of people, and I\'ll update it.'
            : 'Cuéntame qué te gustaría cambiar del plan, por ejemplo cambiar una actividad, ajustar el presupuesto o el número de personas, y lo actualizo.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const RespuestaPlanificadorIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'RespuestaPlanificadorIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlannerResponseIntent');
    },
    async handle(handlerInput) {
        const idioma = obtenerIdioma(handlerInput);
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const paso = attributes.paso;
        const texto = Alexa.getSlotValue(handlerInput.requestEnvelope, 'texto');

        if (!texto) {
            const speakOutput = idioma === 'en'
                ? 'Sorry, I did not catch that. Please repeat your answer, for example saying "let\'s say gastronomy" or "my answer is affordable". If you prefer free mode say "free mode", or say "no" to finish.'
                : 'Disculpa, no logré escucharte bien. No te preocupes, solo repíteme tu respuesta con calma, por ejemplo diciendo "digamos gastronomía" o "mi respuesta es económico". Si prefieres pasar a consulta libre di "modo libre", o si deseas terminar di "no".';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }

        if (paso === 'actividad') {
            attributes.datosPlan.actividad = texto;
            attributes.paso = 'ubicacion';
            handlerInput.attributesManager.setSessionAttributes(attributes);

            const speakOutput = idioma === 'en'
                ? 'I love that choice! Now, from which city or town will you start your trip? For example, say "let\'s say San Salvador".'
                : '¡Me encanta esa elección! Ahora dime, ¿desde qué ciudad o municipio vas a iniciar tu salida? Por ejemplo, di "digamos San Salvador".';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }

        if (paso === 'ubicacion') {
            const limpio = texto.toLowerCase().trim();
            if (limpio.length < 3 || /^\d+$/.test(limpio)) {
                const speakOutput = idioma === 'en'
                    ? 'That doesn\'t sound like a city or town. Please tell me where you\'ll be starting from, for example "let\'s say Santa Ana".'
                    : 'Eso no suena a una ciudad o municipio. Dime desde dónde vas a iniciar tu salida, por ejemplo "digamos Santa Ana".';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt(speakOutput)
                    .getResponse();
            }

            attributes.datosPlan.ubicacion = texto;
            attributes.paso = 'personas';
            handlerInput.attributesManager.setSessionAttributes(attributes);

            const speakOutput = idioma === 'en'
                ? 'Great. How many people will be going on the trip? That way I can calculate transport and food costs for the whole group. For example, say "let\'s say four".'
                : 'Genial. ¿Cuántas personas van a participar en la salida? Así calculo bien los costos de transporte y comida para el grupo. Por ejemplo, di "digamos cuatro".';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }

        if (paso === 'personas') {
            const match = texto.match(/\d+/);
            const cantidad = match ? parseInt(match[0], 10) : NaN;
            if (!cantidad || cantidad < 1 || cantidad > 100) {
                const speakOutput = idioma === 'en'
                    ? 'I need a number of people between 1 and 100. Please say something like "let\'s say four people".'
                    : 'Necesito un número de personas entre 1 y 100. Dime algo como "digamos cuatro personas".';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt(speakOutput)
                    .getResponse();
            }

            attributes.datosPlan.personas = cantidad;
            attributes.paso = 'presupuesto';
            handlerInput.attributesManager.setSessionAttributes(attributes);

            const speakOutput = idioma === 'en'
                ? 'Got it! Now let\'s talk about budget, to build a plan that fits well: are you looking for something affordable, moderate, or are you open to a higher budget? For example, say "let\'s say affordable".'
                : '¡Anotado! Ahora hablemos de presupuesto, para armarte un plan que se ajuste bien: ¿buscas algo económico, moderado, o estás dispuesto a un presupuesto alto? Por ejemplo, di "digamos económico".';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }

        if (paso === 'presupuesto') {
            attributes.datosPlan.presupuesto = texto;
            attributes.paso = 'tiempo';
            handlerInput.attributesManager.setSessionAttributes(attributes);

            const speakOutput = idioma === 'en'
                ? 'Perfect. Now tell me how much time you have available for this trip: half a day, a full day, or the whole weekend? For example, say "let\'s say half a day".'
                : 'Perfecto. Ahora dime cuánto tiempo tienes disponible para tu salida: ¿medio día, un día completo, o todo el fin de semana? Por ejemplo, di "digamos medio día".';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }

        if (paso === 'tiempo') {
            attributes.datosPlan.tiempo = texto;
            attributes.paso = 'detalles';
            handlerInput.attributesManager.setSessionAttributes(attributes);

            const speakOutput = idioma === 'en'
                ? 'One last thing: is there any specific dish, place, or preference you want to include no matter what? If not, just say "none" and I\'ll build your plan with what we have.'
                : 'Una última cosa: ¿hay algún platillo, lugar específico o preferencia que quieras incluir sí o sí? Si no, dime simplemente "ninguna" y armo tu plan con lo que ya tenemos.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }

        if (paso === 'detalles') {
            const limpio = texto.toLowerCase().trim();
            attributes.datosPlan.detalles = (limpio === 'omitir' || limpio === 'no' || limpio === 'skip' || limpio === 'ninguna' || limpio === 'none')
                ? ''
                : texto;

            const userPrompt = construirPromptPlan(idioma, attributes.datosPlan);
            const reply = await preguntarAPupusita(obtenerSystemPromptPlanificador(idioma), [{ role: 'user', content: userPrompt }]);
            const replyLimpio = limpiarVoz(reply);

            attributes.ultimoPlan = reply;
            attributes.paso = null;
            handlerInput.attributesManager.setSessionAttributes(attributes);

            const cierreGenerico = idioma === 'en'
                ? 'I hope you enjoy your trip! Would you like anything else? Say "modify plan" to adjust it, "free mode" for a question, "plan" for another trip, or "no" if that is all for now.'
                : '¡Espero que disfrutes tu viaje! ¿Te gustaría hacer algo más? Puedes decir "modificar plan" para ajustarlo, "modo libre" si tienes alguna pregunta, "planificar" si quieres armar otra salida, o "no" si por ahora es todo.';

            return handlerInput.responseBuilder
                .speak(`${replyLimpio} ${cierreGenerico}`)
                .reprompt(cierreGenerico)
                .getResponse();
        }

        if (paso === 'modificar') {
            if (texto.trim().length < 3) {
                const speakOutput = idioma === 'en'
                    ? 'I did not quite catch what you want to change. Please describe the change, for example "let\'s say change the budget to economical".'
                    : 'No logré entender bien qué quieres cambiar. Descríbeme el cambio, por ejemplo "digamos cambiar el presupuesto a económico".';
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt(speakOutput)
                    .getResponse();
            }

            const userPrompt = construirPromptModificacion(idioma, attributes.datosPlan, attributes.ultimoPlan, texto);
            const reply = await preguntarAPupusita(obtenerSystemPromptPlanificador(idioma), [{ role: 'user', content: userPrompt }]);
            const replyLimpio = limpiarVoz(reply);

            attributes.ultimoPlan = reply;
            attributes.paso = null;
            handlerInput.attributesManager.setSessionAttributes(attributes);

            const cierreGenerico = idioma === 'en'
                ? 'Done! I updated your plan. Would you like anything else? Say "modify plan" to keep adjusting, "free mode" for a question, "plan" for another trip, or "no" if that is all for now.'
                : '¡Listo! Actualicé tu plan según lo que pediste. ¿Te gustaría hacer algo más? Di "modificar plan" para seguir ajustándolo, "modo libre" si tienes alguna pregunta, "planificar" para otra salida, o "no" si por ahora es todo.';

            return handlerInput.responseBuilder
                .speak(`${replyLimpio} ${cierreGenerico}`)
                .reprompt(cierreGenerico)
                .getResponse();
        }

        const speakOutput = idioma === 'en'
            ? 'There was a problem with the planner. Let\'s start over, say "plan".'
            : 'Ocurrió un problema con el planificador. Vamos a empezar de nuevo, di "planificar".';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const idioma = obtenerIdioma(handlerInput);
        const speakOutput = idioma === 'en'
            ? 'You can say "free mode" to ask me about culture, history, legends, or gastronomy of El Salvador, "plan" to build a trip, or "modify plan" to change a plan you already built. What would you like to do?'
            : 'Puedes decir "modo libre" para preguntarme sobre cultura, historia, leyendas o gastronomía de El Salvador, "planificar" para armar un viaje, o "modificar plan" para cambiar un plan que ya armaste. ¿Qué te gustaría hacer?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const yesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
        const idioma = obtenerIdioma(handlerInput);
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        const speakOutput = idioma === 'en'
            ? (attributes.ultimoPlan
                ? 'Would you like to modify your plan, continue in free mode, or plan a new trip?'
                : 'Would you like to continue in free mode, or in planner mode?')
            : (attributes.ultimoPlan
                ? '¿Deseas modificar tu plan, seguir con el modo libre, o planificar un nuevo viaje?'
                : '¿Deseas seguir con el modo libre, o con el modo planificador?');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const NoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
        const idioma = obtenerIdioma(handlerInput);
        const speakOutput = idioma === 'en'
            ? 'See you soon, thanks for exploring Salvadorean culture with me.'
            : 'Hasta pronto, gracias por explorar la cultura salvadoreña conmigo.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const idioma = obtenerIdioma(handlerInput);
        const speakOutput = idioma === 'en'
            ? 'See you soon, thanks for exploring Salvadorean culture with me.'
            : 'Hasta pronto, gracias por explorar la cultura salvadoreña conmigo.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const idioma = obtenerIdioma(handlerInput);
        const speakOutput = idioma === 'en'
            ? 'I did not understand that. You can say "free mode" to ask me something about El Salvador.'
            : 'No entendí eso. Puedes decir "modo libre" para hacerme una pregunta sobre El Salvador.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Tuve un problema para hacer lo que pediste. Inténtalo de nuevo.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ModoLibreIntentHandler,
        ConsultaLibreIntentHandler,
        ModoPlanificadorIntentHandler,
        ModificarPlanIntentHandler,
        RespuestaPlanificadorIntentHandler,
        HelpIntentHandler,
        yesIntentHandler,
        NoIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
