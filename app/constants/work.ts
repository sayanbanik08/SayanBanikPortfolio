import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2020',
    title: 'Howrah Zilla School',
    subtitle: 'X (WBBSE) — 50%',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2022',
    title: 'Howrah Zilla School',
    subtitle: 'XII (WBCHE) — 67%',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2022',
    title: 'Techno India University',
    subtitle: 'BCA — CGPA 8.62',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2025',
    title: 'Full-Stack Developer',
    subtitle: 'Independent Developer',
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -12),
    year: new Date().toLocaleDateString('default', { year: 'numeric' }),
    title: '?',
    subtitle: '???',
    position: 'right',
  }
]