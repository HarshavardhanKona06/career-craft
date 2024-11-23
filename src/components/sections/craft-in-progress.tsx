'use client';
import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import animationData from '@/lib/craft-in-progress.json';

interface UnderConstructionProps {
    width?: string | number;
    height?: string | number;
    className?: string;
}

const CraftInProgress: React.FC<UnderConstructionProps> = ({
                                                                 width = '500px',
                                                                 height = '500px',
                                                                 className = ''
                                                             }) => {
    const animationContainer = useRef<HTMLDivElement>(null);
    const animationInstance = useRef<AnimationItem | null>(null);

    useEffect(() => {
        if (!animationContainer.current) return;

        animationInstance.current = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData,
        });

        return () => {
            if (animationInstance.current) {
                animationInstance.current.destroy();
            }
        };
    }, []);

    return (
        <section id={'craft-in-progress'}
                 className='min-h-screen p-4 flex flex-col items-center justify-center bg-background-light dark:bg-background-dark'>
            <div
                ref={animationContainer}
                style={{width, height}}
                className={`flex items-center justify-center pl-12 ${className}`}
            />
            <div className="flex flex-col gap-4 pb-15">
                <h2 className='text-3xl tracking-wide font-bold text-text-primary-light dark:text-text-primary-dark'>
                    Crafting Something Special
                </h2>
                <p className='text-text-secondary-light dark:text-text-secondary-dark text-lg text-center max-w-md'>
                    Get Ready to Transform Your Search
                </p>
            </div>
        </section>
    );
};

export default CraftInProgress;
