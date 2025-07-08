import {
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
} from "@angular/core";
import { TuiComment } from "@taiga-ui/kit";

@Component({
  selector: "document-note",
  imports: [TuiComment],
  templateUrl: "./document-note.component.html",
  styleUrl: "./document-note.component.scss",
})
export class DocumentNoteComponent {
  @Input()
  set position([left, top]: [number, number]) {
    this.elementRef.nativeElement.style.left = left + "px";
    this.elementRef.nativeElement.style.top = top - 15 + "px";
  }

  private readonly elementRef = inject(ElementRef);
}
