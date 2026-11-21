export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-dark-100">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-dark-900">Pawtrol</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-dark-600 hover:text-dark-900 transition-colors font-medium">Features</a>
              <a href="#hardware" className="text-dark-600 hover:text-dark-900 transition-colors font-medium">Hardware</a>
              <a href="#how-it-works" className="text-dark-600 hover:text-dark-900 transition-colors font-medium">How It Works</a>
              <a href="#pricing" className="text-dark-600 hover:text-dark-900 transition-colors font-medium">Pricing</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#pricing" className="btn-secondary hidden sm:inline-flex">Learn More</a>
              <a href="#pricing" className="btn-primary">Pre-Order</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                Live Demo Available • Shipping Q2 2025
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-dark-900 tracking-tight leading-[1.1] mb-6 animate-fade-in animate-delay-100">
                Your Dog, Always{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  Supervised. Always Safe.
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-dark-500 mb-8 max-w-xl animate-fade-in animate-delay-200">
                The first distributed AI system where Seeker devices watch, analyze, and guide Action Taker devices to supervise, protect, and care for your dog 24/7 — even when you're miles away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-300">
                <a href="#pricing" className="btn-primary text-lg px-8 py-4">
                  Reserve Your System
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="#demo" className="btn-secondary text-lg px-8 py-4">
                  Watch Demo
                </a>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-8 text-sm text-dark-500 animate-fade-in animate-delay-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No subscription required
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Local-first processing
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Expandable mesh network
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-fade-in animate-delay-200">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100 via-transparent to-blue-100 rounded-3xl blur-3xl opacity-50 animate-pulse-slow" />
                
                {/* Main device visualization */}
                <div className="relative z-10 aspect-square rounded-3xl bg-gradient-to-br from-dark-50 to-dark-100 border border-dark-200 flex items-center justify-center p-8">
                  <div className="relative w-full h-full max-w-md max-h-md">
                    {/* Central dog icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-xl">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-xs font-medium text-dark-600 bg-white px-2 py-1 rounded-full shadow-lg whitespace-nowrap">Buddy</div>
                    </div>

                    {/* Seeker devices orbiting */}
                    <div className="absolute inset-0">
                      {[
                        { top: '10%', left: '10%', label: 'Seeker Cam', color: 'blue' },
                        { top: '10%', right: '10%', label: 'Seeker Audio', color: 'purple' },
                        { bottom: '10%', left: '10%', label: 'Seeker Sensor', color: 'green' },
                        { bottom: '10%', right: '10%', label: 'Seeker Mobile', color: 'orange' },
                      ].map((device, i) => (
                        <div key={i} className={`absolute ${device.top ? `top-[${device.top}]` : ''} ${device.bottom ? `bottom-[${device.bottom}]` : ''} ${device.left ? `left-[${device.left}]` : ''} ${device.right ? `right-[${device.right}]` : ''} animate-float`} style={{ animationDelay: `${i * 500}ms` }}>
                          <div className={`w-16 h-16 rounded-xl bg-${device.color}-100 border-2 border-${device.color}-300 flex flex-col items-center justify-center shadow-lg`}>
                            <div className={`w-8 h-8 rounded-lg bg-${device.color}-500 flex items-center justify-center`}>
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </div>
                            <span className={`text-xs font-medium text-${device.color}-700 mt-1 text-center`}>{device.label}</span>
                          </div>
                          {/* Connection lines to center */}
                          <div className="absolute w-0.5 h-20 bg-gradient-to-b from-primary-300 to-transparent top-16 left-1/2 -translate-x-1/2 opacity-50" />
                        </div>
                      ))}
                    </div>

                    {/* Action Taker devices */}
                    <div className="absolute inset-0">
                      {[
                        { top: '25%', left: '-5%', label: 'Treat Dispenser', color: 'amber' },
                        { top: '25%', right: '-5%', label: 'Auto Door', color: 'cyan' },
                        { bottom: '25%', left: '-5%', label: 'Smart Collar', color: 'rose' },
                        { bottom: '25%', right: '-5%', label: 'Toy Launcher', color: 'indigo' },
                      ].map((device, i) => (
                        <div key={i} className={`absolute ${device.top ? `top-[${device.top}]` : ''} ${device.bottom ? `bottom-[${device.bottom}]` : ''} ${device.left ? `left-[${device.left}]` : ''} ${device.right ? `right-[${device.right}]` : ''} animate-float`} style={{ animationDelay: `${(i + 4) * 500}ms` }}>
                          <div className={`w-16 h-16 rounded-xl bg-${device.color}-100 border-2 border-${device.color}-300 flex flex-col items-center justify-center shadow-lg`}>
                            <div className={`w-8 h-8 rounded-lg bg-${device.color}-500 flex items-center justify-center`}>
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <span className={`text-xs font-medium text-${device.color}-700 mt-1 text-center`}>{device.label}</span>
                          </div>
                          {/* Connection lines to center */}
                          <div className="absolute w-0.5 h-20 bg-gradient-to-t from-primary-300 to-transparent bottom-16 left-1/2 -translate-x-1/2 opacity-50" />
                        </div>
                      ))}
                    </div>

                    {/* Mesh network lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400">
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
                        </marker>
                      </defs>
                      {/* Seeker to center */}
                      <path d="M100 100 L200 200" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5,5" marker-end="url(#arrowhead)" />
                      <path d="M300 100 L200 200" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5,5" marker-end="url(#arrowhead)" />
                      <path d="M100 300 L200 200" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5,5" marker-end="url(#arrowhead)" />
                      <path d="M300 300 L200 200" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5,5" marker-end="url(#arrowhead)" />
                      {/* Center to action takers */}
                      <path d="M200 200 L50 200" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,5" marker-end="url(#arrowhead)" />
                      <path d="M200 200 L350 200" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,5" marker-end="url(#arrowhead)" />
                      <path d="M200 200 L50 200" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,5" marker-end="url(#arrowhead)" />
                      <path d="M200 200 L350 200" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,5" marker-end="url(#arrowhead)" />
                      {/* Seeker to action taker cross connections */}
                      <path d="M100 100 L50 200" stroke="#16a34a" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                      <path d="M300 100 L350 200" stroke="#16a34a" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                      <path d="M100 300 L50 200" stroke="#16a34a" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                      <path d="M300 300 L350 200" stroke="#16a34a" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                    </svg>
                  </div>
                </div>

                {/* Status indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-full shadow-lg border border-dark-100">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-dark-700">All Systems Active</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-full shadow-lg border border-dark-100">
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                    <span className="text-sm font-medium text-dark-700">Mesh Connected</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-full shadow-lg border border-dark-100">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium text-dark-700">AI Processing Local</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-dark-50 border-y border-dark-100">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
            <span className="text-sm font-medium text-dark-500">Trusted by</span>
            <div className="flex flex-wrap items-center justify-center gap-8 text-dark-400 font-medium">
              <span>Veterinarians</span>
              <span>Dog Trainers</span>
              <span>Pet Sitters</span>
              <span>Busy Professionals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">Why Pawtrol Changes Everything</h2>
            <p className="section-subtitle mx-auto">
              Traditional cameras just show you what happened. Pawtrol's distributed intelligence prevents problems before they start — coordinating multiple devices to keep your dog supervised, safe, and happy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: 'eye',
                title: 'Continuous Multi-Angle Vision',
                desc: 'Multiple Seeker cameras with 360° coverage track your dog\'s position, posture, and behavior in real-time. No blind spots. No gaps.',
                features: ['4K HDR + Night Vision', 'Pose Estimation AI', 'Multi-camera Fusion', 'Blind-spot Elimination'],
              },
              {
                icon: 'brain',
                title: 'Predictive Behavior AI',
                desc: 'On-device AI learns your dog\'s patterns and predicts needs — hunger, anxiety, bathroom, escape attempts — before they become problems.',
                features: ['Local Inference', 'Personalized Models', 'Anomaly Detection', 'Health Trend Tracking'],
              },
              {
                icon: 'target',
                title: 'Coordinated Action Response',
                desc: 'Action Takers receive guided commands from Seekers: dispense treats to redirect, close doors to contain, launch toys to exercise, vibrate collar to recall.',
                features: ['Sub-second Latency', 'Multi-device Choreography', 'Graduated Response', 'Safety Interlocks'],
              },
              {
                icon: 'shield',
                title: 'Boundary & Safety Enforcement',
                desc: 'Virtual fences, restricted zones, and hazard detection trigger immediate Action Taker responses — keeping your dog safe from stairs, toxins, doors, and escapes.',
                features: ['Dynamic Zone Mapping', 'Hazard Recognition', 'Emergency Containment', 'Escape Prevention'],
              },
              {
                icon: 'heart',
                title: 'Wellness & Care Automation',
                desc: 'Scheduled and triggered care: precise feeding, medication reminders, water monitoring, exercise sessions, and enrichment activities tailored to your dog\'s needs.',
                features: ['Precision Nutrition', 'Medication Alerts', 'Hydration Tracking', 'Enrichment Scheduling'],
              },
              {
                icon: 'users',
                title: 'Multi-Dog Household Support',
                desc: 'Each dog gets individual tracking, personalized care plans, and conflict prevention. Seekers distinguish between dogs; Action Takers deliver individualized responses.',
                features: ['Individual Identification', 'Resource Guarding Prevention', 'Play Mediation', 'Per-dog Analytics'],
              },
            ].map((feature, i) => (
              <div key={i} className="card p-6 lg:p-8 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
                  {feature.icon === 'eye' && (
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                  {feature.icon === 'brain' && (
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                  {feature.icon === 'target' && (
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                  {feature.icon === 'shield' && (
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                  {feature.icon === 'heart' && (
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                  {feature.icon === 'users' && (
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-3">{feature.title}</h3>
                <p className="text-dark-500 mb-6">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-dark-600">
                      <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Section */}
      <section id="hardware" className="py-20 lg:py-32 bg-dark-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">The Hardware Ecosystem</h2>
            <p className="section-subtitle mx-auto">
              Two device families. Infinite configurations. Every Seeker watches. Every Action Taker responds. Add devices as your needs grow — they auto-join the mesh.
            </p>
          </div>

          {/* Seeker Family */}
          <div className="mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-dark-900 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              Seeker Family — Watch & Understand
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Seeker Cam Pro', subtitle: 'Primary Vision', specs: ['4K60 HDR + IR Night', '180° FoV, PTZ 360°', 'On-device Pose AI', 'PoE / Battery + Solar'], badge: 'Flagship' },
                { name: 'Seeker Cam Mini', subtitle: 'Gap Filler', specs: ['1080p60 + IR', '140° FoV, Fixed', 'Motion + Audio AI', 'Battery 6mo / USB-C'], badge: 'Popular' },
                { name: 'Seeker Audio', subtitle: 'Hear & Speak', specs: ['Far-field Mic Array', 'Full-duplex Audio', 'Bark/Whine Classification', 'Directional Speaker'], badge: 'New' },
                { name: 'Seeker Sense', subtitle: 'Environmental', specs: ['Air Quality + Temp/Humidity', 'Vibration + Pressure', 'Toxin/Chemical Sniffer', 'Thread + BLE + WiFi'], badge: 'Advanced' },
              ].map((device, i) => (
                <div key={i} className="card p-6 relative overflow-hidden">
                  {device.badge && (
                    <span className="absolute top-4 right-4 px-2 py-1 text-xs font-semibold text-white bg-primary-600 rounded-full">
                      {device.badge}
                    </span>
                  )}
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-dark-900 mb-1">{device.name}</h4>
                  <p className="text-sm text-dark-500 mb-4">{device.subtitle}</p>
                  <ul className="space-y-2 mb-6">
                    {device.specs.map((spec, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-dark-600">
                        <svg className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-dark-100 flex items-center gap-2 text-sm text-dark-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Auto-joins mesh in <span className="font-medium text-dark-700">{"<30s"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Taker Family */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-dark-900 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Action Taker Family — Respond & Care
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Treat Dispenser Pro', subtitle: 'Precision Nutrition', specs: ['Multi-kibble Hopper (3L)', 'Gram-accurate Dosing', 'Medication Slot', 'Camera Verified Delivery'], badge: 'Flagship' },
                { name: 'Smart Portal', subtitle: 'Access Control', specs: ['Auto-slide Door', 'Microchip + RFID', 'Selective Entry/Exit', 'Safety Sensors'], badge: 'Popular' },
                { name: 'Collar Link', subtitle: 'Wearable Link', specs: ['GPS + UWB + IMU', 'Haptic + Audio Cues', 'Vitals: HR, Temp, Activity', '7-day Battery, IP68'], badge: 'Essential' },
                { name: 'Play Launcher', subtitle: 'Enrichment', specs: ['Multi-toy Magazine', 'Variable Trajectory', 'Interactive Modes', 'Auto-reload Option'], badge: 'Fun' },
              ].map((device, i) => (
                <div key={i} className="card p-6 relative overflow-hidden">
                  {device.badge && (
                    <span className="absolute top-4 right-4 px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded-full">
                      {device.badge}
                    </span>
                  )}
                  <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-dark-900 mb-1">{device.name}</h4>
                  <p className="text-sm text-dark-500 mb-4">{device.subtitle}</p>
                  <ul className="space-y-2 mb-6">
                    {device.specs.map((spec, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-dark-600">
                        <svg className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-dark-100 flex items-center gap-2 text-sm text-dark-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Receives commands in <span className="font-medium text-dark-700">{"<100ms"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">How the System Works</h2>
            <p className="section-subtitle mx-auto">
              A continuous loop of perception, decision, and action — distributed across your home, running locally, responding in milliseconds.
            </p>
          </div>

          <div className="relative">
            {/* Timeline connector */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200 -translate-x-1/2" />
            
            <div className="space-y-12 lg:space-y-16">
              {[
                {
                  step: '01',
                  title: 'Perceive',
                  subtitle: 'Seeker Mesh Observes',
                  desc: 'All Seekers stream encrypted video, audio, and sensor data to the local mesh. AI models run on-device: pose estimation, behavior classification, anomaly detection, multi-dog tracking.',
                  details: ['4K video @ 30fps per cam', 'Sub-100ms inference on-device', 'Encrypted mesh sync (WireGuard)', 'Zero cloud dependency for core loop'],
                  side: 'left',
                },
                {
                  step: '02',
                  title: 'Fuse',
                  subtitle: 'Unified World Model',
                  desc: 'The Coordinator (elected Seeker) fuses multi-camera views into a single 3D scene: dog pose, location, velocity, intent prediction, environmental state, hazard map.',
                  details: ['Multi-view geometry fusion', 'Intent prediction (5-30s horizon)', 'Persistent identity per dog', 'Real-time hazard map updates'],
                  side: 'right',
                },
                {
                  step: '03',
                  title: 'Decide',
                  subtitle: 'Policy Engine Plans',
                  desc: 'Rule engine + learned policies evaluate: safety first (contain, recall), then wellness (feed, enrich, medicate), then optimization (exercise, social, rest). Graduated response levels.',
                  details: ['Safety-critical: <50ms', 'Wellness: scheduled + triggered', 'Conflict resolution (multi-dog)', 'Owner override always available'],
                  side: 'left',
                },
                {
                  step: '04',
                  title: 'Act',
                  subtitle: 'Action Takers Execute',
                  desc: 'Commands dispatched via mesh to relevant Action Takers: door closes, treat dispenses, collar vibrates, toy launches. Each confirms execution; Coordinator verifies outcome.',
                  details: ['<100ms command latency', 'Execution confirmation required', 'Failed action → fallback plan', 'Safety interlocks on all devices'],
                  side: 'right',
                },
                {
                  step: '05',
                  title: 'Learn',
                  subtitle: 'Continuous Improvement',
                  desc: 'Outcome data feeds back: policy effectiveness, dog preference models, environment changes. Federated learning updates models locally; optional anonymous contribution to global model.',
                  details: ['On-device federated learning', 'Per-dog personalization', 'Seasonal/age adaptation', 'Privacy-preserving by default'],
                  side: 'left',
                },
              ].map((step, i) => (
                <div key={i} className={`relative flex lg:flex-row ${step.side === 'right' ? 'lg:flex-row-reverse' : ''} items-start gap-8`}>
                  <div className={`flex-1 lg:w-1/2 ${step.side === 'right' ? 'lg:pl-12' : 'lg:pr-12'} pt-4`}>
                    <div className="card p-6 h-full relative">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 lg:left-auto lg:-left-16 lg:top-6 lg:translate-x-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold border-4 border-white shadow-lg z-10">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-dark-900 mb-1">{step.title}</h3>
                      <p className="text-primary-600 font-medium mb-4">{step.subtitle}</p>
                      <p className="text-dark-500 mb-6">{step.desc}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-dark-600">
                            <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="hidden lg:block lg:w-1/2 lg:pt-10">
                    <div className="aspect-video rounded-2xl bg-gradient-to-br from-dark-100 to-dark-200 border border-dark-200 flex items-center justify-center relative overflow-hidden">
                      <div className="text-center p-8">
                        {i === 0 && (
                          <>
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-blue-100 flex items-center justify-center">
                              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <p className="text-dark-500">4 Seekers covering 2000 sq ft</p>
                          </>
                        )}
                        {i === 1 && (
                          <>
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-purple-100 flex items-center justify-center">
                              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <p className="text-dark-500">3D scene: pose + intent + hazards</p>
                          </>
                        )}
                        {i === 2 && (
                          <>
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-amber-100 flex items-center justify-center">
                              <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </div>
                            <p className="text-dark-500">Safety → Wellness → Optimization</p>
                          </>
                        )}
                        {i === 3 && (
                          <>
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-green-100 flex items-center justify-center">
                              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <p className="text-dark-500">Door closes → Treat → Collar vibrates</p>
                          </>
                        )}
                        {i === 4 && (
                          <>
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-rose-100 flex items-center justify-center">
                              <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </div>
                            <p className="text-dark-500">Models improve every day</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 lg:py-32 bg-dark-900">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">See It In Action</h2>
            <p className="text-dark-300 text-lg">Watch a day in the life with Pawtrol — from morning routine to evening peace of mind.</p>
          </div>
          <div className="aspect-video max-w-4xl mx-auto rounded-2xl bg-dark-800 border border-dark-700 overflow-hidden relative cursor-pointer group">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-primary-600/90 hover:bg-primary-500 transition-colors flex items-center justify-center group-hover:scale-110">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-white/80">
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">Live Recording</span>
                <span className="text-sm text-dark-400">08:47 AM • Buddy detected near kitchen • Treat Dispenser activated</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">Auto Response</span>
                <span className="text-sm text-dark-400">Smart Portal sealed • Collar Link: "Come" haptic • Buddy redirected to play zone</span>
              </div>
            </div>
          </div>
          <p className="text-center text-dark-400 mt-6 text-sm">Demo runs locally on-device. No cloud streaming required.</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">Simple, Honest Pricing</h2>
            <p className="section-subtitle mx-auto">
              No subscriptions. No hidden fees. Buy the hardware, own the system forever. Free software updates for life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'Starter Kit',
                subtitle: 'Essential Supervision',
                price: '$599',
                devices: ['1× Seeker Cam Pro', '1× Treat Dispenser Pro', '1× Collar Link'],
                covers: 'Up to 1,000 sq ft • 1-2 dogs',
                cta: 'Pre-Order Starter',
                popular: false,
              },
              {
                name: 'Complete Home',
                subtitle: 'Full Coverage & Control',
                price: '$1,299',
                devices: ['2× Seeker Cam Pro', '2× Seeker Cam Mini', '1× Seeker Audio', '1× Treat Dispenser Pro', '1× Smart Portal', '2× Collar Link', '1× Play Launcher'],
                covers: 'Up to 3,000 sq ft • 1-3 dogs',
                cta: 'Pre-Order Complete',
                popular: true,
              },
              {
                name: 'Pro Multi-Dog',
                subtitle: 'Maximum Capability',
                price: '$2,199',
                devices: ['3× Seeker Cam Pro', '3× Seeker Cam Mini', '2× Seeker Audio', '1× Seeker Sense', '2× Treat Dispenser Pro', '2× Smart Portal', '3× Collar Link', '1× Play Launcher'],
                covers: 'Up to 5,000+ sq ft • 3-5 dogs',
                cta: 'Pre-Order Pro',
                popular: false,
              },
            ].map((plan, i) => (
              <div key={i} className={`card p-6 lg:p-8 relative flex flex-col ${plan.popular ? 'ring-2 ring-primary-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-dark-900 mb-1">{plan.name}</h3>
                  <p className="text-dark-500">{plan.subtitle}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl lg:text-5xl font-bold text-dark-900">{plan.price}</span>
                  <span className="text-dark-500 ml-1">one-time</span>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  {plan.devices.map((device, j) => (
                    <li key={j} className="flex items-start gap-3 text-dark-600">
                      <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {device}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-dark-500 mb-6 pt-4 border-t border-dark-100">{plan.covers}</p>
                <button className={`${plan.popular ? 'btn-primary' : 'btn-secondary'} w-full`}>{plan.cta}</button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-dark-500 mb-4">Need a custom configuration? <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Contact us for enterprise & breeder pricing</a></p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm text-dark-500">
              <div className="flex items-center justify-center gap-2 p-4 bg-dark-50 rounded-xl">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                30-day risk-free trial
              </div>
              <div className="flex items-center justify-center gap-2 p-4 bg-dark-50 rounded-xl">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                3-year hardware warranty
              </div>
              <div className="flex items-center justify-center gap-2 p-4 bg-dark-50 rounded-xl">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Lifetime software updates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="py-20 lg:py-32 bg-dark-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title">Technical Specifications</h2>
            <p className="section-subtitle mx-auto">Every detail engineered for reliability, privacy, and performance.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-dark-200">
                  <th className="pb-4 font-semibold text-dark-900">Category</th>
                  <th className="pb-4 font-semibold text-dark-900">Seeker Cam Pro</th>
                  <th className="pb-4 font-semibold text-dark-900">Seeker Cam Mini</th>
                  <th className="pb-4 font-semibold text-dark-900">Action Taker Devices</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-100">
                {[
                  ['Compute', 'Quad-core NPU (4 TOPS)', 'Dual-core NPU (1 TOPS)', 'Dual-core MCU + NPU (0.5 TOPS)'],
                  ['Vision', '4K60 HDR, 180° FoV, PTZ', '1080p60, 140° FoV, Fixed', 'N/A (receive commands)'],
                  ['Audio', 'Stereo mic array, 2W speaker', 'Mono mic, 1W speaker', 'Full-duplex on Collar Link'],
                  ['Sensors', 'IMU, Temp, Light, Proximity', 'IMU, Temp, Light', 'IMU, GPS, UWB, Vitals (Collar)'],
                  ['Connectivity', 'WiFi 6E, Thread, BLE 5.3, PoE', 'WiFi 6, Thread, BLE 5.3', 'Thread, BLE 5.3, Sub-GHz'],
                  ['Power', 'PoE+ / 100Wh battery (72h)', 'USB-C / 50Wh battery (6mo)', 'Varies: 6mo-2yr battery / Wired'],
                  ['Storage', '64GB eMMC (encrypted)', '16GB eMMC (encrypted)', '4-16MB flash (encrypted)'],
                  ['AI Models', 'Pose, Behavior, Anomaly, ID', 'Motion, Audio, Basic ID', 'Command execution, Safety'],
                  ['Privacy', 'Local-only, hardware shutter', 'Local-only, hardware shutter', 'No sensors (except Collar)'],
                  ['Durability', 'IP66, -20°C to 50°C', 'IP66, -10°C to 45°C', 'IP67 (Collar), IP66 (others)'],
                  ['Mounting', 'Wall, Ceiling, Tripod, Magnetic', 'Wall, Shelf, Magnetic', 'Wall, Floor, Collar, Freestanding'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-dark-50'}>
                    <td className="py-4 font-medium text-dark-900">{row[0]}</td>
                    <td className="py-4 text-dark-600">{row[1]}</td>
                    <td className="py-4 text-dark-600">{row[2]}</td>
                    <td className="py-4 text-dark-600">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">Common Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Does Pawtrol require an internet connection to work?',
                a: 'No. The core supervision loop — perceive, fuse, decide, act — runs entirely on your local mesh. Internet is only needed for: remote app access, optional cloud backup of analytics, and firmware updates. Your dog stays supervised even if WiFi goes down.',
              },
              {
                q: 'How many dogs can the system track?',
                a: 'The Pro tier supports up to 5 dogs with individual identification, personalized care plans, and conflict prevention. The Starter kit handles 1-2 dogs. Each dog gets a unique visual + collar fingerprint.',
              },
              {
                q: 'What happens if an Action Taker fails or runs out of battery?',
                a: 'The Coordinator detects unresponsive devices within seconds and reroutes tasks to available devices. You get an immediate alert. Critical safety actions (door containment) have mechanical fallbacks. Battery warnings start at 20%.',
              },
              {
                q: 'Is my video/audio data ever sent to the cloud?',
                a: 'Never without your explicit consent. All AI inference runs on-device. Only anonymized, aggregated analytics (e.g., "bark frequency decreased 40%") can optionally be shared to improve global models. Raw video never leaves your mesh.',
              },
              {
                q: 'Can I add more devices later?',
                a: 'Yes. Any new Seeker or Action Taker auto-discovers the mesh via Thread/BLE, authenticates via your app, and joins in under 30 seconds. No reconfiguration needed. The system rebalances workloads automatically.',
              },
              {
                q: 'What if my dog destroys a device?',
                a: 'All devices are built for pet environments: chew-resistant materials, recessed cables, tamper alerts. The Collar Link is MIL-STD-810H rated. If damaged, the 3-year warranty covers pet-related damage. Mesh self-heals instantly.',
              },
            ].map((faq, i) => (
              <details key={i} className="group card p-6">
                <summary className="flex items-center justify-between cursor-pointer list-none text-lg font-medium text-dark-900">
                  {faq.q}
                  <svg className="w-5 h-5 text-dark-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-dark-500 leading-relaxed animate-slide-up">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 lg:py-32 bg-dark-900">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Ready for Peace of Mind?</h2>
            <p className="text-dark-300 text-lg mb-10">Join thousands of dog parents who sleep better knowing Pawtrol is watching. Limited first-batch pricing ends soon.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#pricing" className="btn-primary text-lg px-10 py-4 bg-primary-600 hover:bg-primary-500">
                Reserve Your Pawtrol System
              </a>
              <a href="#demo" className="btn-secondary text-lg px-10 py-4 border-dark-600 text-dark-100 hover:bg-dark-800">
                Schedule a Live Demo
              </a>
            </div>
            <p className="mt-6 text-dark-500 text-sm">No commitment • 30-day risk-free trial • Ships Q2 2025</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-950 border-t border-dark-800 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">Pawtrol</span>
              </div>
              <p className="text-dark-400 max-w-xs">Distributed AI supervision for dogs. Seekers watch. Action Takers respond. Your dog, always supervised, always safe.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-dark-400 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#hardware" className="hover:text-white transition-colors">Hardware</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#demo" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-dark-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-dark-500 text-sm">© 2025 Pawtrol. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-dark-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="#" className="text-dark-400 hover:text-white transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-dark-400 hover:text-white transition-colors" aria-label="Discord">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.675 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.083.083 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-.062.077.077 0 00.029-.106 13.107 13.107 0 00.186-.594c.39-.813.91-1.821 1.328-2.852a.077.077 0 01.066-.077h.01a.074.074 0 01.058.026 13.282 13.282 0 001.91.632.077.077 0 00.085-.028c.376-.248.756-.627 1.052-1.076a.074.074 0 01.031-.106 13.28 13.28 0 001.075-2.73.077.077 0 00-.027-.106 12.9 12.9 0 00-1.13-2.57.076.076 0 01-.028-.105c.292-.558.413-1.07.411-1.554a.075.075 0 00-.025-.08 19.74 19.74 0 00-1.489-2.57.077.077 0 00-.134-.002 19.1 19.1 0 00-2.167-.017.07.07 0 00-.07.044zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}