import ModuleRecord from "./ModuleRecord.js";

type ErrorResult = { evaluationError: any };

type UnlinkedState = { name: "unlinked" };
type LinkingState = { name: "linking", dfsIndex: number };
type LinkedState = { name: "linked" };
type EvaluatingState = { name: "evaluating" };
type EvaluatedState = { name: "evaluated", result: null | ErrorResult };

type ModuleState =
    | UnlinkedState
    | LinkingState
    | LinkedState
    | EvaluatingState
    | EvaluatedState;

export default class CyclicModuleRecord extends ModuleRecord {
    #state: ModuleState;
}
