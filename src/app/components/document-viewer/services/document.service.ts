import { Injectable } from "@angular/core";
import { documentData } from "../mock-data";
import { BehaviorSubject, delay, Observable, of } from "rxjs";

export interface IDocument {
  name: string;
  pages: { number: number; imageUrl: string }[];
}

type DocumentMode = "editing";

@Injectable()
export class DocumentService {
  getDocumentDataById(id: string): Observable<IDocument> {
    return of(documentData).pipe(delay(1500));
  }

  readonly docuementMode$ = new BehaviorSubject<DocumentMode | null>(null);
}
