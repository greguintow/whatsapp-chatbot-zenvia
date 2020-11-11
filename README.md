# whatsapp-chatbot-zenvia
This project aims to create an example of creating a chatbot for WhatsApp using the Zenvia API.

If you want to use this app, you need to create an account on the app.zenvia.com website, set up the sandbox with your phone number and replace in the file /src/functions/sendMessage.ts YOUR_TOKEN_HERE, YOUR_KEYWORD HERE and YOUR_CONTACT_REGISTERED_HERE to your information generated on the Zenvia website.

You also need to configure the zenvia api to send requests to the webhook created in this project. I recommend using ngrok to expose your port 3000

npm run dev
or
yarn dev
to execute the application
