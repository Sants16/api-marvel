const timeStamp = '1658246981'
const apiKey = '78e56bd14299bb283e9e3d1195025ba9'
const md5 = '6680e86261d634f5b51b8d1045647df3'

//pega as infos dos herois
fetch(`http://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}&limit=20`)
.then((response) => response.json())
.then((info) => {
    const divHeroes = document.querySelector('#container_heroes')
    divHeroes.innerHTML = ''
    
    info.data.results.map((hero) => {
        const srcImage = hero.thumbnail.path + '.' + hero.thumbnail.extension
        const nameHero = hero.name
        const idHero = hero.id

        //chama a função de criar o card dos herois com os parametros pegados da api
        createHero(srcImage, nameHero, divHeroes, idHero)
    })
})

//cria o card do heroi
function createHero(sourceImagem, nomeHeroi, divShow, idHeroi) {
    const titulo = document.querySelector('#titulo')
    const link = document.createElement('a')
    const divPai = document.createElement('div')
    const divFilho = document.createElement('div')
    const textName = document.createElement('h1')
    const img = document.createElement('img')
    
    textName.innerText = nomeHeroi
    img.src = sourceImagem
    link.href = `./comic.html?id=${idHeroi}`
    link.innerHTML = 'Saiba Mais'

    divFilho.appendChild(textName)
    divFilho.appendChild(img)
    divFilho.appendChild(link)
    divPai.appendChild(divFilho)
    divShow.appendChild(divPai)

    divFilho.classList.add('content')
    divPai.classList.add('heroes')
    titulo.classList.remove('hide')
}