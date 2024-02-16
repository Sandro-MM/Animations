import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: true,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  private rect!: DOMRect;
  private distanceToTrigger!: number;
  private renderedStyles = {
    tx: { previous: 0, current: 0, amt: 0.1 },
    ty: { previous: 0, current: 0, amt: 0.1 }
  };
  private state = {
    hover: false
  };
  private readonly DOM = {} as {
    el: HTMLElement;
    text: HTMLElement;
    textinner: HTMLElement;
    filler: HTMLElement;
  };

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.DOM.el = this.elementRef.nativeElement.querySelector('.button');
    this.DOM.text = this.DOM.el.querySelector('.button__text') as HTMLElement;
    this.DOM.textinner = this.DOM.el.querySelector('.button__text-inner') as HTMLElement;
    this.DOM.filler = this.DOM.el.querySelector('.button__filler') as HTMLElement;
    if (!this.DOM.text) {
      throw new Error('Button text element not found');
    }
    if (!this.DOM.textinner) {
      throw new Error('Button text inner element not found');
    }
    if (!this.DOM.filler) {
      throw new Error('Button filler element not found');
    }
    this.calculateSizePosition();
    this.render();
  }

  calculateSizePosition(): void {
    this.rect = this.DOM.el.getBoundingClientRect();
    this.distanceToTrigger = this.rect.width * 0.7;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.calculateSizePosition();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const mousepos = { x: event.clientX, y: event.clientY };
    const distanceMouseButton = this.distance(mousepos.x, mousepos.y, this.rect.left + this.rect.width / 2, this.rect.top + this.rect.height / 2);
    let x = 0;
    let y = 0;

    if (distanceMouseButton < this.distanceToTrigger) {
      if (!this.state.hover) {
        this.enter();
      }
      x = (mousepos.x - (this.rect.left + this.rect.width / 2)) * 0.3;
      y = (mousepos.y - (this.rect.top + this.rect.height / 2)) * 0.3;
    } else if (this.state.hover) {
      this.leave();
    }

    this.renderedStyles['tx'].current = x;
    this.renderedStyles['ty'].current = y;
  }

  render(): void {
    for (const key in this.renderedStyles) {
      if (Object.prototype.hasOwnProperty.call(this.renderedStyles, key)) {
        const typedKey = key as keyof typeof this.renderedStyles;
        this.renderedStyles[typedKey].previous = this.lerp(this.renderedStyles[typedKey].previous, this.renderedStyles[typedKey].current, this.renderedStyles[typedKey].amt);
      }
    }

    this.DOM.el.style.transform = `translate3d(${this.renderedStyles['tx'].previous}px, ${this.renderedStyles['ty'].previous}px, 0)`;
    this.DOM.text.style.transform = `translate3d(${-this.renderedStyles['tx'].previous * 0.6}px, ${-this.renderedStyles['ty'].previous * 0.6}px, 0)`;

    requestAnimationFrame(() => this.render());
  }

  enter(): void {
    this.state.hover = true;
    this.DOM.el.classList.add('button--hover');
    document.body.classList.add('active');

    gsap.killTweensOf(this.DOM.filler);
    gsap.killTweensOf(this.DOM.textinner);

    gsap
      .timeline()
      .to(this.DOM.filler, 0.5, {
        ease: 'Power3.easeOut',
        startAt: { y: '75%' },
        y: '0%'
      })
      .to(this.DOM.textinner, 0.1, {
        ease: 'Power3.easeOut',
        opacity: 0,
        y: '-10%'
      }, 0)
      .to(this.DOM.textinner, 0.25, {
        ease: 'Power3.easeOut',
        opacity: 1,
        startAt: { y: '30%', opacity: 1 },
        y: '0%'
      }, 0.1);
  }

  leave(): void {
    this.state.hover = false;
    this.DOM.el.classList.remove('button--hover');
    document.body.classList.remove('active');

    gsap.killTweensOf(this.DOM.filler);
    gsap.killTweensOf(this.DOM.textinner);

    gsap
      .timeline()
      .to(this.DOM.filler, 0.4, {
        ease: 'Power3.easeOut',
        y: '-75%'
      })
      .to(this.DOM.textinner, 0.1, {
        ease: 'Power3.easeOut',
        opacity: 0,
        y: '10%'
      }, 0)
      .to(this.DOM.textinner, 0.25, {
        ease: 'Power3.easeOut',
        opacity: 1,
        startAt: { y: '-30%', opacity: 1 },
        y: '0%'
      }, 0.1);
  }

  distance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  lerp(a: number, b: number, n: number): number {
    return (1 - n) * a + n * b;
  }
}
