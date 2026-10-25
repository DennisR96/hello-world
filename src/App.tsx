import { useEffect, useState } from "react"

type Op = '+' | '−' | '×' | '÷'
function calculate(a: number, b: number, op: Op) {
  const n = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b
  return Number.isFinite(n) ? String(Number(n.toPrecision(12))) : 'Fehler'
}
function App() {
  const [value, setValue] = useState('0')
  const [stored, setStored] = useState<number | null>(null)
  const [op, setOp] = useState<Op | null>(null)
  const [fresh, setFresh] = useState(false)
  const [caption, setCaption] = useState('Bereit für deine Zahlen')
  function press(key: string) {
    if (key === 'AC') { setValue('0'); setStored(null); setOp(null); setFresh(false); setCaption('Bereit für deine Zahlen'); return }
    if (/^\d$/.test(key) || key === ',') {
      const base = fresh || value === 'Fehler' ? '0' : value
      if (base.replace(/[-.]/g, '').length >= 12 && !fresh) return
      setValue(key === ',' ? base.includes('.') ? base : base + '.' : base === '0' ? key : base + key)
      setFresh(false); return
    }
    if (value === 'Fehler') return
    if (key === '⌫') { setValue(fresh ? '0' : value.length > 1 ? value.slice(0,-1) === '-' ? '0' : value.slice(0,-1) : '0'); setFresh(false); return }
    if (key === '±' || key === '%') { setValue(String(key === '%' ? Number(value)/100 : -Number(value))); return }
    if (['+', '−', '×', '÷'].includes(key)) {
      let next = value
      if (stored !== null && op && !fresh) next = calculate(stored, Number(value), op)
      setValue(next); setStored(next === 'Fehler' ? null : Number(next)); setOp(next === 'Fehler' ? null : key as Op); setCaption(next === 'Fehler' ? 'Durch null kann man nicht teilen' : `${next.replace('.', ',')} ${key}`); setFresh(true); return
    }
    if (key === '=' && stored !== null && op) {
      const result = calculate(stored, Number(value), op)
      setCaption(`${String(stored).replace('.', ',')} ${op} ${value.replace('.', ',')} =`)
      setValue(result); setStored(null); setOp(null); setFresh(true)
    }
  }
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey || (e.target instanceof HTMLButtonElement && (e.key === 'Enter' || e.key === ' '))) return
      const map: Record<string,string> = {Enter:'=', Escape:'AC', Backspace:'⌫', Delete:'AC', '*':'×', '/':'÷', '-':'−', '.':','}
      const k = map[e.key] || e.key
      if (/^\d$/.test(k) || [',','+','−','×','÷','=','AC','⌫','%'].includes(k)) { e.preventDefault(); press(k) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })
  const keys = ['AC','±','%','÷','7','8','9','×','4','5','6','−','1','2','3','+','⌫','0',',','=']
  return <main><header><span className="mark">=</span><span>Einfach rechnen.</span></header><section className="calculator" aria-label="Taschenrechner"><div className="topline"><h1>Taschenrechner</h1><span className="dot" /></div><div className="screen"><p>{caption}</p><output aria-live="polite" style={{fontSize: value.length > 10 ? '2.3rem' : undefined}}>{value.replace('.', ',')}</output></div><div className="keys">{keys.map(key => <button key={key} className={`${['+','−','×','÷'].includes(key) ? 'operator' : ''} ${['AC','±','%'].includes(key) ? 'utility' : ''} ${key === '=' ? 'equals' : ''} ${op === key ? 'selected' : ''}`} onClick={() => press(key)} aria-label={({AC:'Alles löschen','±':'Vorzeichen wechseln','%':'Prozent','÷':'Teilen','×':'Multiplizieren','−':'Subtrahieren','+':'Addieren','⌫':'Letzte Ziffer löschen',',':'Dezimaltrennzeichen','=':'Ergebnis'} as Record<string,string>)[key] || key}>{key}</button>)}</div></section><footer>Mit Maus, Touch oder Tastatur <span>·</span> Esc zum Zurücksetzen</footer></main>
}
export default App
