from agents.base_agent import BaseAgent


class AnalyseAgent(BaseAgent):

    def __init__(self):
        super().__init__("Analyse Agent")


    def execute(self, state):

        request = state["user_request"]

        state["analysis"] = (
            f"Analyse du besoin : {request}"
        )

        return state