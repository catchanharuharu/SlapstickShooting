const canvas = document.querySelector('#dota-canvas')
const ctx = canvas.getContext("2d")
const result = document.querySelector("#result")
const size = 100
let x = canvas.width/2
let y = canvas.height/2
let dx = 15
let dy = 15
const speedList = [6,8,10,12,-6,-8,-10,-12]

const explosionSound = new Audio('mp3/small_explosion1.mp3')
explosionSound.volume = 0.3
const runAwaySound = new Audio('mp3/dotadota.mp3')
runAwaySound.volume = 0.3
const DotaImg = new Image()
DotaImg.src = 'img/dotaface.png'

canvas.addEventListener("click",(e) => {
    dx = 0
    dy = 0

    const rect = e.target.getBoundingClientRect()
    const xClick = e.clientX -rect.left
    const yClick = e.clientY -rect.top

    if (x-20<=xClick && xClick<=x+size+20 && y-20<=yClick && yClick<=y+size+20) {
        result.innerHTML = "ドタドタ君撃破"
        DotaImg.src = 'img/explosion.png'
        explosionSound.play()
    } else {
        result.innerHTML = "悪い！ドタらせてもらうわ！"
        runAwaySound.play()
    }
    
},{once:true})


const drawDota = () => {
    ctx.drawImage(DotaImg,x,y,size,size)
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDota()
    
    if(x + dx > canvas.width - size  || x + dx < 0) {
        dx = -dx
        dy = speedList[Math.floor(Math.random()*speedList.length)]
    }
    if(y + dy > canvas.height - size || y + dy < 0 ) {
        dy = -dy
        dx = speedList[Math.floor(Math.random()*speedList.length)]
    }
    
    x += dx
    y += dy
}

Start = setInterval(draw,20)
