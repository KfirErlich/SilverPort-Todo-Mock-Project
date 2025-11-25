function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-100">
        <header>
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            SilverPort Todo
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Welcome 👋</h1>
          <p className="mt-2 text-base text-slate-500">
            React + TypeScript + Tailwind are ready. Start building your UI and hook
            it up to the backend API.
          </p>
        </header>

        <section className="grid gap-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6">
          <h2 className="text-xl font-semibold text-slate-800">Next steps</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-600">
            <li>Replace this placeholder with actual todo components.</li>
            <li>Use Tailwind utility classes for styling.</li>
            <li>Connect to the backend endpoints once they are ready.</li>
          </ul>
        </section>
      </div>
    </main>
  )
}

export default App
