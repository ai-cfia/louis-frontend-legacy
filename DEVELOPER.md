---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Chat.tsx

Making an API request:

1. makeApiRequest:

        - This function is responsible for making an API request to retrieve a response for a given question.
        - It updates the state variables and handles errors based on the API response.
        - The function takes a question as an argument and stores it as the last asked question using the lastQuestionRef reference.
        - It resets the error state and sets the loading state to true.
        - Inside a try-catch-finally block, it sends a chat request to the chatApi function.
        - The chat request includes the chat history, approach, and overrides.
        - The response from the chatApi is added to the answers array in the state.
        - If an error occurs during the API request, it sets the error state with an error message.
        - Finally, it sets the loading state to false.

2. chatApi:
        
        - This function is an asynchronous function that sends a POST request to the "/chat" endpoint.
        - It takes an options object containing the chat history, approach, and overrides.
        - The function uses the fetch API to send the POST request with the specified headers and request body.
        - The request body includes the chat history, approach, and overrides.
        - The function expects a JSON response from the API.
        - If the response status is not in the 200-299 range or the response is not okay, it throws an error with the parsed response         error message.
        - Otherwise, it returns the parsed response as an AskResponse object.

3. Request Body Overrides:

       - 'promptTemplate': A template used to format the prompt for generating responses.
       - 'excludeCategory': A category to exclude from the response generation. It can be used to filter out certain types of responses based on categories.
       - 'top': The count of responses to retrieve.
       - 'semanticRanker': A flag indicating whether to use a semantic ranker to improve the quality of responses.
       - 'semanticCaptions': A flag indicating whether to use semantic captions for generated responses.
       - 'suggestFollowupQuestions': A flag indicating whether to suggest follow-up questions in the generated response.

4. Approaches Enum:

       - The Approaches enum has been defined with three different approaches: RetrieveThenRead, ReadRetrieveRead, and ReadDecomposeAsk.
       - This enum is used to specify the approach in the AskRequest and ChatRequest objects.

5. AskRequest and ChatRequest:

       - The AskRequest type has been updated to include the question property, which represents the user's question.
       - The AskRequest and ChatRequest types now include the approach property, which should be one of the enum values from Approaches.
       - The AskRequest and ChatRequest types now have an optional overrides property of type AskRequestOverrides. These overrides allow customization of the request parameters.

6. AskRequestOverrides:

       - The AskRequestOverrides type has been defined to include various request overrides that can be passed to the API.
       - It includes properties such as semanticRanker, semanticCaptions, excludeCategory, top, temperature, promptTemplate, promptTemplatePrefix, promptTemplateSuffix, and suggestFollowupQuestions.
       - These properties allow fine-tuning the behavior of the response generation process.

7. AskResponse:

       - The AskResponse type has been updated to include additional properties:
       - thoughts: A string or null representing any additional thoughts related to the answer.
       - data_points: An array of strings representing relevant data points associated with the answer.
       - error: An optional string indicating any error that occurred during the API response.

JSON response for chat answer:

1. answers and setAnswers:

       - The answers state is initialized as an empty array: const [answers, setAnswers] = useState<[user: string, response: AskResponse][]>([]);. It stores the chat history as an array of tuples, where each tuple represents a user's question and the corresponding response from the chat API.
       - Inside the makeApiRequest function, after receiving the response from the API, the new question and response are added to the answers state using the setAnswers function: setAnswers([...answers, [question, result]]);. This updates the state by appending the new chat turn to the existing chat history.
       - The answers state is used in the rendering part of the component to display the chat messages. In the render section, you can see that the answers array is mapped over to generate the chat message components: {answers.map((answer, index) => ())}
       - Each chat message is displayed with the user's question (answer[0]) and the corresponding response (answer[1]).
       - Overall, the answers state and setAnswers function are used to maintain and update the chat history as the user interacts with the chat component.

The Return Statement:

1. Content Display:

       - The code renders a chat interface with a container and messages section.
       - If there is no previous question, it displays a chat empty state with a logo and headings.
       - The chat empty state also includes an example list component for predefined examples.
       - If there is a previous question, it renders the chat messages section.
       - The chat messages section iterates over the answers array and displays user messages and responses.
       - Each message and response pair is wrapped inside a unique <div> element with a key based on the index.
       - The responses are displayed using the <Answer> component with various interactive features.
       - Loading messages are shown when the chat is in the loading state.
       - Error messages are displayed when there is an error loading the answer.
       - The chat interface includes a reference (chatMessageStreamEnd) for scrolling to the end of the chat messages.
   
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Git Branches

1. Creating new branches:

       - When creating new branches on git, prefix it with issue number as: issueXXX-short-descriptive-text (all lowercase).
   
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
