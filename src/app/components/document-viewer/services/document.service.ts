import { Injectable } from "@angular/core";
import { documentData } from "../mock-data";
import { delay, Observable, of } from "rxjs";

export interface IDocument {
  name: string;
  pages: { number: number; imageUrl: string }[];
}

@Injectable({
  providedIn: "root",
})
export class DocumentService {
  constructor() {}

  getDocumentDataById(id: string): Observable<IDocument> {
    return of(documentData).pipe(delay(1500));
  }
}
