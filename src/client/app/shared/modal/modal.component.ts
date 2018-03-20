import { AfterContentInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalService } from '@app/shared/modal/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit, AfterContentInit {
    @Input() public id: string;
    @ViewChild('modalHeader') public headerRef: ElementRef;
    @ViewChild('modalBody') public bodyRef: ElementRef;
    @ViewChild('modalFooter') public footerRef: ElementRef;

    public isOpen: boolean = false;

    private modalService: ModalService;
    private element: ElementRef;
    private renderer: Renderer2;

    constructor(modalService: ModalService,
                element: ElementRef,
                renderer: Renderer2) {
        this.modalService = modalService;
        this.element = element;
        this.renderer = renderer;
    }

    public ngAfterContentInit(): void {
        if (this.headerRef.nativeElement.children.length === 0) {
            this.headerRef.nativeElement.style.display = 'none';
        }

        if (this.bodyRef.nativeElement.children.length === 0) {
            this.bodyRef.nativeElement.style.display = 'none';
        }

        if (this.footerRef.nativeElement.children.length === 0) {
            this.footerRef.nativeElement.style.display = 'none';
        }
    }

    public ngOnInit(): void {
        this.renderer.appendChild(window.document.body, this.element.nativeElement);

        this.modalService.register(this);
    }

    public open(event: MouseEvent): void {
        event.stopPropagation();

        this.modalService.open(this.id);
    }

    public close(event: MouseEvent): void {
        event.stopPropagation();

        this.modalService.close(this.id);
    }
}
