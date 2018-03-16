import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import * as octicons from 'octicons';

@Directive({
    selector: '[octicon]'
})
export class OcticonDirective implements OnInit {
    @Input() public octicon: string;
    @Input() public color: string;
    @Input() public width: number;

    private elementRef: ElementRef;
    private renderer: Renderer2;

    constructor(elementRef: ElementRef, renderer: Renderer2) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }

    public ngOnInit(): void {
        const el: HTMLElement = this.elementRef.nativeElement;
        const icon: Node = el.firstChild;

        // tslint:disable-next-line no-inner-html
        el.innerHTML = octicons[this.octicon].toSVG();

        if (this.color) {
            this.renderer.setStyle(icon, 'color', this.color);
        }

        if (this.width) {
            this.renderer.setStyle(icon, 'width', this.width);
            this.renderer.setStyle(icon, 'height', '100%');
        }
    }
}
