export const SECTIONS = [
  { id: 'hello', label: 'Hello' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
] as const

type V3 = [number, number, number]

export const WAYPOINTS: { pos: V3; look: V3 }[] = [
  { pos: [0, 2.6, 5.2], look: [0, 1.6, -4] },
  { pos: [-1.3, 1.8, -0.6], look: [-1.9, 1.55, -3.3] },
  { pos: [-1.8, 1.9, 0.4], look: [-5.9, 2.3, -0.6] },
  { pos: [1.4, 2.0, -0.1], look: [5.9, 2.25, -0.1] },
  { pos: [2.8, 1.9, 0.3], look: [3.4, 1.8, -3.7] },
  { pos: [0.6, 1.7, -0.9], look: [0.6, 0.95, -3.3] },
]

export const scrollState = { s: 0 }
