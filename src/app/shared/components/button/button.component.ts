import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit {
  @Input()
  public icon?: string;

  @Input()
  public alt?: string;

  @Input()
  public label?: string;

  @Input()
  public url?: string;

  @HostBinding('class') @Input() theme?: string;

  public href?: string;
  public routerLink?: string;

  ngOnInit(): void {
    this.initUrl()
  }

  private initUrl(): void {
    const urlRegex = /^(http|https):\/\//;
    if (!this.url) return
    if (urlRegex.test(this.url)) this.href = this.url;
    else this.routerLink = this.url;
  }
}
