import Header from "@/components/header"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Ai Model Market",
  description: "Terms of Service for Ai Model Market - AI influencer models marketplace",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Ai Model Market ("the Service"), you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Ai Model Market is a digital marketplace that provides AI influencer models, LoRa files, ComfyUI
                workflows, and related digital assets for commercial and personal use. All products are digital
                downloads delivered electronically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <p className="text-gray-700 mb-4">
                Users may browse our marketplace without registration. Purchases are processed through third-party
                payment providers. You are responsible for maintaining the confidentiality of any account information
                and for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Purchases and Payments</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>All purchases are final and non-refundable unless otherwise stated</li>
                <li>Prices are subject to change without notice</li>
                <li>Payment processing is handled by third-party providers</li>
                <li>You must be 18 years or older to make purchases</li>
                <li>All sales are in USD unless otherwise specified</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Digital Product License</h2>
              <p className="text-gray-700 mb-4">
                Upon purchase, you receive a non-exclusive, non-transferable license to use the digital products for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Personal and commercial content creation</li>
                <li>Social media marketing and advertising</li>
                <li>Brand promotion and marketing materials</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>You may NOT:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Resell, redistribute, or share the original files</li>
                <li>Claim ownership of the AI models or workflows</li>
                <li>Use the products for illegal or harmful purposes</li>
                <li>Create content that violates platform terms of service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Refund Policy</h2>
              <p className="text-gray-700 mb-4">
                Due to the digital nature of our products, all sales are final. Refunds may be considered in exceptional
                circumstances such as:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Technical issues preventing download</li>
                <li>Significantly misdescribed products</li>
                <li>Duplicate purchases made in error</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Refund requests must be made within 7 days of purchase and include detailed reasoning.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content, trademarks, and intellectual property on this site remain the property of Ai Model Market
                or our licensors. The AI models and workflows are provided under license for your use as specified in
                these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">You agree not to use our products or service to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Create illegal, harmful, or offensive content</li>
                <li>Impersonate real individuals without consent</li>
                <li>Generate content that violates third-party rights</li>
                <li>Create deepfakes or misleading content</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-gray-700 mb-4">
                Our products are provided "as is" without any warranties, express or implied. We do not guarantee that
                our products will meet your specific requirements or that they will be error-free or uninterrupted.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall Ai Model Market be liable for any indirect, incidental, special, consequential, or
                punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Modifications to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting. Your continued use of the service constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">For questions about these Terms of Service, please contact us at:</p>
              <p className="text-gray-700 mb-4">
                <strong>Email:</strong> Design@imagineeduction.io
                <br />
                <strong>Website:</strong> aimodelmarket.io
              </p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-purple-600 transition-colors">
              ← Back to Marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
