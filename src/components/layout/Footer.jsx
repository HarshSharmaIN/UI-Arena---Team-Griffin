import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import { HiMail, HiPhone } from 'react-icons/hi'
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin 
} from 'react-icons/fa'

const footerLinks = [
  {
    title: 'About',
    links: [
      { name: 'About us', href: '#' },
      { name: 'How it works', href: '#' },
      { name: 'Testimonials', href: '#' },
      { name: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Contact us', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Privacy policy', href: '#' },
      { name: 'Terms of service', href: '#' },
    ],
  },
  {
    title: 'Restaurants',
    links: [
      { name: 'Partner with us', href: '#' },
      { name: 'Restaurant login', href: '#' },
      { name: 'Restaurant directory', href: '#' },
      { name: 'Restaurant types', href: '#' },
    ],
  },
]

const socialLinks = [
  { name: 'Facebook', icon: FaFacebook, href: '#' },
  { name: 'Twitter', icon: FaTwitter, href: '#' },
  { name: 'Instagram', icon: FaInstagram, href: '#' },
  { name: 'LinkedIn', icon: FaLinkedin, href: '#' },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <Logo className="h-10 w-auto text-white" />
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Discover and book the best restaurants in your city. Easy reservations, instant confirmations.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <HiMail className="h-5 w-5 mr-3 text-neutral-400" />
                <a href="mailto:hello@tabletaste.com" className="hover:text-primary-500 transition-colors">
                  hello@tabletaste.com
                </a>
              </div>
              <div className="flex items-center text-sm">
                <HiPhone className="h-5 w-5 mr-3 text-neutral-400" />
                <a href="tel:+18001234567" className="hover:text-primary-500 transition-colors">
                  +91 123 456789
                </a>
              </div>
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-medium text-white mb-6">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">
            © {year} TableTaste. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.href}
                className="text-neutral-400 hover:text-primary-500 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer