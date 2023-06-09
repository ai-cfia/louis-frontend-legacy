
import React, {useState} from 'react';
import {render, screen} from '@testing-library/react';
import { Checkbox, Panel, DefaultButton, TextField, SpinButton } from "@fluentui/react";
import '@testing-library/jest-dom/'
import styles from "../../pages/chat/Chat.module.css";

test('renders component correctly', () => {
    
    let isConfigPanelOpen = true;
    let promptTemplate = "";
    let retrieveCount = 3;
    let useSemanticRanker = true;
    let useSemanticCaptions = false;
    let excludeCategory = "";
    let useSuggestFollowupQuestions = true;
    let generateStaticResponses = false;

    const setIsConfigPanelOpen = (newValue: boolean) => {
        isConfigPanelOpen = (newValue);
    };

    const onRetrieveCountChange = (_ev?: React.SyntheticEvent<HTMLElement, Event>, newValue?: string) => {
        retrieveCount = (parseInt(newValue || "3"));
    };

    const onPromptTemplateChange = (_ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        promptTemplate = (newValue || "");
    };

    const onUseSemanticRankerChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        useSemanticRanker = (!!checked);
    };

    const onUseSemanticCaptionsChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        useSemanticCaptions = (!!checked);
    };

    const onExcludeCategoryChanged = (_ev?: React.FormEvent, newValue?: string) => {
        excludeCategory = (newValue || "");
    };

    const onUseSuggestFollowupQuestionsChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        useSuggestFollowupQuestions = (!!checked);
    };

    const onsetGenerateStaticResponsesChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        generateStaticResponses = (!!checked);
    };
    render(
    
        <Panel
        headerText="Configure answer generation"
        isOpen={isConfigPanelOpen}
        isBlocking={false}
        onDismiss={() => setIsConfigPanelOpen(false)}
        closeButtonAriaLabel="Close"
        onRenderFooterContent={() => <DefaultButton onClick={() => setIsConfigPanelOpen(false)}>Close</DefaultButton>}
        isFooterAtBottom={true}
        >

        <TextField
            className={styles.chatSettingsSeparator}
            defaultValue={promptTemplate}
            label="Override prompt template"
            multiline
            autoAdjustHeight
            onChange={onPromptTemplateChange}
        />

        <SpinButton
            className={styles.chatSettingsSeparator}
            label="Retrieve this many documents from search:"
            min={1}
            max={50}
            defaultValue={retrieveCount.toString()}
            onChange={onRetrieveCountChange}
        />
        <TextField className={styles.chatSettingsSeparator} label="Exclude category" onChange={onExcludeCategoryChanged} />
        <Checkbox
            className={styles.chatSettingsSeparator}
            checked={useSemanticRanker}
            label="Use semantic ranker for retrieval"
            onChange={onUseSemanticRankerChange}
        />
        <Checkbox
            className={styles.chatSettingsSeparator}
            checked={useSemanticCaptions}
            label="Use query-contextual summaries instead of whole documents"
            onChange={onUseSemanticCaptionsChange}
            disabled={!useSemanticRanker}
        />
        <Checkbox
            className={styles.chatSettingsSeparator}
            checked={useSuggestFollowupQuestions}
            label="Suggest follow-up questions"
            onChange={onUseSuggestFollowupQuestionsChange}
        />
        <Checkbox
            className={styles.chatSettingsSeparator}
            checked={generateStaticResponses}
            label="Generate Static Responses"
            onChange={onsetGenerateStaticResponsesChange}
        />
        </Panel>
    );
    
    // Expect Test Case:
    const checkbox = screen.getByLabelText(/Generate Static Responses/i);
    expect(checkbox).not.toBeChecked();
    checkbox.click();
    expect(generateStaticResponses).toBe(true);


});