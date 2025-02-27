import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let angle = 0;

    function drawOctagon(x, y, size) {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (Math.PI / 4) * i + angle;
        const sx = x + size * Math.cos(a);
        const sy = y + size * Math.sin(a);
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }

    function drawCircle(x, y, radius) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawOctagon(canvas.width / 2, canvas.height / 2, 100);
      drawCircle(canvas.width / 2, canvas.height / 2, 20);

      angle += 0.02;
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} width={300} height={300} />
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
  }
};