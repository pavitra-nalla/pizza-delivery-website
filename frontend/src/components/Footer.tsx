import { Link } from 'react-router-dom';

const Footer = () => (
  <footer id="contacts" className="bg-foreground text-card py-16 px-6 md:px-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      <div className="space-y-4">
        <h3 className="text-2xl font-display font-bold">CHEEZO</h3>
        <p className="text-card/60 font-body text-sm">Handcrafted pizzas made with love and the finest ingredients.</p>
      </div>
      <div className="space-y-3">
        <h4 className="font-display font-semibold text-lg">Quick Links</h4>
        <div className="flex flex-col gap-2">
          {['Home', 'Menu', 'About', 'Contact'].map(link => (
            <Link key={link} to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-card/60 hover:text-card font-body text-sm transition-colors">
              {link}
            </Link>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="font-display font-semibold text-lg">Contact</h4>
        <div className="space-y-2 text-card/60 font-body text-sm">
          <p>123 Pizza Street</p>
          <p>New York, NY 10001</p>
          <p>+1 (555) 123-4567</p>
          <p>hello@cheezo.com</p>
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="font-display font-semibold text-lg">Hours</h4>
        <div className="space-y-2 text-card/60 font-body text-sm">
          <p>Mon - Fri: 11am - 11pm</p>
          <p>Sat - Sun: 10am - 12am</p>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-card/10 text-center text-card/40 font-body text-sm">
      2026 CHEEZO. All rights reserved.
    </div>
  </footer>
);

export default Footer;
