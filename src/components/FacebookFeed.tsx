'use client';
import { useEffect } from 'react';
import styles from './FacebookFeed.module.css';

interface FacebookFeedProps {
  pageUrl: string;
}

export default function FacebookFeed({ pageUrl }: FacebookFeedProps) {
  useEffect(() => {
    // Load Facebook SDK
    const loadSDK = () => {
      if (document.getElementById('facebook-jssdk')) return;
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = "https://connect.facebook.net/sk_SK/sdk.js#xfbml=1&version=v18.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    };
    loadSDK();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div id="fb-root"></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.fbIcon}>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </div>
          <div className={styles.headerText}>
            <h3 className={styles.title}>Aktuálne fotky z Facebooku</h3>
            <p className={styles.subtitle}>Sledujte nás pre tie najčerstvejšie zábery priamo od vody</p>
          </div>
        </div>

        <div className={styles.fbEmbedOuter}>
          <div 
            className="fb-page" 
            data-href={pageUrl}
            data-tabs="timeline,events,messages" 
            data-width="500" 
            data-height="" 
            data-small-header="false" 
            data-adapt-container-width="true" 
            data-hide-cover="false" 
            data-show-facepile="true"
          >
            <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
              <a href={pageUrl}>MO SRZ Spišská Belá</a>
            </blockquote>
          </div>
        </div>

        <div className={styles.footer}>
          <a href={pageUrl} target="_blank" rel="noopener noreferrer" className={styles.btn}>
            Otvoriť kompletnú galériu na Facebooku
          </a>
        </div>
      </div>
    </div>
  );
}
