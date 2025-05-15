import React, { useEffect, useRef } from 'react';
import AdminBar from './adminnavbar';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AdminHome() {
  const textRef = useRef(null);
  const bgRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Animate welcome text
    const text = "Welcome Admin";
    const chars = text.split('');
    textRef.current.innerHTML = '';

    chars.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      textRef.current.appendChild(span);
    });

    gsap.fromTo(
      textRef.current.children,
      { y: -80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: 'bounce.out',
        stagger: 0.08,
        duration: 0.6,
      }
    );

    // Animate background gradient
    gsap.to(bgRef.current, {
      backgroundPosition: "300% 0%",
      duration: 15,
      repeat: -1,
      ease: "linear"
    });

    // Scroll-triggered animations for each section
    sectionRefs.current.forEach((ref, index) => {
      gsap.fromTo(ref, {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ref,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    });

  }, []);

  // Sections data
  const sectionData = [
    { title: "User Management", content: "Manage all users, block/unblock and assign roles." },
    { title: "View Orders", content: "See all placed orders and their statuses in real-time." },
    { title: "Analytics", content: "Visualize data, track performance and more." },
    { title: "Settings", content: "Update platform preferences, password and more." }
  ];

  return (
    <div
      ref={bgRef}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        color: '#fff',
        textAlign: 'center',
        overflowX: 'hidden',
        padding: '40px 20px'
      }}
    >
      <AdminBar />

      <h1
        ref={textRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '4px',
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '60px'
        }}
      ></h1>

      {/* Scrollable sections */}
      {sectionData.map((section, i) => (
        <div
          key={i}
          ref={(el) => (sectionRefs.current[i] = el)}
          style={{
            margin: '60px auto',
            padding: '40px 20px',
            maxWidth: '800px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 20px rgba(0,0,0,0.3)'
          }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{section.title}</h2>
          <p style={{ fontSize: '1.2rem' }}>{section.content}</p>
        </div>
      ))}
    </div>
  );
}
