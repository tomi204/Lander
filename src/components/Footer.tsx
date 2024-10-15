import Logo from '@/shared/Logo';

import Link from 'next/link';

 const Footer = () => {
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

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow US</h3>
          {/* <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Github
            </a>
          </div> */}

          <div>
            <Link
              rel="noreferrer noopener"
              href="https://x.com/app_lander"
              className="opacity-60 hover:opacity-100"
            >
              Twitter
            </Link>
          </div>

          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Instagram
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Legal Terms</h3>
          {/* <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Disclaimer
            </a>
          </div> */}

          <div>
            <Link
              rel="noreferrer noopener"
              href="/terms-of-use"
              className="opacity-60 hover:opacity-100"
            >
              Terms of Use
            </Link>
          </div>

          {/* <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
            Privacy Policy
            </a>
          </div> */}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">About</h3>
          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Features
            </Link>
          </div>

          <div>
            <Link
              rel="noreferrer noopener"
              href="https://landerapp.notion.site/Business-Plan-1195a5e54512801f91c0e0248282e4fc"
              className="opacity-60 hover:opacity-100"
            >
              Investors
            </Link>
          </div>
          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Careers
            </Link>
          </div>

          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              FAQ
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Community</h3>
          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Youtube
            </Link>
          </div>

          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Discord
            </Link>
          </div>

          <div>
            <Link
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Twitch
            </Link>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 Landing page made by{' '}
          <Link
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.linkedin.com/in/leopoldo-miranda/"
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