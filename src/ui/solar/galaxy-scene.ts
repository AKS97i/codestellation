import * as THREE from 'three';
import type { RegistryEntry } from '../../domain/project-registry';
import type { Branch } from '../../types';
import { createPlanetIdentity, type PlanetIdentity } from './planet-identity';

const SUN_RADIUS = 0.94;

type RequestFrame = (callback: FrameRequestCallback) => number;
type CancelFrame = (handle: number) => void;

export type SceneIntensity = 'minimal' | 'calm' | 'cinematic';

export interface SceneQualityProfile {
  starCount: number;
  planetSegments: number;
  pixelRatioCap: number;
  antialias: boolean;
  galaxyDust: boolean;
  nebulae: boolean;
  shootingStars: boolean;
  sunFlames: number;
}

export function sceneQualityProfile(intensity: SceneIntensity): SceneQualityProfile {
  if (intensity === 'minimal') {
    return { starCount: 700, planetSegments: 28, pixelRatioCap: 1, antialias: false, galaxyDust: false, nebulae: false, shootingStars: false, sunFlames: 4 };
  }
  if (intensity === 'calm') {
    return { starCount: 1900, planetSegments: 44, pixelRatioCap: 1.25, antialias: true, galaxyDust: true, nebulae: true, shootingStars: true, sunFlames: 9 };
  }
  return { starCount: 3200, planetSegments: 64, pixelRatioCap: 1.5, antialias: true, galaxyDust: true, nebulae: true, shootingStars: true, sunFlames: 14 };
}

export interface BranchOrbitalObject {
  name: string;
  kind: 'moon' | 'satellite';
  stale: boolean;
  totalBranches: number;
}

export function galaxyAccentPalette(hue: number): { base: number; dust: number; nebulae: [number, number, number] } {
  const base = ((Math.round(hue) % 360) + 360) % 360;
  return { base, dust: (base + 18) % 360, nebulae: [base, (base + 48) % 360, (base + 312) % 360] };
}

export function branchOrbitalObjects(branches: Branch[]): BranchOrbitalObject[] {
  const totalBranches = branches.length;
  return branches.slice(0, 12).map((branch) => ({
    name: branch.name,
    kind: branch.location === 'remote' ? 'satellite' : 'moon',
    stale: branch.stale,
    totalBranches,
  }));
}

export function projectOrbitalVisible(entry: Pick<RegistryEntry, 'showBranchMoons' | 'showBranchSatellites'>, kind: 'moon' | 'satellite'): boolean {
  return kind === 'moon' ? entry.showBranchMoons !== false : entry.showBranchSatellites !== false;
}

export function rendererPixelRatio(deviceRatio: number, cap = 1.5): number {
  return Math.min(cap, deviceRatio > 0 ? deviceRatio : 1);
}

export function homeCameraDistance(systemRadius: number, aspect: number): number {
  const fitFactor = aspect < 0.9 ? 2.65 : aspect > 1.7 ? 1.95 : 2.28;
  return systemRadius * fitFactor;
}

export function clampZoomDistance(distance: number, systemRadius: number): number {
  return Math.max(systemRadius * 1.2, Math.min(systemRadius * 4, distance));
}

export function orbitCameraPosition(distance: number, yaw: number, pitch: number): THREE.Vector3 {
  const horizontal = Math.cos(pitch) * distance;
  return new THREE.Vector3(Math.sin(yaw) * horizontal, Math.sin(pitch) * distance, Math.cos(yaw) * horizontal);
}

export function focusCompositionTarget(planetPosition: THREE.Vector3, cameraPosition: THREE.Vector3, offset: number): THREE.Vector3 {
  const viewDirection = planetPosition.clone().sub(cameraPosition).normalize();
  const cameraRight = new THREE.Vector3().crossVectors(viewDirection, new THREE.Vector3(0, 1, 0));
  if (cameraRight.lengthSq() < 0.0001) cameraRight.set(1, 0, 0);
  return planetPosition.clone().add(cameraRight.normalize().multiplyScalar(offset));
}

export function capPlanetScaleForSun(planetRadius: number, planetDistance: number, sunDistance: number, desiredScale: number): number {
  const apparentSizeCap = (0.82 * SUN_RADIUS * planetDistance) / Math.max(0.001, planetRadius * sunDistance);
  return Math.min(desiredScale, apparentSizeCap);
}

export function clampPlanetScale(scale: number): number {
  return Math.max(0.65, Math.min(1.18, scale));
}

export function initialPlanetAngle(index: number, total: number): number {
  return -0.3 + (index / Math.max(1, total)) * Math.PI * 2;
}

export class SceneLoop {
  private frame: number | null = null;

  constructor(
    private readonly requestFrame: RequestFrame = (callback) => requestAnimationFrame(callback),
    private readonly cancelFrame: CancelFrame = (handle) => cancelAnimationFrame(handle)
  ) {}

  start(render: FrameRequestCallback) {
    if (this.frame !== null) return;
    const tick: FrameRequestCallback = (time) => {
      render(time);
      this.frame = this.requestFrame(tick);
    };
    this.frame = this.requestFrame(tick);
  }

