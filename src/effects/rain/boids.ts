
const scale = 10
const boid = [
    {
        "x": 14 / scale,
        "y": 20 / scale
    },
    {
        "x": 29 / scale,
        "y": 0 / scale
    },
    {
        "x": 14.5 / scale,
        "y": 42.5 / scale
    },
    {
        "x": 0 / scale,
        "y": 0 / scale
    },
    {
        "x": 15 / scale,
        "y": 20 / scale
    }
]

export function getBoid({
    x,
    y,
    rotation,
    acceleration
}) {
    return {
        x: x || 0,
        y: y || 0,
        thickness: 1,
        rotation: rotation || 0,
        acceleration: acceleration || {
            x: 1,
            y: 1
        },
        color: '#fff',
        group: boid,
        localGroup: [],
        size: {
            x: 29 / scale,
            y: 42.5 / scale
        }
    }
}

export function getRandomBoids(amount, x, y) {
    const {
        random,
        c
    } = this
    return [...new Array(amount)].map(() => {
        const boid = getBoid({
            x: x || random(c.width),
            y: y || random(c.height),
            rotation: random(360),
            acceleration: this.getAcceleration()
        })
        return boid
    })
}

function watchBoidForPositionReset(boid) {
    const {c} = this
    if (boid.x - boid.size.x * 2 > c.width) boid.x = -boid.size.x
    if (boid.y - boid.size.y * 2 > c.height) boid.y = -boid.size.y
    if (boid.x + boid.size.x * 2 < 0) boid.x = c.width
    if (boid.y + boid.size.y * 2 < 0) boid.y = c.height
}

function moveBoid(boid) {
    boid.x += Math.sin(-boid.rotation / 360 * Math.PI * 2) * boid.acceleration
    boid.y += Math.cos(boid.rotation / 360 * Math.PI * 2) * boid.acceleration
}

function setLocalGroup(targetBoid) {
    const {
        boids,
        get2DVerticesDistance,
        boidsVision
    } = this
    // watch for boids behavior
    // ... if they abandon group if entering their zone
    targetBoid.localGroup.splice(0)
    boids.forEach(boid => {
        const distance = Math.abs(get2DVerticesDistance(boid, targetBoid))
        if (distance <= boidsVision && targetBoid !== boid) {
            targetBoid.localGroup.push(boid)
        }
    })
}

function addRandomAcceleration(targetBoid) {
    if (targetBoid.acceleration < 5) {
        targetBoid.acceleration += this.random(1) * 0.5
    }
}

function getGroupSummations(targetBoid) {
    if (targetBoid.localGroup.length) {
        const groupSummations = {
            acceleration: 0,
            rotation: 0,
            x: 0,
            y: 0
        }
        targetBoid.localGroup.forEach(boid => {
            groupSummations.acceleration += boid.acceleration
            groupSummations.rotation += boid.rotation
            groupSummations.x += boid.x
            groupSummations.y += boid.y
        })
        return groupSummations
    }
}

function alignKeyToGroup(targetBoid, groupSummations, key) {
    if (groupSummations[key]) {
        const averageKey = (groupSummations[key] + targetBoid[key]) /
                           (targetBoid.localGroup.length + 1)
        if (averageKey) targetBoid[key] = (targetBoid[key] + averageKey) / 2
    }
}

function avoidCollisionToGroup(targetBoid, groupSummations, key) {
    if (groupSummations[key]) {
        const averageKey = groupSummations[key] / targetBoid.localGroup.length
        if (averageKey) targetBoid[key] += (targetBoid[key] - averageKey) * 0.01
    }
}

function setAlignment(targetBoid, groupSummations) {
    alignKeyToGroup(targetBoid, groupSummations, 'acceleration')
    alignKeyToGroup(targetBoid, groupSummations, 'rotation')
}

function avoidCollision(targetBoid, groupSummations) {
    avoidCollisionToGroup(targetBoid, groupSummations, 'x')
    avoidCollisionToGroup(targetBoid, groupSummations, 'y')
}

function coheseTowardsCenter(targetBoid, groupSummations) {
    if (groupSummations.x) {
        const averageGroup = {
            x: groupSummations.x / targetBoid.localGroup.length,
            y: groupSummations.y / targetBoid.localGroup.length,
        }
        const directionVector = {
            x: averageGroup.x - targetBoid.x,
            y: averageGroup.y - targetBoid.y,
        }
        const middleRotatingDirection = 180 - (targetBoid.rotation % 360)

        targetBoid.rotation += 
                        -Math.sign(
                            directionVector.x
                            *
                            directionVector.y
                            * 
                            middleRotatingDirection
                        ) * this.cohesionForce
    }
}

export function updateBoids(targetBoid) {
    setLocalGroup.call(this, targetBoid)
    moveBoid(targetBoid)
    watchBoidForPositionReset.call(this, targetBoid)
    addRandomAcceleration.call(this, targetBoid)

    const groupSummations = getGroupSummations(targetBoid)

    if (groupSummations) {
        setAlignment(targetBoid, groupSummations)
        avoidCollision(targetBoid, groupSummations)
        coheseTowardsCenter.call(this, targetBoid, groupSummations)
    }

    this.ctx.fill()
}