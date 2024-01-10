import mongoose from 'mongoose';

/* RecipeSchema will correspond to the recipe collection in the MongoDB database. */
const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this recipe.'],
        maxlength: [200, 'Title cannot be more than 60 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this recipe.'],
        maxlength: [1200, 'Description cannot be more than 200 characters'],
    },
    illustration: {
        type: String,
        required: [true, 'Please provide a illustration for this recipe.'],
        maxlength: [600, 'Illustration cannot be more than 200 characters'],
    },
    ingredients: {
        type: Array,
        required: [true, 'Please provide ingredients for this recipe.'],
    },
    instructions: {
        type: Array,
        required: [true, 'Please provide instructions for this recipe.'],
    },
});

export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
