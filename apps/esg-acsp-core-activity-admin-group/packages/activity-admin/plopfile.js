import { getPlopGeneratorData } from './plop-tool/vite/server.js';

// const templatesDir = './plop-tool/plop-templates'
export default async function (plop) {
  const plopGeneratorData = await getPlopGeneratorData();
  plop.setWelcomeMessage(plopGeneratorData.welcomeMessage);
  for (const item of plopGeneratorData.generators) {
    plop.setGenerator(item.name, item.config);
  }
}
