;(function(){
  var html = document.documentElement
  var saved = localStorage.getItem('theme')
  if(saved){ html.setAttribute('data-theme', saved) }
  var toggle = document.querySelector('[data-theme-toggle]')
  if(toggle){
    toggle.addEventListener('click', function(){
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
      html.setAttribute('data-theme', next)
      localStorage.setItem('theme', next)
      toggle.textContent = next === 'dark' ? '☀️' : '🌙'
    })
    toggle.textContent = html.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.classList.add('in-view') }
    })
  }, { threshold: .12 })
  document.querySelectorAll('.card, .hero-inner').forEach(function(el){ io.observe(el) })
})();

