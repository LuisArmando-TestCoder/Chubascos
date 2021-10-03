import preset from 'canvas-preset'
import { getRandomBoids, updateBoids } from './boids'

export const state = {
    isReadMode: false,
    canPlay: true,
    boids: null
}

export default {
    start(effect) {
        const {
            size,
            draw,
            renderGroup,
            clear,
            c,
            ctx,
            random,
            get2DVerticesDistance,
        } = preset(null, `#${effect}`)

        size()

        const getAcceleration = () => random(3) + 2
        const cohesionForce = 5
        const boidsVision = 100
        const boidsAmount = 50
        const getRandomBoidsBind = {c, random, getAcceleration}

        state.boids = getRandomBoids.call(getRandomBoidsBind, boidsAmount)

        const updateBoidsBind = {
            c,
            boids: state.boids,
            boidsVision,
            get2DVerticesDistance,
            random,
            ctx,
            cohesionForce
        }

        window.addEventListener('mousemove', e => {
            if (state.boids.length) state.boids.splice(0, 1)
            state.boids.push(
                getRandomBoids.call(
                    getRandomBoidsBind,
                    1,
                    e.clientX,
                    e.clientY
                )[0]
            )
        })

        const framesPerSecond = 30

        draw(() => {
            clear('#000')

            if (state.canPlay && !state.isReadMode) {
                renderGroup('lines', state.boids, boid => {
                    ctx.fillStyle = boid.color
    
                    updateBoids.call(updateBoidsBind, boid)
                })
            }
        }, framesPerSecond)
    },
    clean() {
        state.canPlay = false
        state.boids?.splice?.(0)
    }
}