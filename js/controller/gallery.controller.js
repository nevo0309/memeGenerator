'use strict'

let gCurrentImg = null

function onInit() {
  makeInvisible()
  renderGallery()
  document.querySelector('canvas').addEventListener('click', onCanvasClick)
}

function renderGallery() {
  const imgs = gImgs
  const elGallery = document.querySelector('.gallery')
  const strHtmls = imgs.map(
    (img) => `
        <img onclick="onImgSelect(event, '${img.id}')" src="${img.imgUrl}" alt="${img.keywords}">
      `
  )
  elGallery.innerHTML = strHtmls.join('')
}

function makeInvisible() {
  document.querySelector('.main-generator').classList.add('hidden')
  document.querySelector('.main-saved').classList.add('hidden')
}

function onOpenGallery() {
  document.querySelector('.main-generator').classList.add('hidden')
  document.querySelector('.main-saved').classList.add('hidden')
  document.querySelector('.main-gallery').classList.remove('hidden')

  renderGallery()
}
function onOpenGenerator() {} //dont forget
function onOpenSaved() {} //dont forget

function onImgSelect(ev, imgId) {
  document.querySelector('.gallery').classList.add('hidden')
  document.querySelector('.meme-editor').classList.remove('hidden')

  const currImg = findImg(imgId)
  const img = new Image()
  img.src = currImg.imgUrl
  img.onload = () => {
    gCurrentImg = img
    createMeme(imgId)
    onRenderMeme(img)
  }

  console.log('img', currImg)
}
