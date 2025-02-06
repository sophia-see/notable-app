import { useState, useEffect } from 'react';

export default function useDeviceSize() {
    // Set an initial width based on a safe assumption for SSR
    const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1024);

    useEffect(() => {
        // Ensure this runs only on the client
        const updateWidth = () => setWidth(window.innerWidth);

        updateWidth(); // Set initial width on mount
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    return {
        width,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
    };
}