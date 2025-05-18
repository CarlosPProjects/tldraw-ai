# AI-Connected Visual Canvas ✨

*Interactive Node-Based App Powered by tldraw + AI*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FTuUsuario%2Fai-canvas)
![App Preview](https://github.com/user-attachments/assets/your-canvas-image-preview.png)

## 📺 Youtube - 👉 [Tutorial](https://www.youtube.com/watch?v=your-video-id)

---

## 🌟 Features

* **Visual AI Canvas**

  * Create custom shapes connected to each other
  * Automatically transfer context between nodes
  * AI-generated responses using all related nodes
* **Intelligent Canvas**

  * Editable visual flow with programmable behavior
  * Automatic propagation of inputs between shapes
  * Integration with OpenAI or any language API
* **Modern UI**

  * 100% visual interface with **tldraw SDK**
  * Responsive and stylized components with TailwindCSS

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 15 (App Router), TailwindCSS
* **Canvas Engine**: tldraw SDK
* **AI**: OpenAI API (or your favorite provider)
* **Tools**: TypeScript, Zustand, Vercel AI SDK (optional)

---

## ⚡ Quick Start

### Prerequisites

* Node.js 20+ / pnpm 9+
* OpenAI API Key (or another provider)
* Vercel account for deployment (optional)

### Installation

```bash
git clone https://github.com/TuUsuario/ai-canvas.git
cd ai-canvas
bun install # o pnpm install
```

### Configuration

1. Create a `.env.local` file:

```env
OPENAI_API_KEY=your_openai_key
```
> You can add more keys depending on the AI provider you use.

### Run locally

```bash
npm run dev
```

---

## 🧠 AI Interaction Examples

```plaintext
🟪 Input Node: "Create content ideas for YouTube"
⬇
🟪 Instruction Node: "Simplify and categorize the ideas"
⬇
🟪 Output: "1. Step-by-step tutorials. 2. Comparison videos. 3. Educational shorts."
```

```plaintext
🟪 Input: "Use Next.js and Tailwind in each project"
🟪 Input: "Create visual tools"
⬇
🟪 Combined Result: "Design a visual project generator with Next.js + Tailwind for quick MVPs."
```

---

## 🚀 Deployment

1. Deploy on Vercel:

```bash
vercel
```

2. Add the same variables to the Vercel dashboard.

---

## 📂 Project Structure

```
/src
├── app                  # Main routes and layout
├── components           # Custom UI and Shapes
├── editor               # Tldraw editor logic
└── lib                  # Utility functions
```

---

## 📌 Resources

* [tldraw.dev](https://www.tldraw.dev/)
* [TailwindCSS](https://tailwindcss.com/)
* [Next.js 15](https://nextjs.org/)
* [OpenAI Platform](https://platform.openai.com/)

---


**Need Help?**  
Open an issue or contact [carlos@cgaravito.dev](mailto:carlos@cgaravito.dev)

[![GitHub Stars](https://img.shields.io/github/stars/carlospprojects/taskly-yt?style=social)](https://github.com/carlospprojects/taskly-yt)