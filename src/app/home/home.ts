import { Component, AfterViewInit, Inject, PLATFORM_ID, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initSmoothScrolling();
      this.initHeaderScroll();
      this.initCardAnimations();
    }
  }

  private initSmoothScrolling(): void {
    this.elementRef.nativeElement.querySelectorAll('a[href^="#"]').forEach((anchor: { addEventListener: (arg0: string, arg1: (e: any) => void) => void; getAttribute: (arg0: string) => any; }) => {
      anchor.addEventListener('click', (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const target = this.elementRef.nativeElement.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  private initHeaderScroll(): void {
    window.addEventListener('scroll', () => {
      const header = this.elementRef.nativeElement.querySelector('header');
      if (window.scrollY > 100) {
        header.classList.add('bg-white');
        header.classList.remove('bg-white/90');
      } else {
        header.classList.add('bg-white/90');
        header.classList.remove('bg-white');
      }
    });
  }

  private initCardAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    this.elementRef.nativeElement.querySelectorAll('.card-hover').forEach((card: HTMLElement) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }
}
