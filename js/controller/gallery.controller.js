'use strict'

function onInit() {
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
