import React from 'react';

interface VenomButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  icon?: React.ReactNode;
  ariaLabel?: string;
  /** Native button type; use "submit" inside forms. Ignored when `href` is set. */
  type?: 'button' | 'submit';
}

/**
 * Glowing red pill button, pure CSS.
 * (The previous WebGL "venom" version compiled a heavy shader per button, which froze the page
 *  for many seconds on Windows/Chrome and sometimes left the label blank.)
 */
export const VenomButton: React.FC<VenomButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  icon,
  ariaLabel,
  type = 'button',
}) => {
  const cls = `venom-btn ${variant === 'secondary' ? 'venom-btn--secondary' : 'venom-btn--primary'} ${className}`;
  const inner = (
    <>
      <span className="venom-btn__shine" aria-hidden="true" />
      <span className="venom-btn__label">
        {children}
        {icon && <span className="venom-btn__icon">{icon}</span>}
      </span>
    </>
  );

  return href ? (
    <a href={href} onClick={onClick} aria-label={ariaLabel} className={cls} data-cursor="venom">
      {inner}
    </a>
  ) : (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={cls} data-cursor="venom">
      {inner}
    </button>
  );
};
