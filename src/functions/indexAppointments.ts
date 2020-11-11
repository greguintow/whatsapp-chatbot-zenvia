import db from '../database/connection' // Importação da conexão do Banco de Dados
import sendMessage from './sendMessage' // Importação da função de envio de mensagem

const showDate = (datetime: string) => {
	// Altera a exibição da data e da hora
	const date_time = datetime.split(' ')
	const date = date_time[0].split('-')

	return `${date[2]}/${date[1]}/${date[0]} às ${date_time[1]}`
}

async function indexAppointments() {
	const indexedAppointment = await db('appointments').select('*') // Busca no banco de dados os compromissos na data e hora especificadas

	if (indexedAppointment.length !== 0) {
		const message = `*Seus compromissos são:*${indexedAppointment.map(
			(appointment) => `\n\t${showDate(appointment.datetime)} - ${appointment.description}`
		)}`
		sendMessage(message)
	} else {
		sendMessage('Você não possui compromissos marcados.')
	}
}

export default indexAppointments
