import Link from 'next/link';
import React from 'react';

interface FooterMenuContainerProps {
  title: string;
  links: { label: string; href: string }[];
}

export default function FooterMenuContainer({
  title,
  links,
}: FooterMenuContainerProps) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h4 className="text-rivalz-text-primary text-lg font-semibold">
        {title}
      </h4>
      <ul className="flex flex-col gap-4 mt-6">
        {links.map(link => (
          <li
            key={link.label}
            className="text-rivalz-button-line-ghost-link-neutral-fg font-[700] hover:text-rivalz-button-line-ghost-link-neutral-fg/80"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
