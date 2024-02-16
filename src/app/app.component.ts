import {Component, OnInit,} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {NormalScreenComponent} from "./screens/normal-screen/normal-screen.component";
import {DarkScreenComponent} from "./screens/dark-screen/dark-screen.component";
import { gsap } from 'gsap';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgOptimizedImage, SlickCarouselModule, NormalScreenComponent, DarkScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const overlay = document.querySelector('.overlay');

    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const x = Math.round((clientX / window.innerWidth) * 100);
      const y = Math.round((clientY / window.innerHeight) * 100+15);

      gsap.to(overlay, {
        '--x': `${x}%`,
        '--y': `${y}%`,
        duration: 0.3,
        ease: 'sine.out'
      });
    });

    const span = document.querySelector('.hover-btn2');
    if (overlay){
      overlay.addEventListener('click', () => {

        overlay.classList.toggle('is-open');
      });
    }
  }
}

