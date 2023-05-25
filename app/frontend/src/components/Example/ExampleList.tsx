import { Example } from "./Example";

import styles from "./Example.module.css";

export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES: ExampleModel[] = [
    { 
        text: "introduce yourself in both languages", 
        value: "introduce yourself in both languages and explain your role at the agency" 
    },
    {
        text: "can i bring my cat from France to Canada?",
        value: "can i bring my cat from France to Canada and what is the procedure step-by-step with applicable laws and regulations?"
    },
    { 
        text: "quelle est la loi sur la santé des animaux?", 
        value: "quelle est la loi sur la santé des animaux? Donner un sommaire." 
    },
    { 
        text: "list international agreements in the fertilizer act", 
        value: "list international agreements in the fertilizer act?" 
    },
    { 
        text: "liste des trucs qu'un inspecteur peut demander", 
        value: "liste des trucs qu'un inspecteur peut demander dans le cadre d'une inspection" 
    },
    { 
        text: "liste des lois et règlements qui s'appliquent à l'ACIA", 
        value: "liste des lois et règlements qui s'appliquent à l'ACIA avec descriptifs en anglais et en français" 
    },
    { 
        text: "propose a thank you letter to CFIA in the name of all Canadians", 
        value: "propose a thank you letter to CFIA in the name of all Canadians" 
    },
    { 
        text: "explain why AI is important for the agency", 
        value: "explain why AI is important for the agency" 
    },
    { 
        text: "liste des personnages importants", 
        value: "liste des personnages importants dans l'histoire de l'agence" 
    }
];

interface Props {
    onExampleClicked: (value: string) => void;
}

export const ExampleList = ({ onExampleClicked }: Props) => {
    return (
        <ul className={styles.examplesNavList}>
            {EXAMPLES.map((x, i) => (
                <li key={i}>
                    <Example text={x.text} value={x.value} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
