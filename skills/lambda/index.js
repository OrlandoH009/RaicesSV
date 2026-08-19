const Alexa = require('ask-sdk-core');
const https = require('https');

const NGROK_URL_HOST = 'startle-latter-landmark.ngrok-free.dev';
const NGROK_URL_PATH = '/chat-proxy';

const RAICES_LANDMARKS_INFO = `
SITIOS CULTURALES: Tazumal (Chalchuapa, Santa Ana), Joya de Cerén (San Juan Opico, La Libertad), Salvador del Mundo (San Salvador), Suchitoto (Cuscatlán), Catedral Metropolitana (San Salvador), MUNA (San Salvador), Ruinas de San Andrés (Ciudad Arce, La Libertad), El Boquerón (Volcán de San Salvador, San Salvador).
GASTRONOMÍA: Pupusería El Caserío (Santa Ana), Semitas de Cojutepeque (Cuscatlán), Mercado Central de San Salvador (San Salvador), Nahuizalco - Mercado Nocturno (Sonsonate).
EVENTOS Y FESTIVIDADES: Plaza las Américas (San Salvador), Panchimalco (San Salvador), Festival de Suchitoto (Cuscatlán), Catedral de Santa Ana (Santa Ana), Fiestas Agostinas (San Salvador), Día de los Farolitos (Ahuachapán), Fiestas Julias (Santa Ana), Fiestas Patronales de San Vicente (San Vicente), Festival de las Flores y Palmas (La Libertad), Gran Carnaval de San Miguel (San Miguel), Fiestas de los Historiantes de Cuisnahuat (Sonsonate), Festival del Jocote Corona (Santa Ana), Día de la Calabiuza (Cuscatlán), Festival de los Canastos (Cabañas), Día de la Cruz (San Salvador), Festival del Maíz (Chalatenango), Fiestas del Bálsamo (La Libertad), Feria del Membrillo (Morazán), Fiestas Patronales de La Unión (La Unión), Festival de los Farolitos en Ataco (Ahuachapán), Festival de la Panela (Cuscatlán), Fiestas del Rey Guajactial (Sonsonate), Festival del Cangrejo (La Paz), Romería de Esquipulas (Chalatenango), Festival del Barro (Cabañas), Fiestas del Arroz (San Vicente), Festival de la Juventudes Populares (Morazán), Feria del Marisco (Usulután), Fiesta de la Primicia de la Cosecha (La Unión), Carnaval de la Panela de Verapaz (San Vicente), Fiestas Patronales de Cojutepeque (Cuscatlán), Festival del Añil (Cuscatlán), Fiestas Patronales de Gotera (Morazán), Festival Internacional del Chicharrón (La Libertad).
HISTORIA: Casa de la Cultura de Izalco (Sonsonate), Casa de la Independencia (San Salvador), Iglesia El Rosario (San Salvador).
LEYENDAS: Lago de Coatepeque (Santa Ana), Bosque El Imposible (Ahuachapán), Puerta del Diablo (Los Planes de Renderos, Panchimalco).
  `.trim();

const SYSTEM_PROMPT_LIBRE = {
    'es': `Eres "Pupusita", asistente de Salvadorean Roots. Responde SIEMPRE en español. Solo hablas sobre cultura, historia, gastronomía, turismo y leyendas de El Salvador (Año actual: 2026).
REGLAS CRÍTICAS DE RESPUESTA:
1. Ultra directo y minimalista: Responde con estilo telegráfico. Prohibido usar introducciones. Ve directo al dato en la primera palabra.
2. Extensión máxima: Límite estricto de 1 a 2 frases cortas (máximo 25 palabras en total).
3. Formato: Resalta en **negrita** el tema principal la primera vez que lo nombres.
4. Cobertura: Válidas preguntas sobre territorio salvadoreño, presidentes y noticias locales actuales. No respondas sobre otros países.
5. Nombres exactos: Si citas lugares de la lista verificada, escríbelos EXACTAMENTE igual.
${RAICES_LANDMARKS_INFO}
6. Filtro: Si te saludan, di solo: "Hola, soy Pupusita. ¿Qué dato buscas?". Si es ajeno a El Salvador, responde ÚNICAMENTE: "No tengo respuesta a temas no relacionados al sitio."`,

    'en': `You are "Pupusita", assistant for Salvadorean Roots. ALWAYS respond in English. Only talk about culture, history, gastronomy, tourism, and legends of El Salvador (Current year: 2026).
CRITICAL RESPONSE RULES:
1. Ultra direct and minimalist: Respond in telegraphic style. Forbidden to use introductions. Go straight to the data in the very first word.
2. Maximum length: Strict limit of 1 to 2 short sentences (max 25 words total).
3. Formatting: Bold **the main topic** the first time you mention it.
4. Coverage: Valid questions about Salvadorean territory, presidents, and current local news. Do not respond about other countries.
5. Exact names: If you cite places from the verified list, write them EXACTLY the same way.
${RAICES_LANDMARKS_INFO}
6. Filter: If greeted, say only: "Hello, I am Pupusita. What info are you looking for?". If unrelated to El Salvador, respond ONLY: "I don't have answers for topics unrelated to the site."`,
};

