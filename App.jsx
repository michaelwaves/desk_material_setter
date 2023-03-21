import { useRef, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, ScrollControls, useScroll, Html } from '@react-three/drei'
import { useInView, AnimatePresence } from 'framer-motion'

//theatre imports
import { getProject, val } from '@theatre/core'

//Assets and Components
import rorePng from './assets/RoRe.png'
import Carousel1 from './components/Carousel'
import Button from './components/Button'
import Modal from './components/Modal/Modal'

import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
}
  from "@theatre/r3f"

//3D models
import SmallDeskBlack from './components/Smalldesk'
import { Rore3 } from './components/Rore_animations_3'
import SkyeChair from './components/Skye_chair'
import Tree from './components/Tree_2'
import Cat from './components/Cat5'
import Lumigui from './components/Lumigui'
import Ramuri from './components/Ramuri'
import Me from './components/Michael'
import PhotoCube from './components/Photo_cube'
import PhotoCubeSimple from './components/Photo_cube_simple'
import HackerCarousel from './components/HackerCarousel'
import Risedesk from './components/Risedesk'
import RisedeskMaterials from './components/Risedesk_materials'
import { DeskData } from './components/DeskData'
import DeskMaterialSetter from './components/DeskMaterialSetter'

//
import theatreProjectState from './theatre-project-state.json'

