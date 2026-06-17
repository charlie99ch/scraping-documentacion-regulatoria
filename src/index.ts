import { enviarCorreo } from './mail/enviarCorreo.js'
import { generarCorreo } from './mail/mail-template-tasas-bc.js'
import { resultadoTasasSchema } from './schemas/envSchema.js'
import { scrapeBancoCentral } from './scraping/banco-central-tasas.js'
import { logger } from './utils/logger.js'

async function main() {
	const datos = await scrapeBancoCentral()
	if (datos.error) {
		logger.error(`Error al obtener datos: ${datos.error}`)
		return
	}

	logger.info('Datos obtenidos del Banco Central:')
	//logger.info(JSON.stringify(datos, null, 2))
	// Validar datos de entrada
	const validadoData = resultadoTasasSchema.safeParse(datos)
	if (!validadoData.success) {
		logger.error('Datos de entrada inválidos:')
		logger.error(JSON.stringify(validadoData.error.flatten(), null, 2))
		return
	}

	const emailTasasBC = generarCorreo(validadoData.data)
	logger.info('Email generado para Banco Central:')
	//logger.info(JSON.stringify(emailTasasBC, null, 2))

	// Centralizar: primero generas datos, luego los envías
	await enviarCorreo(
		emailTasasBC,
		`Informe Tasas Banco Central - ${validadoData.data.fecha ?? 'Actualización'}`
	)
}

await main()
// 📌 Inicio de mes (día 1 a las 00:00)
Bun.cron('@monthly', async () => {
	logger.info('Inicio de mes:')
	await main()
})

// 📌 Fin de mes (último día a las 23:59)
Bun.cron('59 23 * * *', async () => {
	const now = new Date()
	const tomorrow = new Date(now)
	tomorrow.setDate(now.getDate() + 1)

	// Si mañana es día 1 → hoy fue último día del mes
	if (tomorrow.getDate() === 1) {
		logger.info('Fin de mes:')
		await main()
	}
})
