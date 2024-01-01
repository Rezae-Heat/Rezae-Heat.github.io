import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene()

const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf)
scene.add(gridHelper)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
cube.position.set(0, 0.5, -10)
scene.add(cube)

//Adding Event Listeners to DOM
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

//Adding Event Listeners To Home section 
document.getElementById('home-input').addEventListener("click", function() {
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
	scrollPercent = 0;
}, false)

//Adding Event Listener To Purpose section
document.getElementById('purpose-input').addEventListener("click", function() {
	document.documentElement.scrollTop = 159;
	document.body.scrollTop = 159;
	scrollPercent = 20;
}, false)

//Adding Event Listener To Organization
document.getElementById('organization-input').addEventListener("click", function() {
	document.documentElement.scrollTop = 318;
	document.body.scrollTop = 318;
	scrollPercent = 40;
}, false)

//Adding Event Listner To Team Section
document.getElementById('team-input').addEventListener("click", function() {
}, false)

//Adding Event Listener To About Me Section
document.getElementById('about-me-input').addEventListener("click", function() {
}, false)

//Adding Event Listener to Contact Section
document.getElementById('contact-input').addEventListener("click", function() {
}, false)





/* Liner Interpolation
 * lerp(min, max, ratio)
 * eg,
 * lerp(20, 60, .5)) = 40
 * lerp(-20, 60, .5)) = 20
 * lerp(20, 60, .75)) = 50
 * lerp(-20, -10, .1)) = -.19
 */
function lerp(x, y, a) {
    return (1 - a) * x + a * y
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
    return (scrollPercent - start) / (end - start)
}

const animationScripts = []

//add an animation that flashes the cube through 100 percent of scroll
animationScripts.push({
    start: 0,
    end: 101,
    func: () => {
        let g = material.color.g
        g -= 0.05
        if (g <= 0) {
            g = 1.0
        }
        material.color.g = g
    },
})

//add an animation that moves the cube through first 40 percent of scroll
animationScripts.push({
    start: 0,
    end: 40,
    func: () => {
        camera.lookAt(cube.position)
        camera.position.set(0, 1, 2)
        cube.position.z = lerp(-10, 0, scalePercent(0, 40))
        //console.log(cube.position.z)
    },
})

//add an animation that rotates the cube between 40-60 percent of scroll
animationScripts.push({
    start: 40,
    end: 60,
    func: () => {
        camera.lookAt(cube.position)
        camera.position.set(0, 1, 2)
        cube.rotation.z = lerp(0, Math.PI, scalePercent(40, 60))
        //console.log(cube.rotation.z)
    },
})

//add an animation that moves the camera between 60-80 percent of scroll
animationScripts.push({
    start: 60,
    end: 80,
    func: () => {
        camera.position.x = lerp(0, 5, scalePercent(60, 80))
        camera.position.y = lerp(1, 5, scalePercent(60, 80))
        camera.lookAt(cube.position)
        //console.log(camera.position.x + " " + camera.position.y)
    },
})

//add an animation that auto rotates the cube from 80 percent of scroll
animationScripts.push({
    start: 80,
    end: 101,
    func: () => {
        //auto rotate
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
    },
})

function playScrollAnimations() {
    animationScripts.forEach((a) => {
        if (scrollPercent >= a.start && scrollPercent < a.end) {
            a.func()
        }
    })
}

let scrollPercent = 0

document.body.onscroll = () => {
    //calculate the current scroll progress as a percentage
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100;

	console.log(document.documentElement.scrollTop);
}

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    playScrollAnimations()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

window.scrollTo({ top: 0, behavior: 'smooth' })
animate()
