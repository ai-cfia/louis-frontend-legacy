import { Example } from "./Example";

import styles from "./Example.module.css";

export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES: ExampleModel[] = [
    { 
        text: "Introduce yourself in both languages", 
        value: "Introduce yourself in both languages and explain your role at the agency" 
    },
    {
        text: "Can I bring my cat from France to Canada?",
        value: "Can I bring my cat from France to Canada and what is the procedure step-by-step with applicable laws and regulations?"
    },
    { 
        text: "Quelle est la loi sur la santé des animaux?", 
        value: "Quelle est la loi sur la santé des animaux? Donner un sommaire." 
    },
    { 
        text: "List international agreements in the fertilizer act", 
        value: "List international agreements in the fertilizer act?" 
    },
    { 
        text: "Liste des trucs qu'un inspecteur peut demander", 
        value: "Liste des trucs qu'un inspecteur peut demander dans le cadre d'une inspection" 
    },
    { 
        text: "Liste des lois et règlements qui s'appliquent à l'ACIA", 
        value: "Liste des lois et règlements qui s'appliquent à l'ACIA avec descriptifs en anglais et en français" 
    },
    { 
        text: "Propose a thank you letter to CFIA in the name of all Canadians", 
        value: "Propose a thank you letter to CFIA in the name of all Canadians" 
    },
    { 
        text: "Explain why AI is important for the agency", 
        value: "Explain why AI is important for the agency" 
    },
    { 
        text: "Liste des personnages importants", 
        value: "Liste des personnages importants dans l'histoire de l'agence" 
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
