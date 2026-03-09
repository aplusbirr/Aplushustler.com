export default function Privacy() {
  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="font-display text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 9, 2026</p>

      <div className="prose-content space-y-6 text-muted-foreground text-sm leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">1. Information We Collect</h2>
          <p>We may collect personal information you provide directly, such as your name and email address when you subscribe to our newsletter or contact us. We also collect non-personal information through cookies and analytics tools.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc ml-5 space-y-1 mt-2">
            <li>Provide and improve our content</li>
            <li>Send newsletters (if subscribed)</li>
            <li>Respond to your inquiries</li>
            <li>Analyze website traffic and usage</li>
            <li>Display relevant advertisements</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">3. Cookies and Tracking</h2>
          <p>We use cookies and similar technologies to enhance your browsing experience and analyze traffic. Third-party services like Google AdSense and Google Analytics may also use cookies.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">4. Third-Party Advertising</h2>
          <p>We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits. You can opt out of personalized advertising by visiting Google's Ads Settings.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">5. Data Security</h2>
          <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. Contact us at contact@aplushustler.com for any privacy-related requests.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">7. Children's Privacy</h2>
          <p>Our website is not intended for children under 13. We do not knowingly collect personal information from children.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">9. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at contact@aplushustler.com.</p>
        </section>
      </div>
    </div>
  );
}