  stop() {
    if (this.frame !== null) this.cancelFrame(this.frame);
    this.frame = null;
  }

  isRunning(): boolean {
    return this.frame !== null;
  }
}

export interface GalaxyProjectPosition {
  id: string;
  x: number;
  y: number;
  depth: number;
  visible: boolean;
}

interface GalaxySceneOptions {
  container: HTMLElement;
  entries: RegistryEntry[];
  graphNodeCounts?: Map<string, number>;
  projectBranches?: Map<string, Branch[]>;
  sceneIntensity?: SceneIntensity;
  galaxyAccentHue?: number;
  onProjectPosition?: (position: GalaxyProjectPosition) => void;
}

interface PlanetOrbital {
  pivot: THREE.Group;
  kind: 'moon' | 'satellite';
  speed: number;
}

interface PlanetBody {
  id: string;
  identity: PlanetIdentity;
  orbitPlane: THREE.Group;
  root: THREE.Group;
  surface: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  atmosphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  clouds: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> | null;
  orbitals: PlanetOrbital[];
  angle: number;
  baseScale: number;
}

interface CameraTransition {
  startedAt: number;
  duration: number;
  fromPosition: THREE.Vector3;
  toPosition: THREE.Vector3;
  fromTarget: THREE.Vector3;
  toTarget: THREE.Vector3;
  onComplete?: () => void;
}

interface SunFlame {
  sprite: THREE.Sprite;
  material: THREE.SpriteMaterial;
  angle: number;
  phase: number;
}

interface ShootingStar {
  line: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  velocity: THREE.Vector3;
  age: number;
  duration: number;
}

function seeded(seed: number) {
  let state = seed || 1;
  return () => {
    state = Math.imul(state ^ (state >>> 15), 1 | state);
    state ^= state + Math.imul(state ^ (state >>> 7), 61 | state);
    return ((state ^ (state >>> 14)) >>> 0) / 4294967296;
  };
}

function hsl(hue: number, saturation: number, lightness: number): string {
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

function makePlanetTexture(identity: PlanetIdentity): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) return new THREE.CanvasTexture(canvas);
  const random = seeded(identity.seed);

  if (identity.hasLife) {
    const ocean = context.createLinearGradient(0, 0, 0, canvas.height);
    ocean.addColorStop(0, '#4cb2ca');
    ocean.addColorStop(0.46, '#17668e');
    ocean.addColorStop(1, '#082c55');
    context.fillStyle = ocean;
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let continent = 0; continent < 54; continent++) {
      const x = random() * canvas.width;
      const y = 24 + random() * (canvas.height - 48);
      const radiusX = 8 + random() * 44;
      const radiusY = 5 + random() * 23;
      context.beginPath();
      context.ellipse(x, y, radiusX, radiusY, (random() - 0.5) * 1.4, 0, Math.PI * 2);
      context.fillStyle = random() > 0.34 ? hsl(92 + random() * 42, 42 + random() * 28, 24 + random() * 24) : hsl(38, 46, 40);
      context.globalAlpha = 0.58 + random() * 0.32;
      context.fill();
    }

    context.globalAlpha = 0.18;
    context.fillStyle = '#d7fbff';
    context.fillRect(0, 0, canvas.width, 9);
    context.fillRect(0, canvas.height - 9, canvas.width, 9);
    context.globalAlpha = 1;
    const livingTexture = new THREE.CanvasTexture(canvas);
    livingTexture.colorSpace = THREE.SRGBColorSpace;
    livingTexture.wrapS = THREE.RepeatWrapping;
    livingTexture.anisotropy = 4;
    return livingTexture;
  }

  const base = context.createLinearGradient(0, 0, 0, canvas.height);
  base.addColorStop(0, hsl(identity.surfaceHue + 8, 58, 55));
  base.addColorStop(0.5, hsl(identity.surfaceHue, 62, 37));
  base.addColorStop(1, hsl(identity.surfaceHue - 12, 70, 20));
  context.fillStyle = base;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let band = 0; band < 22; band++) {
    const y = random() * canvas.height;
    const height = 3 + random() * 24;
    const hue = identity.surfaceHue + (random() - 0.5) * 42;
    context.fillStyle = hsl(hue, 44 + random() * 28, 24 + random() * 32);
    context.globalAlpha = 0.08 + random() * 0.18;
    context.fillRect(0, y, canvas.width, height);
  }

  for (let cloud = 0; cloud < 90; cloud++) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const rx = 5 + random() * 35;
    const ry = 2 + random() * 11;
    context.beginPath();
    context.ellipse(x, y, rx, ry, random() * Math.PI, 0, Math.PI * 2);
    context.fillStyle = random() > 0.5 ? '#ffffff' : '#060817';
    context.globalAlpha = 0.025 + random() * 0.09;
    context.fill();
  }

  context.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

