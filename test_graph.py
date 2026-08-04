from agents.graph import graph


result = graph.invoke(
    {
        "user_request":
        "Créer une application e-commerce",

        "analysis": None,
        "architecture": None,
        "backend_code": None,
        "frontend_code": None,
        "database_schema": None,
        "tests": None,
        "final_result": None
    }
)


print(result)