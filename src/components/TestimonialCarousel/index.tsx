import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Testimonial {
    id: number;
    author: string;
    text: string;
}

const testimonials: Testimonial[] = [
    { id: 1, author: "João Silva", text: "Os móveis da OM. Madeiras são de uma qualidade excepcional. Minha mesa de jantar ficou perfeita!" },
    { id: 2, author: "Maria Oliveira", text: "Atendimento nota 10 e entrega no prazo. O acabamento em verniz vale muito a pena." },
    { id: 3, author: "Carlos Santos", text: "Comprei o jogo bistrô para minha varanda e superou minhas expectativas. Muito robusto." },
];

export const TestimonialCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const textRef = useRef<HTMLDivElement>(null);

    // Auto troca
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    // Animação
    useGSAP(() => {
        if (!textRef.current) return;

        gsap.fromTo(
            textRef.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
        );
    }, [currentIndex]);

    return (
        <div className="py-6 bg-primary border-round-xl my-4 px-3 text-white">
            <div className="text-center" style={{ maxWidth: '768px', margin: '0 auto' }}>

                <i className="pi pi-comments text-primary text-3xl mb-3"></i>

                <h3 className="text-900 font-bold mb-5">
                    O que nossos clientes dizem
                </h3>

                <div
                    ref={textRef}
                    className="flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: '8rem' }}
                >
                    <p className="text-xl text-700 italic line-height-3 mb-3">
                        "{testimonials[currentIndex].text}"
                    </p>

                    <span className="font-bold text-primary text-uppercase">
                        — {testimonials[currentIndex].author}
                    </span>
                </div>

                {/* Indicadores */}
                <div className="flex justify-content-center gap-2 mt-4">
                    {testimonials.map((_, index) => (
                        <div
                            key={index}
                            className={`border-round-circle transition-all transition-duration-300 ${
                                index === currentIndex
                                    ? 'bg-primary'
                                    : 'surface-300'
                            }`}
                            style={{
                                width: index === currentIndex ? '2rem' : '0.5rem',
                                height: '6px'
                            }}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};