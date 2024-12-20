'use strict'

function onInit() {
  makeInvisible()
  renderGallery()
}

function renderGallery() {
  const imgs = gImgs
  const elGallery = document.querySelector('.gallery')
  const strHtmls = imgs.map(
    (img) => `
          <img onclick="onImgSelect(event, ${img.id})" src="${img.imgUrl}" alt="${img.keywords}">`
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
function onOpenGenerator() {}
function onOpenSaved() {}
