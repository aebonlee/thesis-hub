import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useAOS = (): void => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Elements already in viewport: show instantly (no transition, no flash)
    document.querySelectorAll('[data-aos]').forEach((el) => {
      el.classList.remove('aos-animate');
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        (el as HTMLElement).style.transition = 'none';
        el.classList.add('aos-animate');
      }
    });

    // Restore transitions after first paint (for future scroll animations)
    requestAnimationFrame(() => {
      document.querySelectorAll('[data-aos].aos-animate').forEach((el) => {
        (el as HTMLElement).style.transition = '';
      });
    });

    // Observer for elements below viewport (scroll-triggered)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-aos-delay') || '0';
            setTimeout(() => {
              entry.target.classList.add('aos-animate');
            }, Number(delay));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll('[data-aos]:not(.aos-animate)').forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll();

    const mutObs = new MutationObserver(observeAll);
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObs.disconnect();
    };
  }, [pathname]);
};

export default useAOS;
