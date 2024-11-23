'use client';
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BarChart3, Network, Briefcase, TrendingUp, Mail, Lightbulb, PhoneCall, Menu, X } from 'lucide-react'
import { debounce } from 'lodash'

// Feature data
const features = [
    {
        icon: Briefcase,
        title: "Job Application Tracker",
        description: "Keep track of all your job applications in one place. Never miss a follow-up or deadline again. Our intuitive interface allows you to easily add new applications, set reminders, and track the status of each opportunity."
    },
    {
        icon: Network,
        title: "Network Management",
        description: "Manage and grow your professional network effectively. Set reminders for check-ins, track your interactions, and nurture your relationships. Our tool helps you stay connected with your contacts and leverage your network for career growth."
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description: "Visualize your job search progress and networking efforts with our comprehensive analytics dashboard. Get insights into your application success rate, networking activity, and overall career progress. Make data-driven decisions to optimize your job search strategy."
    }
]

export default function HomePage() {
    // State management
    const [activeSection, setActiveSection] = useState('')
    const [activeFeature, setActiveFeature] = useState(0)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrollingToSection, setIsScrollingToSection] = useState(false)

    // Refs
    const featuresRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    // Handle scroll with debounce for performance
    const handleScroll = useCallback(
        debounce(() => {
            if (featuresRef.current && !isScrollingToSection) {
                const { top, height } = featuresRef.current.getBoundingClientRect()
                const scrollPosition = window.innerHeight / 2
                const featureHeight = height / 3

                if (top <= scrollPosition && top + height > scrollPosition) {
                    const index = Math.floor((scrollPosition - top) / featureHeight)
                    setActiveFeature(Math.min(2, Math.max(0, index)))
                }
            }
        }, 50),
        [isScrollingToSection]
    )

    // Set up intersection observer for sections
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                        setActiveSection(entry.target.id || '')
                    }
                })
            },
            { threshold: [0.3] }
        )

        const sections = document.querySelectorAll('section[id]')
        sections.forEach((section) => {
            observerRef.current?.observe(section)
        })

        return () => {
            if (observerRef.current) {
                sections.forEach((section) => {
                    observerRef.current?.unobserve(section)
                })
            }
        }
    }, [])

    // Set up scroll listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    // Smooth scroll to section with accessibility
    const scrollToSection = useCallback((sectionId: string) => {
        setIsScrollingToSection(true)
        const element = document.getElementById(sectionId)
        if (element) {
            const navbarHeight = headerRef.current?.offsetHeight || 64
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - navbarHeight

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })

            // Close mobile menu if open
            setIsMobileMenuOpen(false)

            // Reset scrolling state after animation
            setTimeout(() => {
                setIsScrollingToSection(false)
            }, 1000)
        }
    }, [])

    // Navigation button component
    const NavButton = ({ id, icon: Icon, label }: { id: string; icon: typeof Lightbulb; label: string }) => (
        <button
            onClick={() => scrollToSection(id)}
            className={`
                text-base font-medium transition-colors flex items-center
                ${activeSection === id ? 'text-coral-dark' : 'text-text-secondary-dark'}
                hover:text-coral-dark focus:outline-none focus:ring-2 focus:ring-coral-dark/20 rounded-lg px-3 py-2
            `}
            aria-label={`Navigate to ${label} section`}
        >
            <Icon className={`mr-2 h-5 w-5 ${activeSection === id ? 'text-coral-dark' : ''}`} />
            <span>{label}</span>
        </button>
    )

    return (
        <div className="flex flex-col min-h-screen bg-background-dark text-text-primary-dark">
            {/* Header */}
            <header
                ref={headerRef}
                className="fixed top-0 left-0 right-0 px-6 lg:px-8 h-16 flex items-center border-b border-gray-800 bg-background-dark/80 backdrop-blur-md z-50"
                role="banner"
            >
                <Link
                    className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-coral-dark/20 rounded-lg"
                    href="#"
                    aria-label="CareerCraft Home"
                >
                    <Image src="/logo.svg" alt="" width={32} height={32} />
                    <span className="ml-2 text-2xl font-bold font-space-grotesk text-text-primary-dark">CareerCraft</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="ml-auto hidden md:flex items-center gap-6" aria-label="Main navigation">
                    <NavButton id="features" icon={Lightbulb} label="Features" />
                    <NavButton id="contact" icon={PhoneCall} label="Contact" />
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="ml-auto md:hidden p-2 rounded-lg hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-coral-dark/20"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle navigation menu"
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </header>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="fixed inset-x-0 top-16 bg-background-dark border-b border-gray-800 py-4 px-6 md:hidden z-40">
                    <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
                        <NavButton id="features" icon={Lightbulb} label="Features" />
                        <NavButton id="contact" icon={PhoneCall} label="Contact" />
                    </nav>
                </div>
            )}

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative min-h-screen pt-16 flex items-center" role="region" aria-label="Hero section">
                    <Image
                        src="/background.jpeg"
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        priority
                        className="transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50" />
                    <div className="relative z-10 container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                                    Craft Your Career Journey
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                                    Track job applications, manage your network, and visualize your career progress all in one place.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link
                                    href="/career-dashboard"
                                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-medium bg-lapis-lazuli-dark hover:bg-lapis-lazuli-dark/90 text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lapis-lazuli-dark/20"
                                >
                                    <TrendingUp className="mr-2 h-5 w-5" />
                                    View Demo
                                </Link>
                                <button
                                    onClick={() => scrollToSection('features')}
                                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-medium text-white hover:text-white/90 border border-white hover:border-white/90 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20"
                                >
                                    <Lightbulb className="mr-2 h-5 w-5" />
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section
                    id="features"
                    className="w-full py-12 md:py-24 lg:py-32 scroll-mt-16"
                    role="region"
                    aria-label="Features section"
                >
                    <div className="container px-4 md:px-6 mx-auto">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-text-primary-dark">
                            Key Features
                        </h2>
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="lg:w-1/2 lg:sticky lg:top-20 lg:self-start">
                                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-[1.02]">
                                    <Image
                                        src="/placeholder.jpeg"
                                        alt={features[activeFeature].title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-opacity duration-700"
                                    />
                                </div>
                                {/* Feature Progress Indicators */}
                                <div className="hidden lg:flex justify-center mt-6 gap-2">
                                    {features.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-1 rounded-full transition-all duration-300 ${
                                                index === activeFeature
                                                    ? 'w-8 bg-coral-dark'
                                                    : 'w-2 bg-gray-600'
                                            }`}
                                            role="progressbar"
                                            aria-valuenow={index === activeFeature ? 100 : 0}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="lg:w-1/2 space-y-24" ref={featuresRef}>
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`
                                            scroll-mt-20 transform transition-all duration-500
                                            ${activeFeature === index
                                            ? 'opacity-100 translate-x-0'
                                            : 'opacity-50 translate-x-4'
                                        }
                                        `}
                                    >
                                        <div className="flex items-center text-text-primary-dark mb-4">
                                            <feature.icon className="h-8 w-8 mr-3 text-lapis-lazuli-dark" />
                                            <h3 className="text-2xl font-semibold">{feature.title}</h3>
                                        </div>
                                        <p className="text-text-secondary-dark text-lg">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section
                    id="contact"
                    className="w-full py-12 md:py-24 lg:py-32 scroll-mt-16"
                    role="region"
                    aria-label="Contact section"
                >
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-text-primary-dark">
                                    Start Crafting Your Career Today
                                </h2>
                                <p className="mx-auto max-w-[600px] text-text-secondary-dark md:text-xl">
                                    Join thousands of job seekers who are leveraging CareerCraft to land their dream jobs.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link
                                    href="/career-dashboard"
                                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-medium bg-coral-dark hover:bg-coral-dark/90 text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-coral-dark/20"
                                >
                                    <TrendingUp className="mr-2 h-5 w-5" />
                                    View Demo
                                </Link>
                                <a
                                    href="mailto:contact@careercraft.com"
                                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-medium text-coral-dark hover:text-coral-dark/90 border border-coral-dark hover:border-coral-dark/90 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-coral-dark/20"
                                >
                                    <Mail className="mr-2 h-5 w-5" />
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer
                className="w-full shrink-0 border-t border-gray-800"
                role="contentinfo"
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <p className="text-sm text-text-secondary-dark">
                                © 2024 CareerCraft. All rights reserved.
                            </p>
                        </div>
                        <nav
                            className="flex gap-4 sm:gap-6"
                            aria-label="Footer navigation"
                        >
                            <Link
                                className="text-sm text-text-secondary-dark hover:text-coral-dark transition-colors focus:outline-none focus:ring-2 focus:ring-coral-dark/20 rounded-lg px-2 py-1"
                                href="#"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                className="text-sm text-text-secondary-dark hover:text-coral-dark transition-colors focus:outline-none focus:ring-2 focus:ring-coral-dark/20 rounded-lg px-2 py-1"
                                href="#"
                            >
                                Privacy
                            </Link>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    )
}