function App() {
  const [deskMaterial, setDeskMaterial] = useState('walnut_white')
  const sheet = getProject('Scene',{state: theatreProjectState}).sheet('sheet')
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-primary">

      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <ScrollControls pages={8}>
          <SheetProvider sheet={sheet}>
            <Scene deskMaterial={deskMaterial} />
          </SheetProvider>
        </ScrollControls>
        <Html fullscreen setDeskMaterial={setDeskMaterial}>
          <MyHtml setDeskMaterial={setDeskMaterial} />
        </Html>
      </Canvas>

    </div>
  )
}
function Cube() {
  return (
    <mesh position={[0, 0, 5]} scale={[1.2, 1, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}
function Scene({ deskMaterial }) {
  const sheet = useCurrentSheet()
  const scroll = useScroll()

  useFrame(() => {
    const sequenceLength = val(sheet.sequence.pointer.length)
    sheet.sequence.position = scroll.offset * sequenceLength
  })
  return (
    <>
      <fog attach="fog" args={['#171717', 5, 15]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={0} />
      <pointLight position={[3, 0, 0]} />
      <Cube />
      <RisedeskMaterials deskMaterial={deskMaterial} />
      <Rore3 />
      <pointLight position={[3, -3, 0]} />
      <Ramuri />
      <Cat />
      <SkyeChair />
      <pointLight position={[1, -3.7, 1]} />
      <Lumigui />
      <ambientLight intensity={0.5} position={[4, -1, 3]} />
      <PhotoCubeSimple />
      <Stars />
      <PerspectiveCamera
        theatreKey='Camera'
        makeDefault
        position={[0, 0, 5]}
        fov={70}
        near={0.1}
        far={1000}
      />
    </>
  )
}

const MyHtml = ({ setDeskMaterial }) => {
  const ref = useRef(null)
  const isVisible = useInView(ref)

  const ref2 = useRef(null)
  const isVisible2 = useInView(ref2)

  const ref3 = useRef(null)
  const isVisible3 = useInView(ref3)

  const ref4 = useRef(null)
  const isVisible4 = useInView(ref4)

  //AVLA modal
  const [modalOpen, setModalOpen] = useState(false)
  const close = () => setModalOpen(false)
  const open = () => setModalOpen(true)
  return (
    <div className='absolute top-0 left-0 text-xl'>
      <div className='page-box'>
        <div className="container mx-auto">
          <h1 className="">Welcome to my portfolio website!</h1>
        </div>
        <div className='text-box'>
          <p>Hi I’m Michael! I’m a business major (Rotman BCOM) who loves 3D design, AI, and
            entrepreneurship. Somehow I built this website, and a few others in the process.
            Here’s a collection of some things I’ve done and stuff I’ve won. <span className='bg-white rounded-xl'>Single click </span>on 3D models to
            activate and reset animations, and <span className='bg-white rounded-xl'> double click</span> to be beamed through the internet to more info.
            Play around, meet some characters, and have fun😊</p>
        </div>
      </div>
      <div className='page-box flex flex-row items-center justify-around'>
        <div className='text-box w-1/3 translate-y-[10vh] translate-x-[10vw] mb-5'>
          <h3 className=''>RiseDesk</h3>
          <p className='text-lg text-black'>My first job was a 3D engineer at a Toronto-based furniture ecommerce startup. I used Blender and GIMP
            to model, texture, and animate assembly and marketing videos, reducing returns and helping the company
            grow from $10K to $1 million in annual revenue. I collaborated with an amazing team of SEO specialists, marketers, and web developers
            to add 3D models to our Shopify store, and even helped pitch an experimental “smart chair” product to the ventureLAB hardware accelerator.
            We eventually had to sunset that project, but it taught me a lot about starting a venture. </p>
        </div>
        <div className='-translate-x-[7vw]'>
          <DeskMaterialSetter setDeskMaterial={setDeskMaterial} />
        </div>
      </div>
      <div className='page-box translate-x-1/2 translate-y-full relative'>
        <div className={"text-box transition-all duration-500 " + (isVisible ? "visible" : "hide")} ref={ref}>
          <h3>RoRe</h3>
          <p>RoRe is an engineering scientist who does research and loves 3D printing. Watch out for his bots
            and 3D printed projectiles! I designed this character in the style of my favorite game Brawl
            Stars. It was a fun exercise in modelling, animation, concept art, texture art, and of course
            3D printing. RoRe was also the first model I integrated into a website using react three fiber.
          </p>
          <img src={rorePng} alt="whoops" className='rounded-xl'></img>
        </div>
      </div>
      <div className='page-box'>
      </div>
      <div className='page-box translate-x-1/2 translate-y-1/2 relative'>
        <div className={"text-box transition-all duration-500 " + (isVisible2 ? "visible" : "hide")} ref={ref2}>
          <h3>Ramuri</h3>
          <p>I met some very talented people at a startup incubator at UofT, and decided their mission of creating an AI-powered ESG brand recommendation chrome extension was really cool.
            Using React, I built a portal for companies to submit their brands to our rating system, and executed tests and fixed bugs for the main extension.
            I learned a lot about agile development practices, shipping production code, and the startup ecosystem at UofT.
          </p>

        </div>
        <Carousel1 />
      </div>
      <div className='page-box h-full'></div>
      <div className='page-box translate-y-3/4'>
        <div className={"text-box transition-all duration-500 " + (isVisible3 ? "visible" : "hide")} ref={ref3}>
          <h3>Hackathons</h3>
          <p>I'm a hacker at heart. I love solving problems with a team of smart people and building cool
            things. My hacker journey started at Hack the North,
            where I knew about 0 coding languages. I went for the free food, fun, and friends.
            It was a great experience and I wanted to not be useless the next time around.
            Over the years I taught myself Python, Javascript, React, Unity/C#, Arduino, and various 3D libraries. Since then, I’ve been to
            10-15 hackathons, adding new tools, frameworks, languages, and friends along the way. </p>
        </div>

        <input
          type="image"
          src='/avla.png'
          className='absolute top-60 left-0 ml-10 font-sans font-bold w-auto h-16 text-center px-2 mr-3 transition-all text-1xl focus:border-2 bg-gradient-to-l from-primary to-secondary rounded-xl hover:scale-110 focus:scale-95'
          onClick={() => { modalOpen ? close() : open() }}
        />
        <HackerCarousel />
        <AnimatePresence
          initial={false}
          mode="wait"
        >
          {modalOpen && <Modal handleClose={close} modalOpen={modalOpen} />}
        </AnimatePresence>
      </div>

      <div className='page-box translate-y-full'></div>
      <div className='page-box translate-y-full text-lg flex flex-col justify-center '>
        <div className='absolute top-10 left-[11rem] flex flex-col space-y-3 mt-[3rem]'>
          <Button imgSrc='/linkedin.svg' text='LinkedIn' link='https://www.linkedin.com/in/nicetomeetyu/' />
          <Button imgSrc='/devpost.svg' text='Devpost' link='https://devpost.com/michaelyu713705?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav' />
          <Button imgSrc='/github.svg' text='Github' link='https://github.com/michaelwaves' />
        </div>
        <h1 className='mt-20 translate-y-full'>Thanks for visiting! See you later :{')'}</h1>
      </div>
      
    </div>

  )
}

export default App
