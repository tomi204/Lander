// Definimos la interfaz para los links
export interface FooterLink {
  name: string;
  href: {
    pathname: string;
  };
}

export interface FooterLinkSection {
  title: string;
  links: FooterLink[];
}

export const footerLinks = {
  socials: [
    { name: 'Twitter', href: { pathname: 'https://x.com/app_lander' } },
  ] as FooterLink[],
  legal: [
    { name: 'Terms of Use', href: { pathname: '/terms-of-use' } },
  ] as FooterLink[],
  about: [
    // { name: 'Features', href: '/features' },
    {
      name: 'Investors',
      href: {
        pathname:
          'https://landerapp.notion.site/Business-Plan-1195a5e54512801f91c0e0248282e4fc',
      },
    },
    // { name: 'Careers', href: '#' },
    // { name: 'FAQ', href: '#' },
  ] as FooterLink[],
  community: [
    // {
    //   name: 'Youtube',
    //   href: { pathname: 'https://www.youtube.com/@landerapp' },
    // },
    { name: 'Discord', href: { pathname: 'https://discord.gg/landerapp' } },
  ] as FooterLink[],
};
