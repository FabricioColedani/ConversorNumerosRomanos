# 🏛️ Conversor Números Arábigos ↔ Romanos

Aplicación web interactiva para convertir números entre el sistema arábigo y romano de forma bidireccional.

**🚀 Sitio en Vivo:** https://conversornumerosromanos.netlify.app/

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss)

---

## ✨ Características

- 🔄 **Conversión bidireccional** - Arábigo ↔ Romano (rango 1-3999)
- ⚡ **Conversión instantánea** - Resultados en tiempo real
- ✅ **Validación inteligente** - Mensajes claros de error
- 📚 **Historial** - Últimas 10 conversiones guardadas
- 🌓 **Tema claro/oscuro** - Cambia según tu preferencia
- 📱 **100% Responsive** - Funciona en móvil, tablet y desktop
- 📖 **Guía educativa** - Aprende cómo funcionan los números romanos

---

## 🚀 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/ConversorNumerosRomanos.git

# Entrar al directorio
cd ConversorNumerosRomanos

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

---

## 🛠️ Tecnologías

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilos utility-first
- **Lucide React** - Iconos modernos

---

## 📝 Uso

### Arábigo → Romano
1. Escribe un número entre 1 y 3999
2. El resultado aparece automáticamente

### Romano → Arábigo
1. Escribe números romanos (ej: MMXXIV)
2. Conversión instantánea

### Historial
- Click en cualquier conversión anterior para recargarla
- Se guardan las últimas 10 conversiones

---

## 🎓 Reglas de Números Romanos

| Símbolo | Valor |
|---------|-------|
| I | 1 |
| V | 5 |
| X | 10 |
| L | 50 |
| C | 100 |
| D | 500 |
| M | 1000 |

**Reglas básicas:**
1. **Suma**: Símbolos iguales o decrecientes se suman → `VI = 6`
2. **Resta**: Símbolo menor antes de mayor se resta → `IV = 4`
3. **Repetición**: I, X, C, M se repiten máximo 3 veces → `III = 3`

**Ejemplos:**
- `MCMXCIV` = 1994
- `MMXXIV` = 2024
- `CDXLIV` = 444

---

## 📂 Estructura del Proyecto

```
ConversorNumerosRomanos/
├── backend/       
│   ├── server.js       # Logica del Conversor
│   ├── package.json    # Dependencias Backend
│   ├── test.js         # Pruebas de la logicas
│   └── .gitignore 
├── src/
│   ├── App.tsx              # Frontend + API de la carpeta Backend (Desplegado en Render)
│   ├── main.tsx             # Punto de entrada React
│   └── index.css            # Estilos Tailwind
├── public/                  # Archivos estáticos
├── index.html               # HTML base
├── netlify.toml             # Config deploy Netlify
├── tailwind.config.js       # Config Tailwind CSS
├── vite.config.ts           # Config Vite
└── package.json             # Dependencias
```

---

## 👤 Autor

**Fabricio Coledani**
- Estudiante de la Universidad Provincial de Córdoba Sede Capilla del Monte
- Proyecto Realizado en la Materia: Diseños y Arquitecturas de Despliegues I

---
