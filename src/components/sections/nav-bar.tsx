'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
    ChevronsUpDown,
    Settings,
    LogOut,
    LayoutDashboard,
    Briefcase,
    Users,
    CircleFadingPlus,
    Sun,
    Moon,
    Laptop,
    ChevronLeft
} from 'lucide-react';

const NavBar = () => {
    const navItems = [
        { id: 'dashboard', label: 'Career Dashboard', icon: LayoutDashboard, href: '/career-dashboard' },
        { id: 'applications', label: 'Applications', icon: Briefcase, href: '/applications' },
        { id: 'networking', label: 'Networking', icon: Users, href: '/networking' }
    ];

    const [activeNav, setActiveNav] = useState('dashboard');
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const appearanceRef = useRef<HTMLDivElement>(null);

    const { theme, setTheme } = useTheme();

    const userInitials = "JD";
    const userColor = '#614BC3';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsNavOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
            if (appearanceRef.current && !appearanceRef.current.contains(event.target as Node)) {
                setIsAppearanceOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const themeOptions = [
        { value: 'system', label: 'System', icon: Laptop },
        { value: 'light', label: 'Light', icon: Sun },
        { value: 'dark', label: 'Dark', icon: Moon },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background-light dark:bg-background-dark">
            <div className="w-full h-16 flex items-center justify-between px-2">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center pl-1">
                        <Image src="/logo.svg" alt="CareerCraft Logo" width={24} height={24} />
                        <span className="ml-2 text-base font-semibold text-text-primary-light dark:text-text-primary-dark font-space-grotesk">
                            CareerCraft
                        </span>
                    </Link>

                    <div className="relative" ref={navRef}>
                        <button
                            onClick={() => setIsNavOpen(!isNavOpen)}
                            onMouseEnter={() => setIsNavOpen(true)}
                            className="flex items-center space-x-2 py-2 px-3 rounded-lg transition-colors"
                            aria-haspopup="true"
                            aria-expanded={isNavOpen}
                        >
                            <div className="flex items-center">
                                {React.createElement(
                                    navItems.find(item => item.id === activeNav)?.icon,
                                    {
                                        size: 18,
                                        className: "text-lapis-lazuli-light dark:text-lapis-lazuli-dark"
                                    }
                                )}
                                <span className="ml-2 text-text-primary-light dark:text-text-primary-dark hidden md:inline">
                                    {navItems.find(item => item.id === activeNav)?.label}
                                </span>
                                <ChevronsUpDown className="ml-1 h-4 w-4 text-text-secondary-light dark:text-text-secondary-dark" />
                            </div>
                        </button>
                        {isNavOpen && (
                            <div
                                className="absolute mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                                onMouseLeave={() => setIsNavOpen(false)}
                            >
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            onClick={() => {
                                                setActiveNav(item.id);
                                                setIsNavOpen(false);
                                            }}
                                            className="flex items-center w-full px-4 py-2 text-sm text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700"
                                            role="menuitem"
                                        >
                                            <item.icon
                                                size={18}
                                                className={`mr-2 ${activeNav === item.id ? 'text-lapis-lazuli-light dark:text-lapis-lazuli-dark' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
                                            />
                                            <span
                                                className={`font-medium ${activeNav === item.id ? 'text-lapis-lazuli-light dark:text-lapis-lazuli-dark' : 'text-text-primary-light dark:text-text-primary-dark'}`}
                                            >
                                                {item.label}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-4 pr-1">
                    <button
                        className="group flex items-center space-x-2 py-2 px-3 rounded-lg transition-all duration-200 text-coral-light dark:text-coral-dark hover:bg-coral-light hover:dark:bg-coral-dark hover:text-white"
                    >
                        <CircleFadingPlus className="h-5 w-5 transition-colors scale-x-[-1]" />
                        <span className="font-medium transition-colors hidden md:inline">
                            Quick Add
                        </span>
                    </button>

                    <div className="relative" ref={userMenuRef}>
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="w-8 h-8 rounded-lg flex items-center font-space-grotesk justify-center text-white text-sm font-medium transition-transform hover:scale-105"
                            style={{ backgroundColor: userColor }}
                            aria-haspopup="true"
                            aria-expanded={isUserMenuOpen}
                        >
                            {userInitials}
                        </button>
                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                    <button
                                        className="flex items-center w-full px-4 py-2 text-sm text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700"
                                        role="menuitem"
                                    >
                                        <Settings className="mr-2 h-4 w-4 text-text-secondary-light dark:text-text-secondary-dark" />
                                        <span className="font-medium">Settings</span>
                                    </button>
                                    <div
                                        className="relative px-4 py-2"
                                        ref={appearanceRef}
                                        onMouseEnter={() => setIsAppearanceOpen(true)}
                                        onMouseLeave={() => setIsAppearanceOpen(false)}
                                    >
                                        <button
                                            className="flex items-center w-full text-sm text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <Sun className="mr-2 h-4 w-4 text-text-secondary-light dark:text-text-secondary-dark" />
                                            <span className="font-medium">Appearance</span>
                                            <ChevronLeft className="ml-auto h-4 w-4" />
                                        </button>
                                        {isAppearanceOpen && (
                                            <div className="absolute right-full top-0 mt-0 mr-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                                                {themeOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        className={`flex items-center w-full px-4 py-2 text-sm ${
                                                            theme === option.value
                                                                ? 'bg-coral-light dark:bg-coral-dark text-white'
                                                                : 'text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }`}
                                                        onClick={() => setTheme(option.value)}
                                                    >
                                                        <option.icon className="mr-2 h-4 w-4" />
                                                        <span>{option.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        className="flex items-center w-full px-4 py-2 text-sm text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700"
                                        role="menuitem"
                                    >
                                        <LogOut className="mr-2 h-4 w-4 text-text-secondary-light dark:text-text-secondary-dark" />
                                        <span className="font-medium">Log out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
