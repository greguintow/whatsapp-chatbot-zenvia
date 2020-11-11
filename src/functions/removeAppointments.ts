import db from '../database/connection' // Importação da conexão do Banco de Dados
import sendMessage from './sendMessage' // Importação da função de envio de mensagem

async function removeAppointments(datetime: string, notificateUser: boolean) {
	const removedAppointment = await db('appointments').where('datetime', datetime).del() // Tenta remover do banco de dados os compromissos na data e hora especificadas

	if (notificateUser === true && typeof removedAppointment === 'number') {
		// Caso seja para notificar o usuario
		if (removedAppointment === 1) {
			// Verifica se foi removido apenas um compromisso
			sendMessage('Lembrete apagado com sucesso.')
		}
		if (removedAppointment > 1) {
			// Verifica se foram removidos diversos compromissos
			sendMessage('Lembretes apagados com sucesso.')
		}
	}
}

export default removeAppointments
