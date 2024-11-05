import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import SplashScreen from './SplashScreen';
import logo from './logo.jpg'; // Adjust the path based on your project structure

function LandingPage() {
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const ballRef = useRef(null);
    const aboutButtonRef = useRef(null);
    const downloadButtonRef = useRef(null);
    const animationFrameId = useRef(null);

    useEffect(() => {
        const splashDuration = 3000; // 3 seconds
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
        }, splashDuration);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let velocityX = 2;
        let velocityY = 2;

        const ball = ballRef.current;
        const aboutButton = aboutButtonRef.current;
        const downloadButton = downloadButtonRef.current;

        if (!ball || !aboutButton || !downloadButton) {
            console.error("One or more refs are not attached.");
            return;
        }

        // Ensure the parent container has relative positioning
        const container = ball.parentElement;
        container.style.position = 'relative';

        // Initialize ball position in the center of the container
        const containerRect = container.getBoundingClientRect();
        let ballX = (containerRect.width - ball.offsetWidth) / 2;
        let ballY = (containerRect.height - ball.offsetHeight) / 2;

        ball.style.position = 'absolute';
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        const isColliding = (rect1, rect2) => {
            return (
                rect1.right > rect2.left &&
                rect1.left < rect2.right &&
                rect1.bottom > rect2.top &&
                rect1.top < rect2.bottom
            );
        };

        const handleWallCollision = () => {
            const ballRect = ball.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            if (ballX <= 0) {
                velocityX = Math.abs(velocityX);
                ballX = 0;
            } else if (ballX + ball.offsetWidth >= containerRect.width) {
                velocityX = -Math.abs(velocityX);
                ballX = containerRect.width - ball.offsetWidth;
            }

            if (ballY <= 0) {
                velocityY = Math.abs(velocityY);
                ballY = 0;
            } else if (ballY + ball.offsetHeight >= containerRect.height) {
                velocityY = -Math.abs(velocityY);
                ballY = containerRect.height - ball.offsetHeight;
            }
        };

        const handleButtonCollision = (button) => {
            const ballRect = ball.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Convert to container-relative coordinates
            const relativeBallRect = {
                left: ballX,
                right: ballX + ball.offsetWidth,
                top: ballY,
                bottom: ballY + ball.offsetHeight,
            };

            const relativeButtonRect = {
                left: buttonRect.left - containerRect.left,
                right: buttonRect.right - containerRect.left,
                top: buttonRect.top - containerRect.top,
                bottom: buttonRect.bottom - containerRect.top,
            };

            if (isColliding(relativeBallRect, relativeButtonRect)) {
                // Determine the side of collision
                const overlapLeft = relativeBallRect.right - relativeButtonRect.left;
                const overlapRight = relativeButtonRect.right - relativeBallRect.left;
                const overlapTop = relativeBallRect.bottom - relativeButtonRect.top;
                const overlapBottom = relativeButtonRect.bottom - relativeBallRect.top;

                const minOverlapX = Math.min(overlapLeft, overlapRight);
                const minOverlapY = Math.min(overlapTop, overlapBottom);

                if (minOverlapX < minOverlapY) {
                    // Horizontal collision
                    if (overlapLeft < overlapRight) {
                        // Collision on the left side of the button
                        velocityX = -Math.abs(velocityX);
                        ballX = relativeButtonRect.left - ball.offsetWidth;
                    } else {
                        // Collision on the right side of the button
                        velocityX = Math.abs(velocityX);
                        ballX = relativeButtonRect.right;
                    }
                } else {
                    // Vertical collision
                    if (overlapTop < overlapBottom) {
                        // Collision on the top side of the button
                        velocityY = -Math.abs(velocityY);
                        ballY = relativeButtonRect.top - ball.offsetHeight;
                    } else {
                        // Collision on the bottom side of the button
                        velocityY = Math.abs(velocityY);
                        ballY = relativeButtonRect.bottom;
                    }
                }

                // Apply the updated positions
                ball.style.left = `${ballX}px`;
                ball.style.top = `${ballY}px`;

                // Add glow effect
                if (!button.classList.contains('glow')) {
                    button.classList.add('glow');
                    setTimeout(() => button.classList.remove('glow'), 200);
                }
            }
        };

        const animateBall = () => {
            ballX += velocityX;
            ballY += velocityY;

            handleWallCollision();
            handleButtonCollision(aboutButton);
            handleButtonCollision(downloadButton);

            ball.style.left = `${ballX}px`;
            ball.style.top = `${ballY}px`;

            animationFrameId.current = requestAnimationFrame(animateBall);
        };

        animationFrameId.current = requestAnimationFrame(animateBall);

        // Cleanup on unmount
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <div className="landing-page">
            {isSplashVisible && <SplashScreen />}
            {/* Logo Section */}
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className={`main-content ${isSplashVisible ? 'hidden' : 'visible'}`}>
                <div className="container">
                    <div className="center-buttons">
                        <button
                            ref={aboutButtonRef}
                            className="glow-button"
                            onClick={scrollToAbout}
                        >
                            About
                        </button>
                        <a
                            ref={downloadButtonRef}
                            className="glow-button"
                            href="https://huggingface.co/Shanthan2307/Hawk_Eye_Model"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Notebook
                        </a>
                    </div>
                    <div ref={ballRef} className="bouncing-ball"></div>
                </div>
                <div id="about" className="about-section">
                    <h1>About the Project</h1>
                    <p>
                        This diagram provides the architecture of our image recognition model.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
