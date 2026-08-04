class BaseAgent:

    def __init__(self, llm):
        self.llm = llm


    def execute(self, state):
        raise NotImplementedError