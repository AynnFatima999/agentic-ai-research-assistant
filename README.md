# 🤖 Agentic AI Research Assistant

An AI-powered research assistant that autonomously researches topics from the web, analyzes information using Large Language Models (LLMs), generates structured summaries, provides source references, and exports professional PDF research reports.

## 🚀 Live Demo

Frontend:
https://agentic-ai-research-assistant-j485ko6gl-aynprojects.vercel.app/

Backend:
https://agentic-ai-research-assistant-production-6382.up.railway.app/

---

# ✨ Features

## 🔎 AI Research Workflow

- Automated topic research using AI agents
- Web search and information gathering
- Content extraction from sources
- LLM-powered analysis and summarization

## 🤖 Agentic AI Capabilities

- Agent-based research workflow
- Tool calling architecture
- External tool integration
- Context-aware information processing

## 📊 Real-Time Progress

- Server-Sent Events (SSE) streaming
- Live research status updates
- Progress tracking during execution

## 📝 Research Output

- Configurable summary length:
  - Short
  - Medium
  - Long

- Structured results:
  - Summary
  - Key Points
  - References

## 📄 Export

- Generate professional PDF research reports
- Download reports directly from UI

## 🛡️ Reliability

- API rate limiting
- Error handling
- Validation
- Robust backend service layer

## 🎨 User Interface

- Modern dark themed UI
- Responsive design
- Glassmorphism components
- Animated experience

---

# 🏗️ System Architecture

```
                         User
                           |
                           |
                    Next.js Frontend
                           |
                           |
                    FastAPI Backend
                           |
                           |
                  Research Service Layer
                           |
                           |
                    Research Agent
                           |
        -----------------------------------
        |                 |               |
        |                 |               |
   Web Search       Content Parser    LLM Service
        |                 |               |
        -----------------------------------
                           |
                           |
                 Structured Research Report
                           |
              -----------------------------
              |             |             |
          Summary      Key Points    References
                           |
                           |
                       PDF Export
```

---

# 🛠️ Tech Stack

## Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## Backend

- Python
- FastAPI
- Pydantic
- SSE Streaming
- Uvicorn

## AI & Automation

- Agentic AI Workflow
- LLM Integration
- Tool Calling
- Web Research Pipeline

## Web Processing

- Search APIs
- BeautifulSoup
- Content Extraction

## Deployment

Frontend:

- Vercel

Backend:

- Railway

---

# 📂 Project Structure

```
agentic-ai-research-assistant/

│
├── backend/
│
│   ├── agents/
│   │   └── research_agent.py
│   │
│   ├── routes/
│   │   └── research.py
│   │
│   ├── services/
│   │   ├── research_service.py
│   │   ├── llm_service.py
│   │   └── pdf_service.py
│   │
│   ├── tools/
│   │   ├── web_search.py
│   │   └── content_parser.py
│   │
│   ├── models/
│   │   └── schemas.py
│   │
│   └── main.py
│
│
├── frontend/
│
│   ├── app/
│   │
│   ├── components/
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │
│   └── types/
│
│
└── README.md
```

---

# ⚙️ Local Development Setup

## Backend Setup

### 1. Clone Repository

```bash
git clone https://github.com/AynnFatima999/agentic-ai-research-assistant.git
```

---

### 2. Create Virtual Environment

```bash
python -m venv .venv
```

Activate:

### Windows

```bash
.venv\Scripts\activate
```

---

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Configure Environment Variables

Create:

```
.env
```

Example:

```env
OPENAI_API_KEY=your_api_key
```

---

### 5. Run Backend

```bash
uvicorn backend.main:app --reload
```

Backend will run:

```
http://127.0.0.1:8000
```

---

# Frontend Setup

Navigate:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Create:

```
.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Run:

```bash
npm run dev
```

Frontend:

```
http://localhost:3000
```

---

# 🔌 API Endpoints

## Health Check

```
GET /
```

Response:

```json
{
  "message": "Agentic AI Research Assistant API is running!"
}
```

---

## Research Generation

```
POST /research/
```

Request:

```json
{
  "topic": "Artificial Intelligence",
  "summary_length": "medium"
}
```

---

## Streaming Research

```
GET /research/stream
```

Provides:

- Live progress updates
- Completion response

---

## PDF Export

```
POST /research/pdf
```

Returns:

```
application/pdf
```

---

# 🔄 Workflow

1. User enters a research topic.
2. Frontend sends request to backend.
3. Research Agent starts execution.
4. Agent searches relevant information.
5. Content parser extracts useful data.
6. LLM analyzes collected information.
7. Structured response is generated.
8. Results appear in real-time.
9. User downloads PDF report.

---

# 🧠 Agentic AI Concepts Used

## AI Agents

The system uses an autonomous research agent responsible for:

- Planning research workflow
- Using external tools
- Processing gathered information
- Producing final output

---

## Tool Calling

The agent can interact with external capabilities:

- Web search
- Content extraction
- LLM services

---

## Context Processing

Collected information is transformed into meaningful context before generating final answers.

---

## Multi-Step Workflow

The research pipeline follows multiple stages:

```
Search
  ↓
Extract
  ↓
Analyze
  ↓
Summarize
  ↓
Generate Report
```

---

# 🔮 Future Improvements

- Multi-agent collaboration
- RAG pipeline integration
- Vector database support
- Research history
- User authentication
- Advanced source ranking
- Better AI planning capabilities
- Cloud-based AI workflows

---

# 👩‍💻 Author

## Aynn Fatima

Full Stack Developer  
Agentic AI Engineer

---

⭐ If you find this project useful, consider giving it a star on GitHub.
⭐ If you like this project, consider giving it a star.
