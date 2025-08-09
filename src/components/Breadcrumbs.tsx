'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND_COLORS } from '@/lib/theme';

type BreadcrumbsProps = {
  currentLabel?: string;
  hideOnHome?: boolean;
};

function toTitleCaseFromSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function formatModelFromSlug(slug: string): string {
  // Split on hyphens/underscores, uppercase model-like tokens, title-case others
  return slug
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((token) => {
      const isModely = /^(?:[a-z]{1,4}\d+[a-z0-9]*|\d+[a-z]+|[a-z]{1,4})$/i.test(token) || token.length <= 4;
      if (isModely) return token.toUpperCase();
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join(' ');
}

export default function Breadcrumbs({ currentLabel, hideOnHome = true }: BreadcrumbsProps) {
  const pathname = usePathname();
  if (!pathname) return null;

  const segments = pathname.split('/').filter(Boolean);
  if (hideOnHome && segments.length === 0) return null;

  const items = [
    { href: '/', label: 'Home' },
    ...segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const isLast = index === segments.length - 1;
      let label: string;
      if (isLast && currentLabel) {
        label = currentLabel;
      } else if (
        // When on a product detail page, format the last segment as a model code (e.g., IBP 120)
        isLast && segments.length >= 3 && segments[0] === 'products'
      ) {
        label = formatModelFromSlug(segment);
      } else {
        label = toTitleCaseFromSlug(segment);
      }
      return { href, label };
    }),
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="hidden sm:block mb-4 sm:mb-6 text-xs sm:text-sm"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex flex-wrap items-center gap-1 text-gray-600">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li
              key={item.href + idx}
              className="inline-flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span
                  className="px-1 sm:px-1.5 text-gray-900 font-medium"
                  itemProp="name"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="px-1 sm:px-1.5 hover:underline"
                  style={{ color: BRAND_COLORS.primary.blue }}
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(idx + 1)} />
              {!isLast && (
                <svg
                  className="mx-1 h-3.5 w-3.5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}


