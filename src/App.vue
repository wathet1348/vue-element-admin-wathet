<template>
  <div id="app">
    <canvas id="canvas" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AppIndex',
  components: {
  },
  data() {
    return {

    }
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      let w, h
      const resizeReset = function() {
        w = canvasBody.width = window.innerWidth
        h = canvasBody.height = window.innerHeight
      }

      const opts = {
        particleColor: 'rgb(30,144,255)',
        lineColor: 'rgb(30,144,255)',
        particleAmount: 70,
        defaultSpeed: 0.5,
        variantSpeed: 0.1,
        defaultRadius: 2,
        variantRadius: 2,
        linkRadius: 200
      }

      window.addEventListener('resize', function() {
        deBouncer()
      })

      const deBouncer = function() {
        clearTimeout(tid)
        tid = setTimeout(function() {
          resizeReset()
        }, delay)
      }

      const checkDistance = function(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
      }

      const linkPoints = function(point1, hubs) {
        for (let i = 0; i < hubs.length; i++) {
          const distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y)
          const opacity = 1 - distance / opts.linkRadius

          if (opacity > 0) {
            drawArea.lineWidth = 0.5
            drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`
            drawArea.beginPath()
            drawArea.moveTo(point1.x, point1.y)
            drawArea.lineTo(hubs[i].x, hubs[i].y)
            drawArea.closePath()
            drawArea.stroke()
          }
        }
      }

      const Particle = function(xPos, yPos) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed
        this.directionAngle = Math.floor(Math.random() * 360)
        this.color = opts.particleColor
        this.radius = opts.defaultRadius + Math.random() * opts.variantRadius
        this.vector = {
          x: Math.cos(this.directionAngle) * this.speed,
          y: Math.sin(this.directionAngle) * this.speed
        }
        this.update = function() {
          this.border()
          this.x += this.vector.x
          this.y += this.vector.y
        }
        this.border = function() {
          if (this.x >= w || this.x <= 0) {
            this.vector.x *= -1
          }
          if (this.y >= h || this.y <= 0) {
            this.vector.y *= -1
          }
          if (this.x > w) this.x = w
          if (this.y > h) this.y = h
          if (this.x < 0) this.x = 0
          if (this.y < 0) this.y = 0
        }
        this.draw = function() {
          drawArea.beginPath()
          drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
          drawArea.closePath()
          drawArea.fillStyle = this.color
          drawArea.fill()
        }
      }

      const particles = []
      function setup() {
        resizeReset()
        for (let i = 0; i < opts.particleAmount; i++) {
          particles.push(new Particle())
        }
        window.requestAnimationFrame(loop)
      }

      function loop() {
        window.requestAnimationFrame(loop)
        drawArea.clearRect(0, 0, w, h)

        for (let i = 0; i < particles.length; i++) {
          particles[i].update()
          particles[i].draw()
        }

        for (let i = 0; i < particles.length; i++) {
          linkPoints(particles[i], particles)
        }
      }

      const canvasBody = document.querySelector('canvas')
      // console.log(canvasBody)
      const drawArea = canvasBody.getContext('2d')
      const delay = 200; let tid
      const rgb = opts.lineColor.match(/\d+/g)
      resizeReset()
      setup()
    }
  }
}

</script>

<style lang="scss">

</style>
