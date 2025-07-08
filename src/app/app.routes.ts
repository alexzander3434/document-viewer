import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "documents/:id",
    loadComponent: () =>
      import("./components/document-viewer").then(
        (m) => m.DocumentViewerComponent
      ),
  },
];
