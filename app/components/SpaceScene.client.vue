<template>
  <div ref="container" class="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const container = ref<HTMLDivElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let rafId = 0
let disposed = false
let cleanup: (() => void) | null = null

onBeforeUnmount(() => {
  disposed = true
  cleanup?.()
})

onMounted(async () => {
  // .client components bind template refs one tick after mount (Nuxt docs)
  await nextTick()
  const el = container.value
  if (!el || disposed) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer = window.matchMedia('(pointer: fine)').matches

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 10

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  el.appendChild(renderer.domElement)

  /* ---------- Particle field: distant stars + drifting spice ---------- */
  const COUNT = 1600
  const SPREAD = { x: 26, y: 16, z: 12 }
  const positions = new Float32Array(COUNT * 3)
  const origins = new Float32Array(COUNT * 3)
  const velocities = new Float32Array(COUNT * 3)
  const colors = new Float32Array(COUNT * 3)
  const sizes = new Float32Array(COUNT)
  const phases = new Float32Array(COUNT)

  const starSilver = new THREE.Color('#c9ccd1')
  const starWhite = new THREE.Color('#f5f5f7')
  const spiceGold = new THREE.Color('#d4af37')

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3
    positions[i3] = origins[i3] = (Math.random() - 0.5) * SPREAD.x
    positions[i3 + 1] = origins[i3 + 1] = (Math.random() - 0.5) * SPREAD.y
    positions[i3 + 2] = origins[i3 + 2] = (Math.random() - 0.5) * SPREAD.z - 6

    const roll = Math.random()
    const c = roll < 0.12 ? spiceGold : roll < 0.5 ? starWhite : starSilver
    const intensity = 0.22 + Math.random() * 0.5
    colors[i3] = c.r * intensity
    colors[i3 + 1] = c.g * intensity
    colors[i3 + 2] = c.b * intensity

    sizes[i] = 0.4 + Math.random() * 0.9
    phases[i] = Math.random() * Math.PI * 2
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

  const particleMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 } },
    vertexShader: /* glsl */ `
      attribute float aSize;
      attribute float aPhase;
      varying vec3 vColor;
      varying float vTwinkle;
      uniform float uTime;
      void main() {
        vColor = color;
        vTwinkle = 0.6 + 0.4 * sin(uTime * 0.8 + aPhase);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = min(aSize * (90.0 / -mvPosition.z), 8.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vTwinkle;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float glow = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vColor, glow * glow * vTwinkle);
      }
    `,
    vertexColors: true
  })

  const points = new THREE.Points(geometry, particleMaterial)
  scene.add(points)

  /* ---------- Mouse: a gentle warp in space-time ---------- */
  const raycaster = new THREE.Raycaster()
  const mouseNdc = new THREE.Vector2(-10, -10)
  const mouseWorld = new THREE.Vector3(9999, 9999, 0)
  const interactPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  let mouseActive = false

  const onMouseMove = (e: MouseEvent) => {
    mouseNdc.x = (e.clientX / window.innerWidth) * 2 - 1
    mouseNdc.y = -(e.clientY / window.innerHeight) * 2 + 1
    mouseActive = true
  }
  const onMouseLeave = () => {
    mouseActive = false
  }
  if (finePointer && !reducedMotion) {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
  }

  /* ---------- Lights: dim ambient, warm key, cool rim ---------- */
  scene.add(new THREE.AmbientLight(0xffffff, 0.35))
  const keyLight = new THREE.DirectionalLight(0xffe9c4, 2.2)
  keyLight.position.set(4, 6, 6)
  scene.add(keyLight)
  const rimLight = new THREE.DirectionalLight(0x9bb0d4, 1.4)
  rimLight.position.set(-6, -2, -4)
  scene.add(rimLight)

  /* ---------- Astronaut: monochrome, weightless, scroll-bound ---------- */
  const astronautGroup = new THREE.Group()
  astronautGroup.visible = false
  scene.add(astronautGroup)

  new GLTFLoader().load('/models/astronaut.glb', (gltf) => {
    if (disposed) return
    const model = gltf.scene
    const monochrome = new THREE.MeshStandardMaterial({
      color: 0xd8dadf,
      metalness: 0.15,
      roughness: 0.7
    })
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = monochrome
      }
    })

    // Center the model on its own origin so the group tumbles around its middle
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)
    const height = box.getSize(new THREE.Vector3()).y
    model.scale.setScalar(3.4 / height)

    astronautGroup.add(model)
    astronautGroup.visible = true
  }, undefined, () => {
    /* Missing model: the starfield alone still carries the scene */
  })

  /* ---------- Planets: distant, slow, regal ---------- */
  const saturn = new THREE.Group()

  // Banded, streaked, storm-flecked surface — longitudinal detail makes the spin visible
  const satCanvas = document.createElement('canvas')
  satCanvas.width = 512
  satCanvas.height = 256
  const sg = satCanvas.getContext('2d')!
  const satBands = ['#c9a76a', '#bd9a5e', '#d4b278', '#c2a065', '#cfa96c', '#b8945a', '#d8b87e', '#c49f63', '#ba9257', '#d1ad72']
  const bandH = satCanvas.height / satBands.length
  satBands.forEach((col, i) => {
    sg.fillStyle = col
    sg.fillRect(0, i * bandH, satCanvas.width, bandH + 1)
  })
  for (let i = 0; i < 170; i++) {
    const warm = Math.random() < 0.5
    sg.fillStyle = `rgba(${warm ? '255,240,210' : '120,90,50'}, ${0.05 + Math.random() * 0.08})`
    sg.beginPath()
    sg.ellipse(Math.random() * 512, Math.random() * 256, 30 + Math.random() * 120, 3 + Math.random() * 8, 0, 0, Math.PI * 2)
    sg.fill()
  }
  // a great pale storm and its dark eye
  sg.fillStyle = 'rgba(232, 208, 162, 0.85)'
  sg.beginPath()
  sg.ellipse(150, 172, 27, 12, -0.2, 0, Math.PI * 2)
  sg.fill()
  sg.fillStyle = 'rgba(150, 112, 62, 0.55)'
  sg.beginPath()
  sg.ellipse(150, 172, 15, 6.5, -0.2, 0, Math.PI * 2)
  sg.fill()
  const satTexture = new THREE.CanvasTexture(satCanvas)
  satTexture.colorSpace = THREE.SRGBColorSpace

  const saturnBody = new THREE.Mesh(
    new THREE.SphereGeometry(1.0, 64, 48),
    new THREE.MeshStandardMaterial({ map: satTexture, roughness: 0.95 })
  )

  // Ring bands with a Cassini-style gap; UVs remapped so the texture runs by radius
  const ringCanvas = document.createElement('canvas')
  ringCanvas.width = 512
  ringCanvas.height = 8
  const rg = ringCanvas.getContext('2d')!
  for (let x = 0; x < 512; x++) {
    const p = x / 512
    let a = 0.45 + 0.3 * Math.sin(p * 40) * Math.sin(p * 13)
    if (p < 0.06) a *= p / 0.06
    if (p > 0.55 && p < 0.63) a *= 0.12
    if (p > 0.94) a *= (1 - p) / 0.06
    const shade = 195 + Math.floor(35 * Math.sin(p * 23))
    rg.fillStyle = `rgba(${shade}, ${shade - 35}, 110, ${Math.max(0, Math.min(1, a))})`
    rg.fillRect(x, 0, 1, 8)
  }
  const ringTexture = new THREE.CanvasTexture(ringCanvas)
  ringTexture.colorSpace = THREE.SRGBColorSpace

  const RING_INNER = 1.35
  const RING_OUTER = 2.3
  const ringGeo = new THREE.RingGeometry(RING_INNER, RING_OUTER, 128, 1)
  const ringPos = ringGeo.attributes.position
  const ringUv = ringGeo.attributes.uv
  const rv = new THREE.Vector3()
  for (let i = 0; i < ringPos.count; i++) {
    rv.fromBufferAttribute(ringPos, i)
    const r = Math.sqrt(rv.x * rv.x + rv.y * rv.y)
    ringUv.setXY(i, (r - RING_INNER) / (RING_OUTER - RING_INNER), 0.5)
  }

  const saturnRing = new THREE.Mesh(
    ringGeo,
    new THREE.MeshStandardMaterial({
      map: ringTexture,
      transparent: true,
      depthWrite: false,
      roughness: 0.9,
      side: THREE.DoubleSide
    })
  )
  saturnRing.rotation.x = Math.PI / 2.2
  saturn.add(saturnBody, saturnRing)
  // A planetary horizon: huge, rising from the bottom edge of the viewport
  saturn.scale.setScalar(8)
  saturn.position.set(-2.5, -12.5, -10)
  saturn.rotation.z = 0.18
  scene.add(saturn)

  const moonPlanet = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 40, 28),
    new THREE.MeshStandardMaterial({ color: 0x8a93a5, roughness: 1 })
  )
  moonPlanet.position.set(7.4, -4.1, -9)
  scene.add(moonPlanet)

  /* ---------- Scroll state (smoothed in the render loop) ---------- */
  let scrollTarget = 0
  let scrollSmooth = 0
  const onScroll = () => {
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    scrollTarget = window.scrollY / max
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer?.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  /* ---------- Render loop ---------- */
  const clock = new THREE.Clock()
  const isWide = () => window.innerWidth >= 768

  const tick = () => {
    rafId = requestAnimationFrame(tick)
    const t = clock.getElapsedTime()
    particleMaterial.uniforms.uTime.value = t

    scrollSmooth += (scrollTarget - scrollSmooth) * 0.05

    // Particles: repel from cursor, spring home, dampen — elastic space-time warp
    if (!reducedMotion) {
      if (mouseActive) {
        raycaster.setFromCamera(mouseNdc, camera)
        raycaster.ray.intersectPlane(interactPlane, mouseWorld)
      }
      const RADIUS = 3.2
      const RADIUS_SQ = RADIUS * RADIUS
      const pos = geometry.attributes.position.array as Float32Array
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3
        let vx = velocities[i3]
        let vy = velocities[i3 + 1]
        let vz = velocities[i3 + 2]

        if (mouseActive) {
          const dx = pos[i3] - mouseWorld.x
          const dy = pos[i3 + 1] - mouseWorld.y
          const dz = pos[i3 + 2] - mouseWorld.z
          const distSq = dx * dx + dy * dy + dz * dz
          if (distSq < RADIUS_SQ && distSq > 0.0001) {
            const dist = Math.sqrt(distSq)
            const force = ((RADIUS - dist) / RADIUS) * 0.012
            vx += (dx / dist) * force
            vy += (dy / dist) * force
            vz += (dz / dist) * force * 0.3
          }
        }

        // Elastic pull back to origin + damping
        vx += (origins[i3] - pos[i3]) * 0.004
        vy += (origins[i3 + 1] - pos[i3 + 1]) * 0.004
        vz += (origins[i3 + 2] - pos[i3 + 2]) * 0.004
        vx *= 0.94
        vy *= 0.94
        vz *= 0.94

        velocities[i3] = vx
        velocities[i3 + 1] = vy
        velocities[i3 + 2] = vz
        pos[i3] += vx
        pos[i3 + 1] += vy
        pos[i3 + 2] += vz
      }
      geometry.attributes.position.needsUpdate = true

      // The whole field drifts almost imperceptibly
      points.rotation.y = t * 0.008
    }

    // Planets: axial spin fast enough that the bands and storm visibly travel
    if (!reducedMotion) {
      saturnBody.rotation.y = t * 0.2
      saturn.rotation.y = Math.sin(t * 0.04) * 0.05
      moonPlanet.rotation.y = t * 0.09
    }

    // Astronaut: weightless idle float, receding to the right margin on scroll
    if (astronautGroup.visible) {
      const s = scrollSmooth
      const baseX = isWide() ? 3.6 : 0
      astronautGroup.position.x = baseX + s * 1.6
      astronautGroup.position.y = 0.4 + Math.sin(t * 0.5) * 0.15 - s * 1.4
      astronautGroup.position.z = 2 - s * 6.5
      if (!reducedMotion) {
        astronautGroup.rotation.x = Math.sin(t * 0.3) * 0.08 + s * Math.PI * 0.9
        astronautGroup.rotation.y = -0.5 + Math.sin(t * 0.2) * 0.1 + s * Math.PI * 1.6
        astronautGroup.rotation.z = Math.sin(t * 0.25) * 0.06
      }
    }

    renderer?.render(scene, camera)
  }
  tick()

  cleanup = () => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('mousemove', onMouseMove)
    document.documentElement.removeEventListener('mouseleave', onMouseLeave)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    geometry.dispose()
    particleMaterial.dispose()
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (mesh.isMesh) {
        mesh.geometry?.dispose()
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        mats.forEach((m) => m?.dispose())
      }
    })
    renderer?.dispose()
    renderer?.domElement.remove()
    renderer = null
  }
})
</script>
