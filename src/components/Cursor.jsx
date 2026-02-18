import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Cursor = () => {
    const cursorRef = useRef(null);
    const canvasRef = useRef(null);
    const particles = [];
    const maxParticles = 150; // Increased limit for smoother trail

    useEffect(() => {
        const cursor = cursorRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        let mouseX = width / 2;
        let mouseY = height / 2;
        let lastX = mouseX;
        let lastY = mouseY;
        let isHovering = false;

        canvas.width = width;
        canvas.height = height;

        const onResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Move custom cursor
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
                ease: "power2.out"
            });
        };

        const createParticle = (x, y, vx, vy) => {
            const size = Math.random() * 20 + 10; // Varied sizes for smoke
            const life = Math.random() * 30 + 30; // Random lifespan
            particles.push({
                x,
                y,
                vx,
                vy,
                size,
                life,
                maxLife: life,
                hue: 250 + Math.random() * 40, // Purple to Cyan range
                angle: Math.random() * Math.PI * 2 // Random rotation
            });
        };

        const updateParticles = () => {
            ctx.clearRect(0, 0, width, height);

            // Calculate velocity based on mouse movement
            const dx = mouseX - lastX;
            const dy = mouseY - lastY;
            const speed = Math.sqrt(dx * dx + dy * dy);

            // Interpolate positions for smoother trail
            if (speed > 1) {
                const steps = Math.min(speed, 10); // Cap steps to prevent lag
                for (let i = 0; i < steps; i++) {
                    const progress = i / steps;
                    const px = lastX + (mouseX - lastX) * progress;
                    const py = lastY + (mouseY - lastY) * progress;

                    // Emit smoke continuously
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 0.5 + 0.2;
                    createParticle(
                        px + (Math.random() - 0.5) * 5,
                        py + (Math.random() - 0.5) * 5,
                        (Math.cos(angle) * speed) + (Math.random() - 0.5) * 0.5, // Drift
                        (Math.sin(angle) * speed) - 1, // Slight upward float (smoke rises),
                    );
                }
            } else {
                // Emit less smoke when idle
                if (Math.random() > 0.8) {
                    createParticle(
                        mouseX,
                        mouseY,
                        (Math.random() - 0.5) * 0.5,
                        (Math.random() - 0.5) * 0.5 - 0.5
                    );
                }
            }

            // Update physics
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.size += 0.3; // Expand like smoke
                p.life--;
                p.angle += 0.02; // Rotate slightly

                // Draw Smoke Puff (Soft Gradient)
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
                const alpha = p.life * 0.3; // Low opacity for blending

                gradient.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${alpha})`);
                gradient.addColorStop(1, `hsla(${p.hue + 40}, 80%, 60%, 0)`);

                ctx.save();
                ctx.globalCompositeOperation = 'screen'; // Blend mode for glowing effect
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                // Remove dead particles
                if (p.life <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }

            // Limit particles for performance
            if (particles.length > maxParticles) {
                particles.splice(0, particles.length - maxParticles);
            }

            lastX = mouseX;
            lastY = mouseY;
            requestAnimationFrame(updateParticles);
        };

        // Hover effect for interactive elements
        const handleHover = () => {
            if (!isHovering) {
                isHovering = true;
                gsap.to(cursor, { scale: 3, opacity: 0.5, mixBlendMode: 'screen', backgroundColor: '#ffffff', duration: 0.3 });
            }
        };

        const handleHoverOut = () => {
            if (isHovering) {
                isHovering = false;
                gsap.to(cursor, { scale: 1, opacity: 1, mixBlendMode: 'normal', backgroundColor: '#00d4ff', duration: 0.3 });
            }
        };

        // Attach listeners to all clickable elements
        const addHoverListeners = () => {
            const elements = document.querySelectorAll('a, button, input, textarea, .hover-trigger');
            elements.forEach(el => {
                el.addEventListener('mouseenter', handleHover);
                el.addEventListener('mouseleave', handleHoverOut);
            });
        };

        window.addEventListener('resize', onResize);
        window.addEventListener('mousemove', onMouseMove);
        
        // Initial setup and periodic check for new elements
        addHoverListeners();
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        updateParticles();

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
            const elements = document.querySelectorAll('a, button, input, textarea, .hover-trigger');
            elements.forEach(el => {
                el.removeEventListener('mouseenter', handleHover);
                el.removeEventListener('mouseleave', handleHoverOut);
            });
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-[9998]"
                style={{ mixBlendMode: 'screen' }}
            />
            <div
                ref={cursorRef}
                className="fixed w-3 h-3 bg-accent-cyan rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference shadow-[0_0_10px_#00d4ff]"
            />
        </>
    );
};

export default Cursor;
