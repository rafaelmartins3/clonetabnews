import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let angle = 0;
    
    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 10,
      dx: 2,
      dy: 2
    };

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
      return ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    function drawBall(x, y, radius) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
    }

    function isInsideOctagon(x, y, imageData) {
      const index = (y * imageData.width + x) * 4;
      return imageData.data[index + 3] > 0;
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const octagonImageData = drawOctagon(canvas.width / 2, canvas.height / 2, 100);
      
      ball.x += ball.dx;
      ball.y += ball.dy;

      if (!isInsideOctagon(ball.x + ball.radius, ball.y, octagonImageData) ||
          !isInsideOctagon(ball.x - ball.radius, ball.y, octagonImageData)) {
        ball.dx = -ball.dx;
      }
      if (!isInsideOctagon(ball.x, ball.y + ball.radius, octagonImageData) ||
          !isInsideOctagon(ball.x, ball.y - ball.radius, octagonImageData)) {
        ball.dy = -ball.dy;
      }

      drawBall(ball.x, ball.y, ball.radius);

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