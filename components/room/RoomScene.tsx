'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo } from 'react'
import { C } from '@/lib/palette'
import { WAYPOINTS, SECTIONS, scrollState } from '@/lib/sections'

type Caps={mobile:boolean;reduced:boolean;hover:boolean}
type V3=[number,number,number]
function Box({position,size,color,rotation=[0,0,0]}:{position:V3;size:V3;color:string;rotation?:V3}){
 return <mesh position={position} rotation={rotation}><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={.72}/></mesh>
}
function Room(){return <group><Box position={[0,2.8,-5]} size={[12,5.6,.12]} color={C.saucer}/><Box position={[-6,2.8,0]} size={[.12,5.6,10]} color={C.mint}/><Box position={[6,2.8,0]} size={[.12,5.6,10]} color={C.saucer}/><Box position={[0,-.05,0]} size={[12,.1,10]} color={C.biscuit}/><Box position={[0,5.6,0]} size={[12,.1,10]} color={C.chai}/></group>}
function Desk(){return <group position={[-1.8,0,-3]}><Box position={[0,1,0]} size={[3.5,.14,1.5]} color={C.chaiLight}/>{[-1.5,1.5].flatMap(x=>[-.55,.55].map(z=><Box key={x+z} position={[x,.48,z]} size={[.12,.95,.12]} color={C.chai}/>))}<Box position={[0,1.65,-.35]} size={[1.8,1.05,.08]} color={C.saucer}/><Box position={[0,1.1,-.2]} size={[.08,.35,.08]} color={C.saucer}/><Box position={[0,1.08,.35]} size={[1.1,.04,.35]} color={C.saucer}/><mesh position={[1.25,1.13,.1]}><cylinderGeometry args={[.1,.09,.15,20]}/><meshStandardMaterial color={C.pink}/></mesh></group>}
function Shelf(){const books=useMemo(()=>Array.from({length:18},(_,i)=>({x:-1.05+(i%6)*.38,y:.35+Math.floor(i/6),c:[C.pink,C.red,C.mintDeep,C.chaiLight][i%4]})),[]);return <group position={[3.3,0,-3.7]}><Box position={[0,1.7,0]} size={[2.6,3.5,.12]} color={C.chai}/>{[.3,1.3,2.3,3.3].map(y=><Box key={y} position={[0,y,.1]} size={[2.5,.06,.55]} color={C.chaiLight}/>)}{books.map((b,i)=><Box key={i} position={[b.x,b.y,.2]} size={[.26,.65,.35]} color={b.c}/>)}</group>}
function Frames(){return <group>{[[-1.3,C.pink],[1.1,C.mintDeep]].map(([z,c],i)=><group key={i} position={[5.92,2.2,z as number]} rotation={[0,-Math.PI/2,0]}><Box position={[0,0,0]} size={[1.8,2.2,.08]} color={C.chai}/><Box position={[0,0,.06]} size={[1.5,1.9,.03]} color={c as string}/></group>)}</group>}
function Table(){return <group position={[.6,0,-3.3]}><mesh position={[0,.8,0]}><cylinderGeometry args={[.65,.65,.08,32]}/><meshStandardMaterial color={C.chaiLight}/></mesh><mesh position={[0,.4,0]}><cylinderGeometry args={[.05,.08,.8,12]}/><meshStandardMaterial color={C.chai}/></mesh><Box position={[.15,.88,0]} size={[.42,.08,.3]} color={C.pink}/></group>}
function CameraRig({mobile,reduced,hover}:Caps){
 const camera=useThree(s=>s.camera) as THREE.PerspectiveCamera
 const state=useMemo(()=>({p:new THREE.Vector3(),l:new THREE.Vector3(),init:false}),[])
 useFrame((r,dt)=>{
  const last=SECTIONS.length-1,s=THREE.MathUtils.clamp(scrollState.s,0,last),i=Math.min(Math.floor(s),last-1),f=s-i,e=f*f*(3-2*f),a=WAYPOINTS[i],b=WAYPOINTS[i+1]
  const targetL=new THREE.Vector3(a.look[0]+(b.look[0]-a.look[0])*e,a.look[1]+(b.look[1]-a.look[1])*e,a.look[2]+(b.look[2]-a.look[2])*e)
  const targetP=new THREE.Vector3(a.pos[0]+(b.pos[0]-a.pos[0])*e,a.pos[1]+(b.pos[1]-a.pos[1])*e,a.pos[2]+(b.pos[2]-a.pos[2])*e)
  if(hover&&!mobile&&!reduced){targetP.x+=r.pointer.x*.18;targetP.y+=r.pointer.y*.08}
  const damp=reduced||!state.init?1:1-Math.exp(-dt*5.5)
  if(!state.init){state.p.copy(targetP);state.l.copy(targetL);state.init=true}
  state.p.lerp(targetP,damp);state.l.lerp(targetL,damp);camera.position.copy(state.p);camera.lookAt(state.l)
 })
 return null
}
export default function RoomScene(props:Caps){
 return <Canvas dpr={[1,1.5]} camera={{fov:50,near:.1,far:60,position:[0,2.6,5.2]}} gl={{antialias:true}} style={{position:'fixed',inset:0,zIndex:0}} aria-hidden="true"><color attach="background" args={[C.chai]}/><hemisphereLight args={['#FFF6E8','#C9A27A',2.3]}/><directionalLight position={[3,6,5]} intensity={1.1}/><Room/><Desk/><Shelf/><Frames/><Table/><CameraRig {...props}/></Canvas>
}
