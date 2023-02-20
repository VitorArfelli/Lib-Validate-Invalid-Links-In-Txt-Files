import fs from 'fs';
import chalk from "chalk";

function extraiLinks(texto) {
    const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return resultados.length ? resultados : "Não há link's no arquivo";
}

function tratarErro (error) {
    throw new Error(chalk.red(error.code, 'Não há arquivo no diretório.'));
}

async function pegarArquivo(diretorioDoArquivo) {
    try {
        const texto = await fs.promises.readFile(diretorioDoArquivo, 'utf-8');
        return extraiLinks(texto);
    } catch (error) {
        tratarErro(error);
    } finally {
        console.log(chalk.yellow('Finalizadoo!!'));
    }
}

export default pegarArquivo;