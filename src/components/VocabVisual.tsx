import React from 'react';
import { getCustomVocabImage } from '../data/customVocabImages';

interface VocabVisualProps {
  item: {
    ko: string;
    icon: string;
    imageUrl?: string;
  };
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'card' | 'print';
  alt?: string;
}

export const VocabVisual: React.FC<VocabVisualProps> = ({
  item,
  className = '',
  size = 'md',
  alt
}) => {
  const customImg = item.imageUrl || getCustomVocabImage(item.ko);

  if (customImg) {
    let sizeClasses = 'w-12 h-12';
    if (size === 'xs') sizeClasses = 'w-6 h-6';
    else if (size === 'sm') sizeClasses = 'w-8 h-8';
    else if (size === 'md') sizeClasses = 'w-12 h-12';
    else if (size === 'lg') sizeClasses = 'w-16 h-16';
    else if (size === 'xl') sizeClasses = 'w-20 h-20 sm:w-24 sm:h-24';
    else if (size === '2xl') sizeClasses = 'w-24 h-24 sm:w-28 sm:h-28';
    else if (size === 'card') sizeClasses = 'w-22 h-22 sm:w-26 sm:h-26';
    else if (size === 'print') sizeClasses = 'w-16 h-16 sm:w-[70px] sm:h-[70px]';

    return (
      <img
        src={customImg}
        alt={alt || item.ko}
        referrerPolicy="no-referrer"
        className={`object-contain inline-block filter drop-shadow-xs select-none ${sizeClasses} ${className}`}
      />
    );
  }

  // Fallback to emoji
  let emojiSizeClasses = 'text-4xl';
  if (size === 'xs') emojiSizeClasses = 'text-lg';
  else if (size === 'sm') emojiSizeClasses = 'text-2xl';
  else if (size === 'md') emojiSizeClasses = 'text-3xl sm:text-4xl';
  else if (size === 'lg') emojiSizeClasses = 'text-5xl';
  else if (size === 'xl') emojiSizeClasses = 'text-6xl sm:text-7xl';
  else if (size === '2xl') emojiSizeClasses = 'text-7xl sm:text-8xl';
  else if (size === 'card') emojiSizeClasses = 'text-6xl sm:text-7xl leading-none';
  else if (size === 'print') emojiSizeClasses = 'text-[50px] sm:text-[58px] leading-none';

  return (
    <span
      className={`inline-block select-none leading-none drop-shadow-xs ${emojiSizeClasses} ${className}`}
      role="img"
      aria-label={item.ko}
    >
      {item.icon}
    </span>
  );
};
