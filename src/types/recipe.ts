export type Recipe = {
    _id: string;
    title: string;
    description: string;
    illustration: string;
    instructions: string
    ingredients: string[];
}

export type supplementType = {
    supplements: string[]
} 