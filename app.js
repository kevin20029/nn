const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const VenomProvider = require('@bot-whatsapp/provider/venom')
const MockAdapter = require('@bot-whatsapp/database/mock')

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

const FlujoRespuestaClienteNuevoVeterinaria=addKeyword(['veterinaria','1'],{sensitive:true})
.addAnswer(['Nos podrias indicar los siguientes datos',' ','Nombre completo del tutor: ','Nombre de la mascota:','Raza: ','Edad: ','Motivo de consulta:  '])
const FlujoRespuestaClienteNuevoSpaCanino=addKeyword(['spa canino','2'],{sensitive:true})
.addAnswer(['Para el servicion de Spa Canino es necesario presentar la cartilla de vacunacion actualizada de tu mascota, con *las vacunas Óctuple y contra la Rabia*.Envia una foto de su carnet para verificar.',' ','Ademas los siguientes datos:  ','Nombre completo del tutor: ','Nombre de la mascota: ','Raza:  ','Edad:  ','Peso aprox:  '])
const FlujoRespuestaFarmacia=addKeyword(['farmacia','medicamento','remedio','3'],{sensitive:true})
.addAnswer(['¿Que medicamento necesita?'])
const FlujoRespuestaPetShop=addKeyword(['pet shop','alimento','juguetes','snacks','4'],{sensitive:true})
.addAnswer(['¿Que producto necesita?'])
const FlujoRespuestaDespacho=addKeyword(['despacho','5'],{sensitive:true})
.addAnswer(['El servicio de despacho tiene un valor de $3.000, queda exento si el monto de la compra es mayor a $20.000 y este se realiza dentro de *Huechuraba Poniente*','Favor indicar que productos necesitas:'])

const FlujoRespuestaClienteAntiguoVeterinaria=addKeyword(['veterinaria','1'],{sensitive:true})
.addAnswer(['Nos indicas los siguientes datos: ',' ',' ','Nombre del Tutor:  ','Nombfe de la mascota:  ','Motivo de la consulta:  '])
const FlujoRespuestaClienteAntiguoSpaCanino=addKeyword(['spa canino','2'],{sensitive:true})
.addAnswer(['Nos indicas los siguientes datos:  ',' ',' ','Nombre del Tutor:  ','Nombre de la mascota:  ',' ',' ','*Mientras verificamos el estado de vacunas'])

const FlujoPrincipal=addKeyword(['hola','buenos dias','buenas tardes','buen dia','spa canino','veterinaria','spa con traslado','consulta veterinaria'],{sensitive:true})
.addAnswer(['¿Es tu primera vez con nosotros? \n\n Si/No'],{capture:true},(ctx,{fallback}) =>{
    if(!ctx.body.includes('Si','No')){return fallback()}
    console.log('mensaje entrante:  ',ctx.body)
})
const FlujoClienteNuevo = addKeyword(['si'],{sensitive:true})
.addAnswer(['Gracias por comunicarte con nosotros.\n \n ¿Que servicio requieres? \n\n  1-.Veterinaria \n 2-.Spa Canino \n 3-.Farmacia \n 4-.Pet Shop \n  5-.Despacho'],null,null,null,null,null[FlujoRespuestaClienteNuevoVeterinaria,FlujoRespuestaClienteNuevoSpaCanino,FlujoRespuestaFarmacia,FlujoRespuestaPetShop,FlujoRespuestaDespacho])
const FlujoClienteAntiguo =addKeyword(['no'],{sensitive:true})
.addAnswer(['Gracias por comunicarte con nosotros.\n \n ¿Que servicio requieres? \n\n  1-.Veterinaria \n 2-.Spa Canino \n 3-.Farmacia \n 4-.Pet Shop \n  5-.Despacho'],null,null,null,null,null[FlujoRespuestaClienteAntiguoVeterinaria,FlujoRespuestaClienteAntiguoSpaCanino,FlujoRespuestaFarmacia,FlujoRespuestaPetShop,FlujoRespuestaPetShop])

/*const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *doc* para ver la documentación',
            '👉 *gracias*  para ver la lista de videos',
            '👉 *discord* unirte al discord',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )*/

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([FlujoPrincipal])
    const adapterProvider = createProvider(VenomProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main()
