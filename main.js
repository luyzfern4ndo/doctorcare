window.addEventListener('scroll', onScroll)
onScroll()
/*
  Adicionando o eventListner no window, 
  não teremos erro de referência.
  Não vai acontecer de carregar a página e não ter
  a função carregada.
  (Primeiro carrega o HTML e depois o Javascript).
  É como se a função não existisse, por isso o erro de referência.
  Executando o onScroll uma única vez, o scroll vai estar funcionando
  
*/
function onScroll() {
  showNavOnScroll()
  showBackToTopButtonOnScroll()

  activateMenuAtCurrentSection(home)
  activateMenuAtCurrentSection(services)
  activateMenuAtCurrentSection(about)
  activateMenuAtCurrentSection(contact)
}

const targetDiv = document.querySelector('.targetLine')

// scrollY - onde o scroll está
// innerHeight - altura VISÍVEL da tela
function activateMenuAtCurrentSection(section) {
  // linha alvo
  const targetLine = scrollY + innerHeight / 2

  // verificar se a seção passou da linha
  // quais  dados vou precisar?
  const sectionTop = section.offsetTop // 0
  const sectionHeight = section.offsetHeight // 866

  // o topo da seção passou ou ultrapassou a linha alvo
  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop

  // verificar se a base está abaixo da linha alvo
  // quais dados vou precisar?
  const sectionEndsAt = sectionTop + sectionHeight

  // final da seção passou da linha alvo
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine

  // console.log('O fundo da seção passou da linha?', sectionEndPassedTargetLine)

  // limites da seção
  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine

  console.log(sectionBoundaries)
  const sectionId = section.getAttribute('id')
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

  menuElement.classList.remove('active')

  if (sectionBoundaries) {
    menuElement.classList.add('active')
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigations.classList.add('scroll')
  } else {
    navigations.classList.remove('scroll')
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 400) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

function openMenu() {
  document.body.classList.add('menu-expanded')
}

function closeMenu() {
  document.body.classList.remove('menu-expanded')
}

ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700
}).reveal(`
#home, 
#home img, 
#home .stats, 
#services,
#services header,
#services .card,
#about,
#about header,
#about .content
`)
