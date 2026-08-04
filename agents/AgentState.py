from typing import TypedDict


class AgentState(TypedDict):

    user_request: str

    analysis: str

    architecture: str

    backend_code: str

    frontend_code: str

    database_schema: str

    tests: str