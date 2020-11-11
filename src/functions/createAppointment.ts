import db from '../database/connection'
import sendMessage from './sendMessage'

interface Appointment {
	description: string
	datetime: string
}

async function createAppointment(appointment: Appointment) {
	const { description, datetime } = appointment

	const insertedAppointment = await db('appointments').insert({
		description,
		datetime,
	})

	if (typeof insertedAppointment[0] === 'number') {
		sendMessage('Compromisso agendado com sucesso.')
	}
}

export default createAppointment
