console.log('dev')
const script = document.createElement('script')
script.src = `http://localhost:8080/js/content_hmr.js`
document.body.appendChild(script)
