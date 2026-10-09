import { useEffect, useRef, useState } from "react";
import type React from "react";

type ScrollRevealProps = {
    children: React.ReactNode;
};

function ScrollReveal({ children }: ScrollRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;

        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={elementRef}
            className={`relative z-0 ${isVisible ? "slide-up" : "opacity-0"}`}
        >
            {children}
        </div>
    );
}

export default ScrollReveal;