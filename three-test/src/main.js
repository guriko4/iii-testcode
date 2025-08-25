import './style.scss';
import * as THREE from 'three';
import { gsap } from 'gsap';

/* ---------- 基本セット ---------- */
const app = document.getElementById('app');

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
app.appendChild(renderer.domElement)

const scene = new THREE.Scene()

// カメラ：最初は“真上”から（Z=0.01は lookAt 計算のための微小値）
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
)
camera.position.set(0, 200, 0.01)
camera.lookAt(0, 0, 0)

/* ---------- ライト（ほんのり） ---------- */
scene.add(new THREE.AmbientLight(0xffffff, 0.7))
const dir = new THREE.DirectionalLight(0xffffff, 0.4)
dir.position.set(100, 200, 150)
scene.add(dir)

/* ---------- “青い四角”のリング ---------- */
const ring = new THREE.Group()
scene.add(ring)

const R = 100  // 半径
const N = 24  // 四角の枚数
const W = 40, H = 40  // 四角の大きさ

const geo = new THREE.PlaneGeometry(W, H)
const mat = new THREE.MeshBasicMaterial({
  color: 0x4bb3ff,
  transparent: true,
  opacity: 0.25,
  side: THREE.DoubleSide,
})

for (let i = 0; i < N; i++) {
  const angle = (i / N) * Math.PI * 2
  const m = new THREE.Mesh(geo, mat.clone())
  m.position.set(Math.cos(angle) * R, 0, Math.sin(angle) * R)
  m.lookAt(0, 0, 0)
  ring.add(m)
}

/* ---------- レンダーループ ---------- */
const clock = new THREE.Clock()
function tick() {
  const t = clock.getElapsedTime()
  ring.rotation.y += 0.01  // クルクル回す（速度は調整可）

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()

/* ---------- カメラの“真上→横アングル”遷移＆人物ふわっ ---------- */
const hero = document.getElementById('hero')
const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

// 少し“読み込んでる感”を出してから視点移動開始（delayは好みで）
tl.to({}, { duration: 1.0 })

// リングをちょい傾けつつ、カメラを真上 → 斜め前へ
tl.to(ring.rotation, { x: -Math.PI / 6, duration: 1.4 }, '<')
tl.to(camera.position, {
  x: 0,
  y: 60,
  z: 180,
  duration: 1.4,
  onUpdate: () => camera.lookAt(0, 0, 0)
}, '<')

// 視点が決まったら、人物を“ふわっ”
tl.to(hero, {
  opacity: 1,
  duration: 1.0,
  ease: 'power2.out'
}, '>-0.1')
tl.to(hero, {
  y: 0,
  scale: 1,
  duration: 1.0,
  ease: 'power2.out'
}, '<')

/* ---------- リサイズ対応 ---------- */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})