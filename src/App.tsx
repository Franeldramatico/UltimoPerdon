/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Sparkles, Camera } from 'lucide-react';
import Swal from 'sweetalert2';
import usImage from '../images/us.png';

const floatingIcons = [
  { icon: '🦇', left: '10%', top: '20%', size: 'text-4xl', delay: '0s', anim: 'animate-float' },
  { icon: '🎀', left: '80%', top: '15%', size: 'text-3xl', delay: '-2s', anim: 'animate-float-slow' },
  { icon: '🖤', left: '25%', top: '75%', size: 'text-5xl', delay: '-1s', anim: 'animate-float-fast' },
  { icon: '🕸️', left: '75%', top: '80%', size: 'text-4xl', delay: '-3s', anim: 'animate-float' },
  { icon: '✨', left: '50%', top: '10%', size: 'text-2xl', delay: '-0.5s', anim: 'animate-float' },
  { icon: '🥀', left: '15%', top: '50%', size: 'text-3xl', delay: '-2.5s', anim: 'animate-float-slow' },
  { icon: '🔮', left: '85%', top: '50%', size: 'text-3xl', delay: '-1.5s', anim: 'animate-float-fast' },
];

export default function App() {
  const [step, setStep] = useState(0); // 0: cerrado, 1: carta abierta, 2: yay
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, tx: string, ty: string, rot: string, emoji: string }[]>([]);

  // Efecto de explosión de emojis bonitos
  const spawnParticles = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const emojis = ['🖤', '🎀', '🦇', '🥀', '🕸️', '✨', '💖', '🧸'];
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      tx: `${(Math.random() - 0.5) * 500}px`, // Expansión súper amplia
      ty: `${(Math.random() - 0.5) * 500}px`,
      rot: `${Math.random() * 360}deg`,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));

    setParticles(prev => [...prev, ...newParticles]);

    // Limpiar partículas después de la animación
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(n => n.id === p.id)));
    }, 1500);
  };

  // Función para mostrar la foto especial con SweetAlert2
  const showSpecialPhoto = () => {
    Swal.fire({
      title: '<span class="font-cursive text-pink-300">Nuestra Foto 🖤</span>',
      html: '<p class="font-cute text-pink-100">Eres lo más bonito que me ha pasado...</p>',
      imageUrl: usImage,
      imageWidth: 400,
      imageAlt: 'Nosotros',
      background: '#1a1025',
      color: '#fdf4ff',
      confirmButtonText: 'Cerrar con amor 🎀',
      confirmButtonColor: '#be185d',
      customClass: {
        popup: 'rounded-[2rem] border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.3)]',
        title: 'text-2xl',
        confirmButton: 'rounded-full px-6 py-2 font-cute'
      }
    });
  };

  return (
    <div className="min-h-screen bg-cute-goth relative flex items-center justify-center p-4 selection:bg-pink-600 selection:text-white">
      
      {/* Elementos flotantes de fondo */}
      {floatingIcons.map((item, i) => (
        <div 
          key={i} 
          className={`absolute ${item.anim} ${item.size} select-none pointer-events-none opacity-20`} 
          style={{ left: item.left, top: item.top, animationDelay: item.delay }}
        >
          {item.icon}
        </div>
      ))}

      {/* Contenedor Principal Lindo Gótico */}
      <div className="max-w-lg w-full relative z-10">
        
        {/* --- PASO 0: Inicio cerrado --- */}
        {step === 0 && (
          <div 
            onClick={() => setStep(1)}
            className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700 cursor-pointer group"
          >
            <div className="relative mb-6">
              <div className="text-[6rem] animate-heartbeat drop-shadow-[0_0_40px_rgba(236,72,153,0.4)] select-none">
                🖤
              </div>
              <div className="absolute -top-4 -right-4 animate-pulse-pink">
                <Sparkles className="w-12 h-12 text-pink-400" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-cursive text-pink-200 text-glow-pink mb-4 text-center">
              Para ti mi bella...
            </h2>
            <button className="mt-4 px-8 py-3 bg-[#2a1329]/80 hover:bg-[#3d193b] border border-fuchsia-500/40 rounded-full font-bold text-pink-100 transition-all group-hover:scale-105 shadow-[0_0_20px_rgba(217,70,239,0.3)] pointer-events-none">
              Toca para abrir :3 🎀
            </button>
          </div>
        )}

        {/* --- PASO 1: Carta abierta --- */}
        {step === 1 && (
          <div className="card-container rounded-[2.5rem] p-8 sm:p-10 relative overflow-hidden animate-in slide-in-from-bottom-12 fade-in duration-700">
            {/* Decolación de Telarañas Lindas Arriba */}
            <div className="absolute top-4 left-0 right-0 flex justify-center space-x-6 opacity-40 select-none">
              <span>🕸️</span><span>🕸️</span><span>🕸️</span>
            </div>

            <div className="relative z-10 mt-6 pt-2">
              <h1 className="text-4xl sm:text-[2.5rem] font-cursive text-pink-300 text-glow-pink mb-8 text-center leading-tight">
                Perdón mi amor unu
              </h1>

              <div className="space-y-5 text-pink-100/90 text-[15px] sm:text-[17px] leading-relaxed font-cute text-left">
                <p>
                  <span className="text-xl inline-block -translate-y-1">🦇</span> Hola mi niña hermosa...
                </p>
                <p>
                  Hice esta cartita especial para pedirte perdón otra y otra vez por haber sido un menso en tu cumple unu...
                </p>
                <p>
                  Sé que ya platicamos todo y estamos súper bien, pero me sentía feito y quería dejarte este detallito lindo porque te mereces absolutamente todo lo bonito de este universo y más.
                </p>
                <p className="flex items-center gap-2 font-semibold text-pink-200">
                  Eres la novia más perfecta, linda y preciosa de todita la galaxia <span className="animate-wiggle inline-block text-xl"> :3</span>
                </p>
                <p>
                  Gracias por tenerme tanta paciencia, mi vidita. Te prometo que tus próximos cumples van a ser tan mágicos y perfectos como tú.
                </p>
              </div>

              <div className="mt-12 flex justify-center">
                <button 
                  onClick={(e) => {
                    spawnParticles(e);
                    // Retrasito lindo para cambiar de pantalla
                    setTimeout(() => setStep(2), 200);
                  }}
                  className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-pink-700 to-fuchsia-800 rounded-full hover:from-pink-600 hover:to-fuchsia-600 focus:outline-none hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(236,72,153,0.5)] cursor-pointer overflow-hidden border border-pink-400/30"
                >
                  {/* Brillo de fondo en hover */}
                  <span className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="mr-3 text-lg z-10 font-cute">Sí te perdono (y te amo)</span>
                  <div className="relative z-10 flex items-center">
                    <Heart className="w-5 h-5 absolute group-hover:animate-ping opacity-60" fill="white" />
                    <Heart className="w-5 h-5 relative" fill="white" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- PASO 2: Yay --- */}
        {step === 2 && (
          <div className="card-container rounded-[2.5rem] p-10 text-center animate-in zoom-in duration-500 relative mt-4">
            <div className="absolute top-0 right-0 p-8 opacity-40 animate-pulse-pink">
              <Sparkles className="w-8 h-8 text-pink-300" />
            </div>
            <div className="absolute bottom-0 left-0 p-6 opacity-30 animate-float select-none text-3xl">
              🕊️
            </div>
            
            <div className="text-6xl mb-8 animate-heartbeat flex justify-center gap-4 select-none">
              <span>🖤</span><span>🎀</span><span>🖤</span>
            </div>
            
            <h2 className="text-4xl sm:text-[2.75rem] font-cursive text-pink-300 text-glow-pink mb-6">
              ¡Yaaaaaay! :3
            </h2>
            
            <p className="text-lg sm:text-xl text-pink-100 font-cute leading-relaxed max-w-md mx-auto mb-10 text-glow-pink opacity-90">
              Te amo muchísimo mi amor, gracias por ser la mejor niña del mundo. 
              <br /><br />
              <span className="font-bold text-pink-200">¡Eres mi princesita gótica favorita! 🦇✨</span>
            </p>

            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={showSpecialPhoto}
                className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 bg-gradient-to-r from-purple-800 to-pink-800 rounded-full hover:from-purple-700 hover:to-pink-700 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer border border-purple-400/30 font-cute"
              >
                <Camera className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                <span>Ver algo especial 📸</span>
              </button>

              <button 
                onClick={() => setStep(0)}
                className="text-sm text-pink-400 hover:text-pink-300 transition-colors underline decoration-pink-500/30 cursor-pointer font-cute tracking-wide"
              >
                Volver a guardar la cartita 💌
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Partículas globales explotando */}
      {particles.map(p => (
        <div 
          key={p.id}
          className="particle text-2xl sm:text-4xl select-none"
          style={{
            left: p.x - 24, // Ajustamos el centro al tamaño aprox de la fuente
            top: p.y - 24,
            '--tx': p.tx,
            '--ty': p.ty,
            '--rot': p.rot,
          } as React.CSSProperties}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
