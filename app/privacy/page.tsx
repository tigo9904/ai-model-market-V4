import Header from "@/components/header"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Ai Model Market",
  description: "Privacy Policy for Ai Model Market - AI influencer models marketplace",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Ai Model Market ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you visit our website
                aimodelmarket.io and use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Contact information (email address, name) when you contact us</li>
                <li>Payment information processed by third-party payment providers</li>
                <li>Communication preferences and feedback</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Information Automatically Collected</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Device information and operating system</li>
                <li>Website usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the collected information for:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Processing and fulfilling your orders</li>
                <li>Providing customer support and responding to inquiries</li>
                <li>Improving our website and services</li>
                <li>Analyzing website usage and performance</li>
                <li>Sending important updates about your purchases</li>
                <li>Complying with legal obligations</li>
                <li>Preventing fraud and ensuring security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information. We may share information with:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Service Providers</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Payment processors (for transaction processing)</li>
                <li>Cloud hosting providers (Vercel, Supabase)</li>
                <li>Analytics providers (Google Analytics, if applicable)</li>
                <li>Email service providers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose information when required by law, court order, or to protect our rights, property, or
                safety.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However, no method of
                transmission over the internet is 100% secure.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure cloud storage with access controls</li>
                <li>Regular security updates and monitoring</li>
                <li>Limited access to personal information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your browsing experience, analyze website traffic,
                and understand user preferences. You can control cookie settings through your browser preferences.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Types of Cookies We Use:</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for website functionality
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand website usage
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings and preferences
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this
                policy, comply with legal obligations, resolve disputes, and enforce our agreements. Transaction records
                may be kept for accounting and legal purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>
                  <strong>Access:</strong> Request information about the personal data we hold
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal data
                </li>
                <li>
                  <strong>Portability:</strong> Request a copy of your data in a portable format
                </li>
                <li>
                  <strong>Objection:</strong> Object to certain processing activities
                </li>
                <li>
                  <strong>Restriction:</strong> Request restriction of processing
                </li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, please contact us at Design@imagineeduction.io
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure
                appropriate safeguards are in place to protect your personal information in accordance with applicable
                data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our services are not intended for children under 18 years of age. We do not knowingly collect personal
                information from children under 18. If you become aware that a child has provided us with personal
                information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Third-Party Links</h2>
              <p className="text-gray-700 mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices
                or content of these external sites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new policy on this page and updating the "Last Updated" date. Your continued use of our services
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
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
