const script = document.createElement('script')
script.src = `https://${process.env.HOST}:${process.env.PORT}/content.js`
document.body.appendChild(script)
