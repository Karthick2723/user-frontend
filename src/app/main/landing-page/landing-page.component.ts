import { animate, state, style, stagger, keyframes, transition, trigger, query } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

const style1 = style({
  opacity: 1,
  transform: "translateY(0)"
})

const style2 = style({
  opacity: 0,
  transform: "translateY(100%)"
})

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  constructor(private authService:AuthService) {
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  handleLinkClick(): void {
    this.logout();
  }

  logout(): void {
    this.authService.logOut();
  }

}