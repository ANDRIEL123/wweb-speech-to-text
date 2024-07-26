# wweb speech text

This project aims to be able to check the content of audios received via WhatsApp even when we are busy, where the application transcribes the audio received into text, thus making it possible to read the audio.

## Demonstration

https://youtu.be/b9dcZyHvwD8

## Built With

This project was built using the following technologies and tools:

- **Node.js** - JavaScript runtime environment
- **TypeScript** - Typed superset of JavaScript
- **Docker** - Containerization platform
- **RabbitMQ** - Message broker
- **OpenAI** - Speech to text
- **whatsapp-web.js** - WhatsApp client library for Node.js
- **Puppeteer** - Headless Chrome Node.js API

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- Docker
- Docker Compose

### Installation

For the project to work, it is necessary to use the OpenAI API to transform speech into text, in this case you must generate a token and have some balance to be able to use it, generate a key:

https://platform.openai.com/api-keys

If you already have it, you need to create an OPENAI_API_KEY environment variable, it can be added to an .env file or to your operating system's environment variables, verify this:

https://platform.openai.com/docs/quickstart/step-2-set-up-your-api-key

Run on Docker
1. Clone the repository:
    ```sh
    git clone https://github.com/ANDRIEL123/wweb-speech-to-text.git
    ```
2. Navigate to the project directory
3. Build and run the Docker containers:
    ```sh
    docker-compose up --build
    ```

Local run (VS Code)
1. Clone the repository:
    ```sh
    git clone https://github.com/ANDRIEL123/wweb-speech-to-text.git
    ```
2. Navigate to the project directory
3. npm install
4. Run Core + Bot with Run and Debug

![image](https://github.com/user-attachments/assets/4dca3430-986e-455e-a6d6-1fff388e165d)

## Contributing

This repository is currently under development. If you want to contribute please fork the repository and get your hands dirty, and make the changes as you'd like and submit the Pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Andriel Friedrich

[![ Emblema do Gmail ](https://img.shields.io/badge/-andrielmfriedrich@gmail.com-00875f?style=flat-square&logo=Gmail&logoColor=white&link=mailto:andrielmfriedrich@gmail.com)](mailto:andrielmfriedrich@gmail.com) [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andriel-friedrich-59885a110/)
