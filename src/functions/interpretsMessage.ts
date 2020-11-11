import sendMessage from './sendMessage'
import createAppointment from './createAppointment'
import removeAppointments from './removeAppointments'
import indexAppointments from './indexAppointments'

interface Contact {
	name: string
	firstName: string
	lastName: string
}

const interpretsMessage = (contact: Contact, message: any) => {
	switch (message.toLowerCase()) {
		case 'ajuda':
			// Verifica se a mensagem enviada foi "ajuda"
			sendMessage(`
				Olá ${contact.firstName}! Digite algum dos comandos para saber mais:\n\t*lembrete*\n\t*esqueça*\n\t*agenda*
			`)
			break
		case 'lembrete':
			// Verifica se a mensagem enviada foi "lembrete"
			sendMessage(
				`Entendido. Mande uma mensagem com o seguinte formato:\n Me lembre de _____ dia __/__/____ às __:__`
			)
			break
		case 'esqueça':
			// Verifica se a mensagem enviada foi "esqueça"
			sendMessage(
				`Entendido. Mande uma mensagem com o seguinte formato:\n Desmarque tudo no dia __/__/____ às __:__`
			)
			break
		case 'agenda':
			// Verifica se a mensagem enviada foi "agenda"
			indexAppointments()
			break

		default:
			// Se não foi nenhuma das anteriores
			if (message.toLowerCase().split(' ')[1] === 'lembre') {
				// Verifica se é para armazenar o compromisso
				const description = message.split('Me lembre de ')[1].split(' dia')[0] // Armazena a descrição em uma variável
				const date = message.split('dia ')[1].split(' às')[0].split('/') // Armazena a data em uma variável
				const time = message.split('às ')[1] // Armazena o horário em uma variável
				const datetime = `${date[2]}-${date[1]}-${date[0]} ${time}` // Junta a data e o horário em uma variável
				const appointment = {
					description,
					datetime,
				}
				createAppointment(appointment) // Chama a função de criar o compromisso no banco de dados
			} else if (message.toLowerCase().substr(0, 9) === 'desmarque') {
				// Verifica se é para remover o compromisso
				const date = message.split('dia ')[1].split(' às')[0].split('/')
				const time = message.split('às ')[1]

				removeAppointments(`${date[2]}-${date[1]}-${date[0]} ${time}`, true)
			} else {
				// Se não, mande a seguinte mensagem
				sendMessage('Digite *ajuda* para saber todos os comandos.')
				break
			}
	}
}

export default interpretsMessage
