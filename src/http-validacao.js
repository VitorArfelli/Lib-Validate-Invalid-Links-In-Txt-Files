import chalk from "chalk"

function extraiLinks (arrayLinks) {
    return arrayLinks.map((objectLink) => Object.values(objectLink))
}

async function checaStatus (listaUrls) {
    const arryStatus = await Promise
    .all(
        listaUrls.map(async (url) => {
            try {
                const response = await fetch(url);
                return `${response.status} - ${response.statusText}`;
            } catch (erro) {
                return manejaErros(erro);
            }
        })
    )
    return arryStatus
}

function manejaErros (erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado'
    } else {
        return 'Ocorreu algum erro'
    }
    
}

export default async function listaValidada (listaDeLinks) {
    const links = extraiLinks(listaDeLinks)
    const status = await checaStatus(links)
    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}