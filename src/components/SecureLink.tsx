import { isSecureUrl, getSecureLinkAttributes } from '@/lib/security-headers';

/**
 * Secure Link component that automatically applies security attributes to external links
 */
interface SecureLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const SecureLink: React.FC<SecureLinkProps> = ({ 
  href, 
  children, 
  className = "", 
  onClick 
}) => {
  // Validate URL and get secure attributes
  if (!isSecureUrl(href)) {
    return <span className={className}>{children}</span>;
  }

  const linkAttributes = getSecureLinkAttributes(href);

  return (
    <a 
      {...linkAttributes}
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  );
};