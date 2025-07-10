import { AsyncPipe, CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
  Input,
} from "@angular/core";

import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { FormControl, FormsModule } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import {
  TuiButton,
  TuiHorizontalDirection,
  TuiVerticalDirection,
} from "@taiga-ui/core";
import { TuiButtonClose, TuiComment } from "@taiga-ui/kit";
import {
  BehaviorSubject,
  fromEvent,
  map,
  merge,
  Observable,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from "rxjs";

import { DocumentService } from "../../services";

type PivotType = "left" | "right" | "top" | "bottom";

@Component({
  selector: "document-note",
  imports: [
    CommonModule,
    FormsModule,
    AsyncPipe,
    TuiComment,
    TuiButton,
    TuiButtonClose,
  ],
  templateUrl: "./document-note.component.html",
  styleUrl: "./document-note.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentNoteComponent {
  @Input()
  set position([left, top, hostWidth, hostHeight]: number[]) {
    const noteElement = this.elementRef.nativeElement;

    const widthRatio = 100 / hostWidth;
    const heightRatio = 100 / hostHeight;

    this.positionY = heightRatio * (top - noteElement.offsetHeight / 2);
    this.positionX = widthRatio * left;

    noteElement.style.left = this.positionX + "%";
    noteElement.style.top = this.positionY + "%";
  }

  @Input({ required: true }) hostElement!: HTMLElement;
  @Input({ required: true }) destroyFn!: Function;
  @Input({ required: true }) dimensionRatio$!: Observable<number[]>;
  @Input({ required: true }) noteControl!: FormControl;

  @HostBinding("attr.draggable") daraggable = true;

  private readonly elementRef = inject(ElementRef);

  private readonly documentService = inject(DocumentService);

  private readonly destroy = inject(DestroyRef);

  readonly noteType$ = new BehaviorSubject<
    TuiHorizontalDirection | TuiVerticalDirection
  >("left");

  private positionX = 0;
  private positionY = 0;

  readonly noteText$ = new BehaviorSubject("Новая заметка");

  ngAfterViewInit() {
    this.initDragging();
  }

  inputNote(event: FocusEvent): void {
    this.noteControl.setValue((event.target as HTMLElement)?.innerHTML, {
      emitEvent: false,
    });
    this.noteText$.next((event.target as HTMLElement)?.innerHTML);
    this.documentService.docuementMode$.next(null);
  }

  setEditMode(): void {
    this.documentService.docuementMode$.next("editing");
  }

  destroyNote(): void {
    this.destroyFn();
  }

  setPivot(type: PivotType): void {
    this.noteType$.next(type);
  }

  private initDragging(): void {
    const noteElement = this.elementRef.nativeElement;

    const startDragging$ = fromEvent<MouseEvent>(noteElement, "mousedown").pipe(
      map((event) => [event.layerX, event.layerY])
    );

    const stopDragging$ = merge(
      fromEvent<MouseEvent>(noteElement, "mouseup"),
      fromEvent<MouseEvent>(noteElement, "mouseleave")
      //fromEvent(this.hostElement, "mousemove")
    );

    const dropEvent$ = merge(
      fromEvent<DragEvent>(this.hostElement, "drop"),
      fromEvent<DragEvent>(noteElement, "drop")
    ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

    startDragging$
      .pipe(
        switchMap(([layerX, layerY]) => {
          return dropEvent$.pipe(
            withLatestFrom(this.dimensionRatio$),
            tap(
              ([
                dragEvent,
                [widthRatio, heightRatio, hostLeftOffset, hostTopOffset],
              ]) => {
                this.positionY =
                  heightRatio * (dragEvent.pageY - hostTopOffset - layerY);
                this.positionX =
                  widthRatio * (dragEvent.pageX - hostLeftOffset - layerX);

                noteElement.style.top = this.positionY + "%";
                noteElement.style.left = this.positionX + "%";
              }
            ),

            takeUntil(stopDragging$)
          );
        }),
        takeUntilDestroyed(this.destroy)
      )
      .subscribe();

    // startDragging$
    //   .pipe(
    //     withLatestFrom(this.dimensionRatio$),
    //     switchMap(
    //       ([
    //         [layerX, layerY],
    //         [widthRatio, heightRatio, hostLeftOffset, hostTopOffset],
    //       ]) =>
    //         fromEvent<MouseEvent>(this.hostElement, "mousemove").pipe(
    //           tap((dragEvent) => {
    //             this.positionY =
    //               heightRatio * (dragEvent.pageY - hostTopOffset - layerY);
    //             this.positionX =
    //               widthRatio * (dragEvent.pageX - hostLeftOffset - layerX);

    //             noteElement.style.top = this.positionY + "%";
    //             noteElement.style.left = this.positionX + "%";
    //           }),

    //           takeUntil(stopDragging$)
    //         )
    //     )
    //   )
    //   .subscribe();

    merge(
      fromEvent<DragEvent>(this.hostElement, "dragover"),
      fromEvent<DragEvent>(noteElement, "dragover")
    )
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((event) => event.preventDefault());
  }
}