function makeCloudTexture(seed: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) return new THREE.CanvasTexture(canvas);
  const random = seeded(seed ^ 0x51c10d5);
  for (let cloud = 0; cloud < 95; cloud++) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const width = 10 + random() * 55;
    const height = 2 + random() * 10;
    const gradient = context.createRadialGradient(x, y, 0, x, y, width);
    gradient.addColorStop(0, `rgba(255,255,255,${0.18 + random() * 0.34})`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.save();
    context.translate(x, y);
    context.scale(1, height / width);
    context.beginPath();
    context.arc(0, 0, width, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

function makeGlowTexture(inner: string, middle: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) return new THREE.CanvasTexture(canvas);
  const gradient = context.createRadialGradient(128, 128, 2, 128, 128, 126);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(0.16, middle);
  gradient.addColorStop(0.48, 'rgba(255, 154, 67, 0.16)');
  gradient.addColorStop(1, 'rgba(28, 18, 86, 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeNebulaTexture(hue: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) return new THREE.CanvasTexture(canvas);
  const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 126);
  gradient.addColorStop(0, `hsla(${hue}, 88%, 67%, 0.34)`);
  gradient.addColorStop(0.32, `hsla(${hue + 22}, 72%, 48%, 0.14)`);
  gradient.addColorStop(1, `hsla(${hue}, 75%, 30%, 0)`);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

function makeFlameTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) return new THREE.CanvasTexture(canvas);
  const gradient = context.createLinearGradient(64, 248, 64, 8);
  gradient.addColorStop(0, 'rgba(255,246,180,0.96)');
  gradient.addColorStop(0.28, 'rgba(255,151,48,0.78)');
  gradient.addColorStop(0.7, 'rgba(255,70,18,0.24)');
  gradient.addColorStop(1, 'rgba(255,38,8,0)');
  context.fillStyle = gradient;
  context.beginPath();
  context.moveTo(64, 4);
  context.bezierCurveTo(90, 78, 112, 154, 78, 248);
  context.bezierCurveTo(68, 255, 60, 255, 50, 248);
  context.bezierCurveTo(14, 154, 42, 74, 64, 4);
  context.fill();
  return new THREE.CanvasTexture(canvas);
}

