import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PolitiWiki</h3>
            <p className="text-sm text-muted-foreground">
              A platform for Nigerians to track politicians, their promises, and their records.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-green-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/browse/state" className="hover:text-green-600">
                  Browse by State
                </Link>
              </li>
              <li>
                <Link href="/browse/office" className="hover:text-green-600">
                  Browse by Office
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-600">
                  About PolitiWiki
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contribute</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/submit" className="hover:text-green-600">
                  Submit Information
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/report" className="hover:text-green-600">
                  Report Issue
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-green-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-green-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-green-600">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PolitiWiki. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
