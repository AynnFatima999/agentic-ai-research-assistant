# 🤖 Agentic AI Research Assistant

An AI-powered research assistant that autonomously searches the web, collects information, extracts useful content, and generates structured research responses using an LLM-powered agent workflow.

This project demonstrates the fundamentals of **Agentic AI**, including AI agents, tool usage, web search integration, and LLM-based reasoning.

---

# 🚀 Features

- 🔎 AI-powered web research
- 🌐 Web search integration
- 📄 Automatic webpage content extraction
- 🧠 LLM-powered response generation
- 🤖 Agent-based research workflow
- ⚡ FastAPI backend API
- 🎨 Streamlit interactive interface
- 🔐 Secure API key management using environment variables

---

# 🏗️ System Architecture

```
User
 |
 | Research Query
 ↓
Streamlit Frontend
 |
 ↓
FastAPI Backend
 |
 ↓
AI Research Agent
 |
 ├── Web Search Tool
 |
 ├── Content Parser
 |
 └── OpenRouter LLM
 |
 ↓
Generated Research Report
```

---

# 🛠️ Tech Stack

## Backend
- Python
- FastAPI
- Uvicorn

## AI / LLM
- Agentic AI Workflow
- OpenRouter API
- Large Language Models (LLMs)

## AI Tools
- DuckDuckGo Search
- BeautifulSoup
- Web Content Extraction

## Frontend
- Streamlit

## Development
- Git & GitHub
- Python Virtual Environment

---

# 📂 Project Structure

```
agentic-ai-research-assistant/

│
├── app/
│   ├── main.py
│   ├── agents/
│   │   └── research_agent.py
│   │
│   ├── tools/
│   │   ├── web_search.py
│   │   └── content_parser.py
│   │
│   ├── services/
│   │   └── llm_service.py
│   │
│   └── config.py
│
├── frontend/
│   └── app.py
│
├── requirements.txt
├── .env
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone <repository-url>

cd agentic-ai-research-assistant
```

---

## 2. Create Virtual Environment

```bash
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

Get your API key from:

https://openrouter.ai/

---

# ▶️ Running the Application

## Start Backend Server

```bash
uvicorn app.main:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

API Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Start Frontend

Open another terminal:

```bash
streamlit run frontend/app.py
```

Frontend:

```
http://localhost:8501
```

---

# 🔄 How It Works

1. User enters a research query.
2. AI Agent analyzes the request.
3. Agent performs web search.
4. Relevant webpage content is extracted.
5. Extracted information is sent to the LLM.
6. AI generates a structured research response.

---

# 🧪 Example

User Query:

```
Explain the latest trends in Agentic AI
```

Agent Workflow:

```
Query
 ↓
Search Web
 ↓
Extract Content
 ↓
Analyze Information
 ↓
Generate Report
```

---

# 🎯 Learning Objectives

This project explores:

- AI Agent fundamentals
- LLM integration
- Tool-based AI workflows
- Web research automation
- FastAPI API development
- Building practical AI applications

---

# 🔮 Future Improvements

- Add conversation memory
- Implement RAG pipeline
- Add vector database integration
- Add document upload support
- Build multi-agent collaboration
- Deploy on cloud platforms
- Add authentication system

---

# 👨‍💻 Author

**Aynn**

Full Stack Developer | AI Enthusiast

---

⭐ If you like this project, consider giving it a star.
