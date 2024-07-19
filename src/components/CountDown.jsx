import { useEffect, useState } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countDownDate = new Date('Dec 31, 2024 23:59:59').getTime();

    const countdownFunction = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(countdownFunction);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(countdownFunction);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Coming Soon</h1>
      <p style={styles.p}>We are working hard to give you the best experience. Stay tuned!</p>
      <div style={styles.countdown} id="countdown">
        <div style={styles.countdownDiv}>
          <span style={styles.span} id="days">{timeLeft.days}</span>Days
        </div>
        <div style={styles.countdownDiv}>
          <span style={styles.span} id="hours">{timeLeft.hours}</span>Hours
        </div>
        <div style={styles.countdownDiv}>
          <span style={styles.span} id="minutes">{timeLeft.minutes}</span>Minutes
        </div>
        <div style={styles.countdownDiv}>
          <span style={styles.span} id="seconds">{timeLeft.seconds}</span>Seconds
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f2f2f2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
  },
  h1: {
    marginBottom: '20px',
    fontSize: '36px',
    color: '#333',
  },
  p: {
    marginBottom: '30px',
    fontSize: '18px',
    color: '#777',
  },
  countdown: {
    display: 'flex',
    justifyContent: 'center',
  },
  countdownDiv: {
    margin: '0 10px',
    padding: '20px',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '5px',
  },
  span: {
    display: 'block',
    fontSize: '48px',
    marginBottom: '10px',
  },
};

export default Countdown;