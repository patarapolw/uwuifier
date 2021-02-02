export declare class Uwuifier {
    faces: string[];
    exclamations: string[];
    actions: string[];
    uwuMap: (string | RegExp)[][];
    private _spacesModifier;
    private _wordsModifier;
    private _exclamationsModifier;
    constructor({ spaces, words, exclamations }?: {
        spaces?: {
            faces: number;
            actions: number;
            stutters: number;
        };
        words?: number;
        exclamations?: number;
    });
    uwuifyWords(sentence: string): string;
    uwuifySpaces(sentence: string): string;
    uwuifyExclamations(sentence: string): string;
    uwuifySentence(sentence: string): string;
}
