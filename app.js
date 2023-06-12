const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowCompra = addKeyword(['1', '2', '3', '4', '5']).addAnswer(
    (match) => {
        let producto = '';
        let precio = 0;
        let mensajeAdicional = '';

        switch (match) {
            case '1':
                producto = 'Polo';
                precio = 20;
                mensajeAdicional = 'Selecciona una opción adicional:\n   - Manga corta\n   - Manga larga';
                break;
            case '2':
                producto = 'Pantalón';
                precio = 30;
                mensajeAdicional = 'Selecciona una opción adicional:\n   - Jeans\n   - Chinos';
                break;
            case '3':
                producto = 'Gorro';
                precio = 10;
                mensajeAdicional = 'Selecciona una opción adicional:\n   - De lana\n   - De algodón';
                break;
            case '4':
                producto = 'Chompa';
                precio = 40;
                mensajeAdicional = 'Selecciona una opción adicional:\n   - Con capucha\n   - Sin capucha';
                break;
            case '5':
                producto = 'Casaca';
                precio = 50;
                mensajeAdicional = 'Selecciona una opción adicional:\n   - Impermeable\n   - Abrigada';
                break;
        }

        return `🛒 Has seleccionado ${producto}.\nEl precio base es $${precio}.\n\n${mensajeAdicional}\n\nPara confirmar tu compra, por favor responde con la opción adicional elegida.\nSi no deseas realizar la compra, simplemente escribe "No".`;
    },
    null,
    (response, match) => {
        let mensajeFinal = '';
        switch (match) {
            case '1':
                mensajeFinal = 'Muchas gracias por tu compra de un Polo Manga corta. Nos pondremos en contacto contigo para finalizar la transacción.';
                break;
            case '2':
                mensajeFinal = 'Muchas gracias por tu compra de un Pantalón Jeans. Nos pondremos en contacto contigo para finalizar la transacción.';
                break;
            case '3':
                mensajeFinal = 'Muchas gracias por tu compra de un Gorro de lana. Nos pondremos en contacto contigo para finalizar la transacción.';
                break;
            case '4':
                mensajeFinal = 'Muchas gracias por tu compra de una Chompa con capucha. Nos pondremos en contacto contigo para finalizar la transacción.';
                break;
            case '5':
                mensajeFinal = 'Muchas gracias por tu compra de una Casaca Impermeable. Nos pondremos en contacto contigo para finalizar la transacción.';
                break;
            default:
                mensajeFinal = 'Gracias por tu interés. ¡Hasta la próxima!';
        }
        return mensajeFinal;
    },
    [flowSecundario]
);

const flowPrincipal = addKeyword(['hola', 'buena', 'buenos', 'ola', 'hey'])
    .addAnswer('🙌 Hola, bienvenido a *webboot*. ¿En qué podemos ayudarte?')
    .addAnswer(
        [
            'Escribe el número según el producto que desees',
            '¿Qué producto te gustaría comprar?',
            '\n👉 para ver la lista de productos',
            '🛍️ Tenemos los siguientes productos disponibles:',
            '1. Polo',
            '2. Pantalón',
            '3. Gorro',
            '4. Chompa',
            '5. Casaca',
            '\nPor favor, ingresa el número del producto que deseas comprar.',
        ],
        null,
        null,
        [flowCompra]
    );

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
