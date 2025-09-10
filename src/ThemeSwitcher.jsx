import React, { useEffect, useState } from 'react'
import './ThemeSwitcher.css'

// Importar archivos CSS como texto para inyectarlos dinámicamente
import defaultCss from './default.css?raw'
import glasmorfismCss from './glasmorfism.css?raw'
import neumorphismCss from './neumorphism.css?raw'
import neobrutasilmCss from './neobrutasilm.css?raw'
import y2kCss from './y2k.css?raw'

const themeList = [
    { id: 'default', label: 'default', css: defaultCss },
    { id: 'glasmorfismo', label: 'glasmorfismo', css: glasmorfismCss },
    { id: 'neumorfismo', label: 'neumorfismo', css: neumorphismCss },
    { id: 'neobrutalismo', label: 'neobrutalismo', css: neobrutasilmCss },
    { id: 'y2k', label: 'y2k', css: y2kCss },
]

function ensureStyleElement() {
    let el = document.getElementById('active-theme')
    if (!el) {
        el = document.createElement('style')
        el.id = 'active-theme'
        document.head.appendChild(el)
    }
    return el
}

function applyThemeCss(cssText) {
    const el = ensureStyleElement()
    el.textContent = cssText
}

export default function ThemeSwitcher() {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const [active, setActive] = useState(stored || 'default')

    useEffect(() => {
        const t = themeList.find((x) => x.id === active) || themeList[0]
        applyThemeCss(t.css)
        try {
            localStorage.setItem('theme', active)
        } catch (e) { }
    }, [active])

    return (
        <nav className="theme-switcher" aria-label="theme switcher">
            <div className="ts-title">Tema:</div>
            <div className="ts-list">
                {themeList.map((t) => (
                    <button
                        key={t.id}
                        className={`ts-btn ${active === t.id ? 'active' : ''}`}
                        onClick={() => setActive(t.id)}
                        type="button"
                    >
                        {t.label}
                    </button>
                ))}
            </div>
        </nav>
    )
}
