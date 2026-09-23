'use client'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SECTIONS, scrollState } from '@/lib/sections'
import { site } from '@/lib/site'
import { PanelBody } from './Panels'

const RoomScene = dynamic(() => import('./RoomScene'), { ssr: false })
const clamp = (v:number,a:number,b:number)=>Math.min(b,Math.max(a,v))

export default function Experience(){
 const [plain,setPlain]=useState(false)
 const [ready,setReady]=useState(false)
 const [caps,setCaps]=useState({mobile:false,reduced:false,hover:true})
 const panels=useRef<(HTMLElement|null)[]>([])
 const dots=useRef<(HTMLButtonElement|null)[]>([])
 const spacer=useRef<HTMLDivElement|null>(null)

 useEffect(()=>{
  const m=window.matchMedia('(max-width: 767px)')
  const r=window.matchMedia('(prefers-reduced-motion: reduce)')
  const h=window.matchMedia('(hover: hover)')
  const upd=()=>setCaps({mobile:m.matches,reduced:r.matches,hover:h.matches})
  upd();m.addEventListener('change',upd);r.addEventListener('change',upd);h.addEventListener('change',upd)
  const c=document.createElement('canvas')
  if(!(c.getContext('webgl2')||c.getContext('webgl'))) setPlain(true)
  setReady(true)
  return ()=>{m.removeEventListener('change',upd);r.removeEventListener('change',upd);h.removeEventListener('change',upd)}
 },[])

 useEffect(()=>{
  if(plain){panels.current.forEach(el=>{el?.removeAttribute('style');el?.removeAttribute('inert')});return}
  document.documentElement.classList.add('snap')
  let raf=0
  const update=()=>{
   raf=0
   const h=spacer.current?.offsetHeight||window.innerHeight
   const s=clamp(window.scrollY/h,0,SECTIONS.length-1);scrollState.s=s
   panels.current.forEach((el,i)=>{if(!el)return;const o=clamp(1-Math.abs(s-i)*2.4,0,1);el.style.opacity=String(o);el.style.visibility=o<.02?'hidden':'visible';el.style.pointerEvents=o>.6?'auto':'none';el.toggleAttribute('inert',o<=.6)})
   dots.current.forEach((d,i)=>{if(!d)return;if(Math.round(s)===i)d.setAttribute('aria-current','true');else d.removeAttribute('aria-current')})
  }
  const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)}
  update();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll)
  return ()=>{document.documentElement.classList.remove('snap');window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);if(raf)cancelAnimationFrame(raf)}
 },[plain,ready])

 const goTo=useCallback((i:number)=>{
  const behavior:ScrollBehavior=caps.reduced?'auto':'smooth'
  if(plain)document.getElementById(SECTIONS[i].id)?.scrollIntoView({behavior})
  else{const h=spacer.current?.offsetHeight||window.innerHeight;window.scrollTo({top:i*h,behavior})}
 },[plain,caps.reduced])

 useEffect(()=>{if(!ready)return;const i=SECTIONS.findIndex(s=>('#'+s.id)===window.location.hash);if(i>0)setTimeout(()=>goTo(i),60)},[ready,goTo])

 return <div className={plain?'plain-mode':'stage'}>
  {!plain&&ready&&<RoomScene {...caps}/>}
  <header className="topbar"><a className="chip brand" href="#hello" onClick={e=>{e.preventDefault();goTo(0)}}>{site.name}</a><div className="topbar-right"><button type="button" className="chip" onClick={()=>setPlain(p=>!p)}>{plain?'Back to the room':'Plain version'}</button><button type="button" className="btn btn-primary" onClick={()=>goTo(SECTIONS.length-1)}>Contact</button></div></header>
  {!plain&&<nav className="rail" aria-label="Room sections">{SECTIONS.map((s,i)=><button key={s.id} type="button" ref={el=>{dots.current[i]=el}} aria-label={s.label} title={s.label} onClick={()=>goTo(i)}><span/></button>)}</nav>}
  <main>{SECTIONS.map((s,i)=><section key={s.id} id={s.id} className={'panel '+(i%2===0?'left':'right')} ref={el=>{panels.current[i]=el}}><PanelBody i={i} onGo={goTo}/></section>)}</main>
  {!plain&&<div className="spacers" aria-hidden="true">{SECTIONS.map((s,i)=><div key={s.id} className="spacer" ref={i===0?spacer:undefined}/>)}</div>}
 </div>
}
