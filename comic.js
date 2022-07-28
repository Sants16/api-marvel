const timeStamp = '1658246981'
const apiKey = '78e56bd14299bb283e9e3d1195025ba9'
const md5 = '6680e86261d634f5b51b8d1045647df3'
const urlSearchParams = new URLSearchParams(window.location.search)
const heroId = urlSearchParams.get('id')
console.log(heroId)

//pega as informações de cada heroi especifico
fetch(`https://gateway.marvel.com/v1/public/characters/${heroId}?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`)
.then((response) => response.json()).then
((info) => {
    info.data.results.map((hero) => {
        const heroName = hero.name
        const heroDesc = hero.description
        const srcImage = hero.thumbnail.path + '.' + hero.thumbnail.extension

        createDesc(heroName, srcImage, heroDesc)
    })
})

//chama a função que pega as infos das comics
getComic(heroId)

//pega as infos das comics
function getComic(idHeroi){
    fetch(`https://gateway.marvel.com/v1/public/characters/${idHeroi}/comics?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}&limit=10`)
   .then((response) => response.json())
   .then((info) => {
       const divComics = document.querySelector('#container_comics')

       info.data.results.map((comic) => {
           const comicName = comic.title
           const comicImg = comic.thumbnail.path + '.' + comic.thumbnail.extension
           const comicDesc = comic.description
           
           //console.log(comic)

           //chama a função que cria a lista dos quadrinhos
           createComic(comicName, comicImg, comicDesc, divComics)
       })
   })
}

function createDesc(nomeHeroi, imagemSource, descHeroi){
   const divHero = document.querySelector('#hero_desc')
   const divPai = document.createElement('div')
   const divFilho = document.createElement('div')
   const heroName = document.createElement('h1')
   const img = document.createElement('img')
   const heroDesc = document.createElement('p')

   heroName.innerText = nomeHeroi
   img.src = imagemSource
   img.alt = `${nomeHeroi}`
   heroDesc.innerText = descHeroi


   divFilho.appendChild(heroName)
   divFilho.appendChild(img)
   divFilho.appendChild(heroDesc)
   divPai.appendChild(divFilho)
   divHero.appendChild(divPai)
}

function createComic(nomeComic, sourceImagem, descComic, divMostrar){
   const header = document.querySelector('section h2')
   const divPai = document.createElement('div')
   const divFilho = document.createElement('div')
   const textName = document.createElement('h1')
   const img = document.createElement('img')
   const desc = document.createElement('p')
   
   textName.innerText = nomeComic
   img.src = sourceImagem
   img.alt = 'Nenhuma imagem do quadrinho foi encontrada'
   desc.innerText = descComic


   divFilho.appendChild(textName)
   divFilho.appendChild(img)
   divFilho.appendChild(desc)
   divPai.appendChild(divFilho)
   divMostrar.appendChild(divPai)

   divFilho.classList.add('content')
   divFilho.classList.add('comics')
   divPai.classList.add('list')
   header.classList.remove('hide')
}