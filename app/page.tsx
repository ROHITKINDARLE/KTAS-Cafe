"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, X, Phone, MessageCircle, MapPin, Clock, Mail, ChevronUp, Check, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function CafePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" })
  const [formStatus, setFormStatus] = useState({ type: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowScrollTop(scrollPosition > 400)
      
      Object.entries(sectionsRef.current).forEach(([section, element]) => {
        if (!element) return
        
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
          setActiveSection(section)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const element = sectionsRef.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const validateForm = () => {
    if (!formData.name.trim()) return "Please enter your name"
    if (!formData.phone.trim()) return "Please enter your phone number"
    if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) return "Please enter a valid 10-digit phone number"
    if (!formData.message.trim()) return "Please enter a message"
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const error = validateForm()
    if (error) {
      setFormStatus({ type: "error", message: error })
      return
    }

    setIsSubmitting(true)
    setFormStatus({ type: "", message: "" })

    await new Promise(resolve => setTimeout(resolve, 1500))

    setFormStatus({ 
      type: "success", 
      message: "Thank you! We'll get back to you soon." 
    })
    setFormData({ name: "", phone: "", message: "" })
    setIsSubmitting(false)

    setTimeout(() => setFormStatus({ type: "", message: "" }), 5000)
  }

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "gallery", label: "Gallery" },
    { id: "about", label: "About" },
    { id: "visit", label: "Visit Us" },
    { id: "contact", label: "Contact" },
  ]

  const PHONE = "+919096935355"
  const WHATSAPP = "919096935355"
  const ZOMATO_URL = "https://www.zomato.com/nagpur/ktas-cafe-ayodhya-nagar"

  return (
    <div className="scroll-smooth">
      <nav ref={navRef} className="sticky top-0 z-50 bg-amber-50/95 backdrop-blur-sm border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("home")}>
              <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
                <span className="text-amber-50 font-bold text-lg">☕</span>
              </div>
              <span className="font-bold text-xl text-amber-900">KTAS Cafe</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? "text-amber-900 border-b-2 border-amber-700 pb-1"
                      : "text-amber-700 hover:text-amber-900"
                  }`}
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-amber-100 rounded-lg transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-amber-900" /> : <Menu className="w-6 h-6 text-amber-900" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-amber-200">
              <div className="flex flex-col gap-2 mt-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left px-4 py-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors font-medium"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <section
        ref={(el) => { if (el) sectionsRef.current["home"] = el }}
        className="py-12 md:py-20 bg-gradient-to-br from-amber-50 to-orange-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-3">KTAS Cafe</h1>
                <p className="text-xl text-amber-700 font-medium mb-4">
                  Best Cafe at East Nagpur
                </p>
                <p className="text-amber-600 leading-relaxed">
                  Discover our cozy neighborhood cafe serving freshly prepared sandwiches, wood-fired pizzas, juicy
                  burgers, refreshing shakes and perfectly brewed coffee. A vegetarian-friendly haven for quick bites,
                  casual meet-ups, and evening hangs.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 text-amber-50 rounded-lg font-semibold hover:bg-amber-800 transition-all hover:scale-105 shadow-md"
                  aria-label="Call KTAS Cafe"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a
                  href={ZOMATO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-amber-700 text-amber-700 rounded-lg font-semibold hover:bg-amber-50 transition-all hover:scale-105"
                >
                  Order Online
                </a>
              </div>

              <button
                onClick={() => scrollToSection("menu")}
                className="text-amber-700 font-medium hover:text-amber-900 transition-colors flex items-center gap-2 w-fit group"
              >
                View Menu 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            <div className="hidden md:flex">
              <div className="w-full aspect-square bg-amber-100 rounded-2xl shadow-lg border-4 border-amber-200 overflow-hidden hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/main-image.jpeg"
                  alt="KTAS Cafe"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-amber-900 text-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { emoji: "🥪", label: "Sandwiches", desc: "Crispy & fresh" },
              { emoji: "🍕", label: "Pizza", desc: "Wood-fired" },
              { emoji: "🍔", label: "Burgers", desc: "Juicy bites" },
              { emoji: "☕", label: "Coffee", desc: "Perfectly brewed" },
              { emoji: "🥤", label: "Beverages", desc: "Cold & hot" },
              { emoji: "🧋", label: "Shakes", desc: "Creamy treats" },
              { emoji: "🍟", label: "Fast Food", desc: "Craving fix" },
            ].map((cuisine, idx) => (
              <div
                key={idx}
                className="bg-amber-800 rounded-xl p-4 text-center hover:bg-amber-700 transition-all hover:scale-105 cursor-pointer shadow-md"
              >
                <div className="text-3xl mb-2">{cuisine.emoji}</div>
                <p className="font-semibold text-sm mb-1">{cuisine.label}</p>
                <p className="text-xs text-amber-200">{cuisine.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={(el) => { if (el) sectionsRef.current["menu"] = el }}
        className="py-16 md:py-20 bg-amber-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3">Popular Picks at KTAS Cafe</h2>
            <p className="text-amber-700 max-w-2xl mx-auto">
              Our menu is fully vegetarian-friendly and budget-conscious, perfect for students, families, and everyone
              craving great comfort food.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { name: "Cheese Loaded Sandwich", desc: "Crispy bread with melted cheese & veggies", price: "₹120", badge: "Best Seller", image: "/images/sandwiches.png" },
              { name: "Veggie Delight Pizza", desc: "Freshly made with seasonal vegetables", price: "₹200", badge: "Customer Favorite", image: "/images/pizza.png" },
              { name: "Crispy Veg Burger", desc: "Golden fried patty with special mayo", price: "₹150", badge: "New", image: "/images/burger.png" },
              { name: "Spicy Ramen", desc: "Rich and flavorful noodle bowl", price: "₹150", badge: "Best Seller", image: "/images/Ramen.png" },
              { name: "Chocolate Shake", desc: "Creamy chocolate delight with whipped cream", price: "₹130", badge: "Popular", image: "/images/shake.jpeg" },
              { name: "Peri Peri Fries", desc: "Crispy fries with tangy spice blend", price: "₹90", badge: "New", image: "/images/fries.png" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-105 border border-amber-100 group"
              >
                <div className="relative w-full h-56 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-amber-900">{item.name}</h3>
                    <span className="text-xs font-bold bg-amber-700 text-amber-50 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-sm text-amber-600 mb-3">{item.desc}</p>
                  <p className="text-2xl font-bold text-amber-800">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/images/Menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-amber-700 text-amber-50 rounded-lg font-semibold hover:bg-amber-800 transition-all hover:scale-105"
            >
              View Full Menu
            </a>
            <a
              href={ZOMATO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 border-amber-700 text-amber-700 rounded-lg font-semibold hover:bg-amber-50 transition-all hover:scale-105"
            >
              Order on Zomato
            </a>
          </div>
        </div>
      </section>

      <section
        ref={(el) => { if (el) sectionsRef.current["gallery"] = el }}
        className="py-16 md:py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3">Inside KTAS Cafe</h2>
            <p className="text-amber-700">A cozy space to work, chill or catch up with friends.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Cozy Corner", image: "/images/sitting-1.png" },
              { title: "Seating Area", image: "/images/sitting-two.png" },
              { title: "Dining Space", image: "/images/sitting-3.png" },
              { title: "Cafe Vibes", image: "/images/sitting-4.png" },
              { title: "Indoor Lounge", image: "/images/sitting-5.jpeg" },
              { title: "Relaxation Space", image: "/images/sitting-6.png" },
            ].map((title, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl aspect-square flex items-center justify-center overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
              >
                <Image
                  src={title.image}
                  alt={title.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-end justify-start p-4">
                  <p className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">{title.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={(el) => { if (el) sectionsRef.current["about"] = el }}
        className="py-16 md:py-20 bg-amber-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-8">About KTAS Cafe</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-amber-700 leading-relaxed">
              <p>
                Located at Plot No 7A/B, Hudkeshwar Road, near Union Bank, Dubey Nagar, East Nagpur - KTAS Cafe is your go-to destination for
                freshly prepared vegetarian-friendly comfort food.
              </p>
              <p>
                From our signature sandwiches and wood-fired pizzas to crispy burgers, refreshing shakes, and perfectly
                brewed coffee — we've got something for everyone.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { icon: "💰", label: "₹350 for two (approx.)" },
                { icon: "🥬", label: "100% Veg-Friendly" },
                { icon: "🏠", label: "Indoor Seating" },
                { icon: "🚚", label: "Takeaway & Delivery" },
              ].map((fact, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
                  <span className="text-3xl">{fact.icon}</span>
                  <span className="font-semibold text-amber-900">{fact.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => { if (el) sectionsRef.current["visit"] = el }}
        className="py-16 md:py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Visit Us</h2>

              <div className="bg-amber-50 rounded-xl p-6 shadow-md border-l-4 border-amber-700">
                <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Plot No 7A/B, Hudkeshwar Rd<br />
                  Near Union Bank, Dubey Nagar<br />
                  Chandrakiran Nagar, Nagpur<br />
                  Maharashtra 440034
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl p-6 shadow-md border-l-4 border-amber-700">
                <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Timings
                </h3>
                <div className="flex justify-between mb-2">
                  <span className="text-amber-700 font-medium">Open daily:</span>
                  <span className="text-amber-900 font-semibold">11:00 AM – 10:00 PM</span>
                </div>
                <p className="text-xs text-amber-600 mt-3">
                  ℹ️ Timings may vary on holidays
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden shadow-md h-96 bg-amber-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.2134567890!2d79.0891!3d21.1645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2e2e2e2e2e2e2f%3A0x2e2e2e2e2e2e2e2e!2sKTAS%20Cafe%20Nagpur!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.google.com/maps/search/KTAS+Cafe+Nagpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-amber-700 text-amber-50 rounded-lg font-semibold hover:bg-amber-800 transition-all hover:scale-105 text-center"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => { if (el) sectionsRef.current["contact"] = el }}
        className="py-16 md:py-20 bg-amber-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-12 text-center">Contact Us</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-amber-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-amber-900 mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-700" />
                Call Us
              </h3>
              <p className="text-amber-700 text-sm mb-4">Reach us for reservations</p>
              <p className="text-xl font-bold text-amber-800 mb-4">{PHONE}</p>
              <a
                href={`tel:${PHONE}`}
                className="block w-full px-4 py-2 bg-amber-700 text-amber-50 rounded-lg font-semibold hover:bg-amber-800 transition-all hover:scale-105 text-center"
              >
                Call Now
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-amber-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-amber-900 mb-2 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-amber-700" />
                WhatsApp
              </h3>
              <p className="text-amber-700 text-sm mb-4">Quick & convenient</p>
              <p className="text-sm text-amber-800 font-semibold mb-4">Chat with us</p>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 bg-amber-700 text-amber-50 rounded-lg font-semibold hover:bg-amber-800 transition-all hover:scale-105 text-center"
              >
                Message Us
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-amber-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-amber-900 mb-2 flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-700" />
                Order Online
              </h3>
              <p className="text-amber-700 text-sm mb-4">Fast delivery</p>
              <p className="text-sm text-amber-800 font-semibold mb-4">Via Zomato</p>
              <a
                href={ZOMATO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 bg-amber-700 text-amber-50 rounded-lg font-semibold hover:bg-amber-800 transition-all hover:scale-105 text-center"
              >
                Order Now
              </a>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-md border border-amber-200">
            <h3 className="text-2xl font-bold text-amber-900 mb-6">Send us a Message</h3>
            
            {formStatus.message && (
              <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
                formStatus.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
              }`}>
                {formStatus.type === "success" ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                {formStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Your phone number"
                  className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Your message..."
                  rows={4}
                  className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-amber-700 text-amber-50 rounded-lg font-semibold hover:bg-amber-800 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-amber-700 text-amber-50 rounded-full shadow-lg hover:bg-amber-800 transition-all hover:scale-110 z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      <footer className="bg-amber-900 text-amber-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center md:text-left text-sm">
              © 2025 KTAS Cafe - Best Cafe at East Nagpur. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button className="text-amber-100 hover:text-amber-50 text-sm transition-colors">
                Privacy Policy
              </button>
              <button className="text-amber-100 hover:text-amber-50 text-sm transition-colors">
                Terms & Conditions
              </button>
            </div>
          </div>
          <div className="text-center text-xs text-amber-200 mt-4">Enhanced website design</div>
        </div>
      </footer>
    </div>
  )
}