from agents.graph import graph


def generate_application(prompt: str):

    result = graph.invoke(
        {
            "user_request": prompt,

            "analysis": None,
            "architecture": None,
            "backend_code": None,
            "frontend_code": None,
            "database_schema": None,
            "tests": None,
            "final_result": None
        }
    )

    return result["analysis"]