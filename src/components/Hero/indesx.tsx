import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import image from '@/assets/mesas_backgound.jpeg'

export const Hero: React.FC = () => {
  const container = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()

      tl.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }).from(
        subtitleRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5',
      ) // Começa um pouco antes de terminar o título
    },
    { scope: container },
  )

  return (
    <section
      ref={container}
      className="relative w-full overflow-hidden border-round-xl"
      style={{ height: '500px' }}
    >
      {/* Imagem de Fundo */}

      <img
        src={image}
        alt="Marcenaria de alto padrão"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Overlay Gradiente */}
      <div className="absolute top-0 left-0 w-full h-full z-1 bg-gradient-hero flex align-items-end p-5 md:p-8">
        <div className="max-w-screen-md">
          <h1
            ref={textRef}
            className="hero-title text-white font-bold m-0 mb-3"
          >
            OM Madeiras: <br />
            <span className="text-primary">
              Especialista em mesas e cadeiras.
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl text-white line-height-3 mb-4"
          >
            Qualidade e resistência para sua casa ou comércio. Faça seu jogo de
            jantar ou bistrô com quem domina a marcenaria.
          </p>
        </div>
      </div>
    </section>
  )
}
