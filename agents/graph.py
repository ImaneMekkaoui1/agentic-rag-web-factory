from langgraph.graph import StateGraph

from agents.AgentState import AgentState
from agents.agent_analyse import AnalyseAgent
from typing_extensions import TypedDict

analyse_agent = AnalyseAgent()


def analyse_node(state: AgentState):

    return analyse_agent.execute(state)



graph_builder = StateGraph(AgentState)


graph_builder.add_node(
    "analyse",
    analyse_node
)


graph_builder.set_entry_point(
    "analyse"
)


graph_builder.set_finish_point(
    "analyse"
)


graph = graph_builder.compile()