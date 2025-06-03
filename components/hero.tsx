export default function Hero() {
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Premium AI Influencer Models
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover and purchase cutting-edge AI influencer models for your brand. High-quality, customizable, and ready
          to engage your audience. Start your AI influencer journey today.
        </p>

        {/* SEO-friendly feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">Ready-to-Use Models</h3>
            <p className="text-gray-600">Pre-built AI models with ComfyUI workflows included</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">Professional Quality</h3>
            <p className="text-gray-600">Ultra-realistic content generation capabilities</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">Complete Packages</h3>
            <p className="text-gray-600">From starter kits to full marketing suites</p>
          </div>
        </div>
      </div>
    </section>
  )
}
