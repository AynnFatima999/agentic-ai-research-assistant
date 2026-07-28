from backend.tools.web_search import WebSearchTool


tool = WebSearchTool()

results = tool.search("Python FastAPI tutorial")

print("RESULTS:")
for result in results:
    print(result)