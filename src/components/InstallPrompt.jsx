import React, { useState, useEffect } from 'react';
import './InstallPrompt.css';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt after 10 seconds if not dismissed before
      setTimeout(() => {
        const dismissed = localStorage.getItem('installPromptDismissed');
        if (!dismissed) {
          setShowPrompt(true);
        }
      }, 10000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('installPromptDismissed', 'true');
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="install-prompt">
      <div className="install-prompt-content">
        <button className="install-prompt-close" onClick={handleDismiss}>×</button>
        
        <div className="install-prompt-icon">📱</div>
        
        <h3>Install Finance Dashboard</h3>
        
        {isIOS ? (
          <div className="install-instructions">
            <p>Install this app on your iPhone:</p>
            <ol>
              <li>Tap the Share button <span className="ios-icon">⎋</span></li>
              <li>Scroll down and tap "Add to Home Screen"</li>
              <li>Tap "Add" in the top right</li>
            </ol>
            <p className="install-note">Your data will be stored locally on your device!</p>
          </div>
        ) : (
          <div className="install-instructions">
            <p>Install this app for the best experience:</p>
            <ul>
              <li>✅ Works offline</li>
              <li>✅ Faster loading</li>
              <li>✅ Home screen access</li>
              <li>✅ Data stored on your device</li>
            </ul>
            <div className="install-actions">
              <button className="btn btn-primary" onClick={handleInstall}>
                Install App
              </button>
              <button className="btn btn-secondary" onClick={handleDismiss}>
                Maybe Later
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallPrompt;
