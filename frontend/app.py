import streamlit as st
import requests

BACKEND_URL = st.secrets["BACKEND_URL"]

st.set_page_config(
    page_title="Agentic AI Research Assistant",
    page_icon="🤖",
    layout="wide"
)

st.title("🤖 Agentic AI Research Assistant")

st.write(
    "Enter any topic and get AI generated research summary with key points."
)

topic = st.text_input(
    "Research Topic",
    placeholder="Example: Artificial Intelligence"
)

if st.button("Research"):

    if not topic:
        st.warning("Please enter a topic")
    else:
        with st.spinner("Researching..."):
            try:
                response = requests.post(
                    f"{BACKEND_URL}/research/",
                    json={
                        "topic": topic
                    },
                    timeout=60
                )

                if response.status_code == 200:
                    data = response.json()

                    st.subheader("📄 Summary")
                    st.write(data["summary"])

                    st.subheader("🔑 Key Points")

                    for point in data["key_points"]:
                        st.markdown(f"- {point}")

                    st.subheader("📚 References")

                    for ref in data["references"]:
                        st.write(ref)

                else:
                    st.error(f"Backend Error: {response.text}")

            except Exception as e:
                st.error(f"Connection Error: {e}")