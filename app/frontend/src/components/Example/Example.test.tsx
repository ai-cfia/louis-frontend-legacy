import {render, screen } from'@testing-library/react';
import {ExampleList} from "../Example";
import '@testing-library/jest-dom';
import {vi} from 'vitest';

describe('ExampleList', () => {
    test('renders all examples', () => {
    
    const onExampleClicked = vi.fn(); 
    
    render(<ExampleList onExampleClicked={onExampleClicked}/>);
    
    const exampleText = screen.getByText("Can I bring my cat from France to Canada?");
    
    expect(exampleText).toBeInTheDocument();
    
    });
});

    