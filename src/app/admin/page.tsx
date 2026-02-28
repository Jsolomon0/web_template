import { AdminClient } from "./AdminClient";

export default function AdminPage() {
  return (
    <main className="section-pad">
      <div className="container-shell">
        <div className="space-y-space-6">
          <div>
            <p className="text-eyebrow text-muted">Content admin</p>
            <h1 className="text-heading-md text-foreground mt-space-3">
              Page editor
            </h1>
            <p className="text-body text-muted mt-space-2 max-w-copy">
              Edit page title, description, and block JSON. Changes are saved to
              the local content files.
            </p>
          </div>
          <AdminClient />
        </div>
      </div>
    </main>
  );
}