function easeInOutCubic(value: number): number {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export class GalaxyScene {
  readonly canvas: HTMLCanvasElement;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(40, 1, 0.1, 160);
  private readonly renderer: THREE.WebGLRenderer;
  private readonly quality: SceneQualityProfile;
  private readonly loop = new SceneLoop();
  private readonly planets = new Map<string, PlanetBody>();
  private readonly disposableTextures: THREE.Texture[] = [];
  private readonly homePosition = new THREE.Vector3();
  private readonly homeTarget = new THREE.Vector3();
  private readonly lookTarget = new THREE.Vector3();
  private readonly reducedMotion: boolean;
  private sunMaterial: THREE.ShaderMaterial | null = null;
  private sunFlares: THREE.Group | null = null;
  private readonly sunFlames: SunFlame[] = [];
  private starfield: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> | null = null;
  private galaxyDust: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> | null = null;
  private readonly shootingStars: ShootingStar[] = [];
  private nextShootingStarAt = 3600;
  private readonly shootingRandom = seeded(0x57a25);
  private transition: CameraTransition | null = null;
  private focusedId: string | null = null;
  private highlightedId: string | null = null;
  private lastTime: number | null = null;
  private width = 1;
  private height = 1;
  private systemRadius = 5.2;
  private homeDistance = 0;
  private cameraYaw = 0;
  private cameraPitch = 0.23;
  private dragging = false;
  private dragX = 0;
  private dragY = 0;
  private disposed = false;

  private readonly handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    this.zoomBy(Math.exp(event.deltaY * 0.0012));
  };

  private readonly handlePointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || this.focusedId) return;
    this.dragging = true;
    this.dragX = event.clientX;
    this.dragY = event.clientY;
    this.canvas.setPointerCapture(event.pointerId);
    this.canvas.classList.add('is-dragging');
  };

  private readonly handlePointerMove = (event: PointerEvent) => {
    if (!this.dragging) return;
    const deltaX = event.clientX - this.dragX;
    const deltaY = event.clientY - this.dragY;
    this.dragX = event.clientX;
    this.dragY = event.clientY;
    this.rotateBy(-deltaX * 0.005, deltaY * 0.004);
  };

  private readonly handlePointerUp = (event: PointerEvent) => {
    if (!this.dragging) return;
    this.dragging = false;
    if (this.canvas.hasPointerCapture(event.pointerId)) this.canvas.releasePointerCapture(event.pointerId);
    this.canvas.classList.remove('is-dragging');
  };

  constructor(private readonly options: GalaxySceneOptions) {
    this.reducedMotion = Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
    this.quality = sceneQualityProfile(options.sceneIntensity ?? 'cinematic');
    this.renderer = new THREE.WebGLRenderer({
      antialias: this.quality.antialias,
      alpha: true,
      powerPreference: options.sceneIntensity === 'minimal' ? 'low-power' : 'high-performance',
    });
    this.renderer.setPixelRatio(rendererPixelRatio(window.devicePixelRatio, this.quality.pixelRatioCap));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.canvas = this.renderer.domElement;
    this.canvas.className = 'cs-galaxy-canvas';
    this.canvas.setAttribute('aria-hidden', 'true');
    options.container.appendChild(this.canvas);
    this.canvas.addEventListener('wheel', this.handleWheel, { passive: false });
    this.canvas.addEventListener('pointerdown', this.handlePointerDown);
    this.canvas.addEventListener('pointermove', this.handlePointerMove);
    this.canvas.addEventListener('pointerup', this.handlePointerUp);
    this.canvas.addEventListener('pointercancel', this.handlePointerUp);

    this.scene.fog = new THREE.FogExp2(0x050712, 0.013);
    this.createLights();
    this.createStarfield();
    if (this.quality.galaxyDust) this.createGalaxyDust();
    if (this.quality.nebulae) this.createNebulae();
    this.createSun();
    this.createPlanets(options.entries);
    this.resize();
    this.render(0);
  }

  start() {
    if (this.disposed) return;
    this.lastTime = null;
    this.loop.start((time) => this.render(time));
  }

  stop() {
    this.loop.stop();
    this.lastTime = null;
  }

  resize() {
    const rect = this.options.container.getBoundingClientRect();
    this.width = Math.max(1, Math.round(rect.width));
    this.height = Math.max(1, Math.round(rect.height));
    this.renderer.setSize(this.width, this.height, false);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    const lastIdentity = [...this.planets.values()].at(-1)?.identity;
    this.systemRadius = lastIdentity ? lastIdentity.orbitRadius + lastIdentity.radius : 5.2;
    if (this.homeDistance === 0) this.homeDistance = homeCameraDistance(this.systemRadius, this.camera.aspect);
    else this.homeDistance = clampZoomDistance(this.homeDistance, this.systemRadius);
    this.homeTarget.set(0, 0, 0);
    this.updateHomePosition();
    if (!this.focusedId && !this.transition) {
      this.camera.position.copy(this.homePosition);
      this.lookTarget.copy(this.homeTarget);
      this.camera.lookAt(this.lookTarget);
    }
  }

  setHighlightedProject(id: string | null) {
    this.highlightedId = id;
  }

  setProjectHue(id: string, hue: number) {
    const planet = this.planets.get(id);
    if (!planet) return;
    planet.identity.surfaceHue = ((hue % 360) + 360) % 360;
    planet.identity.atmosphereHue = (planet.identity.surfaceHue + 34) % 360;
    const oldTexture = planet.surface.material.map;
    const texture = makePlanetTexture(planet.identity);
    this.disposableTextures.push(texture);
    planet.surface.material.map = texture;
    planet.surface.material.needsUpdate = true;
    oldTexture?.dispose();
    planet.atmosphere.material.color.setHSL(planet.identity.atmosphereHue / 360, 0.76, planet.identity.hasLife ? 0.72 : 0.66);
  }

  setProjectScale(id: string, scale: number) {
    const planet = this.planets.get(id);
    if (planet) planet.baseScale = clampPlanetScale(scale);
  }

  setProjectLife(id: string, hasLife: boolean) {
    const planet = this.planets.get(id);
    if (!planet || planet.identity.hasLife === hasLife) return;
    planet.identity.hasLife = hasLife;
    const oldTexture = planet.surface.material.map;
    const texture = makePlanetTexture(planet.identity);
    this.disposableTextures.push(texture);
    planet.surface.material.map = texture;
    planet.surface.material.needsUpdate = true;
    oldTexture?.dispose();

    if (planet.clouds) {
      planet.root.remove(planet.clouds);
      planet.clouds.geometry.dispose();
      planet.clouds.material.map?.dispose();
      planet.clouds.material.dispose();
      planet.clouds = null;
    }
    if (hasLife) {
      const cloudTexture = makeCloudTexture(planet.identity.seed);
      this.disposableTextures.push(cloudTexture);
      planet.clouds = new THREE.Mesh(
        new THREE.SphereGeometry(planet.identity.radius * 1.022, Math.max(24, this.quality.planetSegments - 4), Math.max(24, this.quality.planetSegments - 4)),
        new THREE.MeshStandardMaterial({ map: cloudTexture, transparent: true, opacity: 0.72, depthWrite: false, roughness: 1 })
      );
      planet.root.add(planet.clouds);
    }
    planet.atmosphere.material.opacity = hasLife ? 0.24 : 0.16;
  }

  projectHasLife(id: string): boolean {
    return this.planets.get(id)?.identity.hasLife ?? false;
  }

  setProjectOrbitalVisible(id: string, kind: 'moon' | 'satellite', visible: boolean) {
    const planet = this.planets.get(id);
    planet?.orbitals.forEach((orbital) => {
      if (orbital.kind === kind) orbital.pivot.visible = visible;
    });
  }

  zoomBy(multiplier: number) {
    if (this.focusedId || this.transition) return;
    this.homeDistance = clampZoomDistance(this.homeDistance * multiplier, this.systemRadius);
    this.updateHomePosition();
    this.camera.position.copy(this.homePosition);
    this.camera.lookAt(this.homeTarget);
  }

  rotateBy(deltaYaw: number, deltaPitch: number) {
    if (this.focusedId || this.transition) return;
    this.cameraYaw += deltaYaw;
    this.cameraPitch = Math.max(-0.12, Math.min(0.72, this.cameraPitch + deltaPitch));
    this.updateHomePosition();
    this.camera.position.copy(this.homePosition);
    this.lookTarget.copy(this.homeTarget);
    this.camera.lookAt(this.lookTarget);
  }

  fitSystem() {
    if (this.focusedId || this.transition) return;
    this.homeDistance = homeCameraDistance(this.systemRadius, this.camera.aspect);
    this.cameraYaw = 0;
    this.cameraPitch = 0.23;
    this.updateHomePosition();
    this.camera.position.copy(this.homePosition);
    this.lookTarget.copy(this.homeTarget);
    this.camera.lookAt(this.lookTarget);
  }

  focusProject(id: string, onComplete?: () => void) {
    const planet = this.planets.get(id);
    if (!planet) return;
    this.focusedId = id;
    planet.root.updateWorldMatrix(true, false);
    const target = planet.root.getWorldPosition(new THREE.Vector3());
    const direction = this.camera.position.clone().sub(target).normalize();
    const destination = target.clone().add(direction.multiplyScalar(4.6)).add(new THREE.Vector3(0, 0.35, 0));
    const compositionTarget = focusCompositionTarget(target, destination, 0.82);
    this.beginTransition(destination, compositionTarget, onComplete);
  }

  returnToSystem(onComplete?: () => void) {
    this.focusedId = null;
    this.beginTransition(this.homePosition, this.homeTarget, onComplete);
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.stop();
    this.scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      mesh.geometry?.dispose();
      const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
      materials.forEach((material) => material.dispose());
    });
    this.disposableTextures.forEach((texture) => texture.dispose());
    this.canvas.removeEventListener('wheel', this.handleWheel);
    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    this.canvas.removeEventListener('pointermove', this.handlePointerMove);
    this.canvas.removeEventListener('pointerup', this.handlePointerUp);
    this.canvas.removeEventListener('pointercancel', this.handlePointerUp);
    this.renderer.dispose();
    this.canvas.remove();
  }

  private beginTransition(position: THREE.Vector3, target: THREE.Vector3, onComplete?: () => void) {
    if (this.reducedMotion) {
      this.camera.position.copy(position);
      this.lookTarget.copy(target);
      this.camera.lookAt(this.lookTarget);
      onComplete?.();
      return;
    }
    this.transition = {
      startedAt: performance.now(),
      duration: 920,
      fromPosition: this.camera.position.clone(),
      toPosition: position.clone(),
      fromTarget: this.lookTarget.clone(),
      toTarget: target.clone(),
      onComplete,
    };
  }

  private updateHomePosition() {
    this.homePosition.copy(orbitCameraPosition(this.homeDistance, this.cameraYaw, this.cameraPitch));
  }

  private createLights() {
    this.scene.add(new THREE.HemisphereLight(0x9fb2ee, 0x12152d, 1.18));
    this.scene.add(new THREE.AmbientLight(0x52618f, 0.62));
    const starLight = new THREE.PointLight(0xffc06e, 78, 36, 1.65);
    starLight.position.set(0, 0, 0);
    this.scene.add(starLight);
  }

  private createStarfield() {
    const random = seeded(0xc05e57);
    const count = this.quality.starCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const accent = galaxyAccentPalette(this.options.galaxyAccentHue ?? 230).base;
    const palette = [
      new THREE.Color().setHSL(accent / 360, 0.7, 0.76),
      new THREE.Color(0xdde6ff),
      new THREE.Color().setHSL(((accent + 58) % 360) / 360, 0.58, 0.78),
    ];
    for (let index = 0; index < count; index++) {
      const radius = 26 + random() * 92;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.cos(phi);
      positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      const color = palette[Math.floor(random() * palette.length)];
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: 0.11, sizeAttenuation: true, transparent: true, opacity: 0.9, vertexColors: true });
    this.starfield = new THREE.Points(geometry, material);
    this.scene.add(this.starfield);
  }

  private createGalaxyDust() {
    const random = seeded(0x6a1a5e);
    const dustHue = galaxyAccentPalette(this.options.galaxyAccentHue ?? 230).dust / 360;
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let index = 0; index < count; index++) {
      const arm = index % 3;
      const radius = 4 + Math.pow(random(), 0.62) * 34;
      const angle = radius * 0.2 + arm * ((Math.PI * 2) / 3) + (random() - 0.5) * 0.72;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = (random() - 0.5) * (0.35 + radius * 0.045);
      positions[index * 3 + 2] = Math.sin(angle) * radius - 18;
      const color = new THREE.Color().setHSL((dustHue + (random() - 0.5) * 0.1 + 1) % 1, 0.54, 0.55 + random() * 0.3);
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: 0.075, transparent: true, opacity: 0.46, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false });
    this.galaxyDust = new THREE.Points(geometry, material);
    this.scene.add(this.galaxyDust);
  }

  private createNebulae() {
    const accent = galaxyAccentPalette(this.options.galaxyAccentHue ?? 230);
    const placements = [
      { hue: accent.nebulae[0], x: -15, y: 4, z: -22, size: 28, opacity: 0.24 },
      { hue: accent.nebulae[1], x: 17, y: -7, z: -28, size: 34, opacity: 0.2 },
      { hue: accent.nebulae[2], x: 4, y: 12, z: -35, size: 24, opacity: 0.14 },
    ];
    placements.forEach((placement) => {
      const texture = makeNebulaTexture(placement.hue);
      this.disposableTextures.push(texture);
      const intensity = this.options.sceneIntensity === 'calm' ? 0.48 : 1;
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: placement.opacity * intensity, blending: THREE.AdditiveBlending, depthWrite: false });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(placement.x, placement.y, placement.z);
      sprite.scale.setScalar(placement.size);
      this.scene.add(sprite);
    });
  }

  private createSun() {
    this.sunMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uCore: { value: new THREE.Color(0xfff1a8) },
        uEdge: { value: new THREE.Color(0xff6a1f) },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uCore;
        uniform vec3 uEdge;
        varying vec3 vPosition;
        varying vec3 vNormal;
        float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
        void main() {
          vec3 p = normalize(vPosition);
          float cells = sin((p.x + p.y * 0.72) * 34.0 + uTime * 0.55) * sin((p.z - p.y) * 27.0 - uTime * 0.38);
          float granules = hash(floor((p + 1.0) * 36.0 + uTime * 0.05));
          float spot = smoothstep(0.76, 0.98, sin(p.x * 8.0 + p.z * 5.0) * sin(p.y * 10.0 - p.x * 3.0));
          float facing = clamp(abs(vNormal.z), 0.0, 1.0);
          vec3 color = mix(uEdge, uCore, 0.38 + facing * 0.48 + cells * 0.08 + granules * 0.08);
          color *= 1.0 - spot * 0.28;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
    const sunSegments = Math.max(32, this.quality.planetSegments + 8);
    const sun = new THREE.Mesh(new THREE.SphereGeometry(SUN_RADIUS, sunSegments, sunSegments), this.sunMaterial);
    this.scene.add(sun);

    const glowTexture = makeGlowTexture('rgba(255,255,236,1)', 'rgba(255,183,77,0.76)');
    this.disposableTextures.push(glowTexture);
    [3.7, 5.8].forEach((scale, index) => {
      const corona = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        opacity: index === 0 ? 0.92 : 0.34,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }));
      corona.scale.setScalar(scale);
      this.scene.add(corona);
    });

    this.sunFlares = new THREE.Group();
    const flameTexture = makeFlameTexture();
    this.disposableTextures.push(flameTexture);
    for (let index = 0; index < this.quality.sunFlames; index++) {
      const angle = (index / this.quality.sunFlames) * Math.PI * 2;
      const material = new THREE.SpriteMaterial({
        map: flameTexture,
        color: index % 2 === 0 ? 0xff8c32 : 0xffd06a,
        transparent: true,
        opacity: 0.24,
        rotation: -angle + Math.PI / 2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const flame = new THREE.Sprite(material);
      flame.position.set(Math.cos(angle) * 1.04, Math.sin(angle) * 1.04, 0);
      flame.scale.set(0.22 + (index % 3) * 0.035, 0.58, 1);
      this.sunFlares.add(flame);
      this.sunFlames.push({ sprite: flame, material, angle, phase: index * 0.87 });
    }
    this.scene.add(this.sunFlares);
  }

  private createPlanets(entries: RegistryEntry[]) {
    entries.forEach((entry, index) => {
      const identity = createPlanetIdentity(entry, index, this.options.graphNodeCounts?.get(entry.id));
      const orbitPlane = new THREE.Group();
      orbitPlane.rotation.x = identity.orbitTilt;
      orbitPlane.rotation.z = (index % 2 === 0 ? -1 : 1) * 0.04 * (index + 1);
      this.scene.add(orbitPlane);

      const orbitPoints: THREE.Vector3[] = [];
      for (let step = 0; step <= 128; step++) {
        const angle = (step / 128) * Math.PI * 2;
        orbitPoints.push(new THREE.Vector3(Math.cos(angle) * identity.orbitRadius, 0, Math.sin(angle) * identity.orbitRadius));
      }
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitColor = new THREE.Color().setHSL(galaxyAccentPalette(this.options.galaxyAccentHue ?? 230).base / 360, 0.56, 0.66);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: orbitColor, transparent: true, opacity: 0.19 });
      orbitPlane.add(new THREE.Line(orbitGeometry, orbitMaterial));

      const root = new THREE.Group();
      root.rotation.z = identity.axialTilt;
      orbitPlane.add(root);

      const texture = makePlanetTexture(identity);
      this.disposableTextures.push(texture);
      const planetSegments = this.quality.planetSegments;
      const surface = new THREE.Mesh(
        new THREE.SphereGeometry(identity.radius, planetSegments, planetSegments),
        new THREE.MeshStandardMaterial({ map: texture, roughness: 0.78, metalness: 0.06 })
      );
      root.add(surface);

      const atmosphereColor = new THREE.Color().setHSL(identity.atmosphereHue / 360, 0.76, 0.66);
      const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(identity.radius * 1.065, Math.max(24, planetSegments - 8), Math.max(24, planetSegments - 8)),
        new THREE.MeshBasicMaterial({ color: atmosphereColor, transparent: true, opacity: 0.16, side: THREE.BackSide, blending: THREE.AdditiveBlending })
      );
      root.add(atmosphere);

      let clouds: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> | null = null;
      if (identity.hasLife) {
        const cloudTexture = makeCloudTexture(identity.seed);
        this.disposableTextures.push(cloudTexture);
        clouds = new THREE.Mesh(
          new THREE.SphereGeometry(identity.radius * 1.022, Math.max(24, planetSegments - 4), Math.max(24, planetSegments - 4)),
          new THREE.MeshStandardMaterial({ map: cloudTexture, transparent: true, opacity: 0.72, depthWrite: false, roughness: 1 })
        );
        root.add(clouds);
      }

      if (identity.hasRings) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(identity.radius * 1.32, identity.radius * 1.88, this.quality.planetSegments >= 64 ? 96 : 48),
          new THREE.MeshStandardMaterial({ color: atmosphereColor, transparent: true, opacity: 0.36, side: THREE.DoubleSide, roughness: 0.88 })
        );
        ring.rotation.x = Math.PI / 2;
        root.add(ring);
      }

      const angle = initialPlanetAngle(index, entries.length);
      root.position.set(Math.cos(angle) * identity.orbitRadius, 0, Math.sin(angle) * identity.orbitRadius);
      const orbitals = this.createBranchOrbitals(root, identity, this.options.projectBranches?.get(entry.id) ?? [], entry);
      this.planets.set(entry.id, { id: entry.id, identity, orbitPlane, root, surface, atmosphere, clouds, orbitals, angle, baseScale: clampPlanetScale(entry.planetScale ?? 1) });
    });
  }

  private createBranchOrbitals(root: THREE.Group, identity: PlanetIdentity, branches: Branch[], entry: RegistryEntry): PlanetOrbital[] {
    const descriptors = branchOrbitalObjects(branches);
    return descriptors.map((descriptor, index) => {
      const pivot = new THREE.Group();
      pivot.rotation.x = 0.34 + (index % 3) * 0.26;
      pivot.rotation.z = (index % 2 === 0 ? 1 : -1) * (0.12 + (index % 4) * 0.08);
      pivot.rotation.y = (index / Math.max(1, descriptors.length)) * Math.PI * 2;
      const distance = identity.radius * (1.58 + (index % 4) * 0.34);

      if (descriptor.kind === 'moon') {
        const moon = new THREE.Mesh(
          new THREE.IcosahedronGeometry(identity.radius * (descriptor.stale ? 0.065 : 0.082), this.quality.planetSegments >= 44 ? 2 : 1),
          new THREE.MeshStandardMaterial({
            color: descriptor.stale ? 0x6f7485 : 0xb9c2da,
            roughness: 0.94,
            metalness: 0.02,
          })
        );
        moon.position.x = distance;
        pivot.add(moon);
        pivot.visible = projectOrbitalVisible(entry, descriptor.kind);
      } else {
        const satellite = new THREE.Group();
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: descriptor.stale ? 0x6e7180 : 0xcbd6ee, roughness: 0.45, metalness: 0.72 });
        const panelMaterial = new THREE.MeshStandardMaterial({ color: 0x4566ad, roughness: 0.38, metalness: 0.48, emissive: 0x142654, emissiveIntensity: 0.34 });
        satellite.add(new THREE.Mesh(new THREE.BoxGeometry(identity.radius * 0.09, identity.radius * 0.07, identity.radius * 0.07), bodyMaterial));
        const leftPanel = new THREE.Mesh(new THREE.BoxGeometry(identity.radius * 0.12, identity.radius * 0.012, identity.radius * 0.075), panelMaterial);
        leftPanel.position.x = -identity.radius * 0.11;
        const rightPanel = leftPanel.clone();
        rightPanel.position.x *= -1;
        satellite.add(leftPanel, rightPanel);
        satellite.position.x = distance;
        satellite.scale.setScalar(0.86);
        pivot.add(satellite);
        pivot.visible = projectOrbitalVisible(entry, descriptor.kind);
      }
      root.add(pivot);
      return { pivot, kind: descriptor.kind, speed: (descriptor.kind === 'moon' ? 0.34 : 0.52) + index * 0.023 };
    });
  }

  private render(time: number) {
    if (this.disposed) return;
    const delta = this.lastTime === null ? 0 : Math.min(0.05, (time - this.lastTime) / 1000);
    this.lastTime = time;
    const canMove = !this.reducedMotion && !this.focusedId && !this.transition;

    this.planets.forEach((planet) => {
      if (canMove && this.highlightedId !== planet.id) planet.angle += planet.identity.speed * delta;
      planet.root.position.set(
        Math.cos(planet.angle) * planet.identity.orbitRadius,
        0,
        Math.sin(planet.angle) * planet.identity.orbitRadius
      );
      if (!this.reducedMotion) planet.surface.rotation.y += delta * (0.12 + planet.identity.speed);
      if (!this.reducedMotion && planet.clouds) planet.clouds.rotation.y += delta * 0.075;
      if (!this.reducedMotion) planet.orbitals.forEach((orbital) => { orbital.pivot.rotation.y += delta * orbital.speed; });
      const highlighted = this.highlightedId === planet.id || this.focusedId === planet.id;
      const desiredScale = highlighted ? planet.baseScale * 1.08 : planet.baseScale;
      const worldPosition = planet.root.getWorldPosition(new THREE.Vector3());
      const targetScale = capPlanetScaleForSun(
        planet.identity.radius,
        this.camera.position.distanceTo(worldPosition),
        this.camera.position.length(),
        desiredScale
      );
      planet.root.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), Math.min(1, delta * 7));
      planet.atmosphere.material.opacity = highlighted ? 0.38 : 0.16;
    });

    if (this.sunMaterial) this.sunMaterial.uniforms.uTime.value = time / 1000;
    if (this.sunFlares && !this.reducedMotion) this.sunFlares.rotation.z = time * 0.000035;
    if (!this.reducedMotion) {
      if (this.starfield) {
        this.starfield.rotation.y = time * 0.0000035;
        this.starfield.material.opacity = 0.84 + Math.sin(time * 0.0011) * 0.06;
      }
      if (this.galaxyDust) this.galaxyDust.rotation.y = -time * 0.000006;
      this.sunFlames.forEach((flame, index) => {
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.0042 + flame.phase);
        const radius = 1.01 + pulse * 0.07;
        flame.sprite.position.set(Math.cos(flame.angle) * radius, Math.sin(flame.angle) * radius, 0);
        flame.sprite.scale.set(0.18 + pulse * 0.08, 0.42 + pulse * (0.25 + (index % 3) * 0.04), 1);
        flame.material.opacity = 0.13 + pulse * 0.23;
      });
      if (this.quality.shootingStars) this.updateShootingStars(time, delta);
    }

    if (this.transition) {
      const progress = Math.min(1, (time - this.transition.startedAt) / this.transition.duration);
      const eased = easeInOutCubic(progress);
      this.camera.position.lerpVectors(this.transition.fromPosition, this.transition.toPosition, eased);
      this.lookTarget.lerpVectors(this.transition.fromTarget, this.transition.toTarget, eased);
      if (progress >= 1) {
        const complete = this.transition.onComplete;
        this.transition = null;
        complete?.();
      }
    }
    this.camera.lookAt(this.lookTarget);
    this.renderer.render(this.scene, this.camera);
    this.publishProjectPositions();
  }

  private publishProjectPositions() {
    const rect = this.options.container.getBoundingClientRect();
    this.planets.forEach((planet) => {
      const position = planet.root.getWorldPosition(new THREE.Vector3());
      position.project(this.camera);
      this.options.onProjectPosition?.({
        id: planet.id,
        x: (position.x * 0.5 + 0.5) * rect.width,
        y: (-position.y * 0.5 + 0.5) * rect.height,
        depth: position.z,
        visible: position.z > -1 && position.z < 1,
      });
    });
  }

  private updateShootingStars(time: number, delta: number) {
    if (time >= this.nextShootingStarAt && this.shootingStars.length < 2) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-2.8, 1.15, 0),
      ]);
      const material = new THREE.LineBasicMaterial({ color: 0xdbe5ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
      const line = new THREE.Line(geometry, material);
      line.position.set(-15 + this.shootingRandom() * 20, 5 + this.shootingRandom() * 9, -20 - this.shootingRandom() * 12);
      this.scene.add(line);
      this.shootingStars.push({ line, velocity: new THREE.Vector3(9 + this.shootingRandom() * 5, -4 - this.shootingRandom() * 3, 0), age: 0, duration: 1.1 + this.shootingRandom() * 0.55 });
      this.nextShootingStarAt = time + 5_500 + this.shootingRandom() * 9_000;
    }

    for (let index = this.shootingStars.length - 1; index >= 0; index--) {
      const star = this.shootingStars[index];
      star.age += delta;
      const progress = star.age / star.duration;
      star.line.position.addScaledVector(star.velocity, delta);
      star.line.material.opacity = Math.sin(Math.min(1, progress) * Math.PI) * 0.72;
      if (progress >= 1) {
        this.scene.remove(star.line);
        star.line.geometry.dispose();
        star.line.material.dispose();
        this.shootingStars.splice(index, 1);
      }
    }
  }
}
