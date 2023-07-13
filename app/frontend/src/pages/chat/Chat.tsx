import { useRef, useState, useEffect } from "react";
import { SparkleFilled } from "@fluentui/react-icons";
import styles from "./Chat.module.css";
import { chatApi, Approaches, AskResponse, ChatRequest, ChatTurn, PingBackend, GetEndpoint } from "../../api";
import { Answer, AnswerError, AnswerLoading } from "../../components/Answer";
import { QuestionInput } from "../../components/QuestionInput";
import { ExampleList } from "../../components/Example";
import { UserChatMessage } from "../../components/UserChatMessage";
import { AnalysisPanel, AnalysisPanelTabs } from "../../components/AnalysisPanel";
import { ClearChatButton } from "../../components/ClearChatButton";
import { StaticResponses } from "../../data/StaticResponses";

const Chat = () => {
    //const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
    const [promptTemplate] = useState<string>("");
    const [retrieveCount] = useState<number>(3);
    const [useSemanticRanker] = useState<boolean>(true);
    const [useSemanticCaptions] = useState<boolean>(false);
    const [excludeCategory] = useState<string>("");
    const [useSuggestFollowupQuestions] = useState<boolean>(true);
    const [generateStaticResponses] = useState<boolean>(false);

    const lastQuestionRef = useRef<string>("");
    const chatMessageStreamEnd = useRef<HTMLDivElement | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>();

    const [activeCitation, setActiveCitation] = useState<string>();
    const [activeAnalysisPanelTab, setActiveAnalysisPanelTab] = useState<AnalysisPanelTabs | undefined>(undefined);

    const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
    const [answers, setAnswers] = useState<[user: string, response: AskResponse][]>([]);

    const [alertMessage, setAlertMessage] = useState(""); // State variable for the alert message
    const [isError, setIsError] = useState(false); // State to track if the backend URL is missing

    const makeApiRequest = async (question: string) => {
        lastQuestionRef.current = question;

        error && setError(undefined);
        setIsLoading(true);
        setActiveCitation(undefined);
        setActiveAnalysisPanelTab(undefined);

        if(!generateStaticResponses){
            try {
                const history: ChatTurn[] = answers.map(a => ({ user: a[0], bot: a[1].answer }));
                const request: ChatRequest = {
                    history: [...history, { user: question, bot: undefined }],
                    approach: Approaches.ReadRetrieveRead,
                    overrides: {
                        promptTemplate: promptTemplate.length === 0 ? undefined : promptTemplate,
                        excludeCategory: excludeCategory.length === 0 ? undefined : excludeCategory,
                        top: retrieveCount,
                        semanticRanker: useSemanticRanker,
                        semanticCaptions: useSemanticCaptions,
                        suggestFollowupQuestions: useSuggestFollowupQuestions
                    }
                };
                const result = await chatApi(request);
                setAnswers([...answers, [question, result]]);
            } catch (e) {
                setError("Looks like there was an issue loading the answer, please try again!");
            } finally {
                setIsLoading(false);
            }
        }

        else{
            

            let result = -1;
            result = findIndex(StaticResponses, question);
            
            setIsLoading(false);

            if(result > -1){
                setAnswers([...answers,[question, StaticResponses[result]]]);
            }

            else{
                setAnswers([...answers, [question, StaticResponses[Math.floor(Math.random() * StaticResponses.length)]]]);
            }
        }
            
        
    };

    const findIndex = (jsonData : typeof StaticResponses, searchString: string) => {
        for (let i = 0; i< jsonData.length; i++){
            if(jsonData[i].question == searchString){
                return i;
            }
        }
        return -1;
    }

    const clearChat = () => {
        lastQuestionRef.current = "";
        error && setError(undefined);
        setActiveCitation(undefined);
        setActiveAnalysisPanelTab(undefined);
        setAnswers([]);
    };

    useEffect(() => {
        // Scroll the chatMessageStreamEnd element into view
        chatMessageStreamEnd.current?.scrollIntoView({ behavior: "smooth" });

        // Check if the backend URL is missing or empty
        if(!process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL === "") {
            setIsError(true);
            setAlertMessage("Warning: Backend URL is not set, frontend is misconfigured.")
        } else {
            // Check if response is ok
            PingBackend(GetEndpoint)
              .then(responseData => {
                if(Array.isArray(responseData) && responseData.length === 0) {
                  // Response data is an empty array
                  console.log("Empty array response");
                } else {
                      // Response data is not an empty array
                      setIsError(true);
                      setAlertMessage("Warning: Initializing ping request to backend $REACT_APP_BACKEND_URL failed."); // Set the alert message on error
                  }
              })
              .catch((error) => {
                setIsError(true);
                setAlertMessage("Warning: Initializing ping request to backend $REACT_APP_BACKEND_URL failed."); // Set the alert message on error
              });
          }
        }, [isLoading]);
    

    const onExampleClicked = (example: string) => {
        makeApiRequest(example);
    };

    const onShowCitation = (citation: string, index: number) => {
        if (activeCitation === citation && activeAnalysisPanelTab === AnalysisPanelTabs.CitationTab && selectedAnswer === index) {
            setActiveAnalysisPanelTab(undefined);
        } else {
            setActiveCitation(citation);
            setActiveAnalysisPanelTab(AnalysisPanelTabs.CitationTab);
        }

        setSelectedAnswer(index);
    };

    const onToggleTab = (tab: AnalysisPanelTabs, index: number) => {
        if (activeAnalysisPanelTab === tab && selectedAnswer === index) {
            setActiveAnalysisPanelTab(undefined);
        } else {
            setActiveAnalysisPanelTab(tab);
        }

        setSelectedAnswer(index);
    };

    return (
        <div className={styles.container}>
            {isError && (
                <div className={styles.warning}>
                    {alertMessage}
                </div>
            )}
            <div className={styles.commandsContainer}>
                <ClearChatButton className={styles.commandButton} onClick={clearChat} disabled={!lastQuestionRef.current || isLoading} />
                <div data-testid = "my-component">
                    {/*<SettingsButton className={styles.commandButton} onClick={() => setIsConfigPanelOpen(!isConfigPanelOpen)} />*/}
                </div>
            </div>
            <div className={styles.chatRoot}>
                <div className={styles.chatContainer}>
                    {!lastQuestionRef.current ? (
                        <div className={styles.chatEmptyState}>
                            <SparkleFilled fontSize={"120px"} primaryFill={"rgba(5, 72, 108, 1)"} aria-hidden="true" aria-label="Chat logo" />
                            <h1 className={styles.chatEmptyStateTitle}>Chat with the agency | Échangez avec l'agence</h1>
                            <h2 className={styles.chatEmptyStateSubtitle}>Ask anything or try an example | Demandez n'importe quoi ou essayez un exemple</h2>
                            <ExampleList onExampleClicked={onExampleClicked} />
                        </div>
                    ) : (
                        <div className={styles.chatMessageStream}>
                            {answers.map((answer, index) => (
                                <div key={index}>
                                    <UserChatMessage message={answer[0]} />
                                    <div className={styles.chatMessageGpt}>
                                        <Answer
                                            key={index}
                                            answer={answer[1]}
                                            isSelected={selectedAnswer === index && activeAnalysisPanelTab !== undefined}
                                            onCitationClicked={c => onShowCitation(c, index)}
                                            onThoughtProcessClicked={() => onToggleTab(AnalysisPanelTabs.ThoughtProcessTab, index)}
                                            onSupportingContentClicked={() => onToggleTab(AnalysisPanelTabs.SupportingContentTab, index)}
                                            onFollowupQuestionClicked={q => makeApiRequest(q)}
                                            showFollowupQuestions={useSuggestFollowupQuestions && answers.length - 1 === index}
                                        />
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <>
                                    <UserChatMessage message={lastQuestionRef.current} />
                                    <div className={styles.chatMessageGptMinWidth}>
                                        <AnswerLoading />
                                    </div>
                                </>
                            )}
                            {error ? (
                                <>
                                    <UserChatMessage message={lastQuestionRef.current} />
                                    <div className={styles.chatMessageGptMinWidth}>
                                        <AnswerError error={error.toString()} onRetry={() => makeApiRequest(lastQuestionRef.current)} />
                                    </div>
                                </>
                            ) : null}
                            <div ref={chatMessageStreamEnd} />
                        </div>
                    )}

                    <div className={styles.chatInput}>
                        <QuestionInput
                            clearOnSend
                            placeholder="Type a new question | Taper une nouvelle question"
                            disabled={isLoading}
                            onSend={question => makeApiRequest(question)}
                        />
                    </div>
                </div>

                {answers.length > 0 && activeAnalysisPanelTab && (
                    <AnalysisPanel
                        className={styles.chatAnalysisPanel}
                        activeCitation={activeCitation}
                        onActiveTabChanged={x => onToggleTab(x, selectedAnswer)}
                        citationHeight="810px"
                        answer={answers[selectedAnswer][1]}
                        activeTab={activeAnalysisPanelTab}
                    />
                )}
            </div>
        </div>
    );
};

export default Chat;
