import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";

@Component({
  selector: 'app-normal-screen',
  standalone: true,
    imports: [
        NgOptimizedImage,
        SlickCarouselModule
    ],
  templateUrl: './normal-screen.component.html',
  styleUrl: './normal-screen.component.scss'
})
export class NormalScreenComponent {
  words = [
    'Exceptional SEO?',
    'Your Own AI?',
    'A Developer?',
    'A Tech Team?',
    'Exceptional SEO?',
  ];


  links = [
    'Expertise',
    'Our works',
    'Services',
    'Blog',
    'Contact',
  ];

  logos = [
    { path: '../assets/img/1.png'},
    { path: '../assets/img/2.png'},
    { path: '../assets/img/3.png'},
    { path: '../assets/img/4.png'},
    { path: '../assets/img/5.png'},
    { path: '../assets/img/4.png'},
  ]

  trackWord(index: number, word: string) {
    return word;
  }
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    infinite: true,
    rows: 1,
    swipeToSlide: true,
    arrows: false,
  };
}
