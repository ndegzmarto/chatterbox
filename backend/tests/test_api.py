import pytest
from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)

def test_post_query_success():
	# test post query  route
    response = client.post("/api/query", json={"question": "what is Fastapi?"})
    assert response.status_code == 200
    json_data = response.json()
    assert "answer" in json_data
    assert json_data["answer"] != ""


def test_post_query_empty_question():
    # tests for empty post 
    response = client.post("/api/query", json={"question": ""})
    assert response.status_code == 400
    assert response.json()["detail"] == "question cannot be empty!"

def test_get_history():
    # test history route
    client.post("/api/query", json={"question": "what is a hypotenuse?"})
    response = client.get("/api/history")
    assert response.status_code == 200
    json_data = response.json()
    assert isinstance(json_data, list)
    assert len(json_data) > 0
    # check first output
    first_item = json_data[0]
    assert "answer" in first_item
    assert "question" in first_item
    assert "id" in first_item
    assert "created_at" in first_item
