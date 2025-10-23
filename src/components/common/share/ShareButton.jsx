import React from 'react';
import styles from './ShareButton.module.css';

export default function ShareButton({
                                        title = "Check this out!",
                                        text,
                                    }) {
    const getCurrentUrl = () => {
        return window.location.href;
    };

    const handleShare = () => {
        const currentUrl = getCurrentUrl();
        const shareText = text || title;

        const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;

        window.open(
            shareUrl,
            'telegram-share-dialog',
            'width=600,height=400,left=100,top=100'
        );
    };

    return (
        <button
            className={`${styles.button}`}
            onClick={handleShare}
            type="button"
            aria-label="Share on Telegram"
        >
            <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.197l-1.77 8.33c-.125.586-.463.73-.936.455l-4.09-3.02-1.97 1.895c-.217.217-.4.4-.82.4l.294-4.17 7.593-6.863c.324-.288-.07-.447-.507-.162L6.99 12.65l-4.078-1.27c-.595-.186-.607-.595.125-.88l15.37-5.93c.495-.186.925.125.755.88z"/>
            </svg>
            Share
        </button>
    );
};