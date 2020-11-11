import db from '../database/connection' // Importação da conexão com o Banco de Dados
import sendMessage from './sendMessage' // Importação da função de envio de mensagem
import removeAppointments from './removeAppointments' // Importação da função de remoção de compromisso

const fixZero = (datetime: string) => {
	//Função para corrigir o 0 no horário
	if (datetime.split(':')[0].substr(-2, 1) === ' ') {
		return `${datetime.substr(0, 11)}0${datetime.substr(11, 4)}`
	} else {
		return datetime
	}
}

export const checkAndSendReminder = async () => {
	// Função que verica a existência de compromisso e envia lembrete se houver
	const datetime = `${fixZero(new Date().toLocaleString('pt-BR'))}`.substr(0, 16) // Captura a data e o horário atual
	const appointments = await db('appointments').where('datetime', '=', datetime).select('*') // Busca no Banco de Dados se existe um compromisso agora

	if (appointments.length !== 0) {
		// Se houver algum compromisso envia uma mensagem de lembrete
		const message = `Lembre-se que você precisa: ${appointments.map(
			(appointment) => `\n*${appointment.description}*`
		)}`
		sendMessage(message)
		removeAppointments(datetime, false) // Remove o compromisso no banco de dados e não notifica o usuário
	}
}
