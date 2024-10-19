'use client';
import Logo from '@/shared/Logo';
import Link from 'next/link';
import { footerLinks, FooterLink } from './links/index';

interface LinkListProps {
  title: string;
  links: FooterLink[];
}

const LinkList: React.FC<LinkListProps> = ({ title, links }) => (
  <div className="flex flex-col gap-2">
    <h3 className="font-bold text-lg">{title}</h3>
    {links.map((link) => (
      <div key={link.name}>
        <Link
          rel="noreferrer noopener"
          href={link.href}
          about="_blank"
          className="opacity-60 hover:opacity-100"
        >
          {link.name}
        </Link>
      </div>
    ))}
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />
      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <Link
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <Logo />
          </Link>
        </div>

        {/* Uso de componente LinkList para cada sección */}
        <LinkList title="Follow Us" links={footerLinks.socials} />
        <LinkList title="Legal Terms" links={footerLinks.legal} />
        <LinkList title="About" links={footerLinks.about} />
        <LinkList title="Community" links={footerLinks.community} />
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 Landing page made by{' '}
          <Link
            rel="noreferrer noopener"
            target="_blank"
            href="https://smartblocks.tech"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            SMARTBLOCKS
          </Link>
        </h3>
      </section>
    </footer>
  );
};

export default Footer;