const SYSTEM_PROMPT_PLANIFICADOR = {
    'es': `Eres "Pupusita" en modo "Planificador de salidas". Responde SIEMPRE en español. Crea itinerarios rápidos y reales en El Salvador usando dólares ($ USD).
REGLAS CRÍTICAS DEL PLAN:
1. Formato estricto: Cero párrafos, cero textos introductorios. Responde DIRECTAMENTE con la lista numerada.
2. Brevedad radical: Máximo 3 actividades por plan más el apartado de transporte. Cada línea debe ser corta.
3. Costos: Escribe el precio al lado de cada actividad y detalla una línea específica para el costo estimado de **Transporte**. Pon el total general al final.
4. Nombres exactos: Usa EXACTAMENTE los nombres de esta lista si los incluyes:
${RAICES_LANDMARKS_INFO}
5. Cierre: Sin despedidas ni recomendaciones. Termina inmediatamente tras el total.`,

    'en': `You are "Pupusita" in "Trip Planner" mode. ALWAYS respond in English. Create quick and real itineraries in El Salvador using dollars ($ USD).
CRITICAL PLAN RULES:
1. Strict format: Zero paragraphs, zero introductory texts. Respond DIRECTLY with the numbered list.
2. Radical brevity: Max 3 activities per plan plus the transport section. Each line must be short.
3. Costs: Write the price next to each activity and detail a specific line for estimated **Transport** cost. Put the general total at the end.
4. Exact names: Use EXACTLY the names from this list if included:
${RAICES_LANDMARKS_INFO}
5. Closure: No farewells or recommendations. End immediately right after the total.`,
};

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

function obtenerIdioma(handlerInput) {
    const locale = Alexa.getLocale(handlerInput.requestEnvelope);
    return locale && locale.startsWith('en') ? 'en' : 'es';
}

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

        const reply = await preguntarAPupusita(SYSTEM_PROMPT_LIBRE[idioma], [{ role: 'user', content: consulta }]);
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
            attributes.paso = 'presupuesto';
            handlerInput.attributesManager.setSessionAttributes(attributes);

            const speakOutput = idioma === 'en'
                ? 'I love that choice! Now let\'s talk about budget, to build a plan that fits well: are you looking for something affordable, moderate, or are you open to a higher budget? For example, say "let\'s say affordable".'
                : '¡Me encanta esa elección! Ahora hablemos de presupuesto, para armarte un plan que se ajuste bien: ¿buscas algo económico, moderado, o estás dispuesto a un presupuesto alto? Por ejemplo, di "digamos económico".';
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
                ? 'Got it! Now tell me how much time you have for this trip: half a day, a full day, or the whole weekend? For example, say "let\'s say half a day".'
                : '¡Anotado! Ahora dime cuánto tiempo tienes disponible para esta salida: ¿medio día, un día completo, o todo el fin de semana? Por ejemplo, di "digamos medio día".';
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
                ? 'Almost there! One last thing: is there anything specific you would like to include, like a type of food or activity? If not, just say "none" and I will build your plan with what we have.'
                : 'Ya casi tenemos tu plan listo. Una última cosa: ¿hay algo específico que te gustaría incluir, como algún tipo de comida o actividad en particular? Si no, dime simplemente "ninguna" y armo tu plan con lo que ya tenemos.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }

        if (paso === 'detalles') {
            attributes.datosPlan.detalles = texto;

            const { actividad, presupuesto, tiempo, detalles } = attributes.datosPlan;

            const userPrompt = idioma === 'en'
                ? `Plan a trip with these preferences: activity ${actividad}, budget ${presupuesto}, available time ${tiempo}, additional details: ${detalles}. Give me a concrete plan inside El Salvador with specific places and an estimated total cost.`
                : `Planifícame una salida con estas preferencias: actividad ${actividad}, presupuesto ${presupuesto}, tiempo disponible ${tiempo}, detalles adicionales: ${detalles}. Dame un plan concreto dentro de El Salvador con lugares específicos y un estimado de gasto total.`;

            const reply = await preguntarAPupusita(SYSTEM_PROMPT_PLANIFICADOR[idioma], [{ role: 'user', content: userPrompt }]);
            const replyLimpio = limpiarVoz(reply);

            attributes.paso = null;
            handlerInput.attributesManager.setSessionAttributes(attributes);

            const cierreGenerico = idioma === 'en'
                ? 'I hope you enjoy your trip! Would you like anything else? Say "yes" to choose another option, "free mode" for a question, "plan" for another trip, or "no" if that is all for now.'
                : '¡Espero que disfrutes tu viaje! ¿Te gustaría hacer algo más? Puedes decir "sí" si quieres elegir otra opción, "modo libre" si tienes alguna pregunta, "planificar" si quieres armar otra salida, o "no" si por ahora es todo.';

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
            ? 'You can say "free mode" to ask me about culture, history, legends, or gastronomy of El Salvador, or "plan" to build a trip. What would you like to do?'
            : 'Puedes decir "modo libre" para preguntarme sobre cultura, historia, leyendas o gastronomía de El Salvador, o "planificar" para armar un viaje. ¿Qué te gustaría hacer?';

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
        const speakOutput = idioma === 'en'
            ? 'Would you like to continue in free mode, or in planner mode?'
            : '¿Deseas seguir con el modo libre, o con el modo planificador?';

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