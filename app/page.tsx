"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import emailjs from '@emailjs/browser'
import {
  Volume2,
  Headphones,
  Mic,
  CheckCircle,
  Star,
  Quote,
  Award,
  Calendar,
  Mail,
  MapPin,
  Send,
  Menu,
  X,
} from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [projectsCount, setProjectsCount] = useState(0)
  const [yearsCount, setYearsCount] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    services: '',
    message: '',
    newsletter: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate years of experience
  const currentYear = new Date().getFullYear()
  const startYear = 2022
  const yearsExperience = currentYear - startYear

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // EmailJS configuration
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        company: formData.company || 'Not specified',
        project_type: formData.projectType,
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        services: formData.services || 'Not specified',
        message: formData.message,
        newsletter: formData.newsletter ? 'Yes' : 'No',
        to_email: 'chloelim267@gmail.com'
      }

      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        services: '',
        message: '',
        newsletter: false
      })

      alert('Message sent successfully! I\'ll get back to you soon.')
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Sorry, there was an error sending your message. Please try again or contact me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    const statsSection = document.querySelector('.stats-section')
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => observer.disconnect()
  }, [])

  // Animate numbers when stats become visible
  useEffect(() => {
    if (statsVisible) {
      // Fixed increment rate - all numbers increment at the same speed
      const incrementRate = 2 // numbers per frame
      const frameRate = 16 // ms per frame

      const animateNumber = (setter: React.Dispatch<React.SetStateAction<number>>, target: number) => {
        let current = 0

        const timer = setInterval(() => {
          current += incrementRate
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          setter(Math.floor(current))
        }, frameRate)

        return timer
      }

      const projectsTimer = animateNumber(setProjectsCount, 30)
      const yearsTimer = animateNumber(setYearsCount, yearsExperience)

      return () => {
        clearInterval(projectsTimer)
        clearInterval(yearsTimer)
      }
    }
  }, [statsVisible, yearsExperience])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-sans text-2xl font-bold text-primary">CHLOE LIM AUDIO</h1>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                Services
              </a>
              <a href="#portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                Portfolio
              </a>
              <a href="#equipment" className="text-muted-foreground hover:text-primary transition-colors">
                Equipment
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-100 ${isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={closeSidebar}
        />

        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-background border-l border-border shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-sans text-xl font-bold text-primary">Menu</h2>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-primary" />
            </button>
          </div>

          <nav className="p-6">
            <div className="space-y-6">
              <a
                href="#about"
                onClick={closeSidebar}
                className="block text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                About
              </a>
              <a
                href="#services"
                onClick={closeSidebar}
                className="block text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Services
              </a>
              <a
                href="#portfolio"
                onClick={closeSidebar}
                className="block text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Portfolio
              </a>
              <a
                href="#equipment"
                onClick={closeSidebar}
                className="block text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Equipment
              </a>
              <a
                href="#contact"
                onClick={closeSidebar}
                className="block text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Contact
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-12 items-center justify-items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-sans text-5xl lg:text-6xl font-bold text-primary leading-tight">
                  Hi! I&apos;m Chloe.
                </h2>
                <p className="font-sans text-xl text-muted-foreground leading-relaxed">
                  I&apos;m based in LA, Orange, and Singapore, and am a Chapman University graduate with a B.F.A. in Film Production and an emphasis in Sound Design.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/80 text-accent-foreground"
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get In Touch
                </Button>
              </div>

              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src="/cover-photo.png"
                  alt="Chloe Lim working with professional audio equipment"
                  className="w-full h-full object-cover"
                  width={1000}
                  height={1000}
                />
              </div>

              {/* Quick Stats */}
              <div className="stats-section grid grid-cols-2 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{projectsCount}+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{yearsCount}+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-sans text-4xl font-bold text-primary mb-6">What I Do</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I&apos;ve worked on a variety of projects in different aspects of production and post-production. Today, I am open to work in production audio, boom operating, and post-sound! Please reach out to me for any inquiries and I look forward to meeting you :)
            </p>
          </div>

          {/* Service Cards */}
          <Carousel className="mb-16" options={{ align: "start", loop: false }}>
            <CarouselContent>
              <CarouselItem>
                <Card className="h-160 p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-l-accent">
                  <div className="p-4 bg-accent/10 rounded-full w-fit mb-6">
                    <Mic className="w-10 h-10 text-accent" />
                  </div>
                  <h4 className="font-sans text-2xl font-bold text-card-foreground mb-4">Production Sound Mixer</h4>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    I handle all on-set audio recording using both a shotgun and
                    wireless microphone techniques. I adapt to the location and
                    weather factors to ensure that the dialogue is as clean as possible.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-card-foreground">Multi-track recording and real-time mixing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-card-foreground">Wireless and boom microphone systems</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-card-foreground">Location sound problem-solving</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-card-foreground">Timecode synchronization</span>
                    </div>
                  </div>
                </Card>
              </CarouselItem>

              <CarouselItem>
                <Card className="h-160 p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-l-accent">
                  <div className="p-4 bg-accent/10 rounded-full w-fit mb-6">
                    <Volume2 className="w-10 h-10 text-accent" />
                  </div>
                  <h4 className="font-sans text-2xl font-bold text-card-foreground mb-4">Boom Operater / Sound Utility</h4>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    I assist the production sound mixer and fill in the gaps where
                    needed. I work with the camera team to ensure that I am getting the
                    best sound possible without interfering with other aspects of the
                    shoot.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-card-foreground">Precise microphone positioning</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-card-foreground">Camera-friendly operation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-card-foreground">Location expertise</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-card-foreground">Collaborative workflow approach</span>
                    </div>
                  </div>
                </Card>
              </CarouselItem>

              <CarouselItem >
                <Card className="h-160 p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-l-accent">
                  <div className="p-4 bg-accent/10 rounded-full w-fit mb-6">
                    <Headphones className="w-10 h-10 text-accent" />
                  </div>
                  <h4 className="font-sans text-2xl font-bold text-card-foreground mb-4">Post-Sound</h4>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    I work solo or collaborate with a team to create the final polished
                    sound of a project. I am experienced in dialogue editing, foley, ADR,
                    SFX, and re-recording mixing in stereo or 5.1
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-card-foreground">Dialogue editing and cleanup</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-card-foreground">Sound effects and foley integration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-card-foreground">Music and score mixing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-card-foreground">Final mix delivery in stereo and 5.1</span>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <div className="mt-4 flex items-center justify-end gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>

          {/* Process Section */}
          <div className="bg-card rounded-lg p-8 mb-16">
            <h4 className="font-sans text-2xl font-bold text-center text-card-foreground mb-8"> How I Work</h4>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  1
                </div>
                <h5 className="font-semibold text-card-foreground mb-2">Let&apos;s Chat</h5>
                <p className="text-sm text-muted-foreground">
                  I get to know your project and what you&apos;re going for!
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  2
                </div>
                <h5 className="font-semibold text-card-foreground mb-2">Planning</h5>
                <p className="text-sm text-muted-foreground">I figure out the best approach and get my gear ready!</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  3
                </div>
                <h5 className="font-semibold text-card-foreground mb-2">Let&apos;s Do This</h5>
                <p className="text-sm text-muted-foreground">Time to get down to business - recording or post work.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  4
                </div>
                <h5 className="font-semibold text-card-foreground mb-2">You&apos;re All Set</h5>
                <p className="text-sm text-muted-foreground">
                  I get your final files to you in the format you need, when you need them!
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 relative">
              <Quote className="w-8 h-8 text-accent/20 absolute top-4 left-4" />
              <div className="pt-4">
                <p className="text-card-foreground leading-relaxed mb-6 italic">
                  &quot;Chloe&apos;s attention to detail and technical expertise elevated our film&apos;s audio beyond our
                  expectations. Her professional approach and creative problem-solving made all the difference.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <span className="font-semibold text-muted-foreground">MR</span>
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">Marcus Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Film Director</div>
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-8 relative">
              <Quote className="w-8 h-8 text-accent/20 absolute top-4 left-4" />
              <div className="pt-4">
                <p className="text-card-foreground leading-relaxed mb-6 italic">
                  &quot;Working with Chloe was seamless from start to finish. Her post-production work transformed our raw
                  footage into a polished, professional piece that exceeded client expectations.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <span className="font-semibold text-muted-foreground">SJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">Production Manager</div>
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-sans text-4xl font-bold text-primary mb-6">Some cool stuff I&apos;ve worked on recently!</h3>
          </div>

          {/* Featured Project 1*/}
          <div className="mb-16">
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0 lg:items-center">
                <div className="relative group">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <video
                      src="https://qxbtwqhhuiuf9zuu.public.blob.vercel-storage.com/51_50.mp4"
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-sans text-3xl font-bold text-card-foreground mb-3">51 50</h4>
                      <p className="text-accent font-semibold mb-4">Dodge College Senior Thesis Project</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Project lead on sound from start to finish of the project, where I was
                        challenged to bring life to the inner world of Blake, a young woman
                        struggling with depression and suicidal thoughts. I designed
                        immersive ambiences mixed in 5.1. to enhance the dark and moody
                        themes of the film.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-accent" />
                        <div>
                          <div className="text-sm font-semibold text-card-foreground">Duration</div>
                          <div className="text-sm text-muted-foreground">6 months</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-accent" />
                        <div>
                          <div className="text-sm font-semibold text-card-foreground">Role</div>
                          <div className="text-sm text-muted-foreground">Production Sound Mixer and Sound Designer</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center items-center">
                      <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                        Production Sound Mixing
                      </span>
                      <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                        Dialogue Editing
                      </span>
                      <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">Foley</span>
                      <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">5.1.</span>
                      <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">ADR</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Featured Project 2*/}

          <div className="mb-16">
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0 lg:items-center ">
                <div className="relative group">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <video
                      src="https://qxbtwqhhuiuf9zuu.public.blob.vercel-storage.com/Bone.mp4"
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-sans text-3xl font-bold text-card-foreground mb-3">Bone</h4>
                      <p className="text-accent font-semibold mb-4">Dodge College Advanced Production</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Enhanced the character of a freshman in high school named
                        Georgie by creating a rich world of stimulating, exaggerated
                        ambiences and worked with the composer to ensure compatibility
                        between story and sound.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 ">
                      <div className="flex items-center gap-3 ">
                        <Calendar className="w-5 h-5 text-accent" />
                        <div>
                          <div className="text-sm font-semibold text-card-foreground">Duration</div>
                          <div className="text-sm text-muted-foreground">4 months</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-accent" />
                        <div>
                          <div className="text-sm font-semibold text-card-foreground">Role</div>
                          <div className="text-sm text-muted-foreground">Sound Designer</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center items-center">
                      <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                        Dialogue Editing
                      </span>
                      <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                        5.1.
                      </span>
                      <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">Foley</span>
                      <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">Ambiences</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>


          {/* Call to Action */}
          <div className="text-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              View My Full Portfolio Here!
            </Button>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section id="equipment" className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-sans text-4xl font-bold text-primary mb-6">My Equipment!</h3>

          </div>

          {/* Equipment List */}
          <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
            <Card className="p-8 hover:shadow-xl transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-card-foreground font-medium">Deity Microphones TC-1 Wireless Timecode Generator Box</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-card-foreground font-medium">Zoom F8n MultiTrack Field Recorder</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-card-foreground font-medium">DPA 2017 Shotgun</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-card-foreground font-medium">Sony UWP-D21 Wireless Microphone Set (2x)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-card-foreground font-medium">Deity W.Lav Pro Waterproof Lavalier (2x)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-card-foreground font-medium">Audio-Technica ATH-M20x Closed-Back Monitoring Headphones</span>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-sans text-4xl font-bold text-primary mb-6">Let&apos;s Make Something Awesome</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-card-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-card-foreground mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-card-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-card-foreground mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    placeholder="Your company or organization"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-semibold text-card-foreground mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    >
                      <option value="">Select project type</option>
                      <option value="feature-film">Feature Film</option>
                      <option value="short-film">Short Film</option>
                      <option value="documentary">Documentary</option>
                      <option value="commercial">Commercial/Advertisement</option>
                      <option value="corporate">Corporate Video</option>
                      <option value="music-video">Music Video</option>
                      <option value="podcast">Podcast</option>
                      <option value="live-event">Live Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-semibold text-card-foreground mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $300</option>
                      <option value="5k-15k">$300 - $500</option>
                      <option value="15k-30k">$500 - $1,000</option>
                      <option value="30k-50k">$1,000 - $5,000</option>
                      <option value="over-50k">Over $5,000</option>
                      <option value="discuss">Prefer to discuss</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-semibold text-card-foreground mb-2">
                      Project Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-2-weeks">1-2 weeks</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="flexible">Flexible timeline</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="services" className="block text-sm font-semibold text-card-foreground mb-2">
                      Services Needed
                    </label>
                    <select
                      id="services"
                      name="services"
                      value={formData.services}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    >
                      <option value="">Select primary service</option>
                      <option value="production-sound">Production Sound Mixing</option>
                      <option value="boom-operation">Boom Operation</option>
                      <option value="post-sound">Post-Production Sound</option>
                      <option value="sound-design">Equipment Rental</option>
                      <option value="full-package">Consultation</option>
                      <option value="consultation">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-card-foreground mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-vertical"
                    placeholder="Tell me about your project... What's the story? What's your vision for the audio? Any specific requirements or challenges?"
                  />
                </div>

                {/* <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent focus:ring-2"
                  />
                  <label htmlFor="newsletter" className="text-sm text-muted-foreground leading-relaxed">
                    (placeholder)I'd like to receive occasional updates about Chloe's work and industry insights. (Optional)
                  </label>
                </div> */}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  I typically respond within 24 hours. For urgent projects, please call directly.
                </p>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-8">
                <h4 className="font-sans text-2xl font-bold text-card-foreground mb-6">Get In Touch</h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-card-foreground mb-1">Email</h5>
                      <p className="text-muted-foreground">chloelim267@gmail.com</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        For more detailed discussions! 
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-card-foreground mb-1">Location</h5>
                      <p className="text-muted-foreground">Orange County, CA</p>
                    </div>
                  </div>
                </div>
              </Card>


            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
