import Header from "@/components/header"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Ai Model Market",
  description: "Get in touch with the Ai Model Market team for questions, support, or feedback.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 rounded-2xl shadow-2xl p-12 border border-purple-100/50 backdrop-blur-sm">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We're here to help you succeed with your AI influencer journey. Get in touch with our expert team for
              personalized support.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Email Contact Card */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Email Support</h3>
              </div>
              <p className="text-gray-600 mb-4">Get direct support from our team</p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                <p className="font-medium text-blue-700">support@imagineeducation.io</p>
                <p className="text-sm text-gray-600 mt-1">Response within 24-48 hours</p>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Support Hours</h3>
              </div>
              <p className="text-gray-600 mb-4">When you can expect to hear from us</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Friday</span>
                  <span className="font-medium text-green-600">9 AM - 6 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Weekend</span>
                  <span className="font-medium text-orange-600">Limited Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl border border-purple-200 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How We Can Help You</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Product Questions</h4>
                  <p className="text-sm text-gray-600">AI model packages & features</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Technical Support</h4>
                  <p className="text-sm text-gray-600">Setup & troubleshooting help</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Billing Support</h4>
                  <p className="text-sm text-gray-600">Payment & order inquiries</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Custom Requests</h4>
                  <p className="text-sm text-gray-600">Bespoke AI model solutions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Partnerships</h4>
                  <p className="text-sm text-gray-600">Business collaboration opportunities</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">General Feedback</h4>
                  <p className="text-sm text-gray-600">Suggestions & improvements</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Tips */}
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-xl border border-blue-100 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Get Faster Support
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Include in Your Email:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Clear, descriptive subject line</li>
                  <li>• Detailed description of your issue</li>
                  <li>• Order number (if applicable)</li>
                  <li>• Screenshots for technical issues</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">What to Expect:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Acknowledgment within 4 hours</li>
                  <li>• Detailed response within 24-48 hours</li>
                  <li>• Follow-up until issue is resolved</li>
                  <li>• Professional, friendly service</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white">
            <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="mb-6 opacity-90">
              Join thousands of creators using our AI influencer models to grow their brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@imagineeducation.io"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Send Email
              </a>
              <Link
                href="/"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors inline-flex items-center justify-center border border-white/30"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
