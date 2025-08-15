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
    // Non-secure or invalid URL: render non-interactive content or a button if onClick provided
    if (onClick) {
      return (
        <button
          type="button"
          className={className}
          onClick={onClick}
        >
          {children}
        </button>
      );
    }
    return <span className={className}>{children}</span>;
  }

  const linkAttributes = getSecureLinkAttributes(href);

  return (
    <a 
      {...linkAttributes}
      className={className}
      onClick={onClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </a>
  );
};