import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  filter,
  fromEvent,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
  withLatestFrom,
} from "rxjs";
import { DocumentService, IDocument } from "./services";
import { CommonModule } from "@angular/common";
import { ZoomControlService } from "../zoom-control";
import { TuiDataList, TuiDropdown, TuiIcon, TuiLoader } from "@taiga-ui/core";
import { TuiDataListDropdownManager } from "@taiga-ui/kit";
import { DocumentNoteComponent } from "./components";
import { FormControl } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "document-viewer",
  imports: [
    CommonModule,
    TuiDropdown,
    TuiDataList,
    TuiDataListDropdownManager,
    TuiIcon,
    TuiLoader,
  ],
  templateUrl: "./document-viewer.component.html",
  styleUrl: "./document-viewer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentViewerComponent {
  @ViewChild("documentContainerHost", { read: ViewContainerRef, static: false })
  documentContainerHost!: ViewContainerRef;

  private readonly route = inject(ActivatedRoute);

  private readonly zoomService = inject(ZoomControlService);

  private readonly documentService = inject(DocumentService);

  private readonly elementRef = inject(ElementRef);

  private readonly destroy = inject(DestroyRef);

  private readonly defaultWidth = 800;

  private readonly noteControlSet = new Set<FormControl>();

  private targetPosition: number[] = [];

  readonly documentZoomedWidth$: Observable<string> =
    this.zoomService.zoomAmount$.pipe(
      map((zoomAmount) => {
        return (this.defaultWidth / 100) * (zoomAmount || 0) + "px";
      }),
      startWith(this.defaultWidth + "px"),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

  readonly dimensionParams$ = this.documentZoomedWidth$.pipe(
    map(() => {
      const hostWidth =
        this.documentContainerHost.element?.nativeElement.offsetWidth;

      const hostTopOffset = this.elementRef.nativeElement.offsetTop;

      const hostLeftOffset = (document.body.offsetWidth - hostWidth) / 2;

      return [
        100 / hostWidth,
        100 / this.documentContainerHost.element?.nativeElement.offsetHeight,
        hostLeftOffset,
        hostTopOffset,
      ];
    }),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  readonly documentData$: Observable<IDocument | null> =
    this.route.paramMap.pipe(
      map((params) => params?.get("id") || null),
      switchMap((id) =>
        id ? this.documentService.getDocumentDataById(id) : of(null)
      ),
      startWith(null),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

  readonly loading$ = this.documentData$.pipe(map((data) => !data));

  ngOnInit(): void {
    fromEvent<KeyboardEvent>(window, "keydown")
      .pipe(
        withLatestFrom(this.documentService.docuementMode$),
        filter(
          ([event, mode]) =>
            ["+", "-"].includes(event.key) && mode !== "editing"
        ),
        takeUntilDestroyed(this.destroy)
      )
      .subscribe(([event]) => this.zoomService.zoom(event.key));
  }

  setNoteTarget(event: MouseEvent): void {
    this.targetPosition = [event.pageX, event.pageY];
  }

  addNote(): void {
    const hostWidth =
      this.documentContainerHost.element?.nativeElement.offsetWidth;
    const hostHeight =
      this.documentContainerHost.element?.nativeElement.offsetHeight;

    const hostTopOffset = this.elementRef.nativeElement.offsetTop;

    const hostLeftOffset = (document.body.offsetWidth - hostWidth) / 2;

    const newNoteComponentRef: ComponentRef<DocumentNoteComponent> =
      this.documentContainerHost.createComponent(DocumentNoteComponent);

    const newNoteComponent = newNoteComponentRef.instance;

    const noteControl = new FormControl();

    this.noteControlSet.add(noteControl);

    const destroyFn = () => {
      newNoteComponentRef.destroy.bind(newNoteComponentRef)();
      this.noteControlSet.delete(noteControl);
    };

    const [pageX, pageY] = this.targetPosition;

    const left = pageX - hostLeftOffset;
    const top = pageY - hostTopOffset;

    newNoteComponent.position = [left, top, hostWidth, hostHeight];
    newNoteComponent.destroyFn = destroyFn;

    newNoteComponent.hostElement =
      this.documentContainerHost.element.nativeElement;

    newNoteComponent.noteControl = noteControl;

    newNoteComponent.dimensionRatio$ = this.dimensionParams$;
  }
}
