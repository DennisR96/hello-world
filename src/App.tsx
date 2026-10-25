import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

function App() {
  const [greeted, setGreeted] = useState(false)

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
        Vite · React · shadcn/ui
      </span>
      <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
        Hello, world!
      </h1>
      <p className="max-w-md text-base text-muted-foreground">
        A tiny site with components you can edit.
      </p>
      <Button onClick={() => setGreeted(true)}>
        <Sparkles aria-hidden="true" />
        Say hello
      </Button>
      <p className="sr-only" aria-live="polite">
        {greeted ? "Hello from your new site." : ""}
      </p>
    </main>
  )
}

export default App
